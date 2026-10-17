import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Download, LoaderCircle, Upload } from 'lucide-react';
import { downloadMetadataXlsx, readMetadataXlsx } from './services/metadataXlsx';
import { planMetadataImport, type ImportPlan, type CatalogRow } from './services/metadataImport';
import { applyMetadataImport, ImportOutcomeUnknownError } from './services/metadataPersistence';
import { listAdminBundles } from './services/turotsRepository';
import './metadata-transfer.css';

export default function MetadataTransfer({ bundles, onSaved }: { bundles: CatalogRow[]; onSaved: () => unknown }) {
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const [filename, setFilename] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [importing, setImporting] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [visibleActionCount, setVisibleActionCount] = useState(50);
  const [importResult, setImportResult] = useState<{ count: number; refreshWarning?: string } | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const pending = plan?.actions.filter(action => action.kind !== 'skip') || [];
  const endpoint = import.meta.env.VITE_SUPABASE_URL || 'belum dikonfigurasi';

  useEffect(() => {
    if (!importing) return;
    const timer = window.setInterval(() => setElapsedSeconds(seconds => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [importing]);

  async function preview(file?: File) {
    if (!file) return;
    setBusy(true); setFailure(''); setImportResult(null); setMessage('Membaca Excel dan memeriksa data server…'); setPlan(null); setConfirmed(false); setFilename(file.name); setVisibleActionCount(50);
    try {
      const workbook = await readMetadataXlsx(file);
      const current = await listAdminBundles();
      const next = planMetadataImport(workbook.bundles, workbook.titles, current, workbook.photos);
      setPlan(next); setVisibleActionCount(50); setMessage('Pratinjau siap. Belum ada perubahan yang disimpan.');
    } catch (error) { setFailure((error as Error).message); setMessage(''); }
    finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  async function save() {
    if (!plan || busy || !confirmed || plan.errors.length || !pending.length) return;
    setBusy(true); setImporting(true); setElapsedSeconds(0); setFailure(''); setImportResult(null);
    setMessage(`Memeriksa data terbaru sebelum mengirim ${pending.length} perubahan…`);
    try {
      const result = await applyMetadataImport(plan, undefined, setMessage);
      setImporting(false);
      setImportResult({ count: result.completed.length });
      setMessage(`Impor berhasil: ${result.completed.length} dari ${pending.length} perubahan dikonfirmasi tersimpan dalam satu transaksi. Memuat ulang daftar admin…`);
      setPlan(null); setConfirmed(false);
      try { await onSaved(); }
      catch (error) {
        const refreshWarning = error instanceof Error ? error.message : String(error);
        setImportResult({ count: result.completed.length, refreshWarning });
        setMessage(`Impor berhasil: ${result.completed.length} perubahan tersimpan. Daftar admin belum berhasil dimuat ulang.`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      setFailure(reason);
      setMessage(error instanceof ImportOutcomeUnknownError
        ? 'Status impor belum dapat dipastikan. Jangan langsung mengirim ulang. Periksa ekspor atau pratinjau data terbaru terlebih dahulu.'
        : 'Impor belum selesai. Pratinjau masih tersedia; periksa alasan di bawah, perbaiki jika perlu, lalu pratinjau ulang.');
      setConfirmed(false);
    }
    finally { setBusy(false); setImporting(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  return <section className="metadata-transfer" aria-labelledby="excel-heading" aria-busy={busy}>
    <div className="metadata-transfer-heading"><div><h2 id="excel-heading">Metadata Excel</h2><p>Isi bendel dan judul melalui Excel. Foto tetap dikelola di editor bendel.</p></div>
    </div>
    <div className="metadata-transfer-actions">
      <button type="button" className="secondary-action" disabled={busy} onClick={() => downloadMetadataXlsx([], true)}><Download size={16} aria-hidden="true"/>Unduh template Excel</button>
      <button type="button" className="secondary-action" disabled={busy} onClick={() => downloadMetadataXlsx(bundles, false)}><Download size={16} aria-hidden="true"/>Ekspor metadata + URL</button>
      <button type="button" className="primary-action" disabled={busy} onClick={() => fileInput.current?.click()}><Upload size={16} aria-hidden="true"/>Pilih Excel untuk pratinjau</button>
      <input ref={fileInput} type="file" hidden accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void preview(file); }}/>
    </div>
    <p className="metadata-target">Database tujuan: <strong>{endpoint}</strong>. Menjalankan localhost tetap menyimpan ke database ini.</p>
    <p className="metadata-help">Sel kosong mempertahankan data lama. Gunakan <code>#HAPUS</code> untuk mengosongkan field opsional. URL adalah tautan klik; edit Excel perlu diimpor kembali.</p>
    <div ref={summary} tabIndex={-1} className="metadata-summary">
      {!importing && !importResult && <p role={failure ? 'alert' : 'status'} aria-live="polite" className={failure ? 'metadata-error' : undefined}>{message}</p>}
      {importing && <div className="metadata-import-progress" role="status" aria-live="polite"><LoaderCircle className="metadata-import-spinner" size={20} aria-hidden="true"/><div><strong>Impor sedang berjalan</strong><p>{message}</p><small>{pending.length} perubahan diproses dalam satu transaksi. Server memberi konfirmasi setelah transaksi selesai. Waktu berjalan: {Math.floor(elapsedSeconds / 60)} menit {elapsedSeconds % 60} detik.</small></div></div>}
      {failure && <div role="alert" className="metadata-error"><strong>Alasan:</strong><p>{failure}</p></div>}
      {importResult && <div className="metadata-import-success" role="status"><CheckCircle2 size={21} aria-hidden="true"/><div><strong>Transaksi selesai: {importResult.count} perubahan berhasil disimpan.</strong>{importResult.refreshWarning && <p>Perincian pemuatan ulang daftar admin: {importResult.refreshWarning}</p>}<p>Ekspor ulang metadata untuk memeriksa data yang tersimpan.</p></div></div>}
      {plan && <>
        <h3>Pratinjau: {filename}</h3>
        <p>{plan.actions.filter(a => a.kind === 'create').length} baru · {plan.actions.filter(a => a.kind === 'update').length} diperbarui · {plan.actions.filter(a => a.kind === 'skip').length} tanpa perubahan</p>
        {plan.errors.length > 0 && <div role="alert" className="metadata-error"><strong>{plan.errors.length} kesalahan — perbaiki Excel lalu pilih ulang.</strong><ul>{plan.errors.map((error, i) => <li key={i}>{error}</li>)}</ul></div>}
        {plan.warnings.length > 0 && <details><summary>{plan.warnings.length} catatan impor</summary><ul>{plan.warnings.map((warning, i) => <li key={i}>{warning}</li>)}</ul></details>}
        <div className="metadata-table-scroll" tabIndex={0} role="region" aria-label="Perubahan metadata"><table><thead><tr><th>Lembar / baris</th><th>Kode / ID</th><th>Tindakan</th><th>Perubahan</th></tr></thead><tbody>{plan.actions.slice(0, visibleActionCount).map((action, i) => <tr key={i}><td>{action.sheet} / {action.row}</td><td>{action.key}</td><td>{action.kind === 'create' ? 'Tambah' : action.kind === 'update' ? 'Perbarui' : 'Tetap'}</td><td>{action.changes.length ? <details><summary>{action.changes.length} field</summary><dl>{action.changes.map(change => <div key={change.field}><dt>{change.field}</dt><dd><span>{String(change.before ?? '(kosong)')}</span> → <strong dir="auto">{String(change.after ?? '(dihapus)')}</strong></dd></div>)}</dl></details> : '—'}</td></tr>)}</tbody></table>{visibleActionCount < plan.actions.length && <button type="button" className="secondary-action metadata-load-more" onClick={() => setVisibleActionCount(count => Math.min(count + 50, plan.actions.length))}>Tampilkan {Math.min(50, plan.actions.length - visibleActionCount)} perubahan berikutnya ({visibleActionCount} dari {plan.actions.length})</button>}</div>
        {!plan.errors.length && pending.length > 0 && <><label className="metadata-confirm"><input type="checkbox" checked={confirmed} disabled={busy} onChange={event => setConfirmed(event.target.checked)}/>Saya sudah memeriksa perubahan dan akan menyimpan {pending.length} baris ke database di atas.</label><p className="metadata-help">Semua perubahan disimpan dalam satu transaksi. Jika satu perubahan gagal, seluruh impor dibatalkan. Bendel baru tetap draf.</p></>}
        <div className="metadata-transfer-actions"><button type="button" className="primary-action" disabled={busy || !confirmed || !!plan.errors.length || !pending.length} onClick={() => void save()}>{busy ? <><LoaderCircle className="metadata-import-spinner" size={16} aria-hidden="true"/> {importing ? `Mengirim ${pending.length} perubahan…` : 'Memuat ulang daftar…'}</> : `Simpan ${pending.length} perubahan ke database`}</button><button type="button" className="secondary-action" disabled={busy} onClick={() => { setPlan(null); setConfirmed(false); setMessage('Pratinjau dibatalkan.'); }}>Batalkan</button></div>
      </>}
    </div>
  </section>;
}
