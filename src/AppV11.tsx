import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BookOpen, Heart, Home, Info, Mail, Menu, Megaphone, Newspaper, User, X, HandHeart } from 'lucide-react';
import { listPublishedCatalog } from './services/turotsRepository';
import { supabaseConfigured } from './lib/supabase';
import { CATALOG_CATEGORIES } from './catalogTaxonomy';
import { buildCatalogSlugMap } from './catalogSlugs';
import DetailV1 from './DetailV1';
import GuestbookPage from './GuestbookPage';
import { PublicContentPage, StaticLandingPage } from './PublicContentPages';
import './archive.css';
import './ux-overrides.css';

const AdminV1 = lazy(() => import('./AdminV1'));

type CatalogRow = { b: any; u: any; id: string };
const primaryLinks = [
  ['/', 'Beranda', Home], ['/katalog', 'Katalog', BookOpen], ['/artikel', 'Artikel', Newspaper], ['/buku-tamu', 'Buku Tamu', User],
] as const;
const moreLinks = [
  ['/informasi', 'Informasi', Info], ['/pengumuman', 'Pengumuman', Megaphone], ['/profil', 'Profil', User], ['/donasi', 'Donasi', HandHeart], ['/kontak', 'Kontak Kami', Mail], ['/favorit', 'Favorit', Heart],
] as const;
export default function AppV11() {
  const [url, setUrl] = useState(location.pathname + location.search);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { const stored = JSON.parse(localStorage.getItem('turots-favorites') || '[]'); return Array.isArray(stored) ? stored.filter((item) => typeof item === 'string') : []; }
    catch { return []; }
  });
  const [notice, setNotice] = useState('');
  const currentPath = url.split('?')[0];
  const params = new URLSearchParams(url.split('?')[1] || '');
  const isAdmin = currentPath === '/admin' || currentPath.startsWith('/admin/');

  const navigate = (to: string) => {
    history.pushState({}, '', to);
    setUrl(to);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const handlePopState = () => { setUrl(location.pathname + location.search); setMenuOpen(false); };
    addEventListener('popstate', handlePopState);
    return () => removeEventListener('popstate', handlePopState);
  }, []);

  const loadCatalog = useCallback(() => {
    setLoading(true); setError('');
    if (!supabaseConfigured) { setError('Koneksi katalog belum dikonfigurasi.'); setLoading(false); return; }
    void listPublishedCatalog().then(setItems).catch(() => setError('Katalog belum dapat dimuat. Periksa koneksi lalu coba lagi.')).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/katalog' || currentPath === '/favorit') loadCatalog();
  }, [currentPath, loadCatalog]);

  const changeFilter = (key: string, value: string) => {
    const next = new URLSearchParams(location.search);
    value ? next.set(key, value) : next.delete(key);
    next.delete('halaman');
    const target = currentPath + (next.size ? `?${next.toString()}` : '');
    history.replaceState({}, '', target); setUrl(target);
  };
  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    try { localStorage.setItem('turots-favorites', JSON.stringify(next)); setFavorites(next); }
    catch { setNotice('Favorit tidak dapat disimpan di browser ini.'); }
  };

  const rows: CatalogRow[] = items.flatMap((bundle) => (bundle.turots_text_units || []).map((unit: any) => ({ b: bundle, u: unit, id: unit.id || bundle.id })));
  const catalogSlugs = buildCatalogSlugMap(rows);
  const searchTerm = (params.get('q') || '').trim().toLocaleLowerCase();
  const splitValues = (value: unknown) => String(value || '').split(/[,;|]/).map((part) => part.trim()).filter(Boolean);
  const visible = rows.filter(({ b, u, id }) =>
    (currentPath !== '/favorit' || favorites.includes(id)) &&
    (!searchTerm || [u.title_original, u.title_latin, u.title_curatorial, u.description, u.author, u.scribe, u.related_persons, u.display_id, b.bundle_code].join(' ').toLocaleLowerCase().includes(searchTerm)) &&
    (!params.get('kategori') || u.category_primary === params.get('kategori')) &&
    (!params.get('koleksi') || b.turots_collections?.name === params.get('koleksi')) &&
    (!params.get('bahasa') || splitValues(u.language).some((value) => value.toLocaleLowerCase() === params.get('bahasa')?.toLocaleLowerCase())) &&
    (!params.get('aksara') || splitValues(u.script).some((value) => value.toLocaleLowerCase() === params.get('aksara')?.toLocaleLowerCase())) &&
    (!params.get('kelengkapan') || String(u.completeness || '').toLocaleLowerCase() === params.get('kelengkapan')?.toLocaleLowerCase()) &&
    (!params.get('tokoh') || [u.author, u.scribe, u.related_persons].join(' ').toLocaleLowerCase().includes((params.get('tokoh') || '').toLocaleLowerCase())) &&
    (!params.get('status') || u.metadata_status === params.get('status')),
  );
  visible.sort((left, right) => params.get('urut') === 'judul'
    ? String(left.u.title_latin || left.u.title_original || '').localeCompare(String(right.u.title_latin || right.u.title_original || ''))
    : String(right.b.updated_at).localeCompare(String(left.b.updated_at)));
  const pageCount = Math.ceil(visible.length / 12);
  const requestedPage = Number(params.get('halaman'));
  const page = Math.min(Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1), Math.max(1, pageCount));

  const cards = (data: CatalogRow[]) => <div className="archive-grid">{data.map(({ b, u, id }) => {
    const thumbnail = [...(b.turots_pages || [])].filter((folio: any) => folio.text_unit_id === u.id).sort((left: any, right: any) => left.page_order - right.page_order)[0]?.thumbnail_url;
    const target = `/katalog/${encodeURIComponent(catalogSlugs.get(id) || u.title_original || b.bundle_code)}?unit=${encodeURIComponent(id)}&bundle=${encodeURIComponent(b.id)}`;
    return <article className="archive-card" key={id}>
      <button className="favorite" aria-label={favorites.includes(id) ? 'Hapus favorit' : 'Tambah favorit'} aria-pressed={favorites.includes(id)} onClick={() => toggleFavorite(id)}><Heart size={19} fill={favorites.includes(id) ? 'currentColor' : 'none'}/></button>
      <a href={target} onClick={(event) => { event.preventDefault(); navigate(target); }}><div className="archive-cover">{thumbnail ? <img loading="lazy" src={thumbnail} alt={`Folio ${u.folio_start || ''}`}/> : <BookOpen size={58}/>}</div>
        <div className="archive-copy"><small>{u.category_primary || 'Belum dikategorikan'} · {b.bundle_code} · {u.folio_start}{u.folio_end && u.folio_end !== u.folio_start ? `–${u.folio_end}` : ''}</small><h3 dir="auto">{u.title_original || b.display_title}</h3><p className="latin">{u.title_latin}</p><p>{u.description || 'Deskripsi kuratorial belum tersedia.'}</p><footer>{b.turots_collections?.name}<span>Lihat judul <span aria-hidden="true">→</span></span></footer></div></a>
    </article>;
  })}</div>;

  const loadingState = loading ? <p role="status">Memuat koleksi…</p> : error ? <div role="alert" className="empty">{error}<button onClick={loadCatalog}>Coba lagi</button></div> : null;
  let pageContent;
  const contentType = currentPath.startsWith('/artikel/') ? 'article' : currentPath.startsWith('/informasi/') ? 'information' : currentPath.startsWith('/pengumuman/') ? 'announcement' : null;
  if (isAdmin) pageContent = <Suspense fallback={<main className="archive-content"><div className="content-state" role="status">Membuka dashboard pengelola…</div></main>}><AdminV1 path={currentPath} navigate={navigate}/></Suspense>;
  else if (currentPath === '/') pageContent = <main className="archive-content">
    <section className="archive-hero"><div><p className="eyebrow">Merawat warisan intelektual</p><h1>Jejak ilmu.<br/><em>Terbuka untuk Anda.</em></h1><p>Jelajahi manuskrip dan khazanah pesantren. Temukan pengetahuan yang terus hidup dari halaman ke halaman.</p><button className="primary-action" onClick={() => navigate('/katalog')}>Jelajahi katalog <BookOpen size={18}/></button></div><div className="heritage-art"><span lang="ar" dir="rtl">التراث أمانة</span><p>Turāth adalah amanah</p><BookOpen size={74} strokeWidth={0.8}/></div></section>
    <div className="archive-stats"><span><b>{items.length}</b>Bendel digital</span><span><b>{rows.length}</b>Judul teks</span><span><b>{CATALOG_CATEGORIES.length}</b>Kategori ilmu</span></div>
    <div className="section-heading"><h2>Eksplorasi koleksi</h2><a href="/katalog" onClick={(event) => { event.preventDefault(); navigate('/katalog'); }}>Lihat semua <span aria-hidden="true">→</span></a></div>{loadingState || cards(rows.slice(0, 3))}
  </main>;
  else if (currentPath === '/katalog' || currentPath === '/favorit') pageContent = <main className="archive-content catalog-page">
    <p className="eyebrow">Koleksi digital</p><h1>{currentPath === '/favorit' ? 'Manuskrip favorit' : 'Katalog judul'}</h1><p className="page-intro">{currentPath === '/favorit' ? 'Daftar judul yang Anda simpan di browser ini.' : 'Telusuri judul teks dalam koleksi manuskrip pesantren.'}</p>
    {currentPath === '/katalog' && <><div className="archive-search"><label className="search-input"><BookOpen size={19}/><input aria-label="Cari manuskrip" placeholder="Cari judul, kode, pengarang, penyalin, tokoh…" value={params.get('q') || ''} onChange={(event) => changeFilter('q', event.target.value)}/></label><button className="secondary-action" aria-expanded={filters} onClick={() => setFilters(!filters)}>Filter katalog</button></div>
      <div className="archive-chips" aria-label="Filter kategori">{['', ...CATALOG_CATEGORIES].map((category) => <button key={category} aria-pressed={(params.get('kategori') || '') === category} onClick={() => changeFilter('kategori', category)}>{category || 'Semua kategori'}</button>)}</div>
      {filters && <section className="filter-panel" aria-label="Filter katalog">{[['koleksi', 'Koleksi', rows.map((row) => row.b.turots_collections?.name)], ['bahasa', 'Bahasa', rows.flatMap((row) => splitValues(row.u.language))], ['aksara', 'Aksara', rows.flatMap((row) => splitValues(row.u.script))], ['kelengkapan', 'Kelengkapan teks', rows.map((row) => row.u.completeness)], ['tokoh', 'Tokoh', rows.flatMap((row) => [row.u.author, row.u.scribe, ...splitValues(row.u.related_persons)])], ['status', 'Status metadata', rows.map((row) => row.u.metadata_status)]].map(([key, label, values]: any) => <label key={key}>{label}<select value={params.get(key) || ''} onChange={(event) => changeFilter(key, event.target.value)}><option value="">Semua</option>{[...new Set(values.map((value: any) => String(value || '').trim()).filter(Boolean))].map((value: any) => <option key={value} value={value}>{value}</option>)}</select></label>)}<button className="text-action" onClick={() => navigate('/katalog')}>Hapus semua filter</button></section>}
    </>}
    <div className="section-heading"><p aria-live="polite">{visible.length} judul teks ditemukan</p><label>Urutkan<select value={params.get('urut') || ''} onChange={(event) => changeFilter('urut', event.target.value)}><option value="">Terbaru</option><option value="judul">Judul A–Z</option></select></label></div>
    {loadingState || (visible.length ? cards(visible.slice((page - 1) * 12, page * 12)) : <div className="empty"><BookOpen/><h2>{currentPath === '/favorit' ? 'Belum ada favorit' : 'Belum ada judul yang cocok'}</h2><p>{currentPath === '/favorit' ? 'Ketuk ikon hati pada kartu manuskrip untuk menyimpannya.' : 'Coba kata pencarian atau pilihan filter yang lain.'}</p></div>)}
    {pageCount > 1 && <nav className="pagination" aria-label="Halaman katalog">{Array.from({ length: pageCount }, (_, index) => <button key={index} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => { const next = new URLSearchParams(params); next.set('halaman', String(index + 1)); navigate(`/katalog?${next.toString()}`); }}>{index + 1}</button>)}</nav>}
  </main>;
  else if (currentPath.startsWith('/katalog/')) pageContent = <DetailV1 key={url} keyValue={decodeURIComponent(currentPath.split('/')[2])}/>;
  else if (contentType) {
    const type = contentType;
    const contentSlug = currentPath.split('/').slice(2).join('/') || undefined;
    pageContent = <PublicContentPage type={type} slug={contentSlug} navigate={navigate}/>;
  }
  else if (currentPath === '/artikel' || currentPath === '/informasi' || currentPath === '/pengumuman') pageContent = <PublicContentPage type={currentPath === '/artikel' ? 'article' : currentPath === '/informasi' ? 'information' : 'announcement'} navigate={navigate}/>;
  else if (currentPath === '/buku-tamu') pageContent = <GuestbookPage/>;
  else if (currentPath === '/profil') pageContent = <StaticLandingPage page="profile"/>;
  else if (currentPath === '/donasi') pageContent = <StaticLandingPage page="donation"/>;
  else if (currentPath === '/kontak') pageContent = <StaticLandingPage page="contact"/>;
  else pageContent = <main className="archive-content"><div className="empty"><h1>Halaman tidak ditemukan</h1><button className="primary-action" onClick={() => navigate('/')}>Kembali ke beranda</button></div></main>;

  const renderLink = ([target, label, Icon]: readonly [string, string, typeof Home]) => <a key={target} href={target} aria-current={currentPath === target ? 'page' : undefined} onClick={(event) => { event.preventDefault(); navigate(target); }}><Icon size={19}/><span>{label}</span></a>;
  return <div className={`archive-app${isAdmin ? ' admin-route' : ''}`}>
    {!isAdmin && <aside className="archive-nav"><a className="archive-brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}><BookOpen size={26}/><span><small>GALERI MANUSKRIP</small><strong>SAMPURNAN</strong></span></a>
      <nav className="archive-primary-nav" aria-label="Navigasi utama">{primaryLinks.map(renderLink)}</nav>
      <nav className="archive-secondary-nav" aria-label="Halaman lainnya">{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => { event.preventDefault(); navigate('/admin'); }}><User size={19}/><span>Admin</span></a></nav>
      <div className="nav-bottom"><p>Warisan ilmu,<br/>untuk generasi mendatang.</p><small>Galeri Manuskrip Sampurnan · Qomaruddin</small></div>
    </aside>}
    {!isAdmin && <nav className="mobile-nav" aria-label="Navigasi ponsel">{primaryLinks.map(renderLink)}<button aria-expanded={menuOpen} aria-controls="mobile-more-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}<span>{menuOpen ? 'Tutup' : 'Menu'}</span></button></nav>}
    {menuOpen && !isAdmin && <div id="mobile-more-menu" className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}><nav className="mobile-more-menu" role="dialog" aria-modal="true" aria-label="Halaman lainnya" onClick={(event) => event.stopPropagation()}><div className="mobile-menu-heading"><strong>Jelajahi Sampurnan</strong><button aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><X size={20}/></button></div>{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => { event.preventDefault(); navigate('/admin'); }}><User size={19}/><span>Admin</span></a></nav></div>}
    <div className="archive-body">{notice && <p role="alert">{notice}</p>}{pageContent}
      {!isAdmin && <footer className="archive-footer"><div><strong>Sampurnan</strong><span>Merawat naskah, merawat pengetahuan.</span></div><nav aria-label="Tautan footer">{[...primaryLinks, ...moreLinks].map(([path, label]) => <a key={path} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{label}</a>)}</nav><small>Galeri Manuskrip Sampurnan · Universitas Qomaruddin</small></footer>}
    </div>
  </div>;
}
