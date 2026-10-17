import { imageRanges, matchesImageRange } from './services/imageRanges';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { supabase } from './lib/supabase';
import { unpackNotesAndProvenance } from './metadataModel';
import { buildCatalogSlugMap } from './catalogSlugs';
import { getPublishedBundleByCode, getPublishedTitleById } from './services/turotsRepository';
import './detail.css';

const IiifViewer = lazy(() => import('./IiifViewer'));

type AnyRecord = Record<string, any>;
const detailRequestCache = new Map<string, { expiresAt: number; promise: Promise<any> }>();
export function invalidateDetailRequestCache() {
  detailRequestCache.clear();
}
async function fetchAllRows(query: (from: number, to: number) => any) {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await query(from, from + 999);
    if (error) throw error;
    rows.push(...(data || []));
    if ((data || []).length < 1000) return rows;
  }
}
function cachedDetailRequest<T>(key: string, load: () => Promise<T>) {
  const cached = detailRequestCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.promise as Promise<T>;
  const promise = load().then((value) => {
    // A bendel may become public after an admin publishes it. Do not retain a
    // negative lookup, or the new public page stays hidden until the TTL ends.
    if (value == null && detailRequestCache.get(key)?.promise === promise) detailRequestCache.delete(key);
    return value;
  }).catch((error) => { detailRequestCache.delete(key); throw error; });
  detailRequestCache.set(key, { expiresAt: Date.now() + 15_000, promise });
  return promise;
}
const metadataGroups: Array<[string, Array<[string, string]>]> = [
  ['Identitas judul', [['Judul asli', 'title_original'], ['Judul dari tim', 'title_from_team'], ['Kategori utama', 'category_primary'], ['Status metadata', 'metadata_status']]],
  ['Klasifikasi dan isi', [['Klasifikasi 1', 'scholarly_classification_1'], ['Klasifikasi 2', 'scholarly_classification_2'], ['Klasifikasi 3', 'scholarly_classification_3'], ['Deskripsi umum', 'description'], ['Hlm pemisah proyek', 'folio_separator'], ['Kata kunci', 'keywords'], ['Glosarium', 'glossary']]],
  ['Kepengarangan dan asal', [['Pengarang', 'author'], ['Penyalin', 'scribe'], ['Tahun di teks', 'year_original'], ['Konversi Masehi', 'year_masehi'], ['Lokasi penyalinan', 'copying_location'], ['Asal-usul naskah', 'manuscript_origin'], ['Bahasa', 'language'], ['Aksara', 'script']]],
  ['Kondisi dan catatan', [['Catatan pinggir / marginal', 'marginal_notes'], ['Catatan makna', 'meaning_notes'], ['Kolofon', 'colophon'], ['Kondisi bagian teks', 'physical_condition'], ['Keterbacaan', 'readability'], ['Kelengkapan teks', 'completeness'], ['Catatan', 'notes'], ['Manuskrip terkait', 'related_manuscripts'], ['Tokoh terkait', 'related_persons']]],
];

export default function DetailV1({ keyValue, bundleMode = false, bundleReaderMode = false }: { keyValue: string; bundleMode?: boolean; bundleReaderMode?: boolean; key?: string }) {
  const showAllPages = bundleMode || bundleReaderMode;
  const [unitId, setUnitId] = useState(new URLSearchParams(location.search).get('unit') || '');
  const [bundle, setBundle] = useState<AnyRecord | null>(null);
  const [selected, setSelected] = useState(0);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setBundle(null); setError(''); setSelected(0); setPagesLoading(false);
    void (async () => {
      if (!supabase) throw new Error('Koneksi katalog belum dikonfigurasi.');
      const params = new URLSearchParams(location.search);
      const requestedUnit = params.get('unit') || '';
      let targetBundleId = params.get('bundle') || '';
      let targetUnitId = requestedUnit;

      if (!targetBundleId) {
        if (requestedUnit) {
          const unitRow = await cachedDetailRequest(`published-unit-${requestedUnit}`, () => getPublishedTitleById(requestedUnit));
          if (unitRow) { targetBundleId = unitRow.bundle_id; targetUnitId = unitRow.id; }
        }
        if (!targetBundleId && !bundleMode) {
          const { data: unitRow, error: unitError } = await supabase.from('turots_text_units')
            .select('id,bundle_id')
            .eq('slug', keyValue)
            .is('archived_at', null)
            .maybeSingle();
          if (unitError) throw unitError;
          if (unitRow) { targetBundleId = unitRow.bundle_id; targetUnitId = unitRow.id; }
        }
        if (!targetBundleId && bundleMode) {
          const bundleRow = await cachedDetailRequest(`published-code-${keyValue}`, () => getPublishedBundleByCode(keyValue));
          targetBundleId = bundleRow?.id || '';
        }
      }
      if (!targetBundleId) throw new Error('Katalog tidak ditemukan.');

      const found = await cachedDetailRequest(`published-bundle-${targetBundleId}-${targetUnitId}`, async () => {
        let bundleRequest = supabase.from('turots_bundles')
          .select('*,turots_collections(*)')
          .eq('id', targetBundleId)
          .eq('publication_status', 'published');
        const { data, error: requestError } = await bundleRequest.maybeSingle();
        if (requestError) throw requestError;
        if (!data) return null;
        const [units, pages] = await Promise.all([
          fetchAllRows((from, to) => supabase.from('turots_text_units').select('*').eq('bundle_id', targetBundleId).is('archived_at', null).order('sequence_no').range(from, to)),
          fetchAllRows((from, to) => supabase.from('turots_pages').select('*').eq('bundle_id', targetBundleId).in('access_level', ['public_preview', 'public_full']).order('page_order').range(from, to)),
        ]);
        return { ...data, turots_text_units: units, turots_pages: pages };
      });
      if (!found) throw new Error('Metadata bendel tidak ditemukan.');

      const orderedBundle = {
        ...found,
        turots_text_units: [...(found.turots_text_units || [])].sort((left: AnyRecord, right: AnyRecord) => Number(left.sequence_no || 0) - Number(right.sequence_no || 0)),
        turots_pages: [...(found.turots_pages || [])].sort((left: AnyRecord, right: AnyRecord) => Number(left.page_order || 0) - Number(right.page_order || 0)),
      };
      if (active) { setUnitId(targetUnitId || orderedBundle.turots_text_units?.[0]?.id || ''); setBundle(orderedBundle); }
    })().catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Katalog belum dapat dimuat.'); });
    return () => { active = false; };
  }, [keyValue, bundleMode]);

  const unit = bundle?.turots_text_units?.find((item: AnyRecord) => item.id === unitId) || bundle?.turots_text_units?.[0] || {};
  useEffect(() => {
    if (bundleMode || !unit.id || !bundle || bundle.publication_status !== 'published' || !supabase) return;
    try {
      let visitorId = localStorage.getItem('turots-monthly-visitor-id');
      if (!visitorId) { visitorId = crypto.randomUUID(); localStorage.setItem('turots-monthly-visitor-id', visitorId); }
      void supabase.rpc('record_turots_manuscript_view', { p_text_unit_id: unit.id, p_visitor_id: visitorId });
    } catch { /* Statistik kunjungan bersifat opsional bila browser membatasi penyimpanan lokal. */ }
  }, [bundleMode, unit.id, bundle?.publication_status]);
  const pages = useMemo(() => {
    const storedPages = [...(bundle?.turots_pages || [])].sort((left: AnyRecord, right: AnyRecord) => left.page_order - right.page_order);
    const linkedPages = storedPages.filter((item: AnyRecord) => item.text_unit_id === unit.id);
    const anyExplicitMapping = storedPages.some((item: AnyRecord) => item.text_unit_id);
    let ranges: Array<[number,number]> | null = null;
    try { ranges = imageRanges(unit.folio_start,unit.folio_end); } catch { /* Invalid historical ranges show only explicitly linked pages. */ }
    if (showAllPages) return storedPages;
    if (linkedPages.length) return linkedPages;
    if (anyExplicitMapping) return [];
    return storedPages.filter((item: AnyRecord) => ranges ? matchesImageRange(item as { page_order?: number },ranges) : false);
  }, [bundle, showAllPages, unit.id]);
  const page = pages[selected];
  const lastFolio = [...pages].reverse().find((item: AnyRecord) => /^\d+[rv]$/i.test(item.folio_label || ''))?.folio_label;
  const activeReaderUnit = bundleReaderMode ? bundle?.turots_text_units?.find((item: AnyRecord) => item.id === page?.text_unit_id) || {} : unit;
  const provenance = unpackNotesAndProvenance(unit.notes).provenance;
  const selectUnit = async (nextUnitId: string) => {
    setUnitId(nextUnitId); setSelected(0);
    const next = new URLSearchParams(location.search); next.set('unit', nextUnitId);
    history.replaceState({}, '', `${location.pathname}?${next.toString()}`);
  };

  if (error) return <section className="archive-content"><div className="content-state" role="alert"><h1>{error}</h1><a className="text-action" href="/katalog">Kembali ke katalog</a></div></section>;
  if (!bundle) return <section className="archive-content"><div className="content-state" role="status"><LoaderCircle className="spin"/>Memuat metadata bendel…</div></section>;
  const setFromPage = (index: number) => { setSelected(index); document.querySelector('.reader')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };

  const reader = <>
        {showAllPages && <p className="bundle-reader-note">Foto mengikuti urutan yang tersimpan di katalog. Foto yang belum dipetakan ke judul tetap ditampilkan.</p>}
        {pagesLoading ? <div className="reader-fallback" role="status">Memuat halaman…</div> : <Suspense fallback={<div className="reader-fallback" role="status">Menyiapkan pembaca IIIF…</div>}><IiifViewer imageUrl={page?.image_url} label={page?.folio_label || page?.label || `Foto nomor ${page?.page_order || selected + 1}`} /></Suspense>}
        {pages.length > 0 && <nav className="folio-strip" aria-label="Pilih halaman manuskrip">{pages.map((folio: AnyRecord, index: number) => <button key={folio.id || folio.canvas_id || index} aria-current={index === selected ? 'page' : undefined} className={index === selected ? 'folio-thumb selected' : 'folio-thumb'} onClick={() => setFromPage(index)}><img loading="lazy" src={folio.thumbnail_url || folio.image_url} alt=""/><span>{folio.folio_label || folio.label || `Foto nomor ${folio.page_order || index + 1}`}</span></button>)}</nav>}
  </>;

  return <section className="detail-page detail-v1">
    <div className="detail-breadcrumb"><a href="/katalog">Katalog</a><span aria-hidden="true">/</span>{bundleMode ? 'Bendel' : unit.category_primary || 'Manuskrip'}<span aria-hidden="true">/</span>{bundle.bundle_code}</div>
    <header className="detail-hero"><div><p className="eyebrow">{bundleMode ? bundle.bundle_code : unit.display_id || bundle.bundle_code} · {bundle.turots_collections?.name || 'Koleksi manuskrip'}</p><h1 dir="auto">{bundleMode ? bundle.display_title || `Bendel ${bundle.bundle_code}` : unit.title_original || bundle.display_title}</h1>{bundleReaderMode ? <p className="latin">{`${pages.length} foto digital tersimpan`}{lastFolio ? ` · folio terakhir ${lastFolio}` : ''}</p> : !bundleMode && unit.title_latin && <p className="latin">{unit.title_latin}</p>}</div></header>
    <div className={`detail-layout${bundleMode ? ' bundle-landing-layout' : ''}`}>
      <main className="detail-main">
        {bundleMode ? <section className="bundle-landing">
          {reader}
          <section className="metadata-detail"><h2>Metadata bendel</h2><div className="metadata-table">
            <div className="metadata-detail-row"><span>Afiliasi</span><strong>{bundle.affiliation || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Format digital</span><strong>{bundle.surrogate_format || 'Digital'}</strong></div>
            <div className="metadata-detail-row"><span>Negara</span><strong>{bundle.country || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Kota / provinsi</span><strong>{bundle.city_province || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Koleksi</span><strong>{bundle.turots_collections?.name || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Arah baca kanan ke kiri</span><strong>{bundle.right_to_left == null ? 'Belum diisi' : bundle.right_to_left ? 'Ya' : 'Tidak'}</strong></div>
            <div className="metadata-detail-row"><span>Pokok bahasan</span><strong>{bundle.subject_matter || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Penyalin</span><strong>{bundle.copyist || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Tanggal penyalinan</span><strong>{bundle.copying_date_native || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Tempat penyalinan</span><strong>{bundle.copying_place || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Aksara</span><strong>{bundle.bundle_script || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Jenis kertas</span><strong>{bundle.paper_type || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Watermark / countermark</span><strong>{[bundle.watermark, bundle.countermark].filter(Boolean).join(' / ') || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Sampul / jilid</span><strong>{[bundle.cover, bundle.binding].filter(Boolean).join(' / ') || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Ukuran sampul</span><strong>{bundle.cover_size || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Ukuran kertas / blok teks</span><strong>{[bundle.paper_size, bundle.dimensions].filter(Boolean).join(' / ') || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Jumlah foto / halaman bendel</span><strong>{bundle.extent_pages || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Halaman kosong</span><strong>{bundle.blank_pages ?? 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Rubrikasi</span><strong>{bundle.rubrication || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Iluminasi / ilustrasi</span><strong>{[bundle.illumination, bundle.illustration].filter(Boolean).join(' / ') || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Kondisi fisik</span><strong>{bundle.physical_condition || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Deskripsi isi bendel</span><strong>{bundle.bundle_description || 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Kolofon</span><strong>{bundle.colophon || 'Belum diisi'}</strong></div>
            {bundle.affiliation_url && <div className="metadata-detail-row"><span>Sumber afiliasi</span><strong><a href={bundle.affiliation_url} target="_blank" rel="noreferrer">Buka sumber cadangan</a></strong></div>}
          </div></section>
          <section className="metadata-detail bundle-items"><h2>Judul di dalam bendel</h2><p>{(bundle.turots_text_units || []).length} item judul terdaftar dalam bendel ini.</p><div className="bundle-title-list">{(bundle.turots_text_units || []).map((item: AnyRecord) => {
            const slug = buildCatalogSlugMap((bundle.turots_text_units || []).map((textUnit: AnyRecord) => ({ b: bundle, u: textUnit }))).get(item.id) || item.display_id;
            const target = `/katalog/${encodeURIComponent(slug)}?unit=${encodeURIComponent(item.id)}&bundle=${encodeURIComponent(bundle.id)}`;
            return <a className="bundle-title-item" key={item.id} href={target}><span className="bundle-title-sequence">Item {item.sequence_no}</span><strong dir="auto">{item.title_original || item.display_id}</strong>{item.title_latin && <em>{item.title_latin}</em>}<span>{item.category_primary || 'Belum dikategorikan'} · {item.folio_start || 'Folio belum diisi'}{item.folio_end && item.folio_end !== item.folio_start ? `–${item.folio_end}` : ''}</span><b>Buka fokus judul →</b></a>;
          })}</div></section>
        </section> : <>
        {reader}
        <section className="metadata-detail"><h2>Metadata judul</h2>{metadataGroups.map(([group, fields]) => <details className="metadata-group" key={group} open={group === 'Identitas judul'}><summary>{group}</summary><div className="metadata-table">{fields.map(([label, key]) => <div className="metadata-detail-row" key={key}><span>{label}</span><strong>{unit[key] || 'Belum diisi'}</strong></div>)}</div></details>)}
          <details className="metadata-group bundle-metadata"><summary>Metadata bendel induk</summary><div className="metadata-table">
            <div className="metadata-detail-row"><span>URL afiliasi / cadangan</span><strong>{bundle.affiliation_url ? <a href={bundle.affiliation_url} target="_blank" rel="noreferrer">Buka sumber cadangan</a> : 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Kode bendel</span><strong>{bundle.bundle_code}</strong></div><div className="metadata-detail-row"><span>Kover dan kondisi</span><strong>{bundle.cover || 'Belum dicatat'} · {bundle.physical_condition || 'Belum dicatat'}</strong></div>
            <div className="metadata-detail-row"><span>Dimensi dan ukuran kertas</span><strong>{[bundle.dimensions, bundle.paper_size].filter(Boolean).join(' · ') || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Jilid / jenis kertas</span><strong>{[bundle.binding, bundle.paper_type].filter(Boolean).join(' · ') || 'Belum dicatat'}</strong></div>
            <div className="metadata-detail-row"><span>Watermark / countermark</span><strong>{[bundle.watermark, bundle.countermark].filter(Boolean).join(' / ') || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Kelengkapan fisik</span><strong>{bundle.completeness || 'Belum diperiksa'}</strong></div>
            <div className="metadata-detail-row"><span>Jumlah halaman bendel</span><strong>{bundle.extent_pages || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Koleksi / proyek</span><strong>{bundle.turots_collections?.name || '—'} · {bundle.turots_collections?.source_project || bundle.affiliation || '—'}</strong></div>
            <div className="metadata-detail-row"><span>Catatan bendel</span><strong>{bundle.bundle_notes || 'Belum ada catatan'}</strong></div>
          </div></details>
          {provenance.length > 0 && <details className="metadata-group"><summary>Asal-usul data</summary>{provenance.map((item: AnyRecord, index: number) => <p key={`${item.source}-${index}`}>{item.source}: {item.value} {item.note && `— ${item.note}`}</p>)}</details>}
        </section>
        </>}
      </main>
      {(!bundleMode || bundleReaderMode) && <aside className={`detail-sidebar${bundleReaderMode ? ' bundle-reader-sidebar' : ''}`}><section><h2>Identitas ringkas</h2><div className="metadata-row"><span>ID judul</span><strong>{activeReaderUnit.display_id || (bundleReaderMode ? 'Belum dipetakan' : '—')}</strong></div><div className="metadata-row"><span>Kode bendel</span><strong>{bundle.bundle_code || '—'}</strong></div><div className="metadata-row"><span>Folio</span><strong>{bundleReaderMode ? page?.folio_label || page?.label || '—' : `${activeReaderUnit.folio_start || '—'}${activeReaderUnit.folio_end && activeReaderUnit.folio_end !== activeReaderUnit.folio_start ? `–${activeReaderUnit.folio_end}` : ''}`}</strong></div><div className="metadata-row"><span>Kategori</span><strong>{activeReaderUnit.category_primary || '—'}</strong></div><div className="metadata-row"><span>Koleksi</span><strong>{bundle.turots_collections?.name || '—'}</strong></div></section><section><h2>Deskripsi</h2><p>{activeReaderUnit.description || (bundleReaderMode ? bundle.bundle_description : '') || 'Deskripsi kuratorial belum tersedia.'}</p></section>{bundleReaderMode ? <a className="research-link" href={`/bendel/${encodeURIComponent(bundle.bundle_code)}`}>Metadata bendel {bundle.bundle_code} <span aria-hidden="true">→</span></a> : <a className="research-link" href={`/bendel/${encodeURIComponent(bundle.bundle_code)}`}>Lihat seluruh bendel {bundle.display_title || bundle.bundle_code} <span aria-hidden="true">→</span></a>}{bundle.affiliation_url && <a className="research-link" href={bundle.affiliation_url} target="_blank" rel="noreferrer">Sumber afiliasi <span aria-hidden="true">↗</span></a>}</aside>}
    </div>
  </section>;
}
