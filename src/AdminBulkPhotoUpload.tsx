import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, FileArchive, FolderOpen, LoaderCircle, RefreshCw, Save, Upload, XCircle } from 'lucide-react';
import { invalidateDetailRequestCache } from './DetailV1';
import { publishBulkCantaloupeBundle, saveBulkCantaloupePages } from './services/turotsRepository';

type Bundle = Record<string, any>;
type Session = { access_token?: string; user?: { id?: string } };
type FileState = 'unchecked' | 'checking' | 'uploading' | 'verified' | 'saved' | 'failed';
type FileResult = { state: FileState; message?: string; pageCount?: number; checksum?: string; progressPercent?: number; lastProgressAt?: number };
type PlanFile = { key: string; file: File; bundle: Bundle | null; bundleCode: string; affiliation: 'NT' | 'EAP' | 'unknown'; error?: string; existingCodes: string[]; existingCount: number; existingTargetPageCount: number };
type SavedPage = { canvasId: string; pageOrder: number; label: string; folioLabel: string; imageUrl: string; checksumSha256?: string };
type UploadDraftSnapshot = { signature: string; results: Record<string, FileResult>; savedBundles: Record<string, string>; fileCount: number; updatedAt: number };
type InMemoryUploadDraft = UploadDraftSnapshot & { plan: PlanFile[] };

const draftPrefix = 'turots-bulk-photo-draft:v1';
const inMemoryDrafts = new Map<string, InMemoryUploadDraft>();

function uploadOwnerKey(ownerId: string) { return `${draftPrefix}:owner:${ownerId}`; }
function uploadDraftSignature(plan: PlanFile[]) { return plan.map(item => item.key).sort().join('\n'); }
function uploadDraftId(ownerId: string, signature: string) {
  let hash = 2166136261;
  for (const char of `${ownerId}\u0000${signature}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `${draftPrefix}:${(hash >>> 0).toString(16)}`;
}
function readUploadDraft(ownerId: string, signature: string): UploadDraftSnapshot | null {
  const memory = inMemoryDrafts.get(uploadDraftId(ownerId, signature));
  if (memory) return memory;
  try {
    const value = localStorage.getItem(uploadDraftId(ownerId, signature));
    if (!value) return null;
    const parsed = JSON.parse(value) as UploadDraftSnapshot;
    if (parsed.signature !== signature || Date.now() - parsed.updatedAt > 30 * 24 * 60 * 60 * 1000) return null;
    return parsed;
  } catch { return null; }
}
function readLastUploadDraft(ownerId: string): UploadDraftSnapshot | null {
  try {
    const signature = localStorage.getItem(uploadOwnerKey(ownerId));
    return signature ? readUploadDraft(ownerId, signature) : null;
  } catch { return null; }
}
function readMemoryUploadDraft(ownerId: string): InMemoryUploadDraft | null {
  try {
    const signature = localStorage.getItem(uploadOwnerKey(ownerId));
    return signature ? inMemoryDrafts.get(uploadDraftId(ownerId, signature)) || null : null;
  } catch { return null; }
}
function persistUploadDraft(ownerId: string, plan: PlanFile[], results: Record<string, FileResult>, savedBundles: Record<string, string>, signature = uploadDraftSignature(plan)) {
  if (!plan.length || !signature) return;
  const snapshot: UploadDraftSnapshot = { signature, results, savedBundles, fileCount: plan.length, updatedAt: Date.now() };
  const memory: InMemoryUploadDraft = { ...snapshot, plan };
  const id = uploadDraftId(ownerId, signature);
  inMemoryDrafts.set(id, memory);
  try {
    localStorage.setItem(id, JSON.stringify(snapshot));
    localStorage.setItem(uploadOwnerKey(ownerId), signature);
  } catch { /* Keep the in-memory copy if browser storage is unavailable. */ }
}

const uploadBase = 'https://cloud.naracode.id';
const iiifBase = 'https://cloud.naracode.id/iiif/3';
const maxFileBytes = 1024 * 1024 * 1024;
const chunkBytes = 32 * 1024 * 1024;
const allowedImage = /\.(jpe?g|png|tiff?)$/i;

function naturalCompare(a: string, b: string) { return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }); }
function normalizeBundleCode(value: string) { return value.trim().replace(/\s+/g, ' ').toUpperCase(); }
function bundleProject(bundle: Bundle) { return String(bundle.turots_collections?.source_project || bundle.source_project || '').trim().toLowerCase(); }
function isNtBundle(bundle: Bundle) { const value = bundleProject(bundle).replace(/[^a-z]/g, ''); return value === 'nt' || value.includes('nahdlatutturots'); }
function isEapBundle(bundle: Bundle) { return /^eap/i.test(bundleProject(bundle)) || /^EAP\d+(?:[_ -]|$)/i.test(String(bundle.bundle_code || '')); }
function normalizeEapSource(value: string) {
  let result = value.trim().split(' | ')[0].replace(/_urutannya\s+.*$/i, '').replace(/_GRS_AL_(\d+)$/i, '_GRS_ALA_$1');
  result = result.replace(/_(\d+)$/, (_, number: string) => `_${number.padStart(3, '0')}`);
  return result.toUpperCase();
}
function eapIdFromNotes(bundle: Bundle) {
  const notes = String(bundle.bundle_notes || bundle.notes || '');
  return notes.match(/Original EAP ID:\s*([^|\r\n]+)/i)?.[1]?.trim() || '';
}
function pageSourceName(page: Bundle) {
  const raw = String(page.canvas_id || page.image_url || '');
  const marker = '/iiif/3/';
  const source = raw.includes(marker) ? raw.split(marker, 2)[1].split('/', 1)[0] : raw;
  try { return decodeURIComponent(source).replace(/;\d+$/, ''); } catch { return source.replace(/;\d+$/, ''); }
}
function sourceUrl(sourceName: string, pdfPage?: number) {
  const identifier = pdfPage ? `${sourceName};${pdfPage}` : sourceName;
  return `${iiifBase}/${encodeURIComponent(identifier).replace(/%3B/gi, ';')}`;
}
function parseInfoLabel(name: string, fallbackOrder: number) {
  const folio = name.match(/(?:^|_)(\d+)([rv])(?:\.[^.]+)?$/i);
  if (folio) return `${Number(folio[1])}${folio[2].toLowerCase()}`;
  const number = name.match(/_(\d+)(?:\.[^.]+)$/);
  return number ? String(Number(number[1])) : String(fallbackOrder);
}
function uploadIdFor(file: File) {
  const storageKey = `turots-upload:${file.name}:${file.size}:${file.lastModified}`;
  const existing = localStorage.getItem(storageKey);
  if (existing) return { id: existing, storageKey };
  const id = crypto.randomUUID();
  localStorage.setItem(storageKey, id);
  return { id, storageKey };
}
function fileKey(file: File) { return `${file.webkitRelativePath || file.name}\u0000${file.size}\u0000${file.lastModified}`; }
function explainUploadError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/failed to fetch|networkerror|load failed/i.test(message)) return 'Koneksi ke layanan unggah terputus sebelum server memberi jawaban. Periksa koneksi/layanan lalu coba ulang; potongan PDF yang sudah terkirim akan dilanjutkan.';
  if (/admin_verification_unavailable/i.test(message)) return 'Server unggah tidak dapat memeriksa hak admin. Tidak ada metadata yang disimpan; coba lagi setelah server merespons normal.';
  return message;
}

async function checkInfo(url: string) {
  const response = await fetch(`${url}/info.json`, { signal: AbortSignal.timeout(30_000) });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`info.json HTTP ${response.status}`);
  const info = await response.json();
  if (!Number(info.width) || !Number(info.height)) throw new Error('Info IIIF tidak memuat ukuran gambar.');
  return true;
}

async function adminRequest(path: string, session: Session, method = 'GET') {
  const response = await fetch(`${uploadBase}${path}`, {
    method,
    headers: { Authorization: `Bearer ${session.access_token}`, ...(method === 'POST' ? { 'Content-Type': 'application/octet-stream' } : {}) },
    body: method === 'POST' ? new Blob([]) : undefined,
    signal: AbortSignal.timeout(120_000),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok && response.status !== 409) throw new Error(payload.error || `Layanan unggah HTTP ${response.status}`);
  return { status: response.status, payload };
}

type UploadRequestTracker = (request: XMLHttpRequest, active: boolean) => void;
function uploadRequest(path: string, session: Session, body: Blob, onProgress: (loaded: number) => void, trackRequest?: UploadRequestTracker) {
  return new Promise<{ status: number; payload: Record<string, any> }>((resolve, reject) => {
    const request = new XMLHttpRequest();
    let settled = false;
    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      trackRequest?.(request, false);
      callback();
    };
    request.open('POST', `${uploadBase}${path}`);
    request.timeout = 15 * 60 * 1000;
    request.setRequestHeader('Authorization', `Bearer ${session.access_token}`);
    request.setRequestHeader('Content-Type', 'application/octet-stream');
    request.upload.onprogress = event => { if (event.lengthComputable) onProgress(event.loaded); };
    request.onload = () => finish(() => {
      let payload: Record<string, any> = {};
      try { payload = JSON.parse(request.responseText); } catch {}
      if ((request.status >= 200 && request.status < 300) || request.status === 409) resolve({ status: request.status, payload });
      else reject(new Error(payload.error || `Unggah HTTP ${request.status}`));
    });
    request.onerror = () => finish(() => reject(new Error('Koneksi unggah terputus sebelum server memberi jawaban. Periksa koneksi/layanan lalu coba ulang; potongan PDF yang sudah terkirim akan dilanjutkan.')));
    request.ontimeout = () => finish(() => reject(new Error('Waktu unggah habis. Berkas dapat dilanjutkan dari potongan yang sudah terkirim.')));
    request.onabort = () => finish(() => reject(new Error('Unggah dihentikan. Potongan yang sudah diterima server dipertahankan; klik coba ulang untuk melanjutkan.')));
    trackRequest?.(request, true);
    request.send(body);
  });
}

async function uploadLargeFile(file: File, getSession: () => Session, onProgress: (sent: number, total: number) => void, cancelled: () => boolean, trackRequest?: UploadRequestTracker) {
  const { id, storageKey } = uploadIdFor(file);
  const totalChunks = Math.ceil(file.size / chunkBytes);
  const status = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=status&uploadId=${id}`, getSession());
  if (status.payload.alreadyExists) return { existing: true, checksum: undefined };
  const received = new Set<number>(status.payload.receivedChunks || []);
  let sentBytes = [...received].reduce((sum, index) => sum + Math.min(chunkBytes, file.size - index * chunkBytes), 0);
  onProgress(sentBytes, file.size);
  for (let index = 0; index < totalChunks; index += 1) {
    if (cancelled()) throw new Error('Unggah dibatalkan. Pilih ulang folder untuk melanjutkan berkas yang tertunda.');
    if (received.has(index)) continue;
    const start = index * chunkBytes;
    const chunk = file.slice(start, Math.min(file.size, start + chunkBytes));
    const path = `/admin-upload/${encodeURIComponent(file.name)}?action=chunk&uploadId=${id}&chunkIndex=${index}&totalChunks=${totalChunks}&fileSize=${file.size}`;
    const result = await uploadRequest(path, getSession(), chunk, loaded => onProgress(sentBytes + loaded, file.size), trackRequest);
    if (result.status !== 409 || result.payload.error !== 'chunk_already_exists') sentBytes += chunk.size;
    onProgress(sentBytes, file.size);
  }
  if (cancelled()) throw new Error('Unggah dibatalkan sebelum penyatuan berkas. Pilih ulang folder untuk melanjutkan.');
  const completed = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=complete&uploadId=${id}`, getSession(), 'POST');
  localStorage.removeItem(storageKey);
  return { existing: completed.status === 409, checksum: completed.payload.sha256 as string | undefined };
}

async function uploadSmallFile(file: File, session: Session, onProgress: (sent: number, total: number) => void, trackRequest?: UploadRequestTracker) {
  const result = await uploadRequest(`/admin-upload/${encodeURIComponent(file.name)}`, session, file, loaded => onProgress(loaded, file.size), trackRequest);
  return { existing: result.status === 409, checksum: result.payload.sha256 as string | undefined };
}

async function getPdfPages(filename: string, session: Session) {
  const result = await adminRequest(`/admin-upload/${encodeURIComponent(filename)}?action=pdf-info`, session);
  const count = Number(result.payload.pages);
  if (!Number.isInteger(count) || count < 1 || count > 10000) throw new Error('Jumlah halaman PDF tidak valid atau melewati batas 10.000.');
  return count;
}

export default function AdminBulkPhotoUpload({ bundles, bundlesLoaded, session, onSaved, navigate }: { bundles: Bundle[]; bundlesLoaded: boolean; session: Session; onSaved: () => void; navigate: (path: string) => void }) {
  const ownerId = String(session.user?.id || 'admin');
  const initialMemoryDraft = readMemoryUploadDraft(ownerId);
  const initialDraft = initialMemoryDraft || readLastUploadDraft(ownerId);
  const folderInput = useRef<HTMLInputElement>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const currentSession = () => sessionRef.current;
  const currentSignature = useRef(initialDraft?.signature || '');
  const planRef = useRef<PlanFile[]>(initialMemoryDraft?.plan || []);
  const cancelled = useRef(false);
  const activeUploadRequests = useRef(new Set<XMLHttpRequest>());
  const uiUpdateAt = useRef(0);
  const progressPersistAt = useRef(new Map<string, number>());
  const [plan, setPlan] = useState<PlanFile[]>(initialMemoryDraft?.plan || []);
  const [results, setResults] = useState<Record<string, FileResult>>(initialDraft?.results || {});
  const resultsRef = useRef<Record<string, FileResult>>(initialDraft?.results || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [clockNow, setClockNow] = useState(Date.now());
  const [isSaving, setIsSaving] = useState(false);
  const [allowReassignment, setAllowReassignment] = useState(false);
  const [status, setStatus] = useState(() => initialDraft ? `Sesi unggah sebelumnya ditemukan (${initialDraft.fileCount} berkas). Pilih kembali folder yang sama untuk memulihkan antrean dan melanjutkan.` : 'Pilih folder NT atau EAP untuk melihat kecocokan sebelum mengunggah.');
  const [progress, setProgress] = useState('');
  const [sidecarCount, setSidecarCount] = useState(0);
  const [savedBundles, setSavedBundles] = useState<Record<string, string>>(initialDraft?.savedBundles || {});
  const savedBundlesRef = useRef<Record<string, string>>(initialDraft?.savedBundles || {});
  savedBundlesRef.current = savedBundles;

  useEffect(() => {
    if (!plan.length) return;
    const timer = window.setTimeout(() => persistUploadDraft(ownerId, plan, resultsRef.current, savedBundlesRef.current, currentSignature.current), 350);
    return () => window.clearTimeout(timer);
  }, [ownerId, plan, results, savedBundles]);
  useEffect(() => () => {
    persistUploadDraft(ownerId, planRef.current, resultsRef.current, savedBundlesRef.current, currentSignature.current);
  }, [ownerId]);
  useEffect(() => {
    if (!isProcessing) return;
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isProcessing]);

  const allBundles = useMemo(() => bundles.filter(bundle => isEapBundle(bundle) || isNtBundle(bundle)), [bundles]);
  const isAlreadyMapped = (item: PlanFile) => {
    if (!item.bundle || item.existingTargetPageCount < 1) return false;
    if (/\.pdf$/i.test(item.file.name)) {
      const extent = Number(item.bundle.extent_pages);
      return Number.isInteger(extent) && extent > 0 && item.existingTargetPageCount >= extent;
    }
    return true;
  };

  const buildPlan = (files: File[]) => {
    const ntBundles = new Map(allBundles.filter(isNtBundle).map(bundle => [normalizeBundleCode(String(bundle.bundle_code || '')), bundle]));
    const eapBundles = new Map<string, Bundle[]>();
    for (const bundle of allBundles.filter(isEapBundle)) {
      const original = eapIdFromNotes(bundle);
      if (original) {
        const key = normalizeEapSource(original);
        eapBundles.set(key, [...(eapBundles.get(key) || []), bundle]);
      }
    }
    const sourceLinks = new Map<string, Set<string>>();
    const sourceCounts = new Map<string, number>();
    const targetSourceCounts = new Map<string, Map<string, number>>();
    for (const bundle of bundles) for (const page of bundle.turots_pages || []) {
      const source = pageSourceName(page).toUpperCase();
      if (!source) continue;
      const code = String(bundle.bundle_code || '');
      sourceLinks.set(source, new Set([...(sourceLinks.get(source) || []), code]));
      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
      const counts = targetSourceCounts.get(source) || new Map<string, number>();
      counts.set(code, (counts.get(code) || 0) + 1);
      targetSourceCounts.set(source, counts);
    }
    const bundlesByCode = new Map(bundles.map(bundle => [String(bundle.bundle_code || ''), bundle]));
    const batchNames = new Map<string, number>();
    for (const file of files) batchNames.set(file.name.toLowerCase(), (batchNames.get(file.name.toLowerCase()) || 0) + 1);
    return files.map(file => {
      const relative = file.webkitRelativePath || file.name;
      const parts = relative.split('/');
      const isPdf = /\.pdf$/i.test(file.name);
      let affiliation: PlanFile['affiliation'] = isPdf ? 'EAP' : allowedImage.test(file.name) ? 'NT' : 'unknown';
      let bundle: Bundle | null = null;
      let error: string | undefined;
      if (affiliation === 'NT') {
        const folderMatch = parts.slice(0, -1).map(part => part.match(/NT\s*(\d{3}(?:\.\d+)?)/i)).find(Boolean);
        const filenameMatch = file.name.match(/^NT_(\d{3}(?:\.\d+)?)_(\d+)\.(?:jpe?g|png|tiff?)$/i);
        const code = folderMatch ? `NT ${folderMatch[1]}` : filenameMatch ? `NT ${filenameMatch[1]}` : '';
        bundle = ntBundles.get(normalizeBundleCode(code)) || null;
        if (!code) error = 'Kode NT tidak terbaca dari nama folder/foto.';
        else if (filenameMatch && normalizeBundleCode(`NT ${filenameMatch[1]}`) !== normalizeBundleCode(code)) error = `Kode folder ${code} berbeda dari kode pada nama foto.`;
        else if (!bundle) error = `Metadata bendel ${code} tidak ditemukan; berkas ditahan.`;
        if (file.size > 95 * 1024 * 1024) error = `${file.name} melewati batas foto 95 MiB.`;
      } else if (affiliation === 'EAP') {
        const key = normalizeEapSource(file.name.replace(/\.pdf$/i, ''));
        const matches = eapBundles.get(key) || [];
        bundle = matches.length === 1 ? matches[0] : null;
        if (!matches.length) {
          const linkedCodes = [...(sourceLinks.get(file.name.toUpperCase()) || [])];
          const linkedBundles = linkedCodes.map(code => bundlesByCode.get(code)).filter((candidate): candidate is Bundle => Boolean(candidate && (isEapBundle(candidate) || /^EAP/i.test(String(candidate.bundle_code || '')))));
          if (linkedBundles.length === 1) bundle = linkedBundles[0];
          else error = linkedBundles.length > 1 ? 'Sumber PDF sudah tertaut pada beberapa bendel EAP; pemetaan perlu ditinjau.' : 'ID sumber PDF tidak ditemukan pada metadata bendel EAP maupun tautan halaman yang sudah tersimpan.';
        } else if (matches.length > 1) error = 'ID sumber PDF cocok dengan lebih dari satu bendel.';
        if (file.size > maxFileBytes) error = `Berkas melewati batas layanan ${Math.round(maxFileBytes / 1024 / 1024)} MiB.`;
      } else error = 'Jenis berkas tidak didukung. NT memakai foto; EAP memakai PDF.';
      if (batchNames.get(file.name.toLowerCase())! > 1) error = `Nama berkas ${file.name} berulang; layanan penyimpanan memakai nama berkas unik.`;
      const linked = sourceLinks.get(file.name.toUpperCase()) || new Set<string>();
      const targetCode = String(bundle?.bundle_code || '');
      const existingCodes = [...linked].filter(code => code !== targetCode);
      const existingTargetPageCount = targetSourceCounts.get(file.name.toUpperCase())?.get(targetCode) || 0;
      return { key: fileKey(file), file, bundle, bundleCode: targetCode, affiliation, error, existingCodes, existingCount: sourceCounts.get(file.name.toUpperCase()) || 0, existingTargetPageCount } satisfies PlanFile;
    });
  };

  const onSelectFolder = (files: File[]) => {
    if (!bundlesLoaded || allBundles.length === 0) {
      setStatus(!bundlesLoaded ? 'Daftar bendel masih dimuat. Tunggu sampai selesai sebelum memilih folder.' : 'Daftar bendel NT/EAP tidak termuat. Muat ulang admin dan pastikan metadata bendel tersedia; unggahan dihentikan.');
      return;
    }
    const sidecars = files.filter(file => file.name.startsWith('._'));
    const selected = files.filter(file => !file.name.startsWith('._'));
    const nextPlan = buildPlan(selected);
    const signature = uploadDraftSignature(nextPlan);
    const previousDraft = readUploadDraft(ownerId, signature);
    const initialResults = Object.fromEntries(nextPlan.map(item => {
      if (item.error || !item.bundle) return [item.key, { state: 'failed' as FileState, message: item.error || 'Bendel tujuan tidak ditemukan; status sesi lama diabaikan.' }];
      if (isAlreadyMapped(item)) {
        const pageCount = /\.pdf$/i.test(item.file.name) ? item.existingTargetPageCount : undefined;
        return [item.key, { state: 'saved' as FileState, pageCount, message: 'Halaman sumber ini sudah tersimpan pada bendel; dilewati.' }];
      }
      const previous = previousDraft?.results[item.key];
      if (!previous) return [item.key, { state: 'unchecked' as FileState }];
      if (previous.state === 'saved') return [item.key, { state: 'unchecked' as FileState, message: 'Status tersimpan dari sesi lama perlu dicocokkan lagi dengan halaman yang tercatat saat ini.' }];
      if (previous.state === 'checking' || previous.state === 'uploading') {
        return [item.key, { ...previous, state: 'failed' as FileState, message: 'Proses sebelumnya terputus. Coba ulang; potongan PDF yang sudah terkirim akan dilanjutkan.' }];
      }
      return [item.key, previous];
    }));
    resultsRef.current = initialResults;
    planRef.current = nextPlan;
    currentSignature.current = signature;
    setPlan(nextPlan);
    setResults(initialResults);
    setSidecarCount(sidecars.length);
    const restoredSaved = Object.fromEntries(Object.entries(previousDraft?.savedBundles || {}).filter(([code, value]) => {
      const items = nextPlan.filter(item => item.bundleCode === code && item.bundle);
      return value.startsWith('Tersimpan') && items.length > 0 && items.every(isAlreadyMapped);
    }));
    savedBundlesRef.current = restoredSaved;
    setSavedBundles(restoredSaved);
    setAllowReassignment(false);
    const errors = nextPlan.filter(item => item.error).length;
    const targetGroups = new Set(nextPlan.filter(item => item.bundle && !item.error).map(item => item.bundleCode));
    const moved = nextPlan.filter(item => item.existingCodes.length).length;
    const restoredVerified = Object.values(initialResults).filter(result => result.state === 'verified' || result.state === 'saved').length;
    const restoredUnchecked = Object.values(initialResults).filter(result => result.state === 'unchecked').length;
    const needsAttention = nextPlan.filter(item => item.error || initialResults[item.key]?.state === 'failed').length;
    setStatus(`${nextPlan.length} berkas dipilih · ${targetGroups.size} bendel cocok · ${restoredVerified} tersimpan/terverifikasi · ${restoredUnchecked} belum diperiksa · ${needsAttention} gagal/perlu diperbaiki${previousDraft ? ' · sesi sebelumnya dipulihkan' : ''}${moved ? ` · ${moved} berkas punya tautan pada bendel lain` : ''}.`);
    persistUploadDraft(ownerId, nextPlan, initialResults, restoredSaved, signature);
  };

  useEffect(() => {
    if (!bundlesLoaded || !allBundles.length || !planRef.current.length) return;
    if (planRef.current.every(item => item.bundle || item.affiliation === 'unknown')) return;
    onSelectFolder(planRef.current.map(item => item.file));
  }, [bundlesLoaded, allBundles]);

  const updateResult = (key: string, next: FileResult, force = false) => {
    resultsRef.current = { ...resultsRef.current, [key]: next };
    persistUploadDraft(ownerId, planRef.current, resultsRef.current, savedBundlesRef.current, currentSignature.current);
    const now = Date.now();
    if (force || now - uiUpdateAt.current > 250) {
      uiUpdateAt.current = now;
      setResults(resultsRef.current);
    }
  };

  const updateFileProgress = (key: string, fileName: string, sent: number, total: number) => {
    const now = Date.now();
    const progressPercent = total > 0 ? Math.min(100, Math.floor(sent / total * 100)) : 0;
    resultsRef.current = { ...resultsRef.current, [key]: { state: 'uploading', message: 'Mengirim berkas ke server…', progressPercent, lastProgressAt: now } };
    const lastPersist = progressPersistAt.current.get(key) || 0;
    if (now - lastPersist >= 1500 || progressPercent >= 100) {
      persistUploadDraft(ownerId, planRef.current, resultsRef.current, savedBundlesRef.current, currentSignature.current);
      progressPersistAt.current.set(key, now);
    }
    if (now - uiUpdateAt.current > 250 || progressPercent >= 100) {
      uiUpdateAt.current = now;
      setResults({ ...resultsRef.current });
      setProgress(`${fileName} · ${progressPercent}% (${Math.floor(sent / 1024 / 1024)} / ${Math.ceil(total / 1024 / 1024)} MiB)`);
    }
  };

  const trackUploadRequest: UploadRequestTracker = (request, active) => {
    if (active) activeUploadRequests.current.add(request);
    else activeUploadRequests.current.delete(request);
  };

  const cancelActiveUploads = () => {
    cancelled.current = true;
    for (const request of activeUploadRequests.current) request.abort();
    setProgress('Unggahan aktif dihentikan. Potongan PDF yang sudah diterima server dipertahankan; pilih ulang folder dan coba lagi untuk melanjutkan.');
  };

  const checkAndUpload = async () => {
    const invalid = plan.filter(item => item.error || !item.bundle);
    if (!plan.length) return setStatus('Pilih folder yang berisi foto NT atau PDF EAP.');
    if (invalid.length) return setStatus(`${invalid.length} berkas belum punya pemetaan yang aman. Periksa daftar masalah sebelum mulai.`);
    if (!currentSession().access_token) return setStatus('Sesi admin berakhir. Masuk kembali sebelum mengunggah.');
    const work = plan.filter(item => !['verified', 'saved'].includes(resultsRef.current[item.key]?.state || 'unchecked'));
    if (!work.length) return setStatus('Semua sumber sudah tersedia atau tersimpan. Lanjutkan ke penyimpanan bendel yang masih siap.');
    setIsProcessing(true);
    cancelled.current = false;
    let nextIndex = 0;
    let finished = 0;
    const worker = async () => {
      while (!cancelled.current) {
        const index = nextIndex++;
        if (index >= work.length) return;
        const item = work[index];
        const file = item.file;
        updateResult(item.key, { state: 'checking', message: 'Memeriksa sumber dan status berkas di server…' });
        if (index === 0 || index % 25 === 0) setProgress(`Memeriksa ${index + 1}/${work.length}: ${file.name}`);
        try {
          let checksum: string | undefined;
          let pageCount: number | undefined;
          const isPdf = /\.pdf$/i.test(file.name);
          if (!isPdf) {
            const imageUrl = sourceUrl(file.name);
            updateResult(item.key, { state: 'checking', message: 'Memeriksa sumber IIIF…' });
            if (await checkInfo(imageUrl)) {
              updateResult(item.key, { state: 'verified', message: 'Sudah tersedia di IIIF; dilewati.', checksum });
            } else {
              const server = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=status`, currentSession());
              if (server.payload.alreadyExists) throw new Error('Sumber sudah ada di disk server, tetapi IIIF info.json masih 404. Tidak ditimpa.');
              updateResult(item.key, { state: 'uploading', progressPercent: 0, message: 'Menyiapkan unggahan foto…' });
              const upload = file.size > chunkBytes
                ? await uploadLargeFile(file, currentSession, (sent, total) => updateFileProgress(item.key, file.name, sent, total), () => cancelled.current, trackUploadRequest)
                : await uploadSmallFile(file, currentSession(), (sent, total) => updateFileProgress(item.key, file.name, sent, total), trackUploadRequest);
              checksum = upload.checksum;
              updateResult(item.key, { state: 'checking', message: 'Unggahan selesai; memeriksa ketersediaan gambar di IIIF…' });
              if (upload.existing) {
                if (!(await checkInfo(imageUrl))) throw new Error('Sumber sudah ada tetapi belum dapat dibuka di IIIF. Tidak ditimpa.');
                updateResult(item.key, { state: 'verified', message: 'Sudah ada di server; unggahan dilewati.', checksum });
              } else {
                if (!(await checkInfo(imageUrl))) throw new Error('Unggahan selesai, tetapi info.json masih 404. Berkas tidak disimpan ke metadata.');
                updateResult(item.key, { state: 'verified', message: 'Baru diunggah dan lolos pemeriksaan IIIF.', checksum });
              }
            }
          } else {
            updateResult(item.key, { state: 'checking', message: 'Memeriksa keberadaan PDF di server…' });
            const server = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=status`, currentSession());
            if (!server.payload.alreadyExists) {
              updateResult(item.key, { state: 'uploading', progressPercent: 0, message: 'Menyiapkan unggahan PDF…' });
              const upload = file.size > chunkBytes
                ? await uploadLargeFile(file, currentSession, (sent, total) => updateFileProgress(item.key, file.name, sent, total), () => cancelled.current, trackUploadRequest)
                : await uploadSmallFile(file, currentSession(), (sent, total) => updateFileProgress(item.key, file.name, sent, total), trackUploadRequest);
              checksum = upload.checksum;
            }
            updateResult(item.key, { state: 'checking', message: 'Membaca jumlah halaman PDF di server…' });
            pageCount = await getPdfPages(file.name, currentSession());
            updateResult(item.key, { state: 'checking', message: `Memeriksa gambar IIIF halaman 1${pageCount > 1 ? ` dan ${pageCount}` : ''} dari ${pageCount} halaman…` });
            const first = await checkInfo(sourceUrl(file.name, 1));
            const last = pageCount === 1 ? first : await checkInfo(sourceUrl(file.name, pageCount));
            if (!first || !last) throw new Error(`PDF terdeteksi ${pageCount} halaman, tetapi info IIIF halaman pertama/terakhir belum tersedia.`);
            updateResult(item.key, { state: 'verified', pageCount, checksum, message: server.payload.alreadyExists ? `PDF sudah ada; ${pageCount} halaman terverifikasi.` : `PDF diunggah; ${pageCount} halaman terverifikasi.` });
          }
        } catch (error) {
          updateResult(item.key, { state: 'failed', message: explainUploadError(error) }, true);
        } finally {
          finished += 1;
          if (finished === work.length || finished % 10 === 0) setProgress(`${finished}/${work.length} berkas diperiksa · ${(Object.values(resultsRef.current) as FileResult[]).filter(result => result.state === 'verified').length} tersedia`);
        }
      }
    };
    try {
      const workerCount = work.some(item => /\.pdf$/i.test(item.file.name)) ? 1 : Math.min(4, work.length);
      await Promise.all(Array.from({ length: workerCount }, () => worker()));
      const currentResults = Object.values(resultsRef.current) as FileResult[];
      const verified = currentResults.filter(result => result.state === 'verified' || result.state === 'saved').length;
      const failed = currentResults.filter(result => result.state === 'failed').length;
      const unchecked = currentResults.filter(result => result.state === 'unchecked').length;
      setStatus(`${verified}/${plan.length} sumber siap · ${failed} gagal · ${unchecked} belum diperiksa${cancelled.current ? ' · proses dibatalkan' : ''}. Percobaan berikutnya hanya memeriksa ulang yang belum siap.`);
    } finally {
      setProgress('');
      setIsProcessing(false);
      setResults({ ...resultsRef.current });
    }
  };

  const bundleGroups = useMemo(() => {
    const groups = new Map<string, PlanFile[]>();
    for (const item of plan) if (item.bundle) groups.set(item.bundleCode, [...(groups.get(item.bundleCode) || []), item]);
    return [...groups.entries()].sort(([a], [b]) => naturalCompare(a, b));
  }, [plan]);
  const linkConflicts = plan.filter(item => item.existingCodes.length || item.existingCount > 1);
  const verifiedCount = plan.filter(item => results[item.key]?.state === 'verified' || results[item.key]?.state === 'saved').length;
  const failedCount = plan.filter(item => results[item.key]?.state === 'failed' || item.error).length;
  const readyGroups = bundleGroups.filter(([code, items]) => {
    const alreadySaved = items.every(isAlreadyMapped);
    const alreadyHandled = Boolean(savedBundles[code] && !savedBundles[code].startsWith('Gagal'));
    const ready = items.every(item => results[item.key]?.state === 'verified' || results[item.key]?.state === 'saved');
    return !alreadySaved && !alreadyHandled && ready;
  });
  const currentReadyGroups = () => bundleGroups.filter(([code, items]) => {
    const alreadySaved = items.every(isAlreadyMapped);
    const alreadyHandled = Boolean(savedBundlesRef.current[code] && !savedBundlesRef.current[code].startsWith('Gagal'));
    const ready = items.every(item => ['verified', 'saved'].includes(resultsRef.current[item.key]?.state || ''));
    return !alreadySaved && !alreadyHandled && ready;
  });
  const uncheckedCount = plan.filter(item => !item.error && (!results[item.key] || results[item.key]?.state === 'unchecked')).length;
  const pendingCount = plan.filter(item => !item.error && !['verified', 'saved'].includes(results[item.key]?.state || 'unchecked')).length;

  const createPages = (items: PlanFile[]): SavedPage[] => {
    const pages: SavedPage[] = [];
    const ordered = [...items].sort((a, b) => naturalCompare(a.file.name, b.file.name));
    for (const item of ordered) {
      const result = resultsRef.current[item.key];
      if (/\.pdf$/i.test(item.file.name)) {
        for (let page = 1; page <= Number(result?.pageCount || 0); page += 1) {
          const id = sourceUrl(item.file.name, page);
          pages.push({ canvasId: id, pageOrder: pages.length + 1, label: `Halaman PDF ${page}`, folioLabel: `Halaman PDF ${page}`, imageUrl: `${id}/full/max/0/default.jpg`, checksumSha256: result?.checksum });
        }
      } else {
        const id = sourceUrl(item.file.name);
        const label = parseInfoLabel(item.file.name, pages.length + 1);
        pages.push({ canvasId: id, pageOrder: pages.length + 1, label, folioLabel: label, imageUrl: `${id}/full/max/0/default.jpg`, checksumSha256: result?.checksum });
      }
    }
    return pages;
  };

  const saveReadyBundles = async () => {
    const groupsReadyNow = currentReadyGroups();
    const groupsBlockedByConflicts = groupsReadyNow.filter(([, items]) => items.some(item => item.existingCodes.length || item.existingCount > 1));
    const groupsToSave = allowReassignment
      ? groupsReadyNow
      : groupsReadyNow.filter(([, items]) => items.every(item => !item.existingCodes.length && item.existingCount <= 1));
    if (!groupsToSave.length) return setStatus(groupsBlockedByConflicts.length
      ? `${groupsBlockedByConflicts.length} bendel lengkap ditahan karena tautan foto bentrok. Setujui pemetaan ulang setelah meninjau daftar, atau selesaikan bendel lain tanpa konflik.`
      : 'Belum ada bendel lengkap dengan semua sumber terverifikasi.');
    setIsSaving(true);
    let saved = 0;
    let published = 0;
    let savedUnpublished = 0;
    let failed = 0;
    const nextSaved = { ...savedBundles };
    try {
      for (const [code, items] of groupsToSave) {
        const bundle = items[0].bundle!;
        setProgress(`Menyimpan halaman ${saved + failed + 1}/${groupsToSave.length}: ${code}`);
        try {
          const pages = createPages(items);
          const isPdfEap = isEapBundle(bundle) && items.every(item => /\.pdf$/i.test(item.file.name));
          const extent = isPdfEap ? pages.length : null;
          const result = await saveBulkCantaloupePages(bundle.id, pages, allowReassignment, extent);
          const expectedPages = isPdfEap ? pages.length : Number(bundle.extent_pages);
          const fullBundleVerified = Number.isInteger(expectedPages) && expectedPages > 0 && result.total === pages.length && result.total === expectedPages;
          if (fullBundleVerified) {
            await publishBulkCantaloupeBundle(bundle.id);
            invalidateDetailRequestCache();
            nextSaved[code] = `Tersimpan dan diterbitkan · ${result.total} halaman`;
            published += 1;
          } else {
            nextSaved[code] = `Tersimpan · ${result.total} halaman · belum diterbitkan karena jumlah belum sama dengan extent ${expectedPages || 'yang tercatat'}`;
            savedUnpublished += 1;
          }
          if (isPdfEap) nextSaved[code] += ` · extent ${result.extent_pages}`;
          if (result.moved) nextSaved[code] += ` · ${result.moved} tautan dipindahkan`;
          if (result.deduplicated) nextSaved[code] += ` · ${result.deduplicated} duplikat dibersihkan`;
          saved += 1;
          savedBundlesRef.current = { ...nextSaved };
          setSavedBundles({ ...nextSaved });
        } catch (error) {
          nextSaved[code] = `Gagal · ${error instanceof Error ? error.message : String(error)}`;
          savedBundlesRef.current = { ...nextSaved };
          setSavedBundles({ ...nextSaved });
          failed += 1;
        }
      }
      setStatus(`Putaran ini: ${saved} bendel berhasil disimpan · ${published} diterbitkan${savedUnpublished ? ` · ${savedUnpublished} tersimpan tetapi belum diterbitkan` : ''}${failed ? ` · ${failed} gagal dan bisa dicoba ulang` : ''}${groupsBlockedByConflicts.length ? ` · ${groupsBlockedByConflicts.length} ditahan karena tautan foto bentrok` : ''}. Status simpanan putaran sebelumnya tetap dipertahankan.`);
      if (saved) onSaved();
    } finally {
      setIsSaving(false);
      setProgress('');
    }
  };

  const processAllPending = async () => {
    if (isProcessing || isSaving) return;
    if (!plan.length) return setStatus('Pilih folder yang berisi foto NT atau PDF EAP.');
    if (plan.some(item => item.error || !item.bundle)) return setStatus('Ada berkas yang belum punya pemetaan aman. Bereskan pemetaan sebelum memulai proses.');
    if (!currentSession().access_token) return setStatus('Sesi admin berakhir. Masuk kembali sebelum mengunggah.');
    const hasPendingSources = plan.some(item => !['verified', 'saved'].includes(resultsRef.current[item.key]?.state || 'unchecked'));
    if (hasPendingSources) {
      await checkAndUpload();
      if (cancelled.current) return;
    }
    await saveReadyBundles();
  };

  const downloadPlan = () => {
    const rows = [['afiliasi','folder','kode_bendel_tujuan','nama_berkas','ukuran_mib','halaman_pdf','pemetaan_metadata','status_server','status_proses','catatan']];
    for (const item of plan) {
      const result = results[item.key];
      rows.push([item.affiliation, item.file.webkitRelativePath || item.file.name, item.bundleCode, item.file.name, (item.file.size / 1024 / 1024).toFixed(2), String(result?.pageCount || ''), item.existingCodes.length ? `tautan lain: ${item.existingCodes.join(', ')}` : item.existingCount > 1 ? `${item.existingCount} record sumber berulang` : item.error || 'cocok', result?.state === 'verified' ? 'tersedia IIIF' : result?.state === 'failed' ? 'gagal' : 'belum dicek', result?.state || 'belum dicek', result?.message || '']);
    }
    const tsv = rows.map(row => row.map(value => String(value).replace(/[\t\r\n]+/g, ' ')).join('\t')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${tsv}`], { type: 'text/tab-separated-values;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'dry-run-unggah-foto-massal.tsv'; anchor.click(); URL.revokeObjectURL(url);
  };

  const stateLabel: Record<FileState, string> = { unchecked: 'Belum dicek', checking: 'Memeriksa', uploading: 'Mengunggah', verified: 'Tersedia', saved: 'Metadata tersimpan', failed: 'Bermasalah' };
  return <section className="page-section admin-page bulk-photo-page">
    <button type="button" className="admin-back" onClick={() => navigate('/admin/manuskrip')}><ArrowLeft size={16}/>Kembali ke manuskrip</button>
    <p className="eyebrow">Katalog manuskrip · unggah foto</p>
    <div className="admin-heading"><div><h1>Unggah foto dari folder</h1><p>Alur ini mencocokkan folder NT dan PDF EAP ke bendel, memeriksa sumber IIIF, mengunggah yang belum ada, lalu menyimpan halaman per bendel. Bendel diterbitkan otomatis hanya jika semua halaman cocok dengan jumlah pada extent.</p></div></div>
    <div className="bulk-photo-steps" aria-label="Tahapan unggah massal"><span className="is-current">1 · Pilih folder</span><span>2 · Periksa dan unggah</span><span>3 · Tinjau pemetaan</span><span>4 · Simpan halaman</span></div>
    <div className="bulk-photo-panel">
      <input ref={element => { folderInput.current = element; element?.setAttribute('webkitdirectory', ''); element?.setAttribute('directory', ''); }} className="bulk-photo-hidden-input" type="file" multiple accept=".jpg,.jpeg,.png,.tif,.tiff,.pdf" onChange={event => { onSelectFolder(Array.from(event.currentTarget.files || [])); event.currentTarget.value = ''; }} />
      <button type="button" className="primary-action" disabled={!bundlesLoaded || !allBundles.length || isProcessing || isSaving} onClick={() => folderInput.current?.click()}><FolderOpen size={18}/>{!bundlesLoaded ? 'Memuat daftar bendel…' : 'Pilih folder NT atau EAP'}</button>
      <p>Untuk NT, pilih folder induk “Nahdlatut Turots”. Untuk EAP, pilih folder induk “EAP1”. Folder kosong otomatis dilewati; berkas sampingan `._` juga diabaikan.</p>
      {bundlesLoaded && !allBundles.length && <p role="alert" className="bulk-photo-alert"><AlertCircle size={18}/><span>Daftar bendel admin termuat kosong atau koleksi NT/EAP tidak dikenali. Folder tidak dapat dipetakan dan unggahan dinonaktifkan.</span></p>}
      {!bundlesLoaded && <p role="status" className="bulk-photo-status">Mengambil daftar bendel dan metadata dari server… tunggu sampai tombol pilih folder aktif.</p>}
      <p role="status" aria-live="polite" className="bulk-photo-status">{status}</p>
      {plan.length > 0 && <div className="bulk-photo-stats">
        <div><strong>{plan.length.toLocaleString('id-ID')}</strong><span>berkas terpilih</span></div>
        <div><strong>{bundleGroups.length}</strong><span>bendel cocok</span></div>
        <div><strong>{verifiedCount.toLocaleString('id-ID')}</strong><span>sumber siap</span></div>
        <div className={uncheckedCount ? 'needs-check' : ''}><strong>{uncheckedCount.toLocaleString('id-ID')}</strong><span>belum diperiksa</span></div>
        <div className={failedCount ? 'has-errors' : ''}><strong>{failedCount.toLocaleString('id-ID')}</strong><span>gagal / perlu diperbaiki</span></div>
      </div>}
      {sidecarCount > 0 && <p className="bulk-photo-note">{sidecarCount} berkas sampingan AppleDouble dilewati.</p>}
      {progress && <div className="bulk-photo-progress" role="status" aria-live="polite"><LoaderCircle className="spin" size={18}/><span>{progress}</span></div>}
      <div className="bulk-photo-actions">
        <button type="button" className="primary-action" disabled={!plan.length || isProcessing || isSaving || plan.some(item => item.error)} onClick={() => void processAllPending()}>{isProcessing || isSaving ? <LoaderCircle className="spin" size={16}/> : pendingCount ? <RefreshCw size={16}/> : <Upload size={16}/>} {pendingCount ? `Proses ${pendingCount} berkas tertunda, lalu simpan bendel siap` : readyGroups.length ? `Simpan dan terbitkan ${readyGroups.length} bendel siap` : 'Semua sumber sudah diproses'}</button>
        {isProcessing && <button type="button" className="secondary-action" onClick={cancelActiveUploads}>Hentikan unggahan aktif</button>}
        <button type="button" className="secondary-action" disabled={!plan.length || isProcessing} onClick={downloadPlan}>Unduh dry run (.tsv)</button>
      </div>
      {linkConflicts.length > 0 && <label className="bulk-photo-consent"><input type="checkbox" checked={allowReassignment} onChange={event => setAllowReassignment(event.target.checked)}/><span><strong>Setujui perbaikan tautan foto yang bentrok</strong><small>Saat disimpan, sumber dipindah ke bendel yang cocok berdasarkan kode folder/ID sumber dan duplikat tautannya digabungkan. Pemetaan judul pada halaman yang dipindah dilepas; berkas fisik tidak dihapus.</small></span></label>}
      <div className="bulk-photo-groups"><h2>Ringkasan per bendel</h2>{bundleGroups.slice(0, 400).map(([code, items]) => {
        const verified = items.filter(item => ['verified', 'saved'].includes(results[item.key]?.state || '')).length;
        const errors = items.filter(item => item.error || results[item.key]?.state === 'failed').length;
        const unchecked = items.filter(item => !results[item.key] || results[item.key]?.state === 'unchecked').length;
        const activeItems = items.filter(item => ['checking', 'uploading'].includes(results[item.key]?.state || ''));
        const completed = items.filter(item => ['verified', 'saved'].includes(results[item.key]?.state || '')).length;
        const activeResult = activeItems[0] ? results[activeItems[0].key] : undefined;
        const statusText = activeItems.length
          ? `${completed}/${items.length} siap · ${activeItems[0].file.name}${activeResult?.state === 'uploading' ? ` · ${activeResult.progressPercent ?? 0}%` : ' · memeriksa'}`
          : savedBundles[code] || (items.every(isAlreadyMapped) ? 'Metadata halaman sudah tersimpan · dilewati' : errors ? `${errors} bermasalah` : unchecked ? `${verified}/${items.length} sumber siap · ${unchecked} belum diperiksa` : `${verified}/${items.length} sumber siap`);
        return <details key={code} className="bulk-photo-group" open={activeItems.length > 0 || errors > 0}>
          <summary><strong>{code}</strong><span>{items[0].bundle?.display_title || items[0].bundle?.bundle_code}</span><small>{items.length} berkas · {statusText}</small></summary>
          {activeItems.map(item => {
            const result = results[item.key];
            const stalledSeconds = result?.lastProgressAt ? Math.max(0, Math.floor((clockNow - result.lastProgressAt) / 1000)) : 0;
            const stalled = result?.state === 'uploading' && stalledSeconds >= 30;
            const stalledLabel = stalledSeconds >= 60 ? `${Math.floor(stalledSeconds / 60)} menit` : `${stalledSeconds} detik`;
            return <div key={`progress-${item.key}`} className={`bulk-photo-file-progress${result?.state === 'failed' ? ' has-errors' : ''}${stalled ? ' is-stalled' : ''}`}>
              <div>{stalled ? <AlertCircle size={16}/> : <LoaderCircle className="spin" size={16}/>}<strong>{item.file.name}</strong><span>{result?.state === 'uploading' ? `${result.progressPercent ?? 0}%${stalled ? ` · diam ${stalledLabel}` : ''}` : stateLabel[result?.state || 'checking']}</span></div>
              <small>{stalled ? `Tidak ada data progres baru selama ${stalledLabel}. Browser masih menunggu server mengakui potongan; Anda dapat menghentikan unggahan aktif lalu coba ulang. Potongan lengkap yang sudah diterima akan dilanjutkan.` : result?.message || 'Sedang diperiksa…'}</small>
              {result?.state === 'uploading' && <progress max={100} value={result.progressPercent ?? 0} aria-label={`Progres unggah ${item.file.name}`}/>}
            </div>;
          })}
          <ul>{items.slice(0, 30).map(item => { const result = results[item.key] || { state: 'unchecked' as FileState }; return <li key={item.key}><code>{item.file.name}</code><span>{stateLabel[result.state]}{result.pageCount ? ` · ${result.pageCount} hlm` : ''}</span>{result.state === 'uploading' && <progress max={100} value={result.progressPercent ?? 0} aria-label={`Progres unggah ${item.file.name}`} />}{result.message && <small>{result.message}</small>}{item.error && <small className="has-errors">{item.error}</small>}{item.existingCodes.length > 0 && <small className="has-errors">Saat ini tertaut pada: {item.existingCodes.join(', ')}</small>}{item.existingCount > 1 && <small className="has-errors">Ada {item.existingCount} record halaman dengan sumber ini.</small>}</li>; })}{items.length > 30 && <li><small>dan {items.length - 30} berkas lain; unduh dry run untuk daftar lengkap.</small></li>}</ul>
        </details>;
      })}</div>
      {plan.some(item => item.error) && <div role="alert" className="bulk-photo-alert"><AlertCircle size={18}/><span>Ada berkas yang belum cocok. Tidak ada unggahan dimulai sampai pemetaan bermasalah dibereskan.</span></div>}
      {(Object.values(results) as FileResult[]).some(result => result.state === 'failed') && <div role="alert" className="bulk-photo-alert"><XCircle size={18}/><span>Sumber gagal tidak akan masuk metadata. Perbaiki masalah atau pilih ulang folder; sesi potongan besar dapat dilanjutkan.</span></div>}
      {readyGroups.length > 0 && <div className="bulk-photo-save"><div><CheckCircle2 size={20}/><span>{readyGroups.length} bendel lengkap akan disimpan otomatis setelah semua berkas tertunda selesai. Kelompok gagal akan dilewati dan dapat dicoba ulang.</span></div></div>}
      {(Object.values(savedBundles) as string[]).some(value => value.startsWith('Gagal')) && <div role="alert" className="bulk-photo-alert"><RefreshCw size={18}/><span>Bendel gagal tetap dapat dicoba ulang setelah penyebabnya diperbaiki. Bendel yang sudah tersimpan tidak diulang.</span></div>}
      <p className="bulk-photo-note"><FileArchive size={15}/>PDF EAP dihitung dari berkas sumber di server. Saat metadata halaman tersimpan, bundle_extent_pages diperbarui menjadi jumlah halaman PDF aktual. Bendel yang belum cocok jumlah halamannya tetap tidak diterbitkan agar tidak tampil dalam keadaan kurang.</p>
    </div>
  </section>;
}
