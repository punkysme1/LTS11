import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Download, LoaderCircle, Sparkles, Upload } from 'lucide-react';
import { downloadMetadataXlsx, readMetadataXlsx } from './services/metadataXlsx';
import { parseAiTitleJsonBatch } from './services/aiMetadataJson';
import { planMetadataImport, type ImportPlan, type CatalogRow } from './services/metadataImport';
import { applyMetadataImport, ImportOutcomeUnknownError } from './services/metadataPersistence';
import { listAdminBundles } from './services/turotsRepository';
import './metadata-transfer.css';

export default function MetadataTransfer({ onSaved }: { onSaved: () => unknown }) {
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const [filename, setFilename] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [importing, setImporting] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [visibleActionCount, setVisibleActionCount] = useState(50);
  const [jsonInput, setJsonInput] = useState('');
  const [defaultBundleCode, setDefaultBundleCode] = useState('');
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
      next.warnings.push(...workbook.warnings);
      setPlan(next); setVisibleActionCount(50); setMessage(next.actions.some(action=>action.kind!=='skip') ? 'Pratinjau siap. Belum ada perubahan yang disimpan.' : 'Tidak ada perubahan metadata judul yang dapat disimpan. Isian nomor otomatis dan metadata referensi Bendel tidak diterapkan; periksa catatan impor di bawah.');
    } catch (error) { setFailure((error as Error).message); setMessage(''); }
    finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  async function previewAiJson() {
    setBusy(true); setFailure(''); setImportResult(null); setMessage('Memeriksa JSON AI dan mencocokkan data server…'); setPlan(null); setConfirmed(false); setFilename('JSON AI Notebook'); setVisibleActionCount(50);
    try {
      const { titles, warnings } = parseAiTitleJsonBatch(jsonInput, defaultBundleCode);
      const current = await listAdminBundles();
      const next = planMetadataImport([], titles, current);
      next.warnings.push(...warnings);
      setPlan(next); setVisibleActionCount(50);
      setMessage(next.actions.some(action => action.kind !== 'skip')
        ? `Pratinjau JSON AI siap (${titles.length} judul). Belum ada perubahan yang disimpan.`
        : 'Tidak ada perubahan metadata judul yang dapat disimpan dari JSON tersebut.');
    } catch (error) { setFailure((error as Error).message); setMessage(''); }
    finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  async function exportLatest() {
    setBusy(true); setFailure(''); setImportResult(null);
    setMessage('Mengambil snapshot terbaru dari database…');
    try {
      const latestBundles = await listAdminBundles();
      const titleCount = latestBundles.reduce((total, bundle) => total + (bundle.turots_text_units?.filter((unit:any)=>!unit.archived_at).length || 0), 0);
      downloadMetadataXlsx(latestBundles, false);
      setMessage(`Ekspor selesai dari database saat ini: ${latestBundles.length} bendel, ${titleCount} judul aktif. Foto tidak disertakan.`);
    } catch (error) {
      setMessage('Ekspor gagal mengambil data terbaru dari database.');
      setFailure(error instanceof Error ? error.message : String(error));
    } finally { setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
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
      setPlan(null); setConfirmed(false); setJsonInput('');
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
    <div className="metadata-transfer-heading"><div><h2 id="excel-heading">Metadata Excel</h2><p>Edit metadata judul melalui Excel. Bendel hanya referensi; lembar Foto lama diabaikan.</p></div>
    </div>
    <div className="metadata-transfer-actions">
      <button type="button" className="secondary-action" disabled={busy} onClick={() => downloadMetadataXlsx([], true)}><Download size={16} aria-hidden="true"/>Unduh template Excel</button>
      <button type="button" className="secondary-action" disabled={busy} onClick={() => void exportLatest()}><Download size={16} aria-hidden="true"/>Ekspor metadata + URL terbaru</button>
      <button type="button" className="primary-action" disabled={busy} onClick={() => fileInput.current?.click()}><Upload size={16} aria-hidden="true"/>Pilih Excel untuk pratinjau</button>
      <input ref={fileInput} type="file" hidden accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void preview(file); }}/>
    </div>
    <p className="metadata-target">Database tujuan: <strong>{endpoint}</strong>. Menjalankan localhost tetap menyimpan ke database ini.</p>
    <p className="metadata-help">Sel kosong mempertahankan data lama. Gunakan <code>#HAPUS</code> untuk mengosongkan field opsional. URL adalah tautan klik; edit Excel perlu diimpor kembali.</p>
    <details className="metadata-ai-panel">
      <summary><Sparkles size={15} aria-hidden="true"/> Tempel JSON AI (1 atau banyak judul sekaligus)</summary>
      <div className="metadata-ai-body">
        <p className="metadata-help">Tempel blok JSON dari Notebook Gemini (1 objek judul atau array beberapa judul). Jika mengganti judul lama di bendel, hapus atau arsipkan judul lama terlebih dahulu agar rentang halaman tidak bentrok.</p>
        <label>Kode bendel default (opsional, dipakai jika JSON tidak mencantumkan <code>bundle_bundle_code</code>)
          <input value={defaultBundleCode} onChange={event => setDefaultBundleCode(event.target.value)} placeholder="Contoh: DS 0097 00003" />
        </label>
        <label>JSON metadata judul dari Notebook Gemini
          <textarea rows={7} value={jsonInput} onChange={event => setJsonInput(event.target.value)} placeholder={'[\n  {\n    "bundle_bundle_code": "DS 0097 00003",\n    "title_page_ranges_label": "1r-12v",\n    "title_title_original": "...",\n    "title_category_primary": "Fikih"\n  }\n]'} />
        </label>
        <div className="metadata-transfer-actions">
          <button type="button" className="primary-action" disabled={busy || !jsonInput.trim()} onClick={() => void previewAiJson()}><Sparkles size={16} aria-hidden="true"/>Pratinjau JSON AI</button>
          {jsonInput && <button type="button" className="secondary-action" disabled={busy} onClick={() => setJsonInput('')}>Bersihkan JSON</button>}
        </div>
      </div>
    </details>
    <div ref={summary} tabIndex={-1} className="metadata-summary">
      {!importing && !importResult && <p role={failure ? 'alert' : 'status'} aria-live="polite" className={failure ? 'metadata-error' : undefined}>{message}</p>}
      {importing && <div className="metadata-import-progress" role="status" aria-live="polite"><LoaderCircle className="metadata-import-spinner" size={20} aria-hidden="true"/><div><strong>Impor sedang berjalan</strong><p>{message}</p><small>{pending.length} perubahan diproses dalam satu transaksi. Server memberi konfirmasi setelah transaksi selesai. Waktu berjalan: {Math.floor(elapsedSeconds / 60)} menit {elapsedSeconds % 60} detik.</small></div></div>}
      {failure && <div role="alert" className="metadata-error"><strong>Alasan:</strong><p>{failure}</p></div>}
      {importResult && <div className="metadata-import-success" role="status"><CheckCircle2 size={21} aria-hidden="true"/><div><strong>Transaksi selesai: {importResult.count} perubahan berhasil disimpan.</strong>{importResult.refreshWarning && <p>Perincian pemuatan ulang daftar admin: {importResult.refreshWarning}</p>}<p>Ekspor ulang metadata untuk memeriksa data yang tersimpan.</p></div></div>}
      {plan && <>
        <h3>Pratinjau: {filename}</h3>
        <p>{plan.actions.filter(a => a.kind === 'create').length} baru · {plan.actions.filter(a => a.kind === 'update').length} diperbarui · {plan.actions.filter(a => a.kind === 'skip').length} tanpa perubahan</p>
        {plan.errors.length > 0 && <div role="alert" className="metadata-error"><strong>{plan.errors.length} kesalahan — perbaiki Excel lalu pilih ulang.</strong><ul>{plan.errors.map((error, i) => <li key={i}>{error}</li>)}</ul></div>}
        {plan.warnings.length > 0 && <details open={!pending.length}><summary>{plan.warnings.length} catatan impor</summary><ul>{plan.warnings.map((warning, i) => <li key={i}>{warning}</li>)}</ul></details>}
        <div className="metadata-table-scroll" tabIndex={0} role="region" aria-label="Perubahan metadata"><table><thead><tr><th>Lembar / baris</th><th>Kode / ID</th><th>Tindakan</th><th>Perubahan</th></tr></thead><tbody>{plan.actions.slice(0, visibleActionCount).map((action, i) => <tr key={i}><td>{action.sheet} / {action.row}</td><td>{action.key}</td><td>{action.kind === 'create' ? 'Tambah' : action.kind === 'update' ? 'Perbarui' : 'Tetap'}</td><td>{action.changes.length ? <details><summary>{action.changes.length} field</summary><dl>{action.changes.map(change => <div key={change.field}><dt>{change.field}</dt><dd><span>{String(change.before ?? '(kosong)')}</span> → <strong dir="auto">{String(change.after ?? '(dihapus)')}</strong></dd></div>)}</dl></details> : '—'}</td></tr>)}</tbody></table>{visibleActionCount < plan.actions.length && <button type="button" className="secondary-action metadata-load-more" onClick={() => setVisibleActionCount(count => Math.min(count + 50, plan.actions.length))}>Tampilkan {Math.min(50, plan.actions.length - visibleActionCount)} perubahan berikutnya ({visibleActionCount} dari {plan.actions.length})</button>}</div>
        {!plan.errors.length && pending.length > 0 && <><label className="metadata-confirm"><input type="checkbox" checked={confirmed} disabled={busy} onChange={event => setConfirmed(event.target.checked)}/>Saya sudah memeriksa perubahan dan akan menyimpan {pending.length} baris ke database di atas.</label><p className="metadata-help">Semua perubahan disimpan dalam satu transaksi. Jika satu perubahan gagal, seluruh impor dibatalkan. Nomor inventaris dihitung ulang setelah simpan.</p></>}
        <div className="metadata-transfer-actions"><button type="button" className="primary-action" disabled={busy || !confirmed || !!plan.errors.length || !pending.length} onClick={() => void save()}>{busy ? <><LoaderCircle className="metadata-import-spinner" size={16} aria-hidden="true"/> {importing ? `Mengirim ${pending.length} perubahan…` : 'Memuat ulang daftar…'}</> : `Simpan ${pending.length} perubahan ke database`}</button><button type="button" className="secondary-action" disabled={busy} onClick={() => { setPlan(null); setConfirmed(false); setMessage('Pratinjau dibatalkan.'); }}>Batalkan</button></div>
      </>}
    </div>
  </section>;
}
