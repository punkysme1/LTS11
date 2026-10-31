import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import { ArrowRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, Eye, Home, Info, Mail, Menu, Megaphone, Newspaper, User, X, HandHeart } from 'lucide-react';
import { countPublishedPages, listMonthlyPopularViews, listPublicCatalogFilterOptions, listPublishedCatalog, searchPublishedCatalog } from './services/turotsRepository';
import { listPublishedContent, type EditorialEntry } from './services/editorialContent';
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
  const [homeStats, setHomeStats] = useState<{ titles: number | null; bundles: number | null; pages: number | null; categories: number | null }>({ titles: null, bundles: null, pages: null, categories: null });
  const [homeCategories, setHomeCategories] = useState<Array<{ name: string; count: number }>>([]);
  const [homeArticles, setHomeArticles] = useState<EditorialEntry[]>([]);
  const [homeManuscriptCovers, setHomeManuscriptCovers] = useState<Record<string, string>>({});
  const [filterOptions, setFilterOptions] = useState<any>({ collections: [], affiliations: [], languages: [], scripts: [], completeness: [], persons: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popular, setPopular] = useState<any[]>([]);
  const [popularLoaded, setPopularLoaded] = useState(false);
  const [notice, setNotice] = useState('');
  const [searchDraft, setSearchDraft] = useState(new URLSearchParams(location.search).get('q') || '');
  const [personDraft, setPersonDraft] = useState(new URLSearchParams(location.search).get('tokoh') || '');
  const catalogRequestId = useRef(0);
  const loadedCatalogUrl = useRef('');
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLElement>(null);
  const popularTrack = useRef<HTMLDivElement>(null);
  const [loupeVisible, setLoupeVisible] = useState(false);
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
    const titles: Record<string, string> = {
      '/': 'Beranda', '/katalog': 'Katalog bendel dan judul', '/artikel': 'Artikel', '/informasi': 'Informasi',
      '/pengumuman': 'Pengumuman', '/buku-tamu': 'Buku Tamu', '/profil': 'Profil', '/donasi': 'Donasi',
      '/kontak': 'Kontak Kami', '/populer': 'Manuskrip terpopuler',
    };
    document.title = `${titles[currentPath] || (currentPath.startsWith('/katalog/') || currentPath.startsWith('/bendel/') ? 'Manuskrip' : 'Halaman tidak ditemukan')} · Turots Qomaruddin`;
  }, [currentPath]);
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

  const updateHeroLoupe = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
    event.currentTarget.style.setProperty('--loupe-x', `${x}%`);
    event.currentTarget.style.setProperty('--loupe-y', `${y}%`);
    event.currentTarget.style.setProperty('--loupe-bg-x', `${x * 2 - 50}%`);
    event.currentTarget.style.setProperty('--loupe-bg-y', `${y * 2 - 50}%`);
    if (!loupeVisible) setLoupeVisible(true);
  };

  useEffect(() => {
    setSearchDraft(params.get('q') || '');
  }, [currentPath, url]);

  useEffect(() => {
    setPersonDraft(params.get('tokoh') || '');
  }, [currentPath, url]);

  useEffect(() => {
    if (currentPath !== '/katalog' || searchDraft === (params.get('q') || '')) return;
    const timeout = window.setTimeout(() => changeFilter('q', searchDraft), 280);
    return () => window.clearTimeout(timeout);
  }, [searchDraft, currentPath, url]);

  useEffect(() => {
    if (currentPath !== '/katalog' || personDraft === (params.get('tokoh') || '')) return;
    const timeout = window.setTimeout(() => changeFilter('tokoh', personDraft), 280);
    return () => window.clearTimeout(timeout);
  }, [personDraft, currentPath, url]);

  const loadCatalog = useCallback(() => {
    const requestId = ++catalogRequestId.current;
    setLoading(true); setError('');
    if (!supabaseConfigured) { setError('Koneksi katalog belum dikonfigurasi.'); setLoading(false); return; }
    const query = new URLSearchParams(location.search);
    void searchPublishedCatalog({
      query: query.get('q') || '', category: query.get('kategori') || '', collection: query.get('koleksi') || '',
      affiliation: query.get('afiliasi') || '',
      language: query.get('bahasa') || '', script: query.get('aksara') || '', completeness: query.get('kelengkapan') || '',
      person: query.get('tokoh') || '', kind: query.get('jenis') || '', sort: query.get('urut') || 'newest',
      offset: Math.max(0, Number(query.get('halaman') || '1') - 1) * 12, limit: currentPath === '/' ? 3 : 12,
    }).then(({ rows, total }) => { if (catalogRequestId.current === requestId) { setItems(rows); setCatalogTotal(total); } })
      .catch((reason: unknown) => { if (catalogRequestId.current === requestId) setError(reason instanceof Error ? `Katalog belum dapat dimuat: ${reason.message}` : 'Katalog belum dapat dimuat. Periksa koneksi lalu coba lagi.'); })
      .finally(() => { if (catalogRequestId.current === requestId) { loadedCatalogUrl.current = `${currentPath}${location.search}`; setLoading(false); } });
  }, [currentPath, url]);
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/katalog' || currentPath === '/favorit') loadCatalog();
    return () => { catalogRequestId.current += 1; };
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
    setPopularLoaded(false);
    void listMonthlyPopularViews().then((rows) => { if (active) setPopular(rows.map((row:any) => ({...row,slug:slugify(row.title_original||row.display_id||row.bundle_code||'manuskrip')}))); }).catch(() => { if (active) setPopular([]); }).finally(() => { if (active) setPopularLoaded(true); });
    return () => { active = false; };
  }, [currentPath]);
  useEffect(() => {
    if (currentPath !== '/') return;
    let active = true;
    void Promise.all([listPublishedCatalog(), countPublishedPages()]).then(([bundles, exactPages]: [any[], number | null]) => {
      if (!active) return;
      const published = bundles.filter(bundle => ['public_preview', 'public_full'].includes(bundle.access_level));
      const units = published.flatMap(bundle => bundle.turots_text_units || []);
      const fallbackPages = published.reduce((sum, bundle) => sum + (bundle.turots_pages || []).length, 0);
      setHomeStats({
        titles: units.length,
        bundles: published.length,
        pages: exactPages ?? fallbackPages,
        categories: new Set(units.map(unit => unit.category_primary).filter(Boolean)).size,
      });
      const categoryCounts = new Map<string, number>();
      for (const unit of units) {
        const category = String(unit.category_primary || '').trim();
        if (category) categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      }
      setHomeCategories([...categoryCounts].map(([name, count]) => ({ name, count })).sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'id')).slice(0, 8));
      const covers: Record<string, string> = {};
      for (const bundle of published) {
        const pages = [...(bundle.turots_pages || [])].sort((left: any, right: any) => left.page_order - right.page_order);
        for (const unit of bundle.turots_text_units || []) {
          const page = pages.find((candidate: any) => candidate.text_unit_id === unit.id && (candidate.thumbnail_url || candidate.image_url)) || pages.find((candidate: any) => candidate.thumbnail_url || candidate.image_url);
          const cover = page?.thumbnail_url || page?.image_url;
          if (cover) covers[unit.id] = cover;
        }
      }
      setHomeManuscriptCovers(covers);
    }).catch(() => {});
    return () => { active = false; };
  }, [currentPath]);
  useEffect(() => {
    if (currentPath !== '/') return;
    let active = true;
    void listPublishedContent('article').then(entries => { if (active) setHomeArticles(entries.slice(0, 3)); }).catch(() => { if (active) setHomeArticles([]); });
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
  const rows = visible;
  const pageCount = Math.ceil(catalogTotal / 12);
  const requestedPage = Number(params.get('halaman'));
  const page = Math.min(Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1), Math.max(1, pageCount));

  const cards = (data: CatalogRow[]) => <div className="archive-grid">{data.map(({ b, u, id, kind }) => {
    const isBundle = kind === 'bundle';
    const thumbnail = [...(b.turots_pages || [])].sort((left: any, right: any) => left.page_order - right.page_order)[0]?.thumbnail_url;
    const returnTo = `${location.pathname}${location.search}`;
    const target = isBundle ? `/bendel/${encodeURIComponent(b.bundle_code)}?returnTo=${encodeURIComponent(returnTo)}` : `/katalog/${encodeURIComponent(u.slug || u.display_id || u.title_original || b.bundle_code)}?unit=${encodeURIComponent(id)}&bundle=${encodeURIComponent(b.id)}&returnTo=${encodeURIComponent(returnTo)}`;
    const title = isBundle ? b.display_title || `Bendel ${b.bundle_code}` : u.title_original || b.display_title;
    return <article className={`archive-card${isBundle ? ' archive-bundle-card' : ''}`} key={id}>
      <a href={target} onClick={(event) => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); if (currentPath === '/katalog') { try { sessionStorage.setItem(`turots-catalog-scroll:${returnTo}`, String(window.scrollY)); } catch { /* Pemulihan posisi bersifat opsional bila penyimpanan browser dinonaktifkan. */ } } navigate(target); }}><div className="archive-cover">{thumbnail ? <img loading="lazy" src={thumbnail} alt={isBundle ? `Foto dari bendel ${b.bundle_code}` : `Folio ${u.folio_start || ''}`}/> : <BookOpen size={58}/>}</div>
        <div className="archive-copy"><small>{isBundle ? `Bendel · ${b.bundle_code}` : `${u.category_primary || 'Belum dikategorikan'} · ${b.bundle_code} · ${u.folio_start || ''}${u.folio_end && u.folio_end !== u.folio_start ? `–${u.folio_end}` : ''}`}</small><h3 dir="auto">{title}</h3>{!isBundle && <><p className="latin">{u.title_latin}</p><p>{u.description || 'Deskripsi kuratorial belum tersedia.'}</p></>}<footer>{b.turots_collections?.name}<span>{isBundle ? `${b.title_count || 0} judul di dalam bendel` : 'Lihat judul'} <span aria-hidden="true">→</span></span></footer></div></a>
    </article>;
  })}</div>;

  const paginationItems: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [];
  if (pageCount <= 7) paginationItems.push(...Array.from({ length: pageCount }, (_, index) => index + 1));
  else {
    paginationItems.push(1);
    if (page > 3) paginationItems.push('ellipsis-start');
    for (let number = Math.max(2, page - 1); number <= Math.min(pageCount - 1, page + 1); number += 1) paginationItems.push(number);
    if (page < pageCount - 2) paginationItems.push('ellipsis-end');
    paginationItems.push(pageCount);
  }
  const pageTarget = (nextPage: number) => {
    const next = new URLSearchParams(params);
    if (nextPage <= 1) next.delete('halaman'); else next.set('halaman', String(nextPage));
    return `/katalog${next.size ? `?${next.toString()}` : ''}`;
  };
  const pagination = pageCount > 1 && <nav className="pagination" aria-label="Halaman katalog">
    <button type="button" aria-label="Halaman sebelumnya" disabled={page <= 1} onClick={() => navigate(pageTarget(page - 1))}>Sebelumnya</button>
    {paginationItems.map((number, index) => typeof number === 'number'
      ? <button type="button" key={number} aria-label={`Halaman ${number}`} aria-current={page === number ? 'page' : undefined} onClick={() => navigate(pageTarget(number))}>{number}</button>
      : <span className="pagination-ellipsis" key={number}>{index === 1 ? '…' : '…'}</span>)}
    <button type="button" aria-label="Halaman berikutnya" disabled={page >= pageCount} onClick={() => navigate(pageTarget(page + 1))}>Berikutnya</button>
    <form className="pagination-jump" onSubmit={event => { event.preventDefault(); const value = Number(new FormData(event.currentTarget).get('page')); if (value >= 1 && value <= pageCount) navigate(pageTarget(value)); }}><label htmlFor="catalog-page-jump">Lompat ke halaman</label><input id="catalog-page-jump" name="page" type="number" min={1} max={pageCount} defaultValue={page} key={page}/><button type="submit">Buka</button></form>
  </nav>;

  const activeFilterValues: Array<[string, string, string]> = [
    ['jenis', 'Jenis', params.get('jenis') === 'bundle' ? 'Bendel' : params.get('jenis') === 'title' ? 'Judul' : ''],
    ['afiliasi', 'Afiliasi', params.get('afiliasi') || ''], ['kategori', 'Bidang', params.get('kategori') || ''], ['koleksi', 'Koleksi', params.get('koleksi') || ''],
    ['bahasa', 'Bahasa', params.get('bahasa') || ''], ['aksara', 'Aksara', params.get('aksara') || ''],
    ['kelengkapan', 'Kelengkapan', params.get('kelengkapan') || ''], ['tokoh', 'Tokoh', params.get('tokoh') || ''],
  ];
  const hasActiveFilters = activeFilterValues.some(([, , value]) => Boolean(value));

  useEffect(() => {
    if (currentPath !== '/katalog' || loading) return;
    if (loadedCatalogUrl.current !== `${location.pathname}${location.search}`) return;
    const key = `turots-catalog-scroll:${location.pathname}${location.search}`;
    let saved: string | null = null;
    try { saved = sessionStorage.getItem(key); } catch { return; }
    if (saved === null) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.scrollTo({ top: Number(saved) || 0, behavior: 'instant' as ScrollBehavior });
      try { sessionStorage.removeItem(key); } catch { /* Pemulihan posisi tidak wajib. */ }
    }));
  }, [currentPath, url, loading]);

  const loadingState = loading ? <p role="status">Memuat koleksi…</p> : error ? <div role="alert" className="empty">{error}<button onClick={loadCatalog}>Coba lagi</button></div> : null;
  const scrollPopular = (direction: -1 | 1) => {
    const track = popularTrack.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * .78, 280), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const hasMonthlyPopularity = popular.some(item => Number(item.views) > 0);
  let pageContent;
  const contentType = currentPath.startsWith('/artikel/') ? 'article' : currentPath.startsWith('/informasi/') ? 'information' : currentPath.startsWith('/pengumuman/') ? 'announcement' : null;
  if (isAdmin) pageContent = <Suspense fallback={<main className="archive-content"><div className="content-state" role="status">Membuka dashboard pengelola…</div></main>}><AdminV1 path={currentPath} navigate={navigate}/></Suspense>;
  else if (currentPath === '/') pageContent = <main className="archive-content">
    <section className="archive-hero archive-hero-exhibition"><div className="archive-hero-copy"><p className="eyebrow">Merawat warisan intelektual</p><h1><span>Jejak ilmu.</span><em>Terbuka untuk Anda.</em></h1><p>Jelajahi manuskrip dan khazanah pesantren. Temukan pengetahuan yang terus hidup dari halaman ke halaman.</p><button className="primary-action" onClick={() => navigate('/katalog')}>Jelajahi katalog <BookOpen size={18}/></button></div><figure className={`archive-hero-manuscript${loupeVisible ? ' is-loupe-active' : ''}`} onPointerMove={updateHeroLoupe} onPointerLeave={() => setLoupeVisible(false)}><img className="hero-manuscript-image" src="https://cloud.naracode.id/iiif/3/editorial-179fef8a-bd7e-4ec9-9f8e-316dc2607c14.jpg/full/max/0/default.jpg" alt="Lembar manuskrip dari koleksi digital Sampurnan" fetchPriority="high"/><span className="hero-manuscript-loupe" aria-hidden="true"/><figcaption><span aria-hidden="true">✦</span> Khazanah manuskrip Sampurnan</figcaption></figure></section>
    <section className="home-section home-profile"><div className="home-profile-content"><p className="eyebrow">Yayasan Pondok Pesantren Qomaruddin</p><h2>Merawat naskah, menghidupkan kembali jejak ilmu.</h2><p>Khazanah manuskrip pesantren menyimpan salinan kitab, catatan ulama, dan tradisi keilmuan yang terus dipelajari lintas generasi.</p><button className="home-profile-cta" onClick={() => navigate('/profil')}><span>Jelajahi kisah koleksi</span><ArrowRight size={19}/></button></div></section>
    <section className="home-section home-statistics"><div className="section-heading"><div><p className="eyebrow">Koleksi dalam angka</p></div></div><div className="archive-stats archive-stats-four" aria-live="polite"><span><b>{homeStats.titles ?? '—'}</b>Judul</span><span><b>{homeStats.bundles ?? '—'}</b>Bendel</span><span><b>{homeStats.pages ?? '—'}</b>Lembar foto</span><span><b>{homeStats.categories ?? '—'}</b>Kategori</span></div></section>
    <section className="home-popular"><div className="section-heading"><div><p className="eyebrow">{hasMonthlyPopularity ? 'Sering dibaca' : 'Mulai menjelajah'}</p><h2>{hasMonthlyPopularity ? 'Paling banyak dibaca bulan ini' : 'Kenali khazanah manuskrip.'}</h2><p>{hasMonthlyPopularity ? 'Pilihan pengunjung berdasarkan jumlah kunjungan unik.' : 'Belum ada kunjungan unik tercatat bulan ini. Berikut beberapa judul untuk memulai penelusuran.'}</p></div><div className="home-carousel-controls"><button className="secondary-action" aria-label="Manuskrip sebelumnya" onClick={() => scrollPopular(-1)}><ChevronLeft size={19}/></button><button className="secondary-action" aria-label="Manuskrip berikutnya" onClick={() => scrollPopular(1)}><ChevronRight size={19}/></button></div></div>{popular.length ? <div className="home-popular-track" ref={popularTrack} role="region" aria-label={hasMonthlyPopularity ? 'Sepuluh manuskrip paling banyak dibaca' : 'Pilihan manuskrip untuk dijelajahi'} tabIndex={0}>{popular.slice(0, 10).map((item: any, index: number) => {
      const target = `/katalog/${encodeURIComponent(item.slug)}?unit=${encodeURIComponent(item.text_unit_id)}&bundle=${encodeURIComponent(item.bundle_id)}`;
      const image = homeManuscriptCovers[item.text_unit_id];
      return <a className="home-popular-card" key={item.text_unit_id} href={target} onClick={event => handleInternalLink(event, target)}><div className="home-popular-cover">{image ? <img src={image} alt={`Foto manuskrip ${item.title_original || item.display_title || ''}`} loading="lazy"/> : <BookOpen size={34} aria-hidden="true"/>}<span className="home-popular-rank">{String(index + 1).padStart(2, '0')}</span></div><div className="home-popular-copy"><small>{item.category_primary || 'Belum dikategorikan'} · {item.bundle_code}</small><h3 dir="auto">{item.title_original || item.display_title}</h3>{Number(item.views) > 0 && <span><Eye size={14}/>{item.views} kunjungan</span>}</div></a>;
    })}</div> : <div className="home-popular-empty" role="status">{popularLoaded ? <>Statistik kunjungan bulan ini sedang dikumpulkan. <button className="text-action" onClick={() => navigate('/populer')}>Jelajahi halaman terpopuler <ArrowRight size={16}/></button></> : 'Memuat bacaan populer…'}</div>}</section>
    {homeCategories.length > 0 && <section className="home-categories"><div><p className="eyebrow">Jelajah berdasarkan bidang</p><h2>Mulai dari bidang yang Anda minati.</h2></div><div className="home-category-chips">{homeCategories.map((category, index) => <button key={category.name} onClick={() => navigate(`/katalog?kategori=${encodeURIComponent(category.name)}`)}><span className="home-category-index">{String(index + 1).padStart(2, '0')}</span><span className="home-category-name">{category.name}</span><small>{category.count} judul</small><ArrowRight size={17}/></button>)}</div></section>}
    {homeArticles.length > 0 && <section className="home-articles"><div className="section-heading"><div><p className="eyebrow">Wawasan dan kajian</p><h2>Cerita dan pengetahuan dari khazanah naskah.</h2></div><button className="text-action" onClick={() => navigate('/artikel')}>Semua artikel <ArrowRight size={16}/></button></div><div className="home-article-grid">{homeArticles.map(article => <article className="home-article-card" key={article.id}><button className="home-article-link" onClick={() => navigate(`/artikel/${encodeURIComponent(article.slug)}`)}>{article.cover_image_url ? <img src={article.cover_image_url} alt="" loading="lazy"/> : <div className="home-article-cover-fallback"><Newspaper size={34}/><span>Wawasan Sampurnan</span></div>}<div className="home-article-copy">{article.published_at && <time dateTime={article.published_at}><CalendarDays size={14}/>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(article.published_at))}</time>}<h3>{article.title}</h3><p>{article.excerpt || article.body.slice(0, 150)}</p><span className="home-article-read">Baca artikel <ArrowRight size={15}/></span></div></button></article>)}</div></section>}
    <section className="home-services"><div className="home-services-intro"><p className="eyebrow">Jelajahi lebih jauh</p><h2>Temukan koleksi dan kabar terbaru.</h2><p>Mulai menelusuri, siapkan kunjungan, atau ikuti kegiatan galeri.</p></div><div className="home-service-grid"><button onClick={() => navigate('/katalog')}><BookOpen size={22}/><span><strong>Katalog manuskrip</strong><small>Telusuri naskah menurut judul dan bidang ilmu.</small></span><ArrowRight size={18}/></button><button onClick={() => navigate('/informasi')}><Info size={22}/><span><strong>Informasi layanan</strong><small>Ketahui cara mengakses koleksi dan layanan galeri.</small></span><ArrowRight size={18}/></button><button onClick={() => navigate('/pengumuman')}><Megaphone size={22}/><span><strong>Kabar dan kegiatan</strong><small>Ikuti informasi terbaru dari galeri.</small></span><ArrowRight size={18}/></button></div></section>
    <section className="home-community-links" aria-label="Partisipasi dan informasi"><button onClick={() => navigate('/donasi')}><HandHeart size={18}/><span><strong>Dukung pelestarian</strong><small>Jaga warisan naskah agar tetap dapat diakses.</small></span><span aria-hidden="true">→</span></button><button onClick={() => navigate('/buku-tamu')}><User size={18}/><span><strong>Bagikan kesan Anda</strong><small>Tinggalkan catatan untuk pengelola dan pembaca.</small></span><span aria-hidden="true">→</span></button><button onClick={() => navigate('/kontak')}><Mail size={18}/><span><strong>Hubungi pengelola</strong><small>Lihat saluran komunikasi resmi galeri.</small></span><span aria-hidden="true">→</span></button></section>
  </main>;
  else if (currentPath === '/populer' || currentPath === '/favorit') pageContent = <main className="archive-content catalog-page">
    <p className="eyebrow">Koleksi digital · {new Date().toLocaleDateString('id-ID',{month:'long',year:'numeric'})}</p><h1>10 manuskrip terpopuler</h1><p className="page-intro">Peringkat berdasarkan pengunjung unik per judul. Penghitungan dimulai kembali pada awal bulan.</p>
    {popular.length ? <div className="popular-list">{popular.slice(0,10).map((item:any,index:number)=><a className="popular-item" key={item.text_unit_id} href={`/katalog/${encodeURIComponent(item.slug)}`} onClick={event=>{event.preventDefault();navigate(`/katalog/${encodeURIComponent(item.slug)}?unit=${encodeURIComponent(item.text_unit_id)}&bundle=${encodeURIComponent(item.bundle_id)}`);}}><span className="popular-rank">{index+1}</span><span className="popular-title"><strong dir="auto">{item.title_original||item.display_title}</strong><small>{item.category_primary||'Belum dikategorikan'} · {item.bundle_code} · {item.collection_name||'Koleksi'}</small></span><span className="popular-views"><Eye size={16}/>{item.views} pengunjung</span></a>)}</div> : <div className="empty"><Eye/><h2>Belum ada statistik bulan ini</h2><p>Jumlah pengunjung akan muncul setelah manuskrip dibuka pengunjung.</p></div>}
  </main>;
  else if (currentPath === '/katalog') pageContent = <main className="archive-content catalog-page">
    <p className="eyebrow">Koleksi digital</p><h1>Katalog bendel dan judul</h1><p className="page-intro">Buka satu bendel untuk melihat metadata induk dan daftar judul di dalamnya, atau pilih judul untuk langsung membaca teks tertentu.</p>
    {currentPath === '/katalog' && <><div className="archive-search"><label className="search-input"><BookOpen size={19}/><input aria-label="Cari manuskrip" placeholder="Cari judul, kode, pengarang, penyalin, tokoh…" value={searchDraft} onChange={(event) => setSearchDraft(event.target.value)}/></label><button className="secondary-action" aria-expanded={filters} onClick={() => setFilters(!filters)}>Filter katalog</button></div>
      <section className="catalog-filter-row" aria-label="Penyaring utama"><label>Jenis entri<select value={params.get('jenis') || ''} onChange={(event) => changeFilter('jenis', event.target.value)}><option value="">Semua jenis</option><option value="title">Judul</option><option value="bundle">Bendel</option></select></label><label>Afiliasi<select value={params.get('afiliasi') || ''} onChange={(event) => changeFilter('afiliasi', event.target.value)}><option value="">Semua afiliasi</option>{filterOptions.affiliations.map((value: string) => <option key={value} value={value}>{value}</option>)}</select></label><label>Bidang ilmu<select value={params.get('kategori') || ''} onChange={(event) => changeFilter('kategori', event.target.value)}><option value="">Semua bidang</option>{CATALOG_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label></section>
      {filters && <section className="filter-panel" aria-label="Filter katalog">
        <label>Koleksi<select value={params.get('koleksi') || ''} onChange={(event) => changeFilter('koleksi', event.target.value)}><option value="">Semua koleksi</option>{filterOptions.collections.map((value: string) => <option key={value} value={value}>{value}</option>)}</select></label>
        {['bahasa','aksara','kelengkapan'].map((key) => { const config: Record<string, {label:string;options:string[]}> = { bahasa:{label:'Bahasa',options:filterOptions.languages}, aksara:{label:'Aksara',options:filterOptions.scripts}, kelengkapan:{label:'Kelengkapan teks',options:filterOptions.completeness} }; const field=config[key]; return <label key={key}>{field.label}<select value={params.get(key) || ''} onChange={(event) => changeFilter(key,event.target.value)}><option value="">Semua</option>{field.options.map((option:string)=><option key={option} value={option}>{option === 'Middle (ca.1050-1350)' ? 'Middle (ca. 1050–1350) · perlu verifikasi' : option}</option>)}</select></label>; })}
        <label>Tokoh atau nama terkait<input type="search" list="catalog-person-options" value={personDraft} onChange={(event) => setPersonDraft(event.target.value)} placeholder="Ketik sebagian nama…"/><datalist id="catalog-person-options">{filterOptions.persons.map((value:string)=><option key={value} value={value}/>)}</datalist></label>
      </section>}
      {hasActiveFilters && <div className="active-filters" aria-label="Filter aktif">{activeFilterValues.filter(([, ,value]) => Boolean(value)).map(([key,label,value]) => <button type="button" className="active-filter" key={key} onClick={() => changeFilter(key,'')}>{label}: {value} <span aria-hidden="true">×</span></button>)}<button type="button" className="text-action" onClick={() => { navigate('/katalog'); setSearchDraft(''); }}>Hapus semua filter</button></div>}
    </>}
    <div className="section-heading"><p aria-live="polite">{catalogTotal} entri katalog ditemukan · halaman {page} dari {Math.max(1, pageCount)}</p><label>Urutkan<select value={params.get('urut') || ''} onChange={(event) => changeFilter('urut', event.target.value)}><option value="">Terbaru</option><option value="judul">Judul A–Z</option></select></label></div>
    {loadingState || (visible.length ? cards(visible) : <div className="empty"><BookOpen/><h2>Belum ada katalog yang cocok</h2><p>Coba kata pencarian atau pilihan filter yang lain.</p></div>)}
    {pagination}
  </main>;
  else if (currentPath.startsWith('/katalog/')) pageContent = <DetailV1 key={url} keyValue={decodeURIComponent(currentPath.split('/')[2])} navigate={navigate}/>;
  else if (currentPath.startsWith('/bendel/')) pageContent = <DetailV1 key={url} keyValue={decodeURIComponent(currentPath.split('/')[2])} bundleMode bundleReaderMode={currentPath.split('/')[3] === 'baca'} navigate={navigate}/>;
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

  const renderLink = ([target, label, Icon]: readonly [string, string, typeof Home]) => <a key={target} href={target} aria-current={currentPath === target || target !== '/' && currentPath.startsWith(`${target}/`) ? 'page' : undefined} onClick={(event) => handleInternalLink(event, target)}><Icon size={19}/><span>{label}</span></a>;
  return <div className={`archive-app${isAdmin ? ' admin-route' : ''}`}>
    {!isAdmin && <a className="skip-link" href="#main-content">Lewati ke konten</a>}
    {!isAdmin && <header className="desktop-header"><a className="archive-brand" href="/" onClick={(event) => handleInternalLink(event, '/')}><BookOpen size={26}/><span><small>GALERI MANUSKRIP</small><strong>SAMPURNAN</strong></span></a><nav aria-label="Navigasi utama">{[['/katalog','Katalog'],['/profil','Profil'],['/artikel','Artikel'],['/donasi','Donasi'],['/buku-tamu','Buku Tamu'],['/kontak','Kontak']].map(([path,label])=><a key={path} href={path} aria-current={currentPath === path || currentPath.startsWith(`${path}/`) ? 'page' : undefined} onClick={(event)=>handleInternalLink(event,path)}>{label}</a>)}<a className="desktop-admin-link" href="/admin" onClick={(event) => handleInternalLink(event, '/admin')}>Admin</a></nav></header>}
    {!isAdmin && <aside className="archive-nav"><a className="archive-brand" href="/" onClick={(event) => handleInternalLink(event, '/')}><BookOpen size={26}/><span><small>GALERI MANUSKRIP</small><strong>SAMPURNAN</strong></span></a>
      <nav className="archive-primary-nav" aria-label="Navigasi utama">{primaryLinks.map(renderLink)}</nav>
      <nav className="archive-secondary-nav" aria-label="Halaman lainnya">{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => handleInternalLink(event, '/admin')}><User size={19}/><span>Admin</span></a></nav>
      <div className="nav-bottom"><p>Warisan ilmu,<br/>untuk generasi mendatang.</p><small>Galeri Manuskrip Sampurnan · Qomaruddin</small></div>
    </aside>}
    {!isAdmin && <nav className="mobile-nav" aria-label="Navigasi ponsel">{primaryLinks.map(renderLink)}<button ref={menuTrigger} aria-expanded={menuOpen} aria-controls="mobile-more-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}<span>{menuOpen ? 'Tutup' : 'Menu'}</span></button></nav>}
    {menuOpen && !isAdmin && <div id="mobile-more-menu" className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}><nav ref={menuDialog} className="mobile-more-menu" role="dialog" aria-modal="true" aria-label="Halaman lainnya" onClick={(event) => event.stopPropagation()}><div className="mobile-menu-heading"><strong>Jelajahi Sampurnan</strong><button aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><X size={20}/></button></div>{moreLinks.map(renderLink)}<a href="/admin" onClick={(event) => handleInternalLink(event, '/admin')}><User size={19}/><span>Admin</span></a></nav></div>}
    <div className="archive-body" id="main-content" tabIndex={-1}>{notice && <p role="alert">{notice}</p>}{pageContent}
      {!isAdmin && <footer className="archive-footer"><div className="archive-footer-brand"><strong>Sampurnan</strong><span>Merawat naskah, merawat pengetahuan.</span></div><nav aria-label="Tautan footer">{[...primaryLinks, ...moreLinks].filter(([path]) => path !== '/').map(([path, label]) => <a key={path} href={path} onClick={(event) => handleInternalLink(event, path)}>{label}</a>)}</nav><div className="archive-footer-details"><a href="mailto:tppkp.qomaruddin@gmail.com">email: tppkp.qomaruddin@gmail.com</a><span><a href="tel:+6285314603330">Phone: +62 85314603330</a><span aria-hidden="true"> - </span><a href="tel:+628995023222">+62 8995023222</a></span><p>Di bawah naungan Pondok Pesantren Qomaruddin dan YPP Qomaruddin.</p><small>© 2026 Qomaruddin. Design By PT Naracode Digital Inovasi.</small></div></footer>}
    </div>
  </div>;
}
