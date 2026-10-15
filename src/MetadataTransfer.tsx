import { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { downloadMetadataXlsx, readMetadataXlsx } from './services/metadataXlsx';
import { planMetadataImport, type ImportPlan, type CatalogRow } from './services/metadataImport';
import { applyMetadataImport } from './services/metadataPersistence';
import { listAdminBundles } from './services/turotsRepository';
import './metadata-transfer.css';

export default function MetadataTransfer({ bundles, onSaved }: { bundles: CatalogRow[]; onSaved: () => unknown }) {
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const [filename, setFilename] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const pending = plan?.actions.filter(action => action.kind !== 'skip') || [];
  const endpoint = import.meta.env.VITE_SUPABASE_URL || 'belum dikonfigurasi';

  async function preview(file?: File) {
    if (!file) return;
    setBusy(true); setFailure(''); setMessage('Membaca Excel dan memeriksa data server…'); setPlan(null); setConfirmed(false); setFilename(file.name);
    try {
      const workbook = await readMetadataXlsx(file);
      const current = await listAdminBundles();
      const next = planMetadataImport(workbook.bundles, workbook.titles, current, workbook.photos);
      setPlan(next); setMessage('Pratinjau siap. Belum ada perubahan yang disimpan.');
    } catch (error) { setFailure((error as Error).message); setMessage(''); }
    finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  async function save() {
    if (!plan || busy || !confirmed || plan.errors.length || !pending.length) return;
    setBusy(true); setFailure('');
    try {
      const result = await applyMetadataImport(plan, undefined, setMessage);
      setMessage(`${result.completed.length} baris selesai disimpan. ${result.failed ? (result.completed.length ? 'Proses berhenti; baris sebelumnya tetap tersimpan.' : 'Proses berhenti pada baris pertama. Periksa rincian kegagalan di bawah.') : 'Ekspor ulang untuk mendapatkan metadata dan URL terbaru.'}`);
      setFailure(result.failed || '');
      setPlan(null); setConfirmed(false); await onSaved();
    } catch (error) { setFailure((error as Error).message); setMessage('Penyimpanan tidak dilanjutkan.'); setPlan(null); setConfirmed(false); }
    finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
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
      <p role="status">{message}</p>{failure && <p role="alert" className="metadata-error">{failure}</p>}
      {plan && <>
        <h3>Pratinjau: {filename}</h3>
        <p>{plan.actions.filter(a => a.kind === 'create').length} baru · {plan.actions.filter(a => a.kind === 'update').length} diperbarui · {plan.actions.filter(a => a.kind === 'skip').length} tanpa perubahan</p>
        {plan.errors.length > 0 && <div role="alert" className="metadata-error"><strong>{plan.errors.length} kesalahan — perbaiki Excel lalu pilih ulang.</strong><ul>{plan.errors.map((error, i) => <li key={i}>{error}</li>)}</ul></div>}
        {plan.warnings.length > 0 && <details><summary>{plan.warnings.length} catatan impor</summary><ul>{plan.warnings.map((warning, i) => <li key={i}>{warning}</li>)}</ul></details>}
        <div className="metadata-table-scroll" tabIndex={0} role="region" aria-label="Perubahan metadata"><table><thead><tr><th>Lembar / baris</th><th>Kode / ID</th><th>Tindakan</th><th>Perubahan</th></tr></thead><tbody>{plan.actions.map((action, i) => <tr key={i}><td>{action.sheet} / {action.row}</td><td>{action.key}</td><td>{action.kind === 'create' ? 'Tambah' : action.kind === 'update' ? 'Perbarui' : 'Tetap'}</td><td>{action.changes.length ? <details><summary>{action.changes.length} field</summary><dl>{action.changes.map(change => <div key={change.field}><dt>{change.field}</dt><dd><span>{String(change.before ?? '(kosong)')}</span> → <strong dir="auto">{String(change.after ?? '(dihapus)')}</strong></dd></div>)}</dl></details> : '—'}</td></tr>)}</tbody></table></div>
        {!plan.errors.length && pending.length > 0 && <><label className="metadata-confirm"><input type="checkbox" checked={confirmed} disabled={busy} onChange={event => setConfirmed(event.target.checked)}/>Saya sudah memeriksa perubahan dan akan menyimpan {pending.length} baris ke database di atas.</label><p className="metadata-help">Penyimpanan berjalan per baris. Jika koneksi terputus, hasil sebagian akan dilaporkan. Bendel baru tetap draf.</p></>}
        <div className="metadata-transfer-actions"><button type="button" className="primary-action" disabled={busy || !confirmed || !!plan.errors.length || !pending.length} onClick={() => void save()}>Simpan {pending.length} perubahan ke database</button><button type="button" className="secondary-action" disabled={busy} onClick={() => { setPlan(null); setConfirmed(false); setMessage('Pratinjau dibatalkan.'); }}>Batalkan</button></div>
      </>}
    </div>
  </section>;
}
