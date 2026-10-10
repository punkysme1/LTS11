import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, FileText, Info, Megaphone } from 'lucide-react';
import { getPublishedContent, listPublishedContent, type EditorialEntry, type EditorialType } from './services/editorialContent';

const labels: Record<EditorialType, { title: string; eyebrow: string; icon: typeof BookOpen; empty: string }> = {
  article: { title: 'Artikel', eyebrow: 'Wawasan dan kajian', icon: FileText, empty: 'Artikel akan ditampilkan di sini setelah diterbitkan.' },
  information: { title: 'Informasi', eyebrow: 'Panduan perpustakaan', icon: Info, empty: 'Informasi layanan akan ditampilkan di sini.' },
  announcement: { title: 'Pengumuman', eyebrow: 'Kabar terbaru', icon: Megaphone, empty: 'Belum ada pengumuman terbaru.' },
};

export function PublicContentPage({ type, slug, navigate }: { type: EditorialType; slug?: string; navigate: (path: string) => void }) {
  const config = labels[type];
  const Icon = config.icon;
  const [entries, setEntries] = useState<EditorialEntry[]>([]);
  const [entry, setEntry] = useState<EditorialEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    const request = slug ? getPublishedContent(type, slug).then((result) => { if (active) setEntry(result); })
      : listPublishedContent(type).then((result) => { if (active) setEntries(result); });
    request.catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Konten belum dapat dimuat.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [type, slug]);

  return <main className="archive-content editorial-page">
    <p className="eyebrow">{config.eyebrow}</p>
    {slug && <button className="text-action back-action" onClick={() => navigate(`/${type === 'article' ? 'artikel' : type === 'information' ? 'informasi' : 'pengumuman'}`)}><ArrowLeft size={18}/> Kembali ke {config.title.toLocaleLowerCase()}</button>}
    {!slug && <><h1>{config.title}</h1><p className="page-intro">{type === 'article' ? 'Tulisan tentang khazanah manuskrip, sejarah, dan tradisi keilmuan pesantren.' : type === 'information' ? 'Informasi untuk membantu Anda menggunakan katalog dan mengakses koleksi digital.' : 'Ikuti kegiatan, pembaruan layanan, dan kabar dari Galeri Manuskrip Sampurnan.'}</p></>}
    {loading ? <div className="content-state" role="status">Memuat {config.title.toLocaleLowerCase()}…</div>
      : error ? <div className="content-state" role="alert"><h2>Konten belum dapat dimuat</h2><p>{/relation .* does not exist/i.test(error) ? 'Tabel konten belum tersedia. Terapkan migrasi Turots CMS di Supabase terlebih dahulu.' : error}</p><button className="text-action" onClick={() => window.location.reload()}>Coba lagi</button></div>
      : slug ? entry ? <article className="editorial-article">
          <header><span className="content-type"><Icon size={17}/>{config.title}</span><h1 dir="auto">{entry.title}</h1>{entry.published_at && <p className="published-date"><CalendarDays size={16}/>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(entry.published_at))}</p>}{entry.excerpt && <p className="article-excerpt">{entry.excerpt}</p>}</header>
          {entry.cover_image_url && <img className="article-cover" src={entry.cover_image_url} alt=""/>}
          <div className="article-body" dir="auto">{entry.body}</div>
        </article> : <div className="content-state"><h1>Konten tidak ditemukan</h1><button className="text-action" onClick={() => navigate('/')}>Kembali ke beranda</button></div>
      : <>
        {entries.length ? <div className="editorial-list">{entries.map((item) => <article className="editorial-card" key={item.id}>
          {item.cover_image_url && <img src={item.cover_image_url} alt="" loading="lazy"/>}
          <div><span className="content-type"><Icon size={16}/>{config.title}</span><h2 dir="auto">{item.title}</h2>{item.published_at && <p className="published-date"><CalendarDays size={15}/>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(item.published_at))}</p>}<p>{item.excerpt || item.body.slice(0, 180)}</p><button className="text-action" onClick={() => navigate(`/${type === 'article' ? 'artikel' : type === 'information' ? 'informasi' : 'pengumuman'}/${encodeURIComponent(item.slug)}`)}>Baca selengkapnya <ArrowRight size={17}/></button></div>
        </article>)}</div> : <div className="content-state"><Icon size={30}/><h2>{config.title} akan segera hadir</h2><p>{config.empty}</p></div>}
      </>}
  </main>;
}

export function StaticLandingPage({ page }: { page: 'profile' | 'donation' | 'contact' }) {
  if (page === 'profile') return <main className="archive-content static-landing"><p className="eyebrow">Tentang kami</p><h1>Profil Galeri Manuskrip Sampurnan</h1><div className="static-intro"><BookOpen size={34}/><h2>Menjaga jejak ilmu pesantren</h2><p>Galeri Manuskrip Sampurnan merawat dan membuka akses pada khazanah manuskrip pesantren. Katalog ini menghubungkan bendel induk, judul teks, dan halaman digital agar dapat ditelusuri oleh santri, peneliti, dan masyarakat.</p></div><section className="static-section"><h2>Visi dan misi</h2><p>Melestarikan warisan intelektual, memperkaya penelitian, dan meneruskan tradisi keilmuan kepada generasi berikutnya.</p><p><strong>Silakan edit isi halaman ini di <code>src/PublicContentPages.tsx</code>.</strong></p></section></main>;
  if (page === 'donation') return <main className="archive-content static-landing"><p className="eyebrow">Dukung pelestarian</p><h1>Donasi</h1><div className="static-intro"><h2>Bantu manuskrip tetap terawat dan dapat diakses</h2><p>Dukungan Anda membantu digitalisasi, perawatan, dan penyediaan akses terbuka bagi koleksi manuskrip.</p><p>Informasi rekening atau kanal donasi dapat ditambahkan oleh pengelola sebelum halaman ini dipublikasikan.</p></div><section className="static-section"><h2>Ke mana dukungan disalurkan?</h2><ul><li>Perawatan dan konservasi manuskrip</li><li>Digitalisasi koleksi</li><li>Pengembangan akses katalog dan riset</li></ul><p><strong>Silakan edit isi halaman ini di <code>src/PublicContentPages.tsx</code>.</strong></p></section></main>;
  return <main className="archive-content static-landing"><p className="eyebrow">Kami siap membantu</p><h1>Kontak Kami</h1><p className="page-intro">Untuk pertanyaan tentang koleksi, penggunaan katalog, atau kerja sama penelitian, silakan hubungi pengelola Galeri Manuskrip Sampurnan.</p><section className="contact-card"><h2>Hubungi pengelola</h2><p>Alamat email, nomor telepon, dan jam layanan dapat ditambahkan di halaman ini.</p><p><strong>Silakan edit isi halaman ini di <code>src/PublicContentPages.tsx</code>.</strong></p></section></main>;
}
