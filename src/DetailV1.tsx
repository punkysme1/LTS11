import { imageRanges, matchesImageRange } from './services/imageRanges';
import { resolvePhotoPageRanges } from './services/pageRanges';
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
    if (value == null && detailRequestCache.get(key)?.promise === promise) detailRequestCache.delete(key);
    return value;
  }).catch((error) => { detailRequestCache.delete(key); throw error; });
  detailRequestCache.set(key, { expiresAt: Date.now() + 15_000, promise });
  return promise;
}
const metadataGroups: Array<[string, Array<[string, string]>]> = [
  ['Identitas judul', [
    ['NO (Nomor urut Turots)', 'record_no'],
    ['ID Judul', 'display_id'],
    ['No (Urut kategori)', 'category_sequence_no'],
    ['Halaman / folio di bendel (hlm)', 'page_ranges_label'],
    ['Judul asli', 'title_original'],
    ['Judul Latin (SKB 3 Menteri)', 'title_latin'],
    ['Judul dari tim', 'title_from_team'],
    ['Judul dari afiliasi', 'affiliation_title'],
    ['Klasifikasi keilmuan 1', 'category_primary'],
    ['Klasifikasi keilmuan 2', 'category_secondary'],
    ['Klasifikasi keilmuan 3', 'category_tertiary'],
    ['Status metadata', 'metadata_status'],
  ]],
  ['Klasifikasi dan isi', [
    ['Klasifikasi 1', 'scholarly_classification_1'],
    ['Klasifikasi 2', 'scholarly_classification_2'],
    ['Klasifikasi 3', 'scholarly_classification_3'],
    ['Deskripsi umum', 'description'],
    ['Hlm pemisah proyek', 'folio_separator'],
    ['Kata kunci', 'keywords'],
    ['Glosarium', 'glossary'],
    ['Referensi penelitian', 'references_text'],
  ]],
  ['Kepengarangan dan asal', [
    ['Pengarang', 'author'],
    ['Penyalin', 'scribe'],
    ['Tahun penulisan di teks', 'year_original'],
    ['Konversi Masehi', 'year_masehi'],
    ['Lokasi penyalinan', 'copying_location'],
    ['Asal-usul naskah', 'manuscript_origin'],
    ['Bahasa', 'language'],
    ['Aksara', 'script'],
  ]],
  ['Kodikologi & fisik per judul', [
    ['Kover', 'cover'],
    ['Ukuran kover', 'cover_size'],
    ['Jilid', 'binding'],
    ['Jenis kertas', 'paper_type'],
    ['Ukuran kertas', 'paper_size'],
    ['Ukuran dimensi blok teks', 'dimensions'],
    ['Watermark', 'watermark'],
    ['Countermark', 'countermark'],
    ['Tinta', 'ink'],
    ['Jumlah halaman', 'total_pages'],
    ['Halaman kosong', 'blank_pages'],
    ['Jumlah baris per halaman', 'lines_per_page'],
    ['Rubrikasi', 'rubrication'],
    ['Iluminasi', 'illumination'],
    ['Ilustrasi', 'illustration'],
  ]],
  ['Kondisi, kolofon, dan jejaring', [
    ['Catatan pinggir', 'marginal_notes'],
    ['Catatan makna', 'meaning_notes'],
    ['Kolofon', 'colophon'],
    ['Catatan marginal', 'marginal_note'],
    ['Kondisi fisik naskah', 'physical_condition'],
    ['Keterbacaan', 'readability'],
    ['Kelengkapan naskah', 'completeness'],
    ['Catatan', 'notes'],
    ['Manuskrip terkait', 'related_manuscripts'],
    ['Tokoh terkait', 'related_persons'],
  ]],
];

function displayMetadataValue(key: string, value: unknown) {
  if (value == null || String(value).trim() === '') return '';
  if (key === 'metadata_status' && value === 'imported') return 'Diimpor';
  if (key === 'notes') return unpackNotesAndProvenance(String(value)).notes;
  return String(value);
}

export default function DetailV1({ keyValue, bundleMode = false, bundleReaderMode = false, navigate }: { keyValue: string; bundleMode?: boolean; bundleReaderMode?: boolean; navigate?: (path: string) => void; key?: string }) {
  const showAllPages = bundleMode || bundleReaderMode;
  const [unitId, setUnitId] = useState(new URLSearchParams(location.search).get('unit') || '');
  const [bundle, setBundle] = useState<AnyRecord | null>(null);
  const [selected, setSelected] = useState(0);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [error, setError] = useState('');
  const [jumpPage, setJumpPage] = useState('');
  const returnToParam = new URLSearchParams(location.search).get('returnTo') || '';
  const catalogReturn = returnToParam.startsWith('/katalog') && !returnToParam.startsWith('//') ? returnToParam : '/katalog';

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
        const bundleRequest = supabase.from('turots_bundles')
          .select('*,turots_collections(*)')
          .eq('id', targetBundleId)
          .eq('publication_status', 'published');
        const { data, error: requestError } = await bundleRequest.maybeSingle();
        if (requestError) throw requestError;
        if (!data) return null;
        const [units, pages] = await Promise.all([
          fetchAllRows((from, to) => supabase.from('turots_text_units').select('*').eq('bundle_id', targetBundleId).is('archived_at', null).order('sequence_no').order('id').range(from, to)),
          fetchAllRows((from, to) => supabase.from('turots_pages').select('*').eq('bundle_id', targetBundleId).in('access_level', ['public_preview', 'public_full']).order('page_order').order('id').range(from, to)),
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
    try {
      const rangeInput = unit.page_ranges_label || unit.folio_separator || (unit.folio_start && unit.folio_end ? `${unit.folio_start}-${unit.folio_end}` : unit.folio_start);
      ranges = rangeInput ? resolvePhotoPageRanges(rangeInput, storedPages) : imageRanges(unit.folio_start, unit.folio_end);
    } catch { /* Invalid historical ranges show only explicitly linked pages. */ }
    if (showAllPages) return storedPages;
    if (linkedPages.length) return linkedPages;
    if (anyExplicitMapping) return [];
    return storedPages.filter((item: AnyRecord) => ranges ? matchesImageRange(item as { page_order?: number }, ranges) : false);
  }, [bundle, showAllPages, unit.id]);
  const page = pages[selected];
  useEffect(() => {
    if (!pages.length) { setSelected(0); return; }
    const pageId = new URLSearchParams(location.search).get('page');
    const initialIndex = pageId ? pages.findIndex((item: AnyRecord) => String(item.id || item.canvas_id || item.page_order) === pageId) : -1;
    setSelected(initialIndex >= 0 ? initialIndex : 0);
  }, [pages, keyValue]);
  const lastFolio = [...pages].reverse().find((item: AnyRecord) => /^\d+[rv]$/i.test(item.folio_label || ''))?.folio_label;
  const activeReaderUnit = bundleReaderMode ? bundle?.turots_text_units?.find((item: AnyRecord) => item.id === page?.text_unit_id) || {} : unit;
  const provenance = unpackNotesAndProvenance(unit.notes).provenance;

  useEffect(() => {
    if (!bundle) return;
    const title = bundleMode ? bundle.display_title || `Bendel ${bundle.bundle_code}` : unit.title_original || bundle.display_title;
    document.title = `${title} · Turots Qomaruddin`;
  }, [bundle, bundleMode, unit.title_original]);

  if (error) return <section className="archive-content"><div className="content-state" role="alert"><h1>{error}</h1><a className="text-action" href="/katalog">Kembali ke katalog</a></div></section>;
  if (!bundle) return <section className="archive-content"><div className="content-state" role="status"><LoaderCircle className="spin"/>Memuat metadata bendel…</div></section>;
  const setFromPage = (index: number) => {
    setSelected(index);
    const next = new URLSearchParams(location.search);
    const selectedPage = pages[index];
    if (selectedPage) next.set('page', String(selectedPage.id || selectedPage.canvas_id || selectedPage.page_order || index + 1));
    history.replaceState({}, '', `${location.pathname}?${next.toString()}`);
    document.querySelector('.reader')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const pageNav = (index: number) => { if (index >= 0 && index < pages.length) setFromPage(index); };
  const row = (label: string, value: unknown) => value == null || typeof value === 'string' && !value.trim() ? null : <div className="metadata-detail-row" key={label}><span>{label}</span><strong>{value as any}</strong></div>;
  const combined = (...values: unknown[]) => values.filter(value => value != null && String(value).trim() !== '').join(' · ');

  const isDreamseaBundle = String(bundle.turots_collections?.source_project || bundle.affiliation || '').toLowerCase().includes('dreamsea') || /^DS\b/i.test(bundle.bundle_code || '');
  const affiliateItems: AnyRecord[] = Array.isArray(bundle.affiliate_items) ? bundle.affiliate_items : [];

  const reader = <>
        {showAllPages && <p className="bundle-reader-note">Foto mengikuti urutan yang tersimpan di katalog. Foto yang belum dipetakan ke judul tetap ditampilkan.</p>}
        {pagesLoading ? <div className="reader-fallback" role="status">Memuat halaman…</div> : <Suspense fallback={<div className="reader-fallback" role="status">Menyiapkan pembaca IIIF…</div>}><IiifViewer imageUrl={page?.image_url} label={page?.folio_label || page?.label || `Foto nomor ${page?.page_order || selected + 1}`} currentPage={selected + 1} totalPages={pages.length} onNavigatePage={pageNav} onJumpPage={index => { pageNav(index); setJumpPage(''); }} jumpPage={jumpPage} setJumpPage={setJumpPage}/></Suspense>}
        {pages.length > 0 && <nav className="folio-strip" aria-label="Pilih halaman manuskrip">{pages.map((folio: AnyRecord, index: number) => <button key={folio.id || folio.canvas_id || index} aria-current={index === selected ? 'page' : undefined} className={index === selected ? 'folio-thumb selected' : 'folio-thumb'} onClick={() => setFromPage(index)}><img loading="lazy" src={folio.thumbnail_url || folio.image_url} alt=""/><span>{folio.folio_label || folio.label || `Foto nomor ${folio.page_order || index + 1}`}</span></button>)}</nav>}
  </>;

  const renderDreamseaBundleMetadata = () => (
    <section className="metadata-detail">
      <h2>Metadata bendel · Sumber DREAMSEA / HMML</h2>
      <div className="metadata-table">
        {row('DREAMSEA Project No.', bundle.dreamsea_identifier || bundle.bundle_code)}
        {row('MSID', bundle.msid || bundle.source_identifier)}
        {row('Institution', bundle.institution || 'HMML; DREAMSEA')}
        {row('Surrogate Format', bundle.surrogate_format || 'Digital')}
        {bundle.iiif_manifest_url && row('IIIF Manifest', <a href={bundle.iiif_manifest_url} target="_blank" rel="noreferrer">{bundle.iiif_manifest_url}</a>)}
        {bundle.affiliation_url && row('DREAMSEA Catalog URL', <a href={bundle.affiliation_url} target="_blank" rel="noreferrer">{bundle.affiliation_url}</a>)}
        {row('Country', bundle.country || 'Indonesia')}
        {row('City (Province)', bundle.city_province)}
        {row('Name of collection', bundle.affiliation || 'Pondok Pesantren Qomaruddin')}
        {row('Gallery Collection', bundle.turots_collections?.name)}
        {row('Right to Left?', bundle.right_to_left == null ? '' : bundle.right_to_left ? 'Yes' : 'No')}
        {row('Current Status', bundle.current_status)}
        {row('Catalog reference', bundle.catalog_reference)}
        {row('Subject matter', bundle.subject_matter)}
        {row('Copyist', bundle.copyist)}
        {row('Copying date in native date', bundle.copying_date_native)}
        {row('Copying date in Gregorian', bundle.copying_date_gregorian)}
        {row('Begin Year Date', bundle.begin_year_date)}
        {row('End Year Date', bundle.end_year_date)}
        {row('Place of copying', bundle.copying_place)}
        {row('Sponsor', bundle.sponsor)}
        {row('Script', bundle.bundle_script)}
        {row('Writing support', bundle.writing_support || bundle.paper_type)}
        {row('Watermark?', bundle.watermark)}
        {row('Countermark?', bundle.countermark)}
        {row('Manuscript cover?', bundle.cover)}
        {row('Binding?', bundle.binding)}
        {row('Manuscript cover dimension', bundle.cover_size)}
        {row('Manuscript paper dimension', bundle.paper_size)}
        {row('Text block dimension', bundle.dimensions)}
        {row('Number of pages', bundle.pages_text || (bundle.extent_pages ? `${bundle.extent_pages} pages` : ''))}
        {row('Number of blank pages', bundle.blank_pages_text || (bundle.blank_pages != null ? `${bundle.blank_pages} pages` : ''))}
        {row('Digital images (IIIF)', `${pages.length || bundle.extent_pages || 0} images`)}
        {row('Rubrication?', bundle.rubrication)}
        {row('Illumination?', bundle.illumination)}
        {row('Illustration?', bundle.illustration)}
        {row('Manuscript condition', bundle.physical_condition)}
        {row('Description of manuscript content', bundle.bundle_description)}
        {row('Colophon', bundle.colophon)}
        {row('Other notes', bundle.bundle_notes)}
        {affiliateItems.flatMap((it: AnyRecord) => {
          const n = it.item_no || 1;
          return [
            row(`Item ${n} - Title in Native script`, it.title_native),
            row(`Item ${n} - Title in Roman script`, it.title_roman),
            row(`Item ${n} - Title in English script`, it.title_english),
            row(`Item ${n} - Author`, it.author),
            row(`Item ${n} - Language`, it.language),
          ];
        })}
      </div>
    </section>
  );

  const renderEapOrNtBundleMetadata = () => {
    const isNt = /^NT\b/i.test(bundle.bundle_code || '') || String(bundle.turots_collections?.source_project || '').toLowerCase().includes('nahdlatut');
    const refCode = bundle.reference_code || bundle.source_identifier || bundle.bundle_code;
    const fileTitle = bundle.file_title || bundle.display_title || bundle.bundle_code;
    return (
      <section className="metadata-detail">
        <h2>{isNt ? 'Metadata bendel · Nahdlatut Turots' : 'File details · Endangered Archives Programme (British Library)'}</h2>
        <div className="metadata-table">
          {row('Variant titles', bundle.variant_titles || bundle.display_title)}
          {row('Creation date', bundle.creation_date || bundle.copying_date_native)}
          {row('Languages', bundle.languages)}
          {row('Scripts', bundle.bundle_script)}
          {row('Content type', bundle.content_type || 'Manuscript')}
          {row('Place of origin', bundle.place_of_origin || bundle.country || 'Indonesia')}
          {row('Originals information', bundle.originals_information || bundle.city_province || 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia')}
          {row('Reference', refCode)}
          {row('Level', bundle.archive_level || 'File')}
          {row('Extent', bundle.extent_text || String(bundle.extent_pages ?? pages.length ?? ''))}
          {row('Digital images (IIIF)', `${pages.length || bundle.extent_pages || 0} images`)}
          {row('Digitisation date', bundle.digitisation_date || '2024')}
          {row('This file is part of Project', bundle.project_name || (isNt ? 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin' : 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia'))}
          {row('Collection', bundle.collection_full_name || bundle.turots_collections?.name)}
          {row(`File ${refCode}`, fileTitle)}
          {row('Identifier', refCode)}
          {row('Title', fileTitle)}
          {row('Description', bundle.bundle_description)}
          {bundle.affiliation_url && row('Link to catalogue record', <a href={bundle.affiliation_url} target="_blank" rel="noreferrer">View the catalogue record ({bundle.affiliation_url})</a>)}
          {row('Citation', bundle.citation_text)}
          {row('Digitised by', bundle.digitised_by || "Ma'had Jamiah Universitas Qomaruddin")}
          {row('Digitisation funded by', bundle.digitisation_funded_by)}
          {row('Attribution', bundle.attribution_license)}
        </div>
      </section>
    );
  };

  return <section className="detail-page detail-v1">
    <nav className="detail-breadcrumb" aria-label="Breadcrumb"><a href={catalogReturn} onClick={event => { if (!navigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(catalogReturn); }}>Kembali ke hasil katalog</a><span aria-hidden="true">/</span>{bundleMode ? 'Bendel' : unit.category_primary || 'Manuskrip'}<span aria-hidden="true">/</span>{bundle.bundle_code}</nav>
    <header className="detail-hero"><div><p className="eyebrow">{bundleMode ? bundle.bundle_code : combined(unit.record_no, unit.display_id || bundle.bundle_code)} · {bundle.turots_collections?.name || 'Koleksi manuskrip'}</p><h1 dir="auto">{bundleMode ? bundle.display_title || `Bendel ${bundle.bundle_code}` : unit.title_original || bundle.display_title}</h1>{bundleReaderMode ? <p className="latin">{`${pages.length} foto digital tersimpan`}{lastFolio ? ` · folio terakhir ${lastFolio}` : ''}</p> : !bundleMode && unit.title_latin && <p className="latin">{unit.title_latin}</p>}</div></header>
      {!bundleMode && unit?.id && <p><a href={`https://sanad-131.pages.dev/?unit=${encodeURIComponent(unit.id)}`} target="_blank" rel="noreferrer">Lihat publikasi Sanad yang merujuk salinan ini</a></p>}
    <div className={`detail-layout${bundleMode ? ' bundle-landing-layout' : ''}`}>
      <main className="detail-main">
        {bundleMode ? <section className="bundle-landing">
          {reader}
          {isDreamseaBundle ? renderDreamseaBundleMetadata() : renderEapOrNtBundleMetadata()}
          <section className="metadata-detail bundle-items"><h2>Judul di dalam bendel (Kurasi Turots Qomaruddin)</h2><p>{(bundle.turots_text_units || []).length} item judul terdaftar dalam bendel ini.</p><div className="bundle-title-list">{(bundle.turots_text_units || []).map((item: AnyRecord) => {
            const slug = buildCatalogSlugMap((bundle.turots_text_units || []).map((textUnit: AnyRecord) => ({ b: bundle, u: textUnit }))).get(item.id) || item.display_id;
            const target = `/katalog/${encodeURIComponent(slug)}?unit=${encodeURIComponent(item.id)}&bundle=${encodeURIComponent(bundle.id)}&returnTo=${encodeURIComponent(catalogReturn)}`;
            const rangeBadge = item.page_ranges_label || item.folio_separator || (item.folio_start ? `${item.folio_start}${item.folio_end && item.folio_end !== item.folio_start ? `–${item.folio_end}` : ''}` : 'Halaman belum dipetakan');
            return <a className="bundle-title-item" key={item.id} href={target}><span className="bundle-title-sequence">{item.record_no ? `${item.record_no} · ` : ''}Item {item.sequence_no} ({item.display_id})</span><strong dir="auto">{item.title_original || item.display_id}</strong>{item.title_latin && <em>{item.title_latin}</em>}<span>{item.category_primary || 'Belum dikategorikan'} · {rangeBadge}</span><b>Buka fokus judul →</b></a>;
          })}</div></section>
        </section> : <>
        {reader}
        <section className="metadata-detail"><h2>Metadata judul</h2>{metadataGroups.map(([group, fields]) => { const values = fields.map(([label,key]) => ({label,key,value:displayMetadataValue(key,unit[key])})).filter(field => field.value); return values.length ? <details className="metadata-group" key={group} open={group === 'Identitas judul'}><summary>{group}</summary><div className="metadata-table">{values.map(({label,key,value}) => <div className="metadata-detail-row" key={key}><span>{label}</span><strong>{value}</strong></div>)}</div></details> : null; })}
          <details className="metadata-group bundle-metadata"><summary>Metadata bendel induk ({bundle.bundle_code})</summary><div className="metadata-table">
            {row('URL afiliasi / cadangan', bundle.affiliation_url ? <a href={bundle.affiliation_url} target="_blank" rel="noreferrer">Buka sumber cadangan</a> : '')}{row('Kode bendel', bundle.bundle_code)}{row('Kover dan kondisi', combined(bundle.cover, bundle.physical_condition))}
            {row('Dimensi dan ukuran kertas', combined(bundle.dimensions, bundle.paper_size))}{row('Jilid / jenis kertas', combined(bundle.binding, bundle.paper_type))}
            {row('Watermark / countermark', combined(bundle.watermark, bundle.countermark))}{row('Kelengkapan fisik', bundle.completeness)}
            {row('Jumlah halaman bendel', bundle.pages_text || bundle.extent_text || bundle.extent_pages)}{row('Koleksi / proyek', combined(bundle.turots_collections?.name, bundle.turots_collections?.source_project || bundle.affiliation))}
            {row('Catatan bendel', bundle.bundle_notes)}
          </div></details>
          {provenance.length > 0 && <details className="metadata-group"><summary>Asal-usul data</summary>{provenance.map((item: AnyRecord, index: number) => <p key={`${item.source}-${index}`}>{item.source}: {item.value} {item.note && `— ${item.note}`}</p>)}</details>}
        </section>
        </>}
      </main>
      {(!bundleMode || bundleReaderMode) && <aside className={`detail-sidebar${bundleReaderMode ? ' bundle-reader-sidebar' : ''}`}><section><h2>Identitas ringkas</h2>{row('NO Turots', activeReaderUnit.record_no)}{row('ID judul', activeReaderUnit.display_id)}{row('Kode bendel', bundle.bundle_code)}{row('Hlm / Folio', bundleReaderMode ? page?.folio_label || page?.label : activeReaderUnit.page_ranges_label || combined(activeReaderUnit.folio_start, activeReaderUnit.folio_end !== activeReaderUnit.folio_start ? activeReaderUnit.folio_end : ''))}{row('Kategori', activeReaderUnit.category_primary)}{row('Koleksi', bundle.turots_collections?.name)}</section>{(activeReaderUnit.description || (bundleReaderMode && bundle.bundle_description)) && <section><h2>Deskripsi</h2><p>{activeReaderUnit.description || bundle.bundle_description}</p></section>}{bundleReaderMode ? <a className="research-link" href={`/bendel/${encodeURIComponent(bundle.bundle_code)}?returnTo=${encodeURIComponent(catalogReturn)}`}>Metadata bendel {bundle.bundle_code} <span aria-hidden="true">→</span></a> : <a className="research-link" href={`/bendel/${encodeURIComponent(bundle.bundle_code)}?returnTo=${encodeURIComponent(catalogReturn)}`}>Lihat seluruh bendel {bundle.display_title || bundle.bundle_code} <span aria-hidden="true">→</span></a>}{bundle.affiliation_url && <a className="research-link" href={bundle.affiliation_url} target="_blank" rel="noreferrer">Sumber afiliasi <span aria-hidden="true">↗</span></a>}</aside>}
    </div>
  </section>;
}
