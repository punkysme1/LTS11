import { FormEvent, useEffect, useState } from 'react';
import { BookHeart, Send } from 'lucide-react';
import { listGuestbook, submitGuestbookEntry, type GuestbookEntry } from './services/editorialContent';

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadEntries = () => {
    setLoading(true);
    void listGuestbook('accepted').then(setEntries).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Buku Tamu belum dapat dimuat.')).finally(() => setLoading(false));
  };
  useEffect(loadEntries, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(''); setError('');
    if (website) { setNotice('Terima kasih sudah mengisi Buku Tamu.'); return; }
    setSaving(true);
    try {
      await submitGuestbookEntry({ name: name.trim(), affiliation: affiliation.trim() || null, message: message.trim() });
      setName(''); setAffiliation(''); setMessage('');
      setNotice('Terima kasih. Pesan Anda sudah dikirim dan akan ditampilkan setelah ditinjau pengelola.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Pesan belum dapat dikirim. Silakan coba lagi.'); }
    finally { setSaving(false); }
  }

  return <main className="archive-content guestbook-page"><p className="eyebrow">Sapa pengelola dan pembaca</p><h1>Buku Tamu</h1><p className="page-intro">Tinggalkan kesan atau catatan Anda. Pesan akan ditinjau pengelola sebelum tampil di halaman ini.</p>
    <div className="guestbook-layout"><form className="guestbook-form" onSubmit={submit}>
      <label>Nama<input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama Anda"/></label>
      <label>Institusi atau asal <span className="optional-label">(opsional)</span><input maxLength={160} autoComplete="organization" value={affiliation} onChange={(event) => setAffiliation(event.target.value)} placeholder="Contoh: Pondok Pesantren…"/></label>
      <label>Pesan<textarea required minLength={4} maxLength={2000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tuliskan pesan Anda"/></label>
      <label className="honeypot" aria-hidden="true" tabIndex={-1}>Website<input autoComplete="off" tabIndex={-1} value={website} onChange={(event) => setWebsite(event.target.value)}/></label>
      {notice && <p className="form-notice" role="status">{notice}</p>}{error && <p className="form-error" role="alert">{error}<button type="button" className="text-action" onClick={loadEntries}>Coba muat ulang daftar pesan</button></p>}
      <button className="primary-action" type="submit" disabled={saving}>{saving ? 'Mengirim…' : 'Kirim pesan'} <Send size={17}/></button>
    </form><section className="guestbook-list" aria-label="Pesan yang sudah diterima"><h2><BookHeart size={23}/> Pesan pengunjung</h2>{loading ? <p role="status">Memuat pesan…</p> : entries.length ? entries.map((entry) => <blockquote key={entry.id}><p>{entry.message}</p><footer><strong>{entry.name}</strong>{entry.affiliation && <span>{entry.affiliation}</span>}</footer></blockquote>) : <div className="content-state"><p>Belum ada pesan yang ditampilkan.</p></div>}</section></div>
  </main>;
}
