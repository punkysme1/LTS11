import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, FileText, HandHeart, Info, Mail, Megaphone, Phone } from 'lucide-react';
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
          <div><span className="content-type"><Icon size={16}/>{config.title}</span><h2 dir="auto">{item.title}</h2>{item.published_at && <p className="published-date"><CalendarDays size={15}/>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(entry?.published_at || item.published_at))}</p>}<p>{item.excerpt || item.body.slice(0, 180)}</p><button className="text-action" onClick={() => navigate(`/${type === 'article' ? 'artikel' : type === 'information' ? 'informasi' : 'pengumuman'}/${encodeURIComponent(item.slug)}`)}>Baca selengkapnya <ArrowRight size={17}/></button></div>
        </article>)}</div> : <div className="content-state"><Icon size={30}/><h2>{config.title} akan segera hadir</h2><p>{config.empty}</p></div>}
      </>}
  </main>;
}

export function StaticLandingPage({ page }: { page: 'profile' | 'donation' | 'contact' }) {
  if (page === 'profile') return <main className="archive-content static-landing profile-page"><p className="eyebrow">Yayasan Pondok Pesantren Qomaruddin</p><h1>Menjaga naskah, merawat kesinambungan ilmu.</h1><p className="page-intro">Galeri Manuskrip Sampurnan merawat koleksi naskah pesantren dan membuka akses bagi masyarakat, santri, akademisi, serta peneliti.</p>
    <section className="profile-lead"><div><span className="eyebrow">Koleksi digital</span><strong>591 Judul · 421 Bendel</strong><p>terdiri atas 79 bendel DREAMSEA, 204 bendel British Library (EAP: 52 Ahmad Wasil, 130 Ndalem, 16 Burhan, 6 Zamroni), dan 138 bendel Nahdlatut Turots dengan total 18.270 lembar foto digital dalam 17 kategori keilmuan</p></div><div><p>Koleksi ini tumbuh di lingkungan pesantren: naskah bukan hanya peninggalan sejarah, tetapi juga sumber ajaran yang dibaca, disalin, dikaji, dan diwariskan.</p></div></section>
    <section className="profile-story"><div><p className="eyebrow">Isi khazanah</p><h2>Beragam kitab dan catatan kehidupan pesantren.</h2></div><div><p>Mayoritas naskah berbahasa Arab dan Jawa dengan aksara Arab dan Pegon; sebagian lainnya menggunakan bahasa Belanda dan Indonesia. Isinya mencakup tafsir, fikih, gramatika Arab, tasawuf, akidah, dan tauhid.</p><p>Selain salinan kitab, koleksi juga memuat karya dan catatan lokal seperti Qoshidah Lis Shibyan, Qoshidah Fi Shaum, catatan wirid, surat, silsilah, serta tradisi haji.</p></div></section>
    <section className="profile-story profile-preservation"><div><p className="eyebrow">Sejak 2010</p><h2>Pelestarian fisik, digital, dan keilmuan.</h2></div><div><p>Yayasan Pondok Pesantren Qomaruddin menggiatkan pelestarian naskah sejak 2010. Digitalisasi koleksi didukung Perpustakaan Provinsi Jawa Timur, sementara kerja sama dengan DREAMSEA, Nahdlatut Turats, dan British Library membantu penyimpanan salinan digital mengikuti standar pengarsipan.</p><p>Upaya ini berjalan bersama promosi koleksi, kajian filologi dan tahqiq, serta peningkatan kapasitas santri dan pengelola dalam membaca dan merawat naskah.</p></div></section>
    <section className="profile-story"><div><p className="eyebrow">Naskah sebagai sumber hidup</p><h2>Tradisi belajar yang berlanjut dari halaman ke halaman.</h2></div><div><p>Keunikan koleksi tumbuh dari hubungan naskah dengan kehidupan pesantren. Catatan penyalin dan syarah kerap berdampingan dengan teks utama; beberapa penjelasan disesuaikan dengan tradisi lokal, seperti ukuran zakat fitrah dalam satuan Jawa.</p><p>Melalui katalog digital, koleksi yang dahulu tersimpan di lingkungan pesantren dapat ditelusuri dan dipelajari lebih luas, sekaligus mendukung penelitian serta penyusunan metadata dan pendaftaran koleksi ke Perpustakaan Nasional.</p><a className="primary-action" href="/katalog">Jelajahi katalog <BookOpen size={18}/></a></div></section>
  </main>;
  if (page === 'donation') return <main className="archive-content static-landing"><p className="eyebrow">Dukung pelestarian</p><h1>Donasi</h1><div className="content-state"><HandHeart size={30}/><h2>Informasi donasi resmi belum tersedia</h2><p>Periksa kembali nanti untuk mengetahui saluran donasi yang telah diumumkan pengelola.</p></div></main>;
  return <main className="archive-content static-landing"><p className="eyebrow">Kami siap membantu</p><h1>Kontak Kami</h1><section className="contact-card"><h2>Galeri Manuskrip Sampurnan (TPPKP Qomaruddin)</h2><p><Mail size={16}/> <a href="mailto:tppkp.qomaruddin@gmail.com">email: tppkp.qomaruddin@gmail.com</a></p><p><Phone size={16}/> Phone: <a href="tel:+6285314603330">+62 85314603330</a> - <a href="tel:+628995023222">+62 8995023222</a></p><p>Di bawah naungan Pondok Pesantren Qomaruddin dan YPP Qomaruddin.</p><p><small>© 2026 Qomaruddin. Design By PT Naracode Digital Inovasi.</small></p></section></main>;
}
