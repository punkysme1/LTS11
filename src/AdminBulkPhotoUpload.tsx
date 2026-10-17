import { useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, FileArchive, FolderOpen, LoaderCircle, RefreshCw, Save, Upload, XCircle } from 'lucide-react';
import { invalidateDetailRequestCache } from './DetailV1';
import { publishBulkCantaloupeBundle, saveBulkCantaloupePages } from './services/turotsRepository';

type Bundle = Record<string, any>;
type Session = { access_token?: string };
type FileState = 'unchecked' | 'checking' | 'uploading' | 'verified' | 'failed';
type FileResult = { state: FileState; message?: string; pageCount?: number; checksum?: string };
type PlanFile = { key: string; file: File; bundle: Bundle | null; bundleCode: string; affiliation: 'NT' | 'EAP' | 'unknown'; error?: string; existingCodes: string[]; existingCount: number };
type SavedPage = { canvasId: string; pageOrder: number; label: string; folioLabel: string; imageUrl: string; checksumSha256?: string };

const uploadBase = 'https://cloud.naracode.id';
const iiifBase = 'https://cloud.naracode.id/iiif/3';
const maxFileBytes = 1024 * 1024 * 1024;
const chunkBytes = 32 * 1024 * 1024;
const allowedImage = /\.(jpe?g|png|tiff?)$/i;

function naturalCompare(a: string, b: string) { return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }); }
function normalizeBundleCode(value: string) { return value.trim().replace(/\s+/g, ' ').toUpperCase(); }
function bundleProject(bundle: Bundle) { return String(bundle.turots_collections?.source_project || bundle.source_project || '').trim().toLowerCase(); }
function isNtBundle(bundle: Bundle) { const value = bundleProject(bundle).replace(/[^a-z]/g, ''); return value === 'nt' || value.includes('nahdlatutturots'); }
function isEapBundle(bundle: Bundle) { return /^eap/i.test(bundleProject(bundle)); }
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

function uploadRequest(path: string, session: Session, body: Blob, onProgress: (loaded: number) => void) {
  return new Promise<{ status: number; payload: Record<string, any> }>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', `${uploadBase}${path}`);
    request.timeout = 15 * 60 * 1000;
    request.setRequestHeader('Authorization', `Bearer ${session.access_token}`);
    request.setRequestHeader('Content-Type', 'application/octet-stream');
    request.upload.onprogress = event => { if (event.lengthComputable) onProgress(event.loaded); };
    request.onload = () => {
      let payload: Record<string, any> = {};
      try { payload = JSON.parse(request.responseText); } catch {}
      if ((request.status >= 200 && request.status < 300) || request.status === 409) resolve({ status: request.status, payload });
      else reject(new Error(payload.error || `Unggah HTTP ${request.status}`));
    };
    request.onerror = () => reject(new Error('Koneksi unggah gagal.'));
    request.ontimeout = () => reject(new Error('Waktu unggah habis. Berkas dapat dilanjutkan dari potongan yang sudah terkirim.'));
    request.onabort = () => reject(new Error('Unggah dibatalkan.'));
    request.send(body);
  });
}

async function uploadLargeFile(file: File, getSession: () => Session, onProgress: (sent: number, total: number) => void, cancelled: () => boolean) {
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
    const result = await uploadRequest(path, getSession(), chunk, loaded => onProgress(sentBytes + loaded, file.size));
    if (result.status !== 409 || result.payload.error !== 'chunk_already_exists') sentBytes += chunk.size;
    onProgress(sentBytes, file.size);
  }
  if (cancelled()) throw new Error('Unggah dibatalkan sebelum penyatuan berkas. Pilih ulang folder untuk melanjutkan.');
  const completed = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=complete&uploadId=${id}`, getSession(), 'POST');
  localStorage.removeItem(storageKey);
  return { existing: completed.status === 409, checksum: completed.payload.sha256 as string | undefined };
}

async function uploadSmallFile(file: File, session: Session, onProgress: (sent: number, total: number) => void) {
  const result = await uploadRequest(`/admin-upload/${encodeURIComponent(file.name)}`, session, file, loaded => onProgress(loaded, file.size));
  return { existing: result.status === 409, checksum: result.payload.sha256 as string | undefined };
}

async function getPdfPages(filename: string, session: Session) {
  const result = await adminRequest(`/admin-upload/${encodeURIComponent(filename)}?action=pdf-info`, session);
  const count = Number(result.payload.pages);
  if (!Number.isInteger(count) || count < 1 || count > 10000) throw new Error('Jumlah halaman PDF tidak valid atau melewati batas 10.000.');
  return count;
}

export default function AdminBulkPhotoUpload({ bundles, session, onSaved, navigate }: { bundles: Bundle[]; session: Session; onSaved: () => void; navigate: (path: string) => void }) {
  const folderInput = useRef<HTMLInputElement>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const currentSession = () => sessionRef.current;
  const cancelled = useRef(false);
  const uiUpdateAt = useRef(0);
  const [plan, setPlan] = useState<PlanFile[]>([]);
  const [results, setResults] = useState<Record<string, FileResult>>({});
  const resultsRef = useRef<Record<string, FileResult>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [allowReassignment, setAllowReassignment] = useState(false);
  const [status, setStatus] = useState('Pilih folder NT atau EAP untuk melihat kecocokan sebelum mengunggah.');
  const [progress, setProgress] = useState('');
  const [sidecarCount, setSidecarCount] = useState(0);
  const [savedBundles, setSavedBundles] = useState<Record<string, string>>({});

  const allBundles = useMemo(() => bundles.filter(bundle => isEapBundle(bundle) || isNtBundle(bundle)), [bundles]);

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
    for (const bundle of allBundles) for (const page of bundle.turots_pages || []) {
      const source = pageSourceName(page).toUpperCase();
      if (!source) continue;
      sourceLinks.set(source, new Set([...(sourceLinks.get(source) || []), String(bundle.bundle_code || '')]));
      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
    }
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
        if (!matches.length) error = 'ID sumber PDF tidak ditemukan pada metadata bendel EAP.';
        else if (matches.length > 1) error = 'ID sumber PDF cocok dengan lebih dari satu bendel.';
        if (file.size > maxFileBytes) error = `Berkas melewati batas layanan ${Math.round(maxFileBytes / 1024 / 1024)} MiB.`;
      } else error = 'Jenis berkas tidak didukung. NT memakai foto; EAP memakai PDF.';
      if (batchNames.get(file.name.toLowerCase())! > 1) error = `Nama berkas ${file.name} berulang; layanan penyimpanan memakai nama berkas unik.`;
      const linked = sourceLinks.get(file.name.toUpperCase()) || new Set<string>();
      const targetCode = String(bundle?.bundle_code || '');
      const existingCodes = [...linked].filter(code => code !== targetCode);
      return { key: fileKey(file), file, bundle, bundleCode: targetCode, affiliation, error, existingCodes, existingCount: sourceCounts.get(file.name.toUpperCase()) || 0 } satisfies PlanFile;
    });
  };

  const onSelectFolder = (files: File[]) => {
    const sidecars = files.filter(file => file.name.startsWith('._'));
    const selected = files.filter(file => !file.name.startsWith('._'));
    const nextPlan = buildPlan(selected);
    const initialResults = Object.fromEntries(nextPlan.map(item => [item.key, { state: 'unchecked' as FileState }]));
    resultsRef.current = initialResults;
    setPlan(nextPlan);
    setResults(initialResults);
    setSidecarCount(sidecars.length);
    setSavedBundles({});
    setAllowReassignment(false);
    const errors = nextPlan.filter(item => item.error).length;
    const targetGroups = new Set(nextPlan.filter(item => item.bundle && !item.error).map(item => item.bundleCode));
    const moved = nextPlan.filter(item => item.existingCodes.length).length;
    setStatus(`${nextPlan.length} berkas dipilih · ${targetGroups.size} bendel cocok · ${errors} perlu diperiksa${moved ? ` · ${moved} berkas punya tautan pada bendel lain` : ''}.`);
  };

  const updateResult = (key: string, next: FileResult, force = false) => {
    resultsRef.current = { ...resultsRef.current, [key]: next };
    const now = Date.now();
    if (force || now - uiUpdateAt.current > 250) {
      uiUpdateAt.current = now;
      setResults(resultsRef.current);
    }
  };

  const checkAndUpload = async () => {
    const invalid = plan.filter(item => item.error || !item.bundle);
    if (!plan.length) return setStatus('Pilih folder yang berisi foto NT atau PDF EAP.');
    if (invalid.length) return setStatus(`${invalid.length} berkas belum punya pemetaan yang aman. Periksa daftar masalah sebelum mulai.`);
    if (!currentSession().access_token) return setStatus('Sesi admin berakhir. Masuk kembali sebelum mengunggah.');
    setIsProcessing(true);
    cancelled.current = false;
    const work = [...plan];
    let nextIndex = 0;
    let finished = 0;
    const worker = async () => {
      while (!cancelled.current) {
        const index = nextIndex++;
        if (index >= work.length) return;
        const item = work[index];
        const file = item.file;
        updateResult(item.key, { state: 'checking' });
        if (index === 0 || index % 25 === 0) setProgress(`Memeriksa ${index + 1}/${work.length}: ${file.name}`);
        try {
          let checksum: string | undefined;
          let pageCount: number | undefined;
          const isPdf = /\.pdf$/i.test(file.name);
          if (!isPdf) {
            const imageUrl = sourceUrl(file.name);
            if (await checkInfo(imageUrl)) {
              updateResult(item.key, { state: 'verified', message: 'Sudah tersedia di IIIF; dilewati.', checksum });
            } else {
              const server = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=status`, currentSession());
              if (server.payload.alreadyExists) throw new Error('Sumber sudah ada di disk server, tetapi IIIF info.json masih 404. Tidak ditimpa.');
              updateResult(item.key, { state: 'uploading' });
              const upload = file.size > chunkBytes
                ? await uploadLargeFile(file, currentSession, (sent, total) => setProgress(`Mengunggah ${finished + 1}/${work.length}: ${file.name} · ${Math.floor(sent / 1024 / 1024)} / ${Math.ceil(total / 1024 / 1024)} MiB`), () => cancelled.current)
                : await uploadSmallFile(file, currentSession(), (sent, total) => setProgress(`Mengunggah ${finished + 1}/${work.length}: ${file.name} · ${Math.floor(sent / 1024 / 1024)} / ${Math.ceil(total / 1024 / 1024)} MiB`));
              checksum = upload.checksum;
              if (upload.existing) {
                if (!(await checkInfo(imageUrl))) throw new Error('Sumber sudah ada tetapi belum dapat dibuka di IIIF. Tidak ditimpa.');
                updateResult(item.key, { state: 'verified', message: 'Sudah ada di server; unggahan dilewati.', checksum });
              } else {
                if (!(await checkInfo(imageUrl))) throw new Error('Unggahan selesai, tetapi info.json masih 404. Berkas tidak disimpan ke metadata.');
                updateResult(item.key, { state: 'verified', message: 'Baru diunggah dan lolos pemeriksaan IIIF.', checksum });
              }
            }
          } else {
            const server = await adminRequest(`/admin-upload/${encodeURIComponent(file.name)}?action=status`, currentSession());
            if (!server.payload.alreadyExists) {
              updateResult(item.key, { state: 'uploading' });
              const upload = file.size > chunkBytes
                ? await uploadLargeFile(file, currentSession, (sent, total) => setProgress(`Mengunggah ${finished + 1}/${work.length}: ${file.name} · ${Math.floor(sent / 1024 / 1024)} / ${Math.ceil(total / 1024 / 1024)} MiB`), () => cancelled.current)
                : await uploadSmallFile(file, currentSession(), (sent, total) => setProgress(`Mengunggah ${finished + 1}/${work.length}: ${file.name} · ${Math.floor(sent / 1024 / 1024)} / ${Math.ceil(total / 1024 / 1024)} MiB`));
              checksum = upload.checksum;
            }
            pageCount = await getPdfPages(file.name, currentSession());
            const first = await checkInfo(sourceUrl(file.name, 1));
            const last = pageCount === 1 ? first : await checkInfo(sourceUrl(file.name, pageCount));
            if (!first || !last) throw new Error(`PDF terdeteksi ${pageCount} halaman, tetapi info IIIF halaman pertama/terakhir belum tersedia.`);
            updateResult(item.key, { state: 'verified', pageCount, checksum, message: server.payload.alreadyExists ? `PDF sudah ada; ${pageCount} halaman terverifikasi.` : `PDF diunggah; ${pageCount} halaman terverifikasi.` });
          }
        } catch (error) {
          updateResult(item.key, { state: 'failed', message: error instanceof Error ? error.message : String(error) }, true);
        } finally {
          finished += 1;
          if (finished === work.length || finished % 10 === 0) setProgress(`${finished}/${work.length} berkas diperiksa · ${(Object.values(resultsRef.current) as FileResult[]).filter(result => result.state === 'verified').length} tersedia`);
        }
      }
    };
    try {
      await Promise.all(Array.from({ length: Math.min(4, work.length) }, () => worker()));
      const currentResults = Object.values(resultsRef.current) as FileResult[];
      const verified = currentResults.filter(result => result.state === 'verified').length;
      const failed = currentResults.filter(result => result.state === 'failed').length;
      setStatus(`${verified} sumber siap; ${failed} gagal${cancelled.current ? ' · proses dibatalkan' : ''}. Hanya bendel dengan semua sumber terverifikasi yang dapat disimpan.`);
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
  const verifiedCount = plan.filter(item => results[item.key]?.state === 'verified').length;
  const failedCount = plan.filter(item => results[item.key]?.state === 'failed' || item.error).length;
  const readyGroups = bundleGroups.filter(([code, items]) => (!savedBundles[code] || savedBundles[code].startsWith('Gagal')) && items.every(item => results[item.key]?.state === 'verified'));

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
    if (!readyGroups.length) return setStatus('Belum ada bendel lengkap dengan semua sumber terverifikasi.');
    if (linkConflicts.length && !allowReassignment) return setStatus('Ada tautan foto pada bendel lain. Periksa daftar dan centang persetujuan pemindahan sebelum menyimpan.');
    setIsSaving(true);
    let saved = 0;
    const nextSaved = { ...savedBundles };
    try {
      for (const [code, items] of readyGroups) {
        const bundle = items[0].bundle!;
        setProgress(`Menyimpan halaman ${saved + 1}/${readyGroups.length}: ${code}`);
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
          } else {
            nextSaved[code] = `Tersimpan · ${result.total} halaman · belum diterbitkan karena jumlah belum sama dengan extent ${expectedPages || 'yang tercatat'}`;
          }
          if (isPdfEap) nextSaved[code] += ` · extent ${result.extent_pages}`;
          if (result.moved) nextSaved[code] += ` · ${result.moved} tautan dipindahkan`;
          if (result.deduplicated) nextSaved[code] += ` · ${result.deduplicated} duplikat dibersihkan`;
          saved += 1;
          setSavedBundles({ ...nextSaved });
        } catch (error) {
          nextSaved[code] = `Gagal · ${error instanceof Error ? error.message : String(error)}`;
          setSavedBundles({ ...nextSaved });
        }
      }
      const savedValues = Object.values(nextSaved) as string[];
      const savedCount = savedValues.filter(value => value.startsWith('Tersimpan')).length;
      const failedGroups = savedValues.filter(value => value.startsWith('Gagal')).length;
      setStatus(`${savedCount} bendel berhasil disimpan${failedGroups ? ` · ${failedGroups} gagal dan bisa dicoba ulang` : ''}. Bendel tidak diterbitkan otomatis.`);
      if (savedCount) onSaved();
    } finally {
      setIsSaving(false);
      setProgress('');
    }
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

  const stateLabel: Record<FileState, string> = { unchecked: 'Belum dicek', checking: 'Memeriksa', uploading: 'Mengunggah', verified: 'Tersedia', failed: 'Bermasalah' };
  return <section className="page-section admin-page bulk-photo-page">
    <button type="button" className="admin-back" onClick={() => navigate('/admin/manuskrip')}><ArrowLeft size={16}/>Kembali ke manuskrip</button>
    <p className="eyebrow">Katalog manuskrip · unggah foto</p>
    <div className="admin-heading"><div><h1>Unggah foto dari folder</h1><p>Alur ini mencocokkan folder NT dan PDF EAP ke bendel, memeriksa sumber IIIF, mengunggah yang belum ada, lalu menyimpan halaman per bendel. Bendel diterbitkan otomatis hanya jika semua halaman cocok dengan jumlah pada extent.</p></div></div>
    <div className="bulk-photo-steps" aria-label="Tahapan unggah massal"><span className="is-current">1 · Pilih folder</span><span>2 · Periksa dan unggah</span><span>3 · Tinjau pemetaan</span><span>4 · Simpan halaman</span></div>
    <div className="bulk-photo-panel">
      <input ref={element => { folderInput.current = element; element?.setAttribute('webkitdirectory', ''); element?.setAttribute('directory', ''); }} className="bulk-photo-hidden-input" type="file" multiple accept=".jpg,.jpeg,.png,.tif,.tiff,.pdf" onChange={event => { onSelectFolder(Array.from(event.currentTarget.files || [])); event.currentTarget.value = ''; }} />
      <button type="button" className="primary-action" disabled={isProcessing || isSaving} onClick={() => folderInput.current?.click()}><FolderOpen size={18}/>Pilih folder NT atau EAP</button>
      <p>Untuk NT, pilih folder induk “Nahdlatut Turots”. Untuk EAP, pilih folder induk “EAP1”. Folder kosong otomatis dilewati; berkas sampingan `._` juga diabaikan.</p>
      <p role="status" aria-live="polite" className="bulk-photo-status">{status}</p>
      {plan.length > 0 && <div className="bulk-photo-stats">
        <div><strong>{plan.length.toLocaleString('id-ID')}</strong><span>berkas terpilih</span></div>
        <div><strong>{bundleGroups.length}</strong><span>bendel cocok</span></div>
        <div><strong>{verifiedCount.toLocaleString('id-ID')}</strong><span>sumber terverifikasi</span></div>
        <div className={failedCount ? 'has-errors' : ''}><strong>{failedCount.toLocaleString('id-ID')}</strong><span>perlu diperiksa</span></div>
      </div>}
      {sidecarCount > 0 && <p className="bulk-photo-note">{sidecarCount} berkas sampingan AppleDouble dilewati.</p>}
      {progress && <div className="bulk-photo-progress" role="status" aria-live="polite"><LoaderCircle className="spin" size={18}/><span>{progress}</span></div>}
      <div className="bulk-photo-actions">
        <button type="button" className="primary-action" disabled={!plan.length || isProcessing || isSaving || plan.some(item => item.error)} onClick={() => void checkAndUpload()}>{isProcessing ? <LoaderCircle className="spin" size={16}/> : <Upload size={16}/>}Periksa server dan unggah yang belum ada</button>
        {isProcessing && <button type="button" className="secondary-action" onClick={() => { cancelled.current = true; }}>Batalkan setelah berkas aktif selesai</button>}
        <button type="button" className="secondary-action" disabled={!plan.length || isProcessing} onClick={downloadPlan}>Unduh dry run (.tsv)</button>
      </div>
      {linkConflicts.length > 0 && <label className="bulk-photo-consent"><input type="checkbox" checked={allowReassignment} onChange={event => setAllowReassignment(event.target.checked)}/><span><strong>Setujui perbaikan tautan foto yang bentrok</strong><small>Saat disimpan, sumber dipindah ke bendel yang cocok berdasarkan kode folder/ID sumber dan duplikat tautannya digabungkan. Pemetaan judul pada halaman yang dipindah dilepas; berkas fisik tidak dihapus.</small></span></label>}
      <div className="bulk-photo-groups"><h2>Ringkasan per bendel</h2>{bundleGroups.slice(0, 400).map(([code, items]) => {
        const verified = items.filter(item => results[item.key]?.state === 'verified').length;
        const errors = items.filter(item => item.error || results[item.key]?.state === 'failed').length;
        const statusText = savedBundles[code] || (errors ? `${errors} bermasalah` : `${verified}/${items.length} sumber siap`);
        return <details key={code} className="bulk-photo-group"><summary><strong>{code}</strong><span>{items[0].bundle?.display_title || items[0].bundle?.bundle_code}</span><small>{items.length} berkas · {statusText}</small></summary><ul>{items.slice(0, 30).map(item => { const result = results[item.key] || { state: 'unchecked' as FileState }; return <li key={item.key}><code>{item.file.name}</code><span>{stateLabel[result.state]}{result.pageCount ? ` · ${result.pageCount} hlm` : ''}</span>{result.message && <small>{result.message}</small>}{item.error && <small className="has-errors">{item.error}</small>}{item.existingCodes.length > 0 && <small className="has-errors">Saat ini tertaut pada: {item.existingCodes.join(', ')}</small>}{item.existingCount > 1 && <small className="has-errors">Ada {item.existingCount} record halaman dengan sumber ini.</small>}</li>; })}{items.length > 30 && <li><small>dan {items.length - 30} berkas lain; unduh dry run untuk daftar lengkap.</small></li>}</ul></details>;
      })}</div>
      {plan.some(item => item.error) && <div role="alert" className="bulk-photo-alert"><AlertCircle size={18}/><span>Ada berkas yang belum cocok. Tidak ada unggahan dimulai sampai pemetaan bermasalah dibereskan.</span></div>}
      {(Object.values(results) as FileResult[]).some(result => result.state === 'failed') && <div role="alert" className="bulk-photo-alert"><XCircle size={18}/><span>Sumber gagal tidak akan masuk metadata. Perbaiki masalah atau pilih ulang folder; sesi potongan besar dapat dilanjutkan.</span></div>}
      {readyGroups.length > 0 && <div className="bulk-photo-save"><div><CheckCircle2 size={20}/><span>{readyGroups.length} bendel lengkap siap disimpan. Kelompok yang masih memiliki sumber gagal akan dilewati.</span></div><button type="button" className="primary-action" disabled={isSaving || (linkConflicts.length > 0 && !allowReassignment)} onClick={() => void saveReadyBundles()}>{isSaving ? <LoaderCircle className="spin" size={16}/> : <Save size={16}/>}Simpan halaman untuk {readyGroups.length} bendel</button></div>}
      {(Object.values(savedBundles) as string[]).some(value => value.startsWith('Gagal')) && <div role="alert" className="bulk-photo-alert"><RefreshCw size={18}/><span>Bendel gagal tetap dapat dicoba ulang setelah penyebabnya diperbaiki. Bendel yang sudah tersimpan tidak diulang.</span></div>}
      <p className="bulk-photo-note"><FileArchive size={15}/>PDF EAP dihitung dari berkas sumber di server. Saat metadata halaman tersimpan, bundle_extent_pages diperbarui menjadi jumlah halaman PDF aktual. Bendel yang belum cocok jumlah halamannya tetap tidak diterbitkan agar tidak tampil dalam keadaan kurang.</p>
    </div>
  </section>;
}
