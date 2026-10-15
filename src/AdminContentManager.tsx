import { FormEvent, useEffect, useRef, useState } from 'react';
import { Check, Eye, FilePlus2, Save, Upload, X } from 'lucide-react';
import { listAdminContent, listGuestbook, moderateGuestbookEntry, saveEditorialEntry, type EditorialEntry, type EditorialType, type GuestbookEntry, type PublicationState } from './services/editorialContent';
import { supabase } from './lib/supabase';

const pageLabels: Record<EditorialType, string> = { article: 'Artikel', information: 'Informasi', announcement: 'Pengumuman' };
const makeSlug = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function AdminOverview({ navigate }: { navigate: (path: string) => void }) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    void (async () => {
      if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
      const result = await Promise.all([
        supabase.from('turots_text_units').select('id', { count: 'exact', head: true }),
        supabase.from('turots_content').select('id', { count: 'exact', head: true }).eq('content_type', 'article'),
        supabase.from('turots_content').select('id', { count: 'exact', head: true }).eq('content_type', 'information'),
        supabase.from('turots_content').select('id', { count: 'exact', head: true }).eq('content_type', 'announcement'),
        supabase.from('turots_guestbook').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);
      const failures = result.filter((item) => item.error);
      if (failures.length) throw failures[0].error;
      if (active) setCounts({ manuscripts: result[0].count || 0, articles: result[1].count || 0, information: result[2].count || 0, announcements: result[3].count || 0, pending: result[4].count || 0 });
    })().catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Ringkasan belum dapat dimuat.'); });
    return () => { active = false; };
  }, []);

  const cards = [
    ['Manuskrip', counts?.manuscripts, '/admin/manuskrip'], ['Artikel', counts?.articles, '/admin/artikel'],
    ['Informasi', counts?.information, '/admin/informasi'], ['Pengumuman', counts?.announcements, '/admin/pengumuman'],
    ['Buku Tamu menunggu', counts?.pending, '/admin/buku-tamu'],
  ] as const;
  return <section className="admin-page-content"><p className="eyebrow">Ruang pengelola</p><h1>Dashboard</h1><p className="admin-intro">Kelola katalog manuskrip dan konten Galeri Manuskrip Sampurnan.</p>
    {error && <p className="form-error" role="status">Ringkasan menunggu migrasi Supabase: {error}</p>}
    <div className="admin-overview-grid">{cards.map(([label, count, path]) => <button className="admin-stat-card" key={path} onClick={() => navigate(path)}><span>{label}</span><strong>{count ?? '—'}</strong><small>Kelola <span aria-hidden="true">→</span></small></button>)}</div>
    <div className="admin-welcome"><h2>Mulai dari sini</h2><p>Pilih bagian dari menu untuk menambah tulisan, menerbitkan informasi, atau meninjau kiriman Buku Tamu.</p><button className="primary-action" onClick={() => navigate('/admin/manuskrip')}>Buka katalog manuskrip <Eye size={17}/></button></div>
  </section>;
}

const emptyEditorialDraft = (type: EditorialType): Partial<EditorialEntry> => ({ content_type: type, title: '', slug: '', excerpt: '', body: '', cover_image_url: '', status: 'draft', featured: false });

export function AdminEditorialManager({ type, userId }: { type: EditorialType; userId: string; key?: string }) {
  const storageKey = `turots-editorial-draft:${userId}:${type}`;
  const initialDraft = () => {
    try { const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); if (saved?.content_type === type) return saved as Partial<EditorialEntry>; } catch { /* Use a blank draft if browser storage is unavailable. */ }
    return emptyEditorialDraft(type);
  };
  const [entries, setEntries] = useState<EditorialEntry[]>([]);
  const [draft, setDraftState] = useState<Partial<EditorialEntry>>(initialDraft);
  const currentDraft = useRef(draft);
  const [uploading, setUploading] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const draftVersion = useRef(0);
  const uploadController = useRef<AbortController | null>(null);
  useEffect(() => () => { draftVersion.current += 1; uploadController.current?.abort(); }, []);
  const setDraft = (next: Partial<EditorialEntry>) => {
    currentDraft.current = next;
    setDraftState(next);
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setError('Browser tidak dapat menyimpan cadangan isian. Simpan konten sebelum meninggalkan halaman.'); }
  };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const load = () => { setLoading(true); void listAdminContent(type).then(setEntries).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Daftar konten gagal dimuat.')).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, [type]);
  const update = (key: string, value: string | boolean) => { const current = currentDraft.current; setDraft({ ...current, [key]: value, ...(key === 'title' && !current.id ? { slug: makeSlug(String(value)) } : {}) }); };
  const reset = () => { draftVersion.current += 1; setDraft(emptyEditorialDraft(type)); };
  async function uploadImage(file?: File) {
    if (!file || uploading) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['jpg','jpeg','png'].includes(extension)) return setError('Pilih gambar JPG atau PNG.');
    if (!file.size || file.size > 10 * 1024 * 1024) return setError('Ukuran gambar harus antara 1 byte dan 10 MiB.');
    const version = draftVersion.current;
    const controller = new AbortController(); uploadController.current = controller;
    const timeout = window.setTimeout(()=>controller.abort(),120000);
    setUploading(true); setError(''); setNotice('Mengunggah gambar…');
    try {
      const { data, error: sessionError } = await supabase!.auth.getSession();
      if (sessionError || !data.session) throw new Error('Sesi berakhir. Silakan masuk kembali.');
      const filename = `editorial-${crypto.randomUUID()}.${extension}`;
      const response = await fetch(`https://cloud.naracode.id/admin-upload/${filename}`, {
        method: 'POST', headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': file.type || 'application/octet-stream' }, body: file,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Unggah gambar gagal (HTTP ${response.status}). Silakan coba lagi.`);
      if (version === draftVersion.current) {
        update('cover_image_url', `https://cloud.naracode.id/iiif/3/${filename}/full/max/0/default.jpg`);
        setNotice('Gambar berhasil diunggah. Simpan konten untuk menerapkan gambar sampul.');
      }
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Gambar belum dapat diunggah.'); }
    finally { clearTimeout(timeout); setUploading(false); }
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (uploading || saving) return; setSaving(true); setNotice(''); setError('');
    try {
      await saveEditorialEntry({ ...draft, content_type: type, slug: makeSlug(draft.slug || draft.title || ''), title: draft.title?.trim() || '', body: draft.body?.trim() || '', status: (draft.status || 'draft') as PublicationState });
      setNotice('Perubahan konten tersimpan.'); reset(); load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Konten belum dapat disimpan.'); }
    finally { setSaving(false); }
  }
  return <section className="admin-page-content"><div className="admin-content-heading"><div><p className="eyebrow">Kelola publikasi</p><h1>{pageLabels[type]}</h1><p>Konten berbentuk teks biasa; setiap baris dan tautan aman ditampilkan sebagai teks.</p></div><button className="secondary-action" disabled={saving||uploading} onClick={reset}><FilePlus2 size={17}/> Konten baru</button></div>
    <form className="editorial-editor" onSubmit={save}><p className="metadata-help">Isian dicadangkan di tab browser ini saat Anda berpindah halaman. Klik Simpan konten untuk menyimpannya ke server.</p><fieldset disabled={saving} style={{border:0,padding:0,margin:0,minWidth:0,display:'grid',gap:16}}><h2>{draft.id ? 'Edit konten' : `Tulis ${pageLabels[type].toLocaleLowerCase()}`}</h2>
      <label>Judul<input required maxLength={240} value={draft.title || ''} onChange={(event) => update('title', event.target.value)}/></label>
      <label>Alamat halaman (slug)<input required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={180} value={draft.slug || ''} onChange={(event) => update('slug', event.target.value)}/><small>Contoh: kajian-manuskrip-nusantara</small></label>
      <label>Ringkasan<textarea aria-label="Ringkasan" maxLength={600} rows={3} value={draft.excerpt || ''} onChange={(event) => update('excerpt', event.target.value)}/></label>
      <label>Isi<textarea aria-label="Isi" required maxLength={100000} rows={12} value={draft.body || ''} onChange={(event) => update('body', event.target.value)}/></label>
      <label>URL gambar sampul <span className="optional-label">(opsional)</span><input type="url" value={draft.cover_image_url || ''} onChange={(event) => update('cover_image_url', event.target.value)}/></label>
      <div className="form-actions"><button type="button" className="secondary-action" disabled={uploading||saving} onClick={()=>imageInput.current?.click()}><Upload size={17}/>{uploading?'Mengunggah gambar…':'Unggah gambar'}</button><small>JPG atau PNG, maksimum 10 MiB. URL akan terisi otomatis.</small><input ref={imageInput} type="file" hidden accept=".jpg,.jpeg,.png" onChange={event=>{const file=event.currentTarget.files?.[0];event.currentTarget.value='';void uploadImage(file);}}/></div>
      {draft.cover_image_url&&<img src={draft.cover_image_url} alt="Pratinjau gambar sampul" style={{maxWidth:'100%',width:320,maxHeight:220,objectFit:'contain'}}/>}
      <div className="editorial-editor-options"><label>Status<select value={draft.status || 'draft'} onChange={(event) => update('status', event.target.value)}><option value="draft">Draf</option><option value="published">Terbitkan</option><option value="archived">Arsip</option></select></label><label className="checkbox-row"><input type="checkbox" checked={Boolean(draft.featured)} onChange={(event) => update('featured', event.target.checked)}/> Utamakan di daftar</label></div>
      {notice && <p role="status" className="form-notice">{notice}</p>}{error && <p role="alert" className="form-error">{error}</p>}
      <div className="form-actions"><button className="primary-action" disabled={saving||uploading}>{saving ? 'Menyimpan…' : 'Simpan konten'} <Save size={17}/></button>{draft.id && <button type="button" className="secondary-action" disabled={uploading||saving} onClick={reset}>Batalkan edit</button>}</div>
    </fieldset></form>
    <section className="admin-content-list"><h2>Konten tersimpan <span>{entries.length}</span></h2>{loading ? <p role="status">Memuat konten…</p> : entries.length ? entries.map((entry) => <article key={entry.id}><div><span className={`status-pill status-${entry.status}`}>{entry.status === 'published' ? 'Terbit' : entry.status === 'archived' ? 'Arsip' : 'Draf'}</span><h3 dir="auto">{entry.title}</h3><small>/{type === 'article' ? 'artikel' : type === 'information' ? 'informasi' : 'pengumuman'}/{entry.slug}</small></div><button className="secondary-action" disabled={saving||uploading} onClick={() => { draftVersion.current += 1; setDraft(entry); setNotice(''); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button></article>) : <p>Belum ada konten. Mulai dari formulir di atas.</p>}</section>
  </section>;
}

export function AdminGuestbookManager() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [filter, setFilter] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState('');
  const load = () => { setLoading(true); void listGuestbook(filter).then(setEntries).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Buku Tamu gagal dimuat.')).finally(() => setLoading(false)); };
  useEffect(() => { setError(''); load(); }, [filter]);
  async function moderate(entry: GuestbookEntry, status: 'accepted' | 'rejected') {
    setBusy(entry.id); setError(''); setNotice('');
    try { await moderateGuestbookEntry(entry.id, status); setNotice(status === 'accepted' ? 'Pesan diterima dan akan tampil di halaman publik.' : 'Pesan ditolak dan tidak akan ditampilkan.'); load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Status pesan gagal diperbarui.'); }
    finally { setBusy(''); }
  }
  return <section className="admin-page-content"><div className="admin-content-heading"><div><p className="eyebrow">Moderasi kiriman pengunjung</p><h1>Buku Tamu</h1><p>Pesan pengunjung tidak memerlukan konfirmasi email dan menunggu keputusan admin sebelum tampil.</p></div></div>
    <div className="guestbook-admin-filters" role="group" aria-label="Filter status pesan">{(['pending', 'accepted', 'rejected'] as const).map((status) => <button key={status} aria-pressed={filter === status} onClick={() => setFilter(status)}>{status === 'pending' ? 'Menunggu' : status === 'accepted' ? 'Diterima' : 'Ditolak'}</button>)}</div>
    {notice && <p role="status" className="form-notice">{notice}</p>}{error && <p role="alert" className="form-error">{error}</p>}
    <div className="guestbook-review-list">{loading ? <p role="status">Memuat pesan…</p> : entries.length ? entries.map((entry) => <article key={entry.id}><header><div><h2>{entry.name}</h2>{entry.affiliation && <p>{entry.affiliation}</p>}</div><time dateTime={entry.created_at}>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(entry.created_at))}</time></header><blockquote>{entry.message}</blockquote>{filter === 'pending' && <div className="form-actions"><button className="primary-action" disabled={busy === entry.id} onClick={() => void moderate(entry, 'accepted')}><Check size={18}/> Terima</button><button className="reject-action" disabled={busy === entry.id} onClick={() => void moderate(entry, 'rejected')}><X size={18}/> Tolak</button></div>}</article>) : <div className="content-state"><h2>Tidak ada pesan {filter === 'pending' ? 'yang menunggu' : filter === 'accepted' ? 'yang diterima' : 'yang ditolak'}</h2></div>}</div>
  </section>;
}
