import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { supabase } from './lib/supabase';
import { unpackNotesAndProvenance } from './metadataModel';
import './detail.css';

const IiifViewer = lazy(() => import('./IiifViewer'));

type AnyRecord = Record<string, any>;
const slugify = (value: string) => value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'manuskrip';
const metadataGroups: Array<[string, Array<[string, string]>]> = [
  ['Identitas judul', [['Judul asli', 'title_original'], ['Judul dari tim', 'title_from_team'], ['Kategori utama', 'category_primary'], ['Status metadata', 'metadata_status']]],
  ['Klasifikasi dan isi', [['Klasifikasi 1', 'scholarly_classification_1'], ['Klasifikasi 2', 'scholarly_classification_2'], ['Klasifikasi 3', 'scholarly_classification_3'], ['Deskripsi umum', 'description'], ['Hlm pemisah proyek', 'folio_separator'], ['Kata kunci', 'keywords'], ['Glosarium', 'glossary']]],
  ['Kepengarangan dan asal', [['Pengarang', 'author'], ['Penyalin', 'scribe'], ['Tahun di teks', 'year_original'], ['Konversi Masehi', 'year_masehi'], ['Lokasi penyalinan', 'copying_location'], ['Asal-usul naskah', 'manuscript_origin'], ['Bahasa', 'language'], ['Aksara', 'script']]],
  ['Kondisi dan catatan', [['Catatan pinggir / marginal', 'marginal_notes'], ['Catatan makna', 'meaning_notes'], ['Kolofon', 'colophon'], ['Kondisi bagian teks', 'physical_condition'], ['Keterbacaan', 'readability'], ['Kelengkapan teks', 'completeness'], ['Catatan', 'notes'], ['Manuskrip terkait', 'related_manuscripts'], ['Tokoh terkait', 'related_persons']]],
];

export default function DetailV1({ keyValue }: { keyValue: string; key?: string }) {
  const [unitId, setUnitId] = useState(new URLSearchParams(location.search).get('unit') || '');
  const [bundle, setBundle] = useState<AnyRecord | null>(null);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setBundle(null); setError(''); setSelected(0);
    void (async () => {
      if (!supabase) throw new Error('Koneksi katalog belum dikonfigurasi.');
      const { data, error: requestError } = await supabase.from('turots_bundles')
        .select('*,turots_collections(*),turots_text_units(*),turots_pages(*)')
        .eq('publication_status', 'published');
      if (requestError) throw requestError;
      const matchesUnit = (unit: AnyRecord) => unit.title_original === keyValue || unit.title_curatorial === keyValue || slugify(unit.title_original || unit.display_id || unit.id) === keyValue || unit.id === keyValue;
      const found = (data || []).find((item: AnyRecord) => item.id === keyValue || item.bundle_code === keyValue || item.turots_text_units?.some(matchesUnit) || slugify(item.display_title || item.bundle_code) === keyValue);
      if (!found) throw new Error('Katalog tidak ditemukan.');
      const matchedUnit = found.turots_text_units?.find(matchesUnit);
      if (active) { setUnitId(matchedUnit?.id || new URLSearchParams(location.search).get('unit') || found.turots_text_units?.[0]?.id || ''); setBundle(found); }
    })().catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Katalog belum dapat dimuat.'); });
    return () => { active = false; };
  }, [keyValue]);

  const unit = bundle?.turots_text_units?.find((item: AnyRecord) => item.id === unitId) || bundle?.turots_text_units?.[0] || {};
  const pages = useMemo(() => [...(bundle?.turots_pages || [])].filter((item: AnyRecord) => item.text_unit_id === unit.id).sort((left: AnyRecord, right: AnyRecord) => left.page_order - right.page_order), [bundle, unit.id]);
  const page = pages[selected];
  const provenance = unpackNotesAndProvenance(unit.notes).provenance;
  const selectUnit = (nextUnitId: string) => {
    setUnitId(nextUnitId); setSelected(0);
    const next = new URLSearchParams(location.search); next.set('unit', nextUnitId);
    history.replaceState({}, '', `${location.pathname}?${next.toString()}`);
  };

  if (error) return <section className="archive-content"><div className="content-state" role="alert"><h1>{error}</h1><a className="text-action" href="/katalog">Kembali ke katalog</a></div></section>;
  if (!bundle) return <section className="archive-content"><div className="content-state" role="status"><LoaderCircle className="spin"/>Memuat metadata bendel…</div></section>;
  const setFromPage = (index: number) => { setSelected(index); document.querySelector('.reader')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };

  return <section className="detail-page detail-v1">
    <div className="detail-breadcrumb"><a href="/katalog">Katalog</a><span aria-hidden="true">/</span>{unit.category_primary || 'Manuskrip'}<span aria-hidden="true">/</span>{bundle.bundle_code}</div>
    <header className="detail-hero"><div><p className="eyebrow">{unit.display_id || bundle.bundle_code} · {bundle.turots_collections?.name || 'Koleksi manuskrip'}</p><h1 dir="auto">{unit.title_original || bundle.display_title}</h1>{unit.title_latin && <p className="latin">{unit.title_latin}</p>}</div><a className="source-button" href={bundle.item_url || `https://archive.org/details/${bundle.archive_identifier}`} target="_blank" rel="noreferrer">Buka sumber digital <span aria-hidden="true">↗</span></a></header>
    <div className="detail-layout">
      <main className="detail-main">
        {(bundle.turots_text_units || []).length > 1 && <label className="unit-selector">Judul dalam bendel<select value={unit.id || ''} onChange={(event) => selectUnit(event.target.value)}>{bundle.turots_text_units.map((item: AnyRecord) => <option key={item.id} value={item.id}>{item.display_id} · {item.title_original || 'Tanpa judul'}</option>)}</select></label>}
        <Suspense fallback={<div className="reader-fallback" role="status">Menyiapkan pembaca IIIF…</div>}><IiifViewer imageUrl={page?.image_url} label={page?.folio_label || page?.label || 'Halaman belum tersedia'} /></Suspense>
        {pages.length > 0 && <nav className="folio-strip" aria-label="Pilih halaman manuskrip">{pages.map((folio: AnyRecord, index: number) => <button key={folio.id} aria-current={index === selected ? 'page' : undefined} className={index === selected ? 'folio-thumb selected' : 'folio-thumb'} onClick={() => setFromPage(index)}><img loading="lazy" src={folio.thumbnail_url || folio.image_url} alt=""/><span>{folio.folio_label || folio.label || `Halaman ${index + 1}`}</span></button>)}</nav>}
        <section className="metadata-detail"><h2>Metadata judul</h2>{metadataGroups.map(([group, fields]) => <details className="metadata-group" key={group} open={group === 'Identitas judul'}><summary>{group}</summary><div className="metadata-table">{fields.map(([label, key]) => <div className="metadata-detail-row" key={key}><span>{label}</span><strong>{unit[key] || 'Belum diisi'}</strong></div>)}</div></details>)}
          <details className="metadata-group bundle-metadata"><summary>Metadata bendel induk</summary><div className="metadata-table">
            <div className="metadata-detail-row"><span>Identifier Archive</span><strong>{bundle.archive_identifier || '—'}</strong></div>
            <div className="metadata-detail-row"><span>Manifest IIIF</span><strong><a href={bundle.iiif_manifest_url || `https://iiif.archive.org/iiif/${bundle.archive_identifier}/manifest.json`} target="_blank" rel="noreferrer">Buka manifest</a></strong></div>
            <div className="metadata-detail-row"><span>URL afiliasi / cadangan</span><strong>{bundle.affiliation_url ? <a href={bundle.affiliation_url} target="_blank" rel="noreferrer">Buka sumber cadangan</a> : 'Belum diisi'}</strong></div>
            <div className="metadata-detail-row"><span>Kode bendel</span><strong>{bundle.bundle_code}</strong></div><div className="metadata-detail-row"><span>Kover dan kondisi</span><strong>{bundle.cover || 'Belum dicatat'} · {bundle.physical_condition || 'Belum dicatat'}</strong></div>
            <div className="metadata-detail-row"><span>Dimensi dan ukuran kertas</span><strong>{[bundle.dimensions, bundle.paper_size].filter(Boolean).join(' · ') || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Jilid / jenis kertas</span><strong>{[bundle.binding, bundle.paper_type].filter(Boolean).join(' · ') || 'Belum dicatat'}</strong></div>
            <div className="metadata-detail-row"><span>Watermark / countermark</span><strong>{[bundle.watermark, bundle.countermark].filter(Boolean).join(' / ') || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Kelengkapan fisik</span><strong>{bundle.completeness || 'Belum diperiksa'}</strong></div>
            <div className="metadata-detail-row"><span>Jumlah halaman bendel</span><strong>{bundle.extent_pages || 'Belum dicatat'}</strong></div><div className="metadata-detail-row"><span>Koleksi / proyek</span><strong>{bundle.turots_collections?.name || '—'} · {bundle.turots_collections?.source_project || bundle.affiliation || '—'}</strong></div>
            <div className="metadata-detail-row"><span>Catatan bendel</span><strong>{bundle.bundle_notes || 'Belum ada catatan'}</strong></div>
          </div></details>
          {provenance.length > 0 && <details className="metadata-group"><summary>Asal-usul data</summary>{provenance.map((item: AnyRecord, index: number) => <p key={`${item.source}-${index}`}>{item.source}: {item.value} {item.note && `— ${item.note}`}</p>)}</details>}
        </section>
      </main>
      <aside className="detail-sidebar"><section><h2>Identitas ringkas</h2><div className="metadata-row"><span>ID judul</span><strong>{unit.display_id || '—'}</strong></div><div className="metadata-row"><span>Kode bendel</span><strong>{bundle.bundle_code || '—'}</strong></div><div className="metadata-row"><span>Folio</span><strong>{unit.folio_start || '—'}{unit.folio_end && unit.folio_end !== unit.folio_start ? `–${unit.folio_end}` : ''}</strong></div><div className="metadata-row"><span>Kategori</span><strong>{unit.category_primary || '—'}</strong></div><div className="metadata-row"><span>Koleksi</span><strong>{bundle.turots_collections?.name || '—'}</strong></div></section><section><h2>Deskripsi</h2><p>{unit.description || 'Deskripsi kuratorial belum tersedia.'}</p></section><a className="research-link" href={bundle.affiliation_url || bundle.item_url} target="_blank" rel="noreferrer">Sumber manuskrip <span aria-hidden="true">↗</span></a></aside>
    </div>
  </section>;
}
