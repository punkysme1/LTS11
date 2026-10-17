import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { BookOpen, Eye, Home, Info, Mail, Menu, Megaphone, Newspaper, User, X, HandHeart } from 'lucide-react';
import { listMonthlyPopularViews, listPublicCatalogFilterOptions, searchPublishedCatalog } from './services/turotsRepository';
import { supabaseConfigured } from './lib/supabase';
import { CATALOG_CATEGORIES } from './catalogTaxonomy';
import { slugify } from './catalogSlugs';
import DetailV1 from './DetailV1';
import GuestbookPage from './GuestbookPage';
import { PublicContentPage, StaticLandingPage } from './PublicContentPages';
import './archive.css';
import './ux-overrides.css';

const AdminV1 = lazy(() => import('./AdminV1'));

type CatalogRow = { b: any; u: any; id: string; kind: 'bundle' | 'title' };
const primaryLinks = [
  ['/', 'Beranda', Home], ['/katalog', 'Katalog', BookOpen], ['/artikel', 'Artikel', Newspaper], ['/buku-tamu', 'Buku Tamu', User],
] as const;
const moreLinks = [
  ['/informasi', 'Informasi', Info], ['/pengumuman', 'Pengumuman', Megaphone], ['/profil', 'Profil', User], ['/donasi', 'Donasi', HandHeart], ['/kontak', 'Kontak Kami', Mail], ['/populer', 'Terpopuler', Eye],
] as const;
export default function AppV11() {
  const [url, setUrl] = useState(location.pathname + location.search);
  const [items, setItems] = useState<any[]>([]);
  const [catalogTotal, setCatalogTotal] = useState(0);
  const [filterOptions, setFilterOptions] = useState<any>({ collections: [], languages: [], scripts: [], completeness: [], persons: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popular, setPopular] = useState<any[]>([]);
  const [notice, setNotice] = useState('');
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLElement>(null);
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
  useEffect(() => {
    if (!menuOpen) { menuTrigger.current?.focus(); return; }
    const first = menuDialog.current?.querySelector<HTMLElement>('a,button');
    first?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); return; }
      if (event.key !== 'Tab' || !menuDialog.current) return;
      const focusable = [...menuDialog.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')];
      if (!focusable.length) return;
      const firstElement = focusable[0]; const lastElement = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) { event.preventDefault(); lastElement.focus(); }
      else if (!event.shiftKey && document.activeElement === lastElement) { event.preventDefault(); firstElement.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const handleInternalLink = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(target);
  };

  const loadCatalog = useCallback(() => {
    setLoading(true); setError('');
    if (!supabaseConfigured) { setError('Koneksi katalog belum dikonfigurasi.'); setLoading(false); return; }
    const query = new URLSearchParams(location.search);
    void searchPublishedCatalog({
      query: query.get('q') || '', category: query.get('kategori') || '', collection: query.get('koleksi') || '',
      language: query.get('bahasa') || '', script: query.get('aksara') || '', completeness: query.get('kelengkapan') || '',
      person: query.get('tokoh') || '', status: query.get('status') || '', sort: query.get('urut') || 'newest',
      offset: Math.max(0, Number(query.get('halaman') || '1') - 1) * 12, limit: currentPath === '/' ? 3 : 12,
    }).then(({ rows, total }) => { setItems(rows); setCatalogTotal(total); })
      .catch((reason: unknown) => setError(reason instanceof Error ? `Katalog belum dapat dimuat: ${reason.message}` : 'Katalog belum dapat dimuat. Periksa koneksi lalu coba lagi.'))
      .finally(() => setLoading(false));
  }, [currentPath, url]);
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/katalog' || currentPath === '/favorit') loadCatalog();
  }, [currentPath, loadCatalog]);
  useEffect(() => {
    if (currentPath !== '/katalog') return;
    let active = true;
    void listPublicCatalogFilterOptions().then(options => { if (active) setFilterOptions(options); }).catch(() => {});
    return () => { active = false; };
  }, [currentPath]);
  useEffect(() => {
    if (currentPath !== '/' && currentPath !== '/populer') return;
    let active = true;
    void listMonthlyPopularViews().then((rows) => { if (active) setPopular(rows.map((row:any) => ({...row,slug:slugify(row.title_original||row.display_id||row.bundle_code||'manuskrip')}))); }).catch(() => { if (active) setPopular([]); });
    return () => { active = false; };
  }, [currentPath]);

  const changeFilter = (key: string, value: string) => {
    const next = new URLSearchParams(location.search);
    value ? next.set(key, value) : next.delete(key);
    next.delete('halaman');
    const target = currentPath + (next.size ? `?${next.toString()}` : '');
    history.replaceState({}, '', target); setUrl(target);
  };
  const visible = items as CatalogRow[];
  const titleRows = visible.filter(row => row.kind === 'title');
  const rows = visible;
  const pageCount = Math.ceil(catalogTotal / 12);
  const requestedPage = Number(params.get('halaman'));
  const page = Math.min(Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1), Math.max(1, pageCount));

  const cards = (data: CatalogRow[]) => <div className="archive-grid">{data.map(({ b, u, id, kind }) => {
    const isBundle = kind === 'bundle';
    const thumbnail = [...(b.turots_pages || [])].sort((left: any, right: any) => left.page_order - right.page_order)[0]?.thumbnail_url;
    const target = isBundle ? `/bendel/${encodeURIComponent(b.bundle_code)}` : `/katalog/${encodeURIComponent(u.slug || u.display_id || u.title_original || b.bundle_code)}?unit=${encodeURIComponent(id)}&bundle=${encodeURIComponent(b.id)}`;
    const title = isBundle ? b.display_title || `Bendel ${b.bundle_code}` : u.title_original || b.display_title;
    return <article className={`archive-card${isBundle ? ' archive-bundle-card' : ''}`} key={id}>
      <a href={target} onClick={(event) => handleInternalLink(event, target)}><div className="archive-cover">{thumbnail ? <img loading="lazy" src={thumbnail} alt={isBundle ? `Foto dari bendel ${b.bundle_code}` : `Folio ${u.folio_start || ''}`}/> : <BookOpen size={58}/>}</div>
        <div className="archive-copy"><small>{isBundle ? `Bendel · ${b.bundle_code}` : `${u.category_primary || 'Belum dikategorikan'} · ${b.bundle_code} · ${u.folio_start || ''}${u.folio_end && u.folio_end !== u.folio_start ? `–${u.folio_end}` : ''}`}</small><h3 dir="auto">{title}</h3>{!isBundle && <><p className="latin">{u.title_latin}</p><p>{u.description || 'Deskripsi kuratorial belum tersedia.'}</p></>}<footer>{b.turots_collections?.name}<span>{isBundle ? `${b.title_count || 0} judul di dalam bendel` : 'Lihat judul'} <span aria-hidden="true">→</span></span></footer></div></a>
    </article>;
  })}</div>;

  const loadingState = loading ? <p role="status">Memuat koleksi…</p> : error ? <div role="alert" className="empty">{error}<button onClick={loadCatalog}>Coba lagi</button></div> : null;
  let pageContent;
  const contentType = currentPath.startsWith('/artikel/') ? 'article' : currentPath.startsWith('/informasi/') ? 'information' : currentPath.startsWith('/pengumuman/') ? 'announcement' : null;
  if (isAdmin) pageContent = <Suspense fallback={<main className="archive-content"><div className="content-state" role="status">Membuka dashboard pengelola…</div></main>}><AdminV1 path={currentPath} navigate={navigate}/></Suspense>;
  else if (currentPath === '/') pageContent = <main className="archive-content">
    <section className="archive-hero"><div><p className="eyebrow">Merawat warisan intelektual</p><h1>Jejak ilmu.<br/><em>Terbuka untuk Anda.</em></h1><p>Jelajahi manuskrip dan khazanah pesantren. Temukan pengetahuan yang terus hidup dari halaman ke halaman.</p><button className="primary-action" onClick={() => navigate('/katalog')}>Jelajahi katalog <BookOpen size={18}/></button></div><div className="heritage-art"><span lang="ar" dir="rtl">التراث أمانة</span><p>Turāth adalah amanah</p><BookOpen size={74} strokeWidth={0.8}/></div></section>
    <div className="archive-stats"><span><b>{catalogTotal}</b>Entri katalog</span><span><b>{CATALOG_CATEGORIES.length}</b>Kategori ilmu</span></div>
    <div className="section-heading"><h2>Terpopuler bulan ini</h2><a href="/populer" onClick={(event) => { event.preventDefault(); navigate('/populer'); }}>Lihat 10 teratas <span aria-hidden="true">→</span></a></div>
    {popular.length ? <div className="popular-list">{popular.slice(0,10).map((item:any,index:number)=><a className="popular-item" key={item.text_unit_id} href={`/katalog/${encodeURIComponent(item.slug)}`} onClick={event=>{event.preventDefault();navigate(`/katalog/${encodeURIComponent(item.slug)}?unit=${encodeURIComponent(item.text_unit_id)}&bundle=${encodeURIComponent(item.bundle_id)}`);}}><span className="popular-rank">{index+1}</span><span className="popular-title"><strong dir="auto">{item.title_original||item.display_title}</strong><small>{item.category_primary||'Belum dikategorikan'} · {item.bundle_code}</small></span><span className="popular-views"><Eye size={16}/>{item.views}</span></a>)}</div> : <p className="popular-empty">{loading?'Memuat statistik pengunjung…':'Belum ada data kunjungan bulan ini.'}</p>}
    <div className="section-heading"><h2>Eksplorasi koleksi</h2><a href="/katalog" onClick={(event) => { event.preventDefault(); navigate('/katalog'); }}>Lihat semua <span aria-hidden="true">→</span></a></div>{loadingState || cards(rows)}
  </main>;
  else if (currentPath === '/populer' || currentPath === '/favorit') pageContent = <main className="archive-content catalog-page">
    <p className="eyebrow">Koleksi digital · {new Date().toLocaleDateString('id-ID',{month:'long',year:'numeric'})}</p><h1>10 manuskrip terpopuler</h1><p className="page-intro">Peringkat berdasarkan pengunjung unik per judul. Penghitungan dimulai kembali pada awal bulan.</p>
    {popular.length ? <div className="popular-list">{popular.slice(0,10).map((item:any,index:number)=><a className="popular-item" key={item.text_unit_id} href={`/katalog/${encodeURIComponent(item.slug)}`} onClick={event=>{event.preventDefault();navigate(`/katalog/${encodeURIComponent(item.slug)}?unit=${encodeURIComponent(item.text_unit_id)}&bundle=${encodeURIComponent(item.bundle_id)}`);}}><span className="popular-rank">{index+1}</span><span className="popular-title"><strong dir="auto">{item.title_original||item.display_title}</strong><small>{item.category_primary||'Belum dikategorikan'} · {item.bundle_code} · {item.collection_name||'Koleksi'}</small></span><span className="popular-views"><Eye size={16}/>{item.views} pengunjung</span></a>)}</div> : <div className="empty"><Eye/><h2>Belum ada statistik bulan ini</h2><p>Jumlah pengunjung akan muncul setelah manuskrip dibuka pengunjung.</p></div>}
  </main>;
  else if (currentPath === '/katalog') pageContent = <main className="archive-content catalog-page">
    <p className="eyebrow">Koleksi digital</p><h1>Katalog bendel dan judul</h1><p className="page-intro">Buka satu bendel untuk melihat metadata induk dan daftar judul di dalamnya, atau pilih judul untuk langsung membaca teks tertentu.</p>
    {currentPath === '/katalog' && <><div className="archive-search"><label className="search-input"><BookOpen size={19}/><input aria-label="Cari manuskrip" placeholder="Cari judul, kode, pengarang, penyalin, tokoh…" value={params.get('q') || ''} onChange={(event) => changeFilter('q', event.target.value)}/></label><button className="secondary-action" aria-expanded={filters} onClick={() => setFilters(!filters)}>Filter katalog</button></div>
      <div className="archive-chips" aria-label="Filter kategori">{['', 'Bendel', ...CATALOG_CATEGORIES].map((category) => <button key={category} aria-pressed={(params.get('kategori') || '') === category} onClick={() => changeFilter('kategori', category)}>{category || 'Semua'}</button>)}</div>
      {filters && <section className="filter-panel" aria-label="Filter katalog"><label>Koleksi<select value={params.get('koleksi') || ''} onChange={(event) => changeFilter('koleksi', event.target.value)}><option value="">Semua</option>{filterOptions.collections.map((value: string) => <option key={value} value={value}>{value}</option>)}</select></label>{[['bahasa','Bahasa','languages'],['aksara','Aksara','scripts'],['kelengkapan','Kelengkapan teks','completeness'],['tokoh','Tokoh','persons']].map(([key,label,optionKey])=><label key={key}>{label}<select value={params.get(key) || ''} onChange={(event) => changeFilter(key,event.target.value)}><option value="">Semua</option>{(filterOptions[optionKey]||[]).map((value:string)=><option key={value} value={value}>{value}</option>)}</select></label>)}<label>Status metadata<select value={params.get('status') || ''} onChange={(event) => changeFilter('status', event.target.value)}><option value="">Semua</option><option value="imported">Diimpor</option></select></label><button className="text-action" onClick={() => navigate('/katalog')}>Hapus semua filter</button></section>}
    </>}
    <div className="section-heading"><p aria-live="polite">{catalogTotal} entri katalog ditemukan</p><label>Urutkan<select value={params.get('urut') || ''} onChange={(event) => changeFilter('urut', event.target.value)}><option value="">Terbaru</option><option value="judul">Judul A–Z</option></select></label></div>
    {loadingState || (visible.length ? cards(visible) : <div className="empty"><BookOpen/><h2>Belum ada katalog yang cocok</h2><p>Coba kata pencarian atau pilihan filter yang lain.</p></div>)}
    {pageCount > 1 && <nav className="pagination" aria-label="Halaman katalog">{Array.from({ length: pageCount }, (_, index) => <button key={index} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => { const next = new URLSearchParams(params); next.set('halaman', String(index + 1)); navigate(`/katalog?${next.toString()}`); }}>{index + 1}</button>)}</nav>}
  </main>;
  else if (currentPath.startsWith('/katalog/')) pageContent = <DetailV1 key={url} keyValue={decodeURIComponent(currentPath.split('/')[2])}/>;
  else if (currentPath.startsWith('/bendel/')) pageContent = <DetailV1 key={url} keyValue={decodeURIComponent(currentPath.split('/')[2])} bundleMode bundleReaderMode={currentPath.split('/')[3] === 'baca'}/>;
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

  const renderLink = ([target, label, Icon]: readonly [string, string, typeof Home]) => <a key={target} href={target} aria-current={currentPath === target ? 'page' : undefined} onClick={(event) => handleInternalLink(event, target)}><Icon size={19}/><span>{label}</span></a>;
  return <div className={`archive-app${isAdmin ? ' admin-route' : ''}`}>
    {!isAdmin && <aside className="archive-nav"><a className="archive-brand" href="/" onClick={(event) => handleInternalLink(event, '/')}><BookOpen size={26}/><span><small>GALERI MANUSKRIP</small><strong>SAMPURNAN</strong></span></a>
      <nav className="archive-primary-nav" aria-label="Navigasi utama">{primaryLinks.map(renderLink)}</nav>
      <nav className="archive-secondary-nav" aria-label="Halaman lainnya">{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => handleInternalLink(event, '/admin')}><User size={19}/><span>Admin</span></a></nav>
      <div className="nav-bottom"><p>Warisan ilmu,<br/>untuk generasi mendatang.</p><small>Galeri Manuskrip Sampurnan · Qomaruddin</small></div>
    </aside>}
    {!isAdmin && <nav className="mobile-nav" aria-label="Navigasi ponsel">{primaryLinks.map(renderLink)}<button ref={menuTrigger} aria-expanded={menuOpen} aria-controls="mobile-more-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}<span>{menuOpen ? 'Tutup' : 'Menu'}</span></button></nav>}
    {menuOpen && !isAdmin && <div id="mobile-more-menu" className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}><nav ref={menuDialog} className="mobile-more-menu" role="dialog" aria-modal="true" aria-label="Halaman lainnya" onClick={(event) => event.stopPropagation()}><div className="mobile-menu-heading"><strong>Jelajahi Sampurnan</strong><button aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><X size={20}/></button></div>{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => handleInternalLink(event, '/admin')}><User size={19}/><span>Admin</span></a></nav></div>}
    <div className="archive-body">{notice && <p role="alert">{notice}</p>}{pageContent}
      {!isAdmin && <footer className="archive-footer"><div><strong>Sampurnan</strong><span>Merawat naskah, merawat pengetahuan.</span></div><nav aria-label="Tautan footer">{[...primaryLinks, ...moreLinks].map(([path, label]) => <a key={path} href={path} onClick={(event) => handleInternalLink(event, path)}>{label}</a>)}</nav><small>Galeri Manuskrip Sampurnan · Universitas Qomaruddin</small></footer>}
    </div>
  </div>;
}
