import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Home, LoaderCircle, RefreshCw, Upload } from 'lucide-react';
import { supabase, supabaseConfigured } from './lib/supabase';
import { listAdminBundles, saveCatalogDraft, updateBundle, saveCantaloupePages, createCantaloupeBundle, archiveCatalogRecord, formatCatalogRpcError } from './services/turotsRepository';
import './admin.css';
import MetadataEditor from './MetadataEditor';
import BundleMetadataEditor from './BundleMetadataEditor';
import { validateMetadata, dimension, packNotesAndProvenance, unpackNotesAndProvenance } from './metadataModel';
import { CATALOG_CATEGORIES } from './catalogTaxonomy';
import { formatPhotoPageRanges, parsePhotoPageRanges } from './services/pageRanges';
import { AdminEditorialManager, AdminGuestbookManager, AdminOverview } from './AdminContentManager';
import MetadataTransfer from './MetadataTransfer';
import { invalidateDetailRequestCache } from './DetailV1';
import AdminBulkPhotoUpload from './AdminBulkPhotoUpload';

type Page = { id: string; label: string; imageUrl?: string; sourceName?: string; checksumSha256?: string };
type CantaloupeIssue = { name: string; label: string; message: string };
type AnyRecord = Record<string, any>;
type Bundle = AnyRecord;

const normalizeCategory = (value: string) => CATALOG_CATEGORIES.find((item) => item.toLowerCase() === value.trim().toLowerCase()) || '';
const metadataToDb = (m: Record<string, string>) => ({ title_latin: m.titleLatin, title_from_team: m.titleTeam, scholarly_classification_1: m.scholarly1, scholarly_classification_2: m.scholarly2, scholarly_classification_3: m.scholarly3, category_secondary: m.categorySecondary, category_tertiary: m.categoryTertiary, description: m.description, folio_separator: m.folioSeparator, folio_start: m.folioStart, folio_end: m.folioEnd, author: m.author, scribe: m.scribe, year_original: m.yearOriginal, year_masehi: m.yearMasehi, copying_location: m.copyingLocation, manuscript_origin: m.manuscriptOrigin, language: m.language, script: m.script, lines_per_page: m.linesPerPage, rubrication: m.rubrication, marginal_notes: m.marginalNotes, meaning_notes: m.meaningNotes, colophon: m.colophon, marginal_note: m.marginalNote, readability: m.readability, notes: packNotesAndProvenance(m.notes,m.provenance), keywords: m.keywords, glossary: m.glossary, references_text: m.references, related_manuscripts: m.relatedManuscripts, related_persons: m.relatedPersons });
const bundleToDb = (m: Record<string,string>) => ({display_title:m.bundleTitle||undefined,surrogate_format:m.surrogateFormat||null,country:m.country||null,city_province:m.cityProvince||null,right_to_left:!m.rightToLeft?null:m.rightToLeft==='Ya',subject_matter:m.subjectMatter||null,copyist:m.copyist||null,copying_date_native:m.copyingDateNative||null,copying_place:m.copyingPlace||null,bundle_script:m.bundleScript||null,current_status:m.currentStatus||null,rubrication:m.rubrication||null,bundle_description:m.bundleDescription||null,colophon:m.colophon||null,affiliation_url:m.affiliationUrl||null,cover:m.cover||null,cover_size:m.coverSize||null,binding:m.binding||null,paper_size:m.paperSize||null,dimensions:m.dimensions||null,paper_type:m.paperType||null,access_level:m.accessLevel||'public_preview',watermark:m.watermark||null,countermark:m.countermark||null,ink:m.ink||null,extent_pages:m.extentPages?Number(m.extentPages):null,blank_pages:m.blankPages?Number(m.blankPages):null,physical_condition:m.physicalCondition||null,completeness:m.completeness||null,illumination:m.illumination||null,illustration:m.illustration||null,bundle_notes:m.notes||null});
const dbToMetadata = (u: AnyRecord) => { const saved=unpackNotesAndProvenance(u.notes); return ({ titleLatin: u.title_latin || '', titleTeam: u.title_from_team || '', scholarly1: u.scholarly_classification_1 || '', scholarly2: u.scholarly_classification_2 || '', scholarly3: u.scholarly_classification_3 || '', categorySecondary: u.category_secondary || '', categoryTertiary: u.category_tertiary || '', description: u.description || '', folioStart: u.folio_start||'', folioEnd:u.folio_end||'', folioSeparator: u.folio_separator || '', author: u.author || '', scribe: u.scribe || '', yearOriginal: u.year_original || '', yearMasehi: u.year_masehi || '', copyingLocation: u.copying_location || '', manuscriptOrigin: u.manuscript_origin || '', language: u.language || '', script: u.script || '', linesPerPage: u.lines_per_page || '', rubrication: u.rubrication || '', marginalNotes: u.marginal_notes || '', meaningNotes: u.meaning_notes || '', colophon: u.colophon || '', marginalNote: u.marginal_note || '', readability: u.readability || '', notes: saved.notes, provenance: JSON.stringify(saved.provenance), keywords: u.keywords || '', glossary: u.glossary || '', references: u.references_text || '', relatedManuscripts: u.related_manuscripts || '', relatedPersons: u.related_persons || '' }); };
function diffMetadata(values: Record<string, unknown>, previous: AnyRecord) {
  const changes = Object.entries(values)
    .filter(([field, value]) => !Object.is(previous?.[field] ?? null, value ?? null))
    .map(([field, after]) => ({ field, before: previous?.[field] ?? null, after: after ?? null }));
  return { values: Object.fromEntries(changes.map(change => [change.field, change.after])), changes };
}

export default function AdminV1({path=location.pathname,navigate=(to:string)=>{history.pushState({},'',to);dispatchEvent(new PopStateEvent('popstate'));}}:{path?:string;navigate?:(path:string)=>void}) {
  const [session, setSession] = useState<any>(null); const [isAdmin, setIsAdmin] = useState(false); const [adminCheckDone, setAdminCheckDone] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [bundles, setBundles] = useState<Bundle[]>([]); const [adminLoaded,setAdminLoaded]=useState(false);
  const [manuscriptSearch,setManuscriptSearch]=useState(''); const [manuscriptPage,setManuscriptPage]=useState(1);
  const [cantaloupeBase,setCantaloupeBase]=useState('https://cloud.naracode.id/iiif/3'); const [cantaloupeNames,setCantaloupeNames]=useState(''); const [cantaloupePages,setCantaloupePages]=useState<Array<Page & {folioLabel:string}>>([]); const [cantaloupeLoading,setCantaloupeLoading]=useState(false); const [cantaloupeFiles,setCantaloupeFiles]=useState<File[]>([]); const [pdfPageCount,setPdfPageCount]=useState(''); const [uploadingPhotos,setUploadingPhotos]=useState(false); const [uploadProgress,setUploadProgress]=useState('');
  const [cantaloupeIssues,setCantaloupeIssues]=useState<CantaloupeIssue[]>([]);
  const [retryOnlyIssues,setRetryOnlyIssues]=useState(false);
  const [newBundleCode,setNewBundleCode]=useState('');
  const [completeSourceList,setCompleteSourceList]=useState(false);
  const uploadRequests = useRef<XMLHttpRequest[]>([]);
  const uploadCancelled = useRef(false);
  const uploadedChecksums = useRef(new Map<string, string>());
  const adminCheckState = useRef<{ userId: string; isAdmin: boolean } | null>(null);
  const adminCheckSequence = useRef(0);
  const [project,setProject]=useState('Dreamsea'); const [collection,setCollection]=useState('Ndalem'); const [editingUnit,setEditingUnit]=useState<any>(null);
  const [title, setTitle] = useState(''); const [displayId, setDisplayId] = useState(''); const [category, setCategory] = useState('');
  const [photoPageRanges,setPhotoPageRanges]=useState('');
  const [showTitleFolioFields,setShowTitleFolioFields]=useState(false);
  const [metadata, setMetadata] = useState<Record<string, string>>({}); const [bundleMetadata,setBundleMetadata]=useState<Record<string,string>>({}); const [message, setMessage] = useState(''); const [editing, setEditing] = useState<Bundle | null>(null); const [saving,setSaving]=useState(false); const [saveFeedback,setSaveFeedback]=useState('');
  const computedCode=displayId.trim();
  const normalizedManuscriptSearch=manuscriptSearch.trim().toLocaleLowerCase();
  const matchesManuscriptText=(value:unknown)=>String(value||'').toLocaleLowerCase().includes(normalizedManuscriptSearch);
  const matchingBundles=bundles.filter(bundle=>!normalizedManuscriptSearch||[
    bundle.bundle_code,bundle.display_title,bundle.publication_status,bundle.turots_collections?.name,bundle.turots_collections?.source_project,
  ].some(matchesManuscriptText)||(bundle.turots_text_units||[]).some((unit:AnyRecord)=>[
    unit.display_id,unit.title_original,unit.title_latin,unit.author,unit.scribe,unit.related_persons,unit.category_primary,
  ].some(matchesManuscriptText)));
  const adminPageSize=20; const adminPageCount=Math.max(1,Math.ceil(matchingBundles.length/adminPageSize));
  const visibleAdminBundles=matchingBundles.slice((manuscriptPage-1)*adminPageSize,manuscriptPage*adminPageSize);
  useEffect(()=>setManuscriptPage(1),[manuscriptSearch]);
  const load = () => listAdminBundles().then(data=>{setBundles(data);setManuscriptPage(1);setAdminLoaded(true);}).catch((e) => {setMessage(e.message);setAdminLoaded(true);});
  useEffect(() => {
    if (!supabase) { setAdminCheckDone(true); return; }
    let active = true;
    const checkAdmin = async (nextSession: any) => {
      const sequence = ++adminCheckSequence.current;
      setSession(nextSession);
      if (!nextSession) {
        adminCheckState.current = null;
        setIsAdmin(false);
        setAdminCheckDone(true);
        return;
      }
      const userId = String(nextSession.user?.id || '');
      const cached = adminCheckState.current;
      if (cached?.userId === userId) {
        setIsAdmin(cached.isAdmin);
        setAdminCheckDone(true);
        return;
      }
      setAdminCheckDone(false);
      setIsAdmin(false);
      const { data, error } = await supabase.from('turots_admins').select('user_id').eq('user_id', userId).maybeSingle();
      if (!active || sequence !== adminCheckSequence.current) return;
      const allowed = !error && Boolean(data);
      adminCheckState.current = { userId, isAdmin: allowed };
      setIsAdmin(allowed);
      if (error) setMessage(`Peran admin Turots gagal diperiksa: ${error.message}`);
      else if (!data) setMessage('Akun ini belum terdaftar sebagai Admin Turots.');
      setAdminCheckDone(true);
    };
    void supabase.auth.getSession().then(({ data }) => checkAdmin(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      // Token refreshes happen when a background tab regains focus. Keep the
      // current admin screen mounted for the same user so uploads and folder
      // selection are not reset while the refreshed session is applied.
      if (nextSession && adminCheckState.current?.userId === String(nextSession.user?.id || '')) {
        setSession(nextSession);
        setAdminCheckDone(true);
        setIsAdmin(adminCheckState.current.isAdmin);
        return;
      }
      if (!nextSession) { void checkAdmin(null); return; }
      if (event === 'TOKEN_REFRESHED' && adminCheckState.current) {
        setSession(nextSession);
        return;
      }
      window.setTimeout(() => { if (active) void checkAdmin(nextSession); }, 0);
    });
    return () => { active = false; adminCheckSequence.current += 1; data.subscription.unsubscribe(); };
  }, []);
  useEffect(() => { if (session && isAdmin) load(); }, [session, isAdmin]);
  const login = async () => { if (!supabase) return setMessage('Supabase belum dikonfigurasi.'); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setMessage(error.message); };
  const logout = async () => { if(!supabase)return;const {error}=await supabase.auth.signOut();if(error)setMessage(`Logout gagal: ${error.message}`);else{setMessage('Sesi admin berakhir.');navigate('/admin');} };
  const cantaloupeDescriptors = (names: string[], pageCount: number) => names.flatMap(name => {
    if (/\.pdf$/i.test(name)) return Array.from({ length: pageCount }, (_, index) => {
      const number = index + 1;
      const identifier = `${name};${number}`;
      const serviceUrl = `${cantaloupeBase.trim().replace(/\/+$/, '')}/${encodeURIComponent(identifier).replace(/%3B/gi, ';')}`;
      return { id: serviceUrl, label: `Halaman PDF ${number}`, folioLabel: `Halaman PDF ${number}`, imageUrl: `${serviceUrl}/full/max/0/default.jpg`, sourceName: name };
    });
    const serviceUrl = `${cantaloupeBase.trim().replace(/\/+$/, '')}/${encodeURIComponent(name)}`;
    const match = name.match(/(?:^|_)(\d+)([rv])(?:\.[^.]+)?$/i);
    const folioLabel = match ? `${Number(match[1])}${match[2].toLowerCase()}` : name;
    return [{ id: serviceUrl, label: folioLabel, folioLabel, imageUrl: `${serviceUrl}/full/max/0/default.jpg`, sourceName: name }];
  });
  const verifyCantaloupeDescriptor = async (page: Page & { folioLabel: string }) => {
    const response = await fetch(`${page.id}/info.json`);
    if (!response.ok) throw new Error(`${page.folioLabel}: info.json HTTP ${response.status}`);
    const info = await response.json();
    if (!Number(info.width) || !Number(info.height)) throw new Error(`${page.folioLabel}: ukuran gambar tidak ditemukan.`);
  };
  const previewCantaloupe = async () => {
    const base=cantaloupeBase.trim().replace(/\/+$/,'');
    const names: string[]=Array.from(new Set<string>(cantaloupeNames.split(/[\r\n,;]+/).map(name=>name.trim()).filter((name):name is string=>Boolean(name))));
    if(!/^https:\/\//i.test(base))return setMessage('URL dasar Cantaloupe harus menggunakan HTTPS.');
    if(!names.length)return setMessage('Tempel nama berkas, satu nama per baris.');
    const pdfNames=names.filter(name=>/\.pdf$/i.test(name));
    const pageCount=Number(pdfPageCount);
    if(pdfNames.length>1)return setMessage('Periksa satu PDF per proses agar jumlah halaman yang dimasukkan sesuai.');
    if(pdfNames.length&&(!Number.isInteger(pageCount)||pageCount<1))return setMessage('Isi jumlah halaman PDF sebelum memeriksa sumber.');
    setCantaloupeLoading(true);setCantaloupePages([]);setCantaloupeIssues([]);setMessage(`Memeriksa ${names.length} sumber Cantaloupe…`);
    try {
      const parsed=cantaloupeDescriptors(names,pageCount);
      const checks=pdfNames.length?[parsed[0],parsed.at(-1)!]:parsed;
      const availableIds=new Set<string>();const issues:CantaloupeIssue[]=[];
      for(let start=0;start<checks.length;start+=10)await Promise.all(checks.slice(start,start+10).map(async page=>{
        try{await verifyCantaloupeDescriptor(page);availableIds.add(page.id);}
        catch(error){issues.push({name:page.sourceName||page.label,label:page.folioLabel,message:error instanceof Error?error.message:'Gagal memeriksa info.json.'});}
      }));
      const available=parsed.filter(page=>availableIds.has(page.id));
      setCantaloupePages(pdfNames.length?(issues.length?[]:parsed):available);
      setCantaloupeIssues(issues);
      setMessage(pdfNames.length
        ?`${issues.length?'Pemeriksaan PDF menemukan masalah.':'PDF terdaftar dan halaman pertama serta terakhir terverifikasi.'}${issues.length?` ${issues.length} pemeriksaan gagal.`:''}`
        :`${available.length}/${parsed.length} foto dapat dibuka${issues.length?`; ${issues.length} foto bermasalah, lihat daftarnya di bawah`:'; semua terverifikasi'}.`);
    } catch(error){setMessage(error instanceof Error?`Impor Cantaloupe gagal: ${error.message}`:'Gagal memeriksa gambar Cantaloupe. Periksa URL dan nama file.');}
    finally{setCantaloupeLoading(false);}
  };
  const uploadAndPreviewCantaloupe = async () => {
    if(!cantaloupeFiles.length)return setMessage('Pilih berkas foto atau satu PDF yang akan diunggah.');
    if(!session?.access_token)return setMessage('Sesi admin sudah berakhir. Silakan masuk kembali.');
    const pdfFiles=cantaloupeFiles.filter(file=>/\.pdf$/i.test(file.name));
    const pageCount=Number(pdfPageCount);
    if(pdfFiles.length&&(pdfFiles.length!==1||cantaloupeFiles.length!==1))return setMessage('Unggah satu PDF saja per proses; jangan campur PDF dengan foto.');
    if(pdfFiles.length&&(!Number.isInteger(pageCount)||pageCount<1))return setMessage('Isi jumlah halaman PDF sebelum mengunggah.');
    const names=cantaloupeFiles.map(file=>file.name).sort((left,right)=>left.localeCompare(right,undefined,{numeric:true,sensitivity:'base'}));
    if(new Set(names).size!==names.length)return setMessage('Ada nama berkas berulang. Pisahkan unggahan agar setiap nama sumber tetap unik.');
    const previousIssues=cantaloupeIssues;const previousPages=cantaloupePages;const carryIssues=retryOnlyIssues?previousIssues.filter(issue=>!names.includes(issue.name)):[];
    setUploadingPhotos(true);setCantaloupeLoading(true);if(!retryOnlyIssues)setCantaloupePages([]);
    uploadCancelled.current=false;uploadRequests.current=[];uploadedChecksums.current.clear();
    const uploaded:string[]=[];const existed:string[]=[];const failed:CantaloupeIssue[]=[];let nextIndex=0;let finished=0;
    const uploadOne=(file:File)=>new Promise<'uploaded'|'exists'>((resolve,reject)=>{
      const request=new XMLHttpRequest();uploadRequests.current.push(request);
      request.open('POST',`https://cloud.naracode.id/admin-upload/${encodeURIComponent(file.name)}`);
      request.setRequestHeader('Authorization',`Bearer ${session.access_token}`);
      request.setRequestHeader('Content-Type',file.type||'application/octet-stream');
      request.upload.onprogress=(event)=>{if(event.lengthComputable)setUploadProgress(`Mengunggah ${finished+1}/${cantaloupeFiles.length}: ${file.name} (${Math.round(event.loaded/event.total*100)}%) · 4 jalur maksimum`);};
      request.onload=()=>{
        if(request.status>=200&&request.status<300){try{const result=JSON.parse(request.responseText);if(result.sha256)uploadedChecksums.current.set(file.name,result.sha256);}catch{}resolve('uploaded');}
        else if(request.status===409)resolve('exists');
        else{let detail='';try{detail=JSON.parse(request.responseText)?.error||'';}catch{}reject(new Error(`${file.name}: ${detail||`HTTP ${request.status}`}`));}
      };
      request.onerror=()=>reject(new Error(`${file.name}: koneksi unggahan gagal.`));
      request.onabort=()=>reject(new Error(`${file.name}: unggahan dibatalkan.`));
      request.send(file);
    });
    const worker=async()=>{
      while(!uploadCancelled.current){
        const index=nextIndex++;if(index>=cantaloupeFiles.length)return;
        const file=cantaloupeFiles[index];setUploadProgress(`Mengunggah ${index+1}/${cantaloupeFiles.length}: ${file.name}`);
        try{const result=await uploadOne(file);if(result==='uploaded')uploaded.push(file.name);else existed.push(file.name);}
        catch(error){failed.push({name:file.name,label:file.name,message:error instanceof Error?error.message:String(error)});}
        finally{finished+=1;setUploadProgress(`${finished}/${cantaloupeFiles.length} berkas diproses${uploadCancelled.current?' · dibatalkan':''}`);}
      }
    };
    try {
      await Promise.all(Array.from({length:Math.min(4,cantaloupeFiles.length)},()=>worker()));
      uploadRequests.current=[];
      const accepted=new Set([...uploaded,...existed]);
      const readyNames=names.filter(name=>accepted.has(name));
      if(!readyNames.length){setCantaloupeIssues([...carryIssues,...failed]);setCantaloupeFiles([]);setRetryOnlyIssues(false);throw new Error(failed.map(issue=>issue.message).join(' ')||'Tidak ada foto yang berhasil diunggah.');}
      if(!retryOnlyIssues)setCantaloupeNames(names.join('\n'));
      setUploadProgress(`Unggahan selesai: ${uploaded.length} baru, ${existed.length} sudah ada.${failed.length?` ${failed.length} gagal.`:''} Memeriksa foto di Cantaloupe…`);
      const base=cantaloupeBase.trim().replace(/\/+$/,'');
      if(!/^https:\/\//i.test(base))throw new Error('URL dasar Cantaloupe harus menggunakan HTTPS.');
      const parsed=cantaloupeDescriptors(readyNames,pageCount).map(page=>({...page,checksumSha256:uploadedChecksums.current.get(page.sourceName||'')}));
      const checks=pdfFiles.length?[parsed[0],parsed.at(-1)!]:parsed;
      const availableIds=new Set<string>();const checkIssues:CantaloupeIssue[]=[];
      for(let start=0;start<checks.length;start+=10)await Promise.all(checks.slice(start,start+10).map(async page=>{
        try{await verifyCantaloupeDescriptor(page);availableIds.add(page.id);}
        catch(error){checkIssues.push({name:page.sourceName||page.label,label:page.folioLabel,message:error instanceof Error?error.message:'Gagal memeriksa info.json.'});}
      }));
      const available=parsed.filter(page=>availableIds.has(page.id));
      const allIssues=[...carryIssues,...failed,...checkIssues];setCantaloupeIssues(allIssues);
      const verifiedPages=pdfFiles.length?(checkIssues.length?[]:parsed):available;
      const combinedPages=retryOnlyIssues
        ?[...previousPages,...verifiedPages].filter((page,index,array)=>array.findIndex(candidate=>candidate.id===page.id)===index).sort((left,right)=>(left.sourceName||left.label).localeCompare(right.sourceName||right.label,undefined,{numeric:true,sensitivity:'base'}))
        :verifiedPages;
      setCantaloupePages(combinedPages);
      const uploadedBytes=cantaloupeFiles.filter(file=>uploaded.includes(file.name)).reduce((sum,file)=>sum+file.size,0);
      const sizeMb=(uploadedBytes/1024/1024).toFixed(1);
      setMessage(`${uploaded.length} foto (${sizeMb} MB) diunggah, ${existed.length} sudah ada; ${available.length} foto terverifikasi${allIssues.length?`; ${failed.length} unggahan gagal dan ${checkIssues.length} sumber tidak terverifikasi, lihat daftarnya di bawah`:''}.`);
      setCantaloupeFiles([]);
      setRetryOnlyIssues(false);
    }catch(error){setMessage(error instanceof Error?`Unggah/impor foto gagal: ${error.message}`:'Gagal mengunggah foto ke Cantaloupe.');}
    finally{uploadRequests.current=[];setUploadingPhotos(false);setCantaloupeLoading(false);setUploadProgress('');}
  };
  const cancelPhotoUpload=()=>{uploadCancelled.current=true;uploadRequests.current.forEach(request=>request.abort());};
  const downloadCantaloupeIssues=()=>{if(!cantaloupeIssues.length)return;const content=['nama_berkas\tfolio/status\tketerangan',...cantaloupeIssues.map(issue=>`${issue.name}\t${issue.label}\t${issue.message.replace(/[\r\n\t]+/g,' ')}`)].join('\n');const url=URL.createObjectURL(new Blob([content],{type:'text/tab-separated-values;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=`${(editingBundle?.bundle_code||newBundleCode||'turots').replace(/[^\w.-]+/g,'_')}-foto-bermasalah.tsv`;anchor.click();URL.revokeObjectURL(url);};
  const saveCantaloupe = async () => {
    if(!cantaloupePages.length||cantaloupeIssues.length)return;
    try{
      setSaving(true);
      const importedPages=cantaloupePages.map(({id,label,folioLabel,imageUrl,checksumSha256})=>({canvasId:id,label,folioLabel,imageUrl,checksumSha256}));
      const isNewBundle=path==='/admin/manuskrip/bendel/baru';
      const result=isNewBundle
        ? await createCantaloupeBundle({bundleCode:newBundleCode,displayTitle:bundleMetadata.bundleTitle||newBundleCode,collectionName:collection,sourceProject:project,bundleMetadata:bundleToDb(bundleMetadata),pages:importedPages})
        : editingBundle ? await saveCantaloupePages(editingBundle.id,importedPages,completeSourceList) : null;
      if(!result)throw new Error('Bendel tidak ditemukan.');
      invalidateDetailRequestCache();
      let publicationNote='';
      const isNtBundle=Boolean(editingBundle&&/^NT\s/i.test(editingBundle.bundle_code||''));
      if(!isNewBundle&&isNtBundle&&(editingBundle.publication_status!=='published'||!['public_preview','public_full'].includes(editingBundle.access_level))){
        try{
          const {error:pageAccessError}=await supabase!.from('turots_pages').update({access_level:'public_preview'}).eq('bundle_id',editingBundle.id);
          if(pageAccessError)throw pageAccessError;
          await updateBundle(editingBundle.id,{publication_status:'published',access_level:'public_preview'});
          publicationNote=' Bendel otomatis diterbitkan setelah foto tersimpan.';
          invalidateDetailRequestCache();
        }catch(error){
          publicationNote=` Foto sudah tersimpan, tetapi penerbitan otomatis gagal: ${error instanceof Error?error.message:'kesalahan tidak diketahui'}.`;
        }
      }
      const success=`Impor Cantaloupe selesai: ${result.added} foto ditambahkan, ${result.updated} diperbarui.${result.missing?` ${result.missing} foto dari daftar sumber lengkap ditandai tidak ditemukan.`:''} Bendel kini memiliki ${result.total} halaman.${publicationNote}`;
      setMessage(success);setSaveFeedback(success);setCantaloupePages([]);setCantaloupeFiles([]);setCompleteSourceList(false);await load();
      if(isNewBundle)navigate('/admin/manuskrip');
    }
    catch(error){setMessage(error instanceof Error?`Gagal menyimpan foto: ${error.message}`:'Gagal menyimpan foto Cantaloupe.');}
    finally{setSaving(false);}
  };
  const saveTitleToBundle = async (bundle:Bundle) => { try { validateMetadata(metadata); if(!title.trim()||!computedCode)throw new Error('Lengkapi judul dan ID inventaris.'); const selectedCategory=normalizeCategory(category);if(!selectedCategory)throw new Error('Pilih satu kategori dari 19 kategori katalog.');const existingTitle=(bundle.turots_text_units||[]).find((unit:AnyRecord)=>unit.display_id===computedCode&&!unit.archived_at);if(existingTitle){setMessage(`Judul ${computedCode} sudah ada di bendel ini. Membuka edit judul yang ada.`);navigate(`/admin/manuskrip/${encodeURIComponent(existingTitle.id)}/edit`);return;}const ranges=parsePhotoPageRanges(photoPageRanges);const pageRows=bundle.turots_pages||[];const activeTitleIds=new Set((bundle.turots_text_units||[]).filter((unit:AnyRecord)=>!unit.archived_at).map((unit:AnyRecord)=>unit.id));if(ranges.length&&!pageRows.length)throw new Error('Bendel belum memiliki foto tersimpan; simpan foto dahulu sebelum mengisi rentang halaman.');for(const [first,last] of ranges){if(!pageRows.some((page:AnyRecord)=>Number(page.page_order)===first)||!pageRows.some((page:AnyRecord)=>Number(page.page_order)===last))throw new Error(`Batas rentang ${first}-${last} tidak ditemukan dalam bendel.`);if(pageRows.some((page:AnyRecord)=>Number(page.page_order)>=first&&Number(page.page_order)<=last&&page.text_unit_id&&activeTitleIds.has(page.text_unit_id)))throw new Error(`Rentang ${first}-${last} sudah dipakai judul aktif lain.`);}setSaving(true);await saveCatalogDraft({bundleCode:bundle.bundle_code,bundleTitle:bundle.display_title||bundle.bundle_code,bundleMetadata:{},title,collectionName:bundle.turots_collections?.name||collection,sourceProject:bundle.turots_collections?.source_project||project,photoPageRanges,textUnit:{displayId:computedCode,titleOriginal:title,titleCuratorial:metadata.titleTeam||title,titleFromTeam:metadata.titleTeam,titleLatin:metadata.titleLatin,categoryPrimary:selectedCategory,categorySecondary:metadata.categorySecondary,categoryTertiary:metadata.categoryTertiary,description:metadata.description,folioStart:metadata.folioStart,folioEnd:metadata.folioEnd,author:metadata.author,scribe:metadata.scribe,language:metadata.language,script:metadata.script,yearOriginal:metadata.yearOriginal,keywords:metadata.keywords,glossary:metadata.glossary,references:metadata.references,notes:metadata.notes,...metadataToDb(metadata)} as any,pages:[]});const success=`Judul ${computedCode} berhasil ditambahkan ke bendel ${bundle.bundle_code}${ranges.length?` dan ${ranges.reduce((sum,[start,end])=>sum+end-start+1,0)} foto dipetakan.`:'; foto belum dipetakan.'}`;setMessage(success);setSaveFeedback(success);await load();navigate('/admin/manuskrip');}catch(error){setMessage(error instanceof Error?error.message:'Gagal menambahkan judul.');}finally{setSaving(false);} };
  const publish = async (bundle: Bundle) => { if(saving||!supabase)return;setSaving(true);try{const {error:pageError}=await supabase.from('turots_pages').update({access_level:'public_preview'}).eq('bundle_id',bundle.id);if(pageError)throw pageError;await updateBundle(bundle.id,{publication_status:'published',access_level:'public_preview'});invalidateDetailRequestCache();setMessage('Bendel berhasil diterbitkan sebagai pratinjau publik.');await load();}catch(e){setMessage(e instanceof Error?e.message:'Gagal menerbitkan bendel.');}finally{setSaving(false);} };
  const removeBundle = async (bundle: Bundle) => {
    if (saving || !supabase) return;
    const confirmation = window.prompt(`Arsipkan bendel ${bundle.bundle_code}? Bendel tidak tampil di katalog publik dan masih dapat dipulihkan. Ketik kode bendel untuk mengonfirmasi:`);
    if (confirmation !== bundle.bundle_code) return;
    setSaving(true);
    try {
      await archiveCatalogRecord('bundle', bundle.id);
      setMessage(`Bendel ${bundle.bundle_code} berhasil diarsipkan beserta judul dan rekod halamannya.`);
      await load();
      if (path !== '/admin/manuskrip') navigate('/admin/manuskrip');
    } catch (error) { setMessage(`Gagal menghapus bendel: ${(error as Error).message || String(error)}`); }
    finally { setSaving(false); }
  };
  const removeUnit = async (bundle: Bundle, unit: AnyRecord) => {
    if(saving||!supabase)return setMessage('Supabase belum dikonfigurasi atau masih ada proses berjalan.');
    const label=unit.title_original||bundle.display_title||unit.display_id||'manuskrip ini';
    if(!window.confirm(`Hapus judul “${label}” (ID ${unit.display_id||'—'}) secara permanen? Foto bendel tetap tersimpan; kaitan foto ke judul ini akan dilepas.`))return;
    setSaving(true);
    try{
      const {data,error}=await supabase.from('turots_text_units').delete().eq('id',unit.id).select('id').single();
      if(error)throw error;
      if(!data)throw new Error('Judul tidak ditemukan atau tidak dapat dihapus.');
      setMessage(`Judul ${unit.display_id||''} berhasil dihapus.`);
      await load();
    }catch(e){setMessage(e instanceof Error?`Gagal menghapus judul: ${e.message}`:'Gagal menghapus judul.');}
    finally{setSaving(false);}
  };
  const edit = async () => {
    if (!editing) return;
    try {
      validateMetadata(metadata);
      if (!title.trim() || !computedCode) throw new Error('Lengkapi judul dan ID inventaris.');
      const selectedCategory = normalizeCategory(category);
      if (!selectedCategory) throw new Error('Pilih satu kategori dari 19 kategori katalog.');
      const unit = editingUnit;
      if (!unit?.id) throw new Error('Pilih unit teks.');
      if (computedCode !== unit.display_id) throw new Error('ID inventaris merupakan identitas tetap dan tidak dapat diganti dari editor ini.');
      if (!supabase) throw new Error('Supabase belum dikonfigurasi.');

      setSaving(true);
      const titleValues = {
        title_original: title.trim(),
        title_curatorial: metadata.titleTeam?.trim() || title.trim(),
        category_primary: selectedCategory,
        ...metadataToDb(metadata),
      };
      const titleDiff = diffMetadata(titleValues, unit);
      const pages = editing.turots_pages || [];
      const existingPageRanges = formatPhotoPageRanges(pages.filter((page: AnyRecord) => page.text_unit_id === unit.id).map((page: AnyRecord) => page.page_order));
      const rangeChanged = photoPageRanges.trim() !== existingPageRanges;
      let folios: Record<string, unknown> | null = null;
      if (rangeChanged) {
        const ranges = parsePhotoPageRanges(photoPageRanges);
        for (const [first,last] of ranges) {
          if (!pages.some((page:AnyRecord)=>Number(page.page_order)===first)||!pages.some((page:AnyRecord)=>Number(page.page_order)===last)) throw new Error(`Batas rentang ${first}-${last} tidak ditemukan dalam bendel.`);
        }
        folios = ranges.length ? { ranges } : { clear: true };
      }
      const operations: Array<Record<string, unknown>> = [];
      if (titleDiff.changes.length || folios) operations.push({
        sheet: 'Judul', row: 0, code: editing.bundle_code, key: unit.display_id, id: unit.id,
        values: titleDiff.values, changes: [...titleDiff.changes, ...(folios ? [{ field: 'pemetaan foto', before: existingPageRanges || 'kosong', after: photoPageRanges.trim() || 'kosong' }] : [])],
        folios,
      });
      if (operations.length) {
        const { error } = await supabase.rpc('apply_turots_catalog_import', { p_operations: operations });
        if (error) throw new Error(formatCatalogRpcError(error, 'Perubahan dibatalkan tanpa menyimpan data'));
      }
      const success = operations.length ? 'Metadata manuskrip berhasil disimpan dalam satu transaksi.' : 'Tidak ada perubahan baru untuk disimpan.';
      setMessage(success); setSaveFeedback(success); setEditing(null); await load(); navigate('/admin/manuskrip');
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Gagal mengedit.'); }
    finally { setSaving(false); }
  };
  const startEdit = (bundle: Bundle, selectedUnit?: AnyRecord) => { const unit = selectedUnit || bundle.turots_text_units?.[0] || {}; setEditingUnit(unit); setProject(bundle.turots_collections?.source_project || ''); setCollection(bundle.turots_collections?.name || ''); setEditing(bundle); setTitle(unit.title_original || bundle.display_title || ''); setDisplayId(unit.display_id || ''); setCategory(unit.category_primary || ''); setShowTitleFolioFields(false); setPhotoPageRanges(formatPhotoPageRanges((bundle.turots_pages||[]).filter((page:AnyRecord)=>page.text_unit_id===unit.id).map((page:AnyRecord)=>page.page_order))); setMetadata(dbToMetadata(unit)); setBundleMetadata({bundleTitle:bundle.display_title||'',surrogateFormat:bundle.surrogate_format||'',country:bundle.country||'',cityProvince:bundle.city_province||'',rightToLeft:bundle.right_to_left==null?'':bundle.right_to_left?'Ya':'Tidak',subjectMatter:bundle.subject_matter||'',copyist:bundle.copyist||'',copyingDateNative:bundle.copying_date_native||'',copyingPlace:bundle.copying_place||'',bundleScript:bundle.bundle_script||'',currentStatus:bundle.current_status||'',rubrication:bundle.rubrication||'',bundleDescription:bundle.bundle_description||'',colophon:bundle.colophon||'',affiliationUrl:bundle.affiliation_url||'',cover:bundle.cover||'',coverSize:bundle.cover_size||'',binding:bundle.binding||'',paperSize:bundle.paper_size||'',dimensions:bundle.dimensions||'',paperType:bundle.paper_type||'',paperTypeOther:bundle.paper_type_other||'',accessLevel:bundle.access_level||'public_preview',watermark:bundle.watermark||'',countermark:bundle.countermark||'',ink:bundle.ink||'',extentPages:String(bundle.extent_pages||''),blankPages:String(bundle.blank_pages||''),physicalCondition:bundle.physical_condition||'',completeness:bundle.completeness||'',illumination:bundle.illumination||'',illustration:bundle.illustration||'',notes:bundle.bundle_notes||''}); }
  const startBundleEdit = (bundle: Bundle) => {
    setEditing(bundle); setEditingUnit(null); setPhotoPageRanges(''); setCantaloupePages([]); setCantaloupeNames(''); setCantaloupeFiles([]); setCantaloupeBase('https://cloud.naracode.id/iiif/3'); setBundleMetadata({bundleTitle:bundle.display_title||'',surrogateFormat:bundle.surrogate_format||'',country:bundle.country||'',cityProvince:bundle.city_province||'',rightToLeft:bundle.right_to_left==null?'':bundle.right_to_left?'Ya':'Tidak',subjectMatter:bundle.subject_matter||'',copyist:bundle.copyist||'',copyingDateNative:bundle.copying_date_native||'',copyingPlace:bundle.copying_place||'',bundleScript:bundle.bundle_script||'',currentStatus:bundle.current_status||'',rubrication:bundle.rubrication||'',bundleDescription:bundle.bundle_description||'',colophon:bundle.colophon||'',affiliationUrl:bundle.affiliation_url||'',cover:bundle.cover||'',coverSize:bundle.cover_size||'',binding:bundle.binding||'',paperSize:bundle.paper_size||'',dimensions:bundle.dimensions||'',paperType:bundle.paper_type||'',watermark:bundle.watermark||'',countermark:bundle.countermark||'',ink:bundle.ink||'',extentPages:String(bundle.extent_pages||''),blankPages:String(bundle.blank_pages||''),physicalCondition:bundle.physical_condition||'',completeness:bundle.completeness||'',illumination:bundle.illumination||'',illustration:bundle.illustration||'',notes:bundle.bundle_notes||''});
  };
  const saveBundleMetadata = async (bundle: Bundle) => { try { setSaving(true); await updateBundle(bundle.id,bundleToDb(bundleMetadata)); const success=`Metadata bendel ${bundle.bundle_code} berhasil disimpan.`; setMessage(success); setSaveFeedback(success); await load(); navigate('/admin/manuskrip'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Gagal menyimpan metadata bendel.'); } finally { setSaving(false); } };
  useEffect(()=>{if(path!=='/admin/manuskrip/baru')return;setEditing(null);setEditingUnit(null);setTitle('');setDisplayId('');setCategory('');setMetadata({});setMessage('');},[path]);
  useEffect(()=>{if(path!=='/admin/manuskrip/bendel/baru')return;setEditing(null);setEditingUnit(null);setNewBundleCode('');setBundleMetadata({});setCantaloupeBase('https://cloud.naracode.id/iiif/3');setCantaloupeNames('');setCantaloupePages([]);setCantaloupeFiles([]);setMessage('');},[path]);
  useEffect(()=>{if(!bundleTitleNewRoute)return;setTitle('');setDisplayId('');setCategory('');setPhotoPageRanges('');setMetadata({});setMessage('');},[path]);
  const editRoute=path.match(/^\/admin\/manuskrip\/([^/]+)\/edit$/);
  const bundleEditRoute=path.match(/^\/admin\/manuskrip\/bendel\/([^/]+)\/edit$/);
  const bundleTitleNewRoute=path.match(/^\/admin\/manuskrip\/bendel\/([^/]+)\/judul\/baru$/);
  const editingBundleId=bundleEditRoute?decodeURIComponent(bundleEditRoute[1]):'';
  const targetBundleId=editingBundleId||(bundleTitleNewRoute?decodeURIComponent(bundleTitleNewRoute[1]):'');
  const editingBundle=bundles.find(bundle=>bundle.id===targetBundleId)||null;
  useEffect(()=>{if(!editingBundle)return;if(editing?.id!==editingBundle.id||editingUnit!==null)startBundleEdit(editingBundle);},[editingBundle?.id,bundles,editing?.id,editingUnit]);
  useEffect(()=>{if(!editRoute||!adminLoaded)return;const unitId=decodeURIComponent(editRoute[1]);const bundle=bundles.find(item=>item.turots_text_units?.some((unit:AnyRecord)=>unit.id===unitId));const unit=bundle?.turots_text_units?.find((item:AnyRecord)=>item.id===unitId);if(bundle&&unit&&editingUnit?.id!==unitId)startEdit(bundle,unit);else if(!unit)setMessage(`Manuskrip dengan ID ${unitId} tidak ditemukan.`);},[path,bundles,adminLoaded]);
  if (supabaseConfigured && !session) return <section className="page-section admin-page"><a className="admin-public-home" href="/" onClick={event=>{event.preventDefault();navigate('/');}}><Home size={17}/>Kembali ke laman utama</a><p className="eyebrow">Admin · Supabase Auth</p><h1>Login Admin</h1><div className="admin-form admin-fields"><label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><button className="primary-action" onClick={() => void login()}>Login</button><p>{message}</p></div></section>;
  if (session && !adminCheckDone) return <section className="page-section admin-page"><p role="status">Memeriksa hak admin…</p></section>;
  if (session && !isAdmin) return <section className="page-section admin-page"><a className="admin-public-home" href="/" onClick={event=>{event.preventDefault();navigate('/');}}><Home size={17}/>Kembali ke laman utama</a><p className="eyebrow">Admin · Supabase Auth</p><h1>Akses admin belum diberikan</h1><p role="alert">{message || 'Akun ini belum terdaftar sebagai Admin Turots.'}</p><button className="admin-logout" onClick={() => void logout()}>Logout</button></section>;
  const photoPageRangeField=<label>Rentang halaman foto<input value={photoPageRanges} onChange={event=>setPhotoPageRanges(event.target.value)} placeholder="1-174 atau 2-174"/><small>Nomor bendel tetap 1-174. Isi rentang yang memuat judul, misalnya 1-174 atau 2-174. Untuk dua judul: 1-100 dan 101-174.</small></label>;
  const editorForm=<div className="admin-form"><label>Judul asli manuskrip<input value={title} onChange={e=>setTitle(e.target.value)}/></label>{photoPageRangeField}<div className="metadata-controls"><label>ID inventaris<input value={displayId} readOnly/></label><label>Kategori<select value={category} onChange={event=>setCategory(event.target.value)}><option value="">Pilih kategori</option>{CATALOG_CATEGORIES.map(item=><option key={item} value={item}>{item}</option>)}</select></label></div><button type="button" className="secondary-action" aria-expanded={showTitleFolioFields} onClick={()=>setShowTitleFolioFields(value=>!value)}>{showTitleFolioFields?'Sembunyikan folio manuskrip':'Folio manuskrip (opsional)'}</button><MetadataEditor value={metadata} onChange={setMetadata} bundles={bundles} showFolioFields={showTitleFolioFields}/><button disabled={saving} className="primary-action" onClick={()=>void edit()}>Simpan perubahan metadata judul</button></div>;
  const cantaloupeImportPanel=<fieldset className="metadata-section"><legend>Impor foto atau PDF ke Cantaloupe</legend><p>Untuk satu bendel: foto hingga 95 MiB atau satu PDF dalam satu proses. Untuk satu folder penuh dan PDF besar (hingga 1 GiB), gunakan menu “Unggah foto massal”. Sumber yang sudah tersedia tidak ditimpa.</p><label>Pilih foto atau satu PDF<input type="file" multiple accept=".jpg,.jpeg,.png,.tif,.tiff,.pdf" onChange={event=>{const files=Array.from(event.currentTarget.files||[]) as File[];const pdfs=files.filter(file=>/\.pdf$/i.test(file.name));if(pdfs.length&&(pdfs.length!==1||files.length!==1)){setCantaloupeFiles([]);setCantaloupePages([]);setMessage('Pilih satu PDF saja per proses; jangan campur PDF dengan foto.');return;}const names=files.map(file=>file.name).sort((left,right)=>left.localeCompare(right,undefined,{numeric:true,sensitivity:'base'}));event.currentTarget.value='';setCantaloupeFiles(files);setCantaloupePages([]);setCantaloupeIssues([]);setRetryOnlyIssues(false);setPdfPageCount('');if(names.length){setCantaloupeNames(names.join('\n'));setMessage(`${names.length} berkas dipilih (${(files.reduce((sum,file)=>sum+file.size,0)/1024/1024).toFixed(1)} MB). Tekan “Unggah dan periksa” untuk mengirim sumber.`);}}}/></label>{cantaloupeFiles.length>0&&<p>{cantaloupeFiles.length} berkas dipilih · {(cantaloupeFiles.reduce((sum,file)=>sum+file.size,0)/1024/1024).toFixed(1)} MB total</p>}{(cantaloupeFiles.some(file=>/\.pdf$/i.test(file.name))||cantaloupeNames.split(/[\r\n,;]+/).some(name=>/\.pdf$/i.test(name.trim())))&&<label>Jumlah halaman PDF<input type="number" min="1" step="1" value={pdfPageCount} onChange={event=>setPdfPageCount(event.target.value)} placeholder="Contoh: 173"/><small>Isi sesuai jumlah halaman pada PDF. Halaman akan diberi label Halaman PDF 1, 2, dan seterusnya.</small></label>}<label>URL dasar IIIF Image API<input value={cantaloupeBase} onChange={event=>setCantaloupeBase(event.target.value)} placeholder="https://cloud.naracode.id/iiif/3"/></label><label>Nama berkas<textarea rows={8} value={cantaloupeNames} onChange={event=>{setCantaloupeNames(event.target.value);setCantaloupePages([]);setCantaloupeIssues([]);}} placeholder={'DS_0097_00037_001r.JPG\nDS_0097_00037_001v.JPG\nEAP1564_DPQ_TBN_ONI_001.pdf'} /></label><div className="admin-header-actions"><button type="button" disabled={cantaloupeLoading||saving||uploadingPhotos||!cantaloupeFiles.length} className="primary-action" onClick={()=>void uploadAndPreviewCantaloupe()}>{uploadingPhotos?<LoaderCircle className="spin" size={16}/>:<Upload size={16}/>} {retryOnlyIssues?`Unggah ${cantaloupeFiles.length} foto bermasalah & periksa ulang`:'Unggah dan periksa sumber'}</button><button type="button" disabled={cantaloupeLoading||saving||uploadingPhotos} className="secondary-action" onClick={()=>void previewCantaloupe()}>{cantaloupeLoading?<LoaderCircle className="spin" size={16}/>:<RefreshCw size={16}/>}Periksa sumber yang sudah ada</button>{uploadingPhotos&&<button type="button" className="secondary-action" onClick={cancelPhotoUpload}>Batalkan unggahan</button>}</div>{uploadingPhotos&&<p role="status" aria-live="polite">{uploadProgress||'Menyiapkan unggahan…'}</p>}{cantaloupeIssues.length>0&&<label>Pilih berkas untuk foto bermasalah<input type="file" multiple accept=".jpg,.jpeg,.png,.tif,.tiff" onChange={event=>{const selected=Array.from(event.currentTarget.files||[]) as File[];event.currentTarget.value='';const issueNames=new Set(cantaloupeIssues.map(issue=>issue.name));const matched=selected.filter(file=>issueNames.has(file.name));setCantaloupeFiles(matched);setRetryOnlyIssues(true);if(!matched.length)setMessage('Berkas yang dipilih tidak cocok dengan nama foto pada daftar bermasalah.');else setMessage(`${matched.length} foto bermasalah dipilih untuk dicoba ulang.`);}}/><small>Pilih foto yang bermasalah saja. Pilih semua foto dalam folder jika perlu; aplikasi hanya mengambil nama yang ada di daftar masalah.</small></label>}{cantaloupeIssues.length>0&&<section className="metadata-section" role="alert"><h3>Foto yang gagal diperiksa atau diunggah ({cantaloupeIssues.length})</h3><p>Daftar ini memuat semua sumber bermasalah pada pemeriksaan terakhir.</p><button type="button" className="secondary-action" onClick={downloadCantaloupeIssues}>Unduh daftar foto bermasalah (.tsv)</button><details><summary>Lihat daftar foto</summary><ol>{cantaloupeIssues.map((issue,index)=><li key={`${issue.name}-${index}`}><code>{issue.name}</code> — {issue.message}</li>)}</ol></details></section>}{editingBundle&&<label className="metadata-checkbox"><input type="checkbox" checked={completeSourceList} onChange={event=>setCompleteSourceList(event.target.checked)}/> Tandai foto lama yang tidak ada di daftar ini sebagai “tidak ditemukan”.<small>Opsional. Centang hanya jika daftar nama ini berisi SEMUA foto dalam bendel. Foto fisik tidak dihapus dan tidak ditandai jika kotak ini kosong.</small></label>}{cantaloupePages.length>0&&cantaloupeIssues.length===0&&!cantaloupeLoading&&<><p role="status">{cantaloupePages.length} halaman/foto siap disimpan ke bendel.</p><ol className="cantaloupe-preview">{cantaloupePages.slice(0,8).map(page=><li key={page.id}><span>{page.folioLabel}</span><code>{page.id.split('/').at(-1)}</code></li>)}</ol>{cantaloupePages.length>8&&<small>dan {cantaloupePages.length-8} halaman/foto lainnya, mengikuti urutan sumber.</small>}<button type="button" disabled={saving} className="primary-action" onClick={()=>void saveCantaloupe()}>Simpan {cantaloupePages.length} halaman/foto ke bendel</button></>}</fieldset>;
  const bundleEditorForm=<div className="admin-form"><BundleMetadataEditor value={bundleMetadata} onChange={setBundleMetadata}/><button disabled={saving} className="primary-action" onClick={()=>editingBundle&&void saveBundleMetadata(editingBundle)}>Simpan metadata bendel</button>{cantaloupeImportPanel}</div>;
  const bundleTitleForm=<div className="admin-form"><label>Judul asli<input value={title} onChange={event=>setTitle(event.target.value)} /></label>{photoPageRangeField}<label>ID inventaris<input value={displayId} onChange={event=>setDisplayId(event.target.value)} placeholder="contoh: 01.A.08.0001" /></label><label>Kategori<select value={category} onChange={event=>setCategory(event.target.value)}><option value="">Pilih kategori</option>{CATALOG_CATEGORIES.map(item=><option key={item} value={item}>{item}</option>)}</select></label><MetadataEditor value={metadata} onChange={setMetadata} bundles={bundles} showFolioFields={false}/><button disabled={saving||!editingBundle} className="primary-action" onClick={()=>editingBundle&&void saveTitleToBundle(editingBundle)}>Tambah judul ke bendel</button></div>;
  const newBundleForm=<div className="admin-form"><div className="metadata-controls physical-controls"><label>Proyek sumber<input value={project} onChange={event=>setProject(event.target.value)}/></label><label>Koleksi<input value={collection} onChange={event=>setCollection(event.target.value)}/></label><label>Kode bendel<input value={newBundleCode} onChange={event=>setNewBundleCode(event.target.value)} placeholder="DS.037"/></label></div><BundleMetadataEditor value={bundleMetadata} onChange={setBundleMetadata}/>{cantaloupeImportPanel}</div>;
  const routeUnitId=editRoute?decodeURIComponent(editRoute[1]):'';
  const routeUnit=editingUnit?.id===routeUnitId?editingUnit:null;
  const routeTitle=routeUnit?.title_original||editing?.display_title||routeUnit?.display_id||'';
  const logoutButton=<button className="admin-logout" onClick={()=>void logout()}>Logout</button>;
  const workspace=(content:ReactNode)=><div className="admin-workspace"><aside className="admin-sidebar"><a className="admin-brand" href="/admin" onClick={event=>{event.preventDefault();navigate('/admin');}}><span className="admin-brand-mark">S</span><span><strong>Ruang Admin</strong><small>Galeri Manuskrip Sampurnan</small></span></a><a className="admin-public-home" href="/" onClick={event=>{event.preventDefault();navigate('/');}}><Home size={17}/>Laman utama</a><nav aria-label="Navigasi dashboard admin">{[['/admin','Dashboard'],['/admin/manuskrip','Manuskrip'],['/admin/artikel','Artikel'],['/admin/informasi','Informasi'],['/admin/pengumuman','Pengumuman'],['/admin/buku-tamu','Buku Tamu']].map(([to,label])=><button key={to} aria-current={path===to||to==='/admin/manuskrip'&&path.startsWith(to+'/')?'page':undefined} onClick={()=>navigate(to)}>{label}</button>)}</nav><button className="admin-logout" onClick={()=>void logout()}>Logout</button></aside><main className="admin-main">{content}</main>{saving&&<div className="admin-save-overlay"><div className="admin-save-dialog" role="dialog" aria-modal="true" aria-label="Memproses metadata"><LoaderCircle className="spin" size={34}/><strong>Memproses metadata</strong><p>Mohon tunggu, data sedang diproses.</p></div></div>}{saveFeedback&&!saving&&<div className="admin-save-overlay"><div className="admin-save-dialog" role="dialog" aria-modal="true" aria-label="Metadata berhasil disimpan"><CheckCircle2 size={36}/><strong>Berhasil</strong><p>{saveFeedback}</p><button className="primary-action" autoFocus onClick={()=>setSaveFeedback('')}>Tutup</button></div></div>}</div>;
  if(path==='/admin')return workspace(<AdminOverview navigate={navigate}/>);
  if(path==='/admin/artikel')return workspace(<AdminEditorialManager key="article" type="article" userId={session.user.id}/>);
  if(path==='/admin/informasi')return workspace(<AdminEditorialManager key="information" type="information" userId={session.user.id}/>);
  if(path==='/admin/pengumuman')return workspace(<AdminEditorialManager key="announcement" type="announcement" userId={session.user.id}/>);
  if(path==='/admin/buku-tamu')return workspace(<AdminGuestbookManager/>);
  if(path==='/admin/manuskrip/foto-massal')return workspace(<AdminBulkPhotoUpload key={path} bundles={bundles} session={session} onSaved={load} navigate={navigate}/>);
  if(path==='/admin/manuskrip')return workspace(<section className="page-section admin-page"><p className="eyebrow">Katalog manuskrip</p><div className="admin-heading"><div><h1>Manuskrip</h1><p>Kelola metadata bendel dan judul.</p></div><div className="admin-header-actions"><button className="secondary-action" onClick={()=>navigate('/admin/manuskrip/foto-massal')}>Unggah foto massal</button><button className="secondary-action" onClick={()=>navigate('/admin/manuskrip/bendel/baru')}>Tambah bendel</button><button className="primary-action" onClick={()=>navigate('/admin/manuskrip/baru')}>Tambah manuskrip</button></div></div>{!supabaseConfigured&&<div className="status-badge">Supabase belum dikonfigurasi.</div>}<p role="status">{message}</p><MetadataTransfer bundles={bundles} onSaved={load}/><div className="admin-list"><h2>Daftar manuskrip</h2><div className="admin-list-tools"><label className="admin-list-search">Cari manuskrip<input type="search" value={manuscriptSearch} onChange={event=>setManuscriptSearch(event.target.value)} placeholder="ID, judul, bendel, pengarang, koleksi…"/></label><p aria-live="polite">{matchingBundles.length} bendel ditemukan · halaman {Math.min(manuscriptPage,adminPageCount)} dari {adminPageCount}</p></div><div className="admin-list-head" aria-hidden="true"><span>ID</span><span>Judul</span><span>Aksi</span></div>{visibleAdminBundles.flatMap(bundle=><div className="admin-bundle-group" key={`bundle-${bundle.id}`}><article className="admin-list-item admin-bundle-list-item"><code className="admin-list-id">{bundle.bundle_code}</code><strong className="admin-list-title">Bendel · {bundle.display_title||bundle.bundle_code}</strong><div className="admin-unit-actions"><button onClick={()=>navigate(`/admin/manuskrip/bendel/${encodeURIComponent(bundle.id)}/edit`)}>Edit metadata bendel</button><button className="admin-delete" disabled={saving} onClick={()=>void removeBundle(bundle)}>Arsipkan bendel</button>{bundle.publication_status!=='published'&&bundle.publication_status!=='archived'&&<button disabled={saving} onClick={()=>void publish(bundle)}>Publish bendel</button>}</div></article>{(bundle.turots_text_units||[]).filter((unit:AnyRecord)=>!unit.archived_at&&(!normalizedManuscriptSearch||[bundle.bundle_code,bundle.display_title,bundle.turots_collections?.name].some(matchesManuscriptText)||[unit.display_id,unit.title_original,unit.title_latin,unit.author,unit.scribe,unit.related_persons,unit.category_primary].some(matchesManuscriptText))).map((unit:AnyRecord)=><article className="admin-list-item" key={unit.id}><code className="admin-list-id">{unit.display_id||'—'}</code><strong className="admin-list-title" dir="auto">{unit.title_original||'Tanpa judul'}</strong><div className="admin-unit-actions"><button onClick={()=>navigate(`/admin/manuskrip/${encodeURIComponent(unit.id)}/edit`)}>Edit judul</button><button className="admin-delete" disabled={saving} onClick={()=>void removeUnit(bundle,unit)}>Hapus judul</button></div></article>)}</div>)}</div>{adminPageCount>1&&<nav className="pagination admin-pagination" aria-label="Halaman manuskrip">{Array.from({length:adminPageCount},(_,index)=><button key={index} aria-current={manuscriptPage===index+1?"page":undefined} onClick={()=>{setManuscriptPage(index+1);document.querySelector(".admin-list")?.scrollIntoView({behavior:"smooth",block:"start"});}}>{index+1}</button>)}</nav>}</section>);
  if(path==='/admin/manuskrip/baru')return workspace(<section className="page-section admin-page"><p className="eyebrow">Manuskrip · Entri baru</p><h1>Tambah manuskrip</h1><p className="admin-context">Pilih bendel tempat judul berada, lalu isi metadata dan rentang folionya.</p><div className="admin-form"><label>Bendel induk<select defaultValue="" onChange={event=>{if(event.target.value)navigate(`/admin/manuskrip/bendel/${encodeURIComponent(event.target.value)}/judul/baru`);}}><option value="">Pilih bendel</option>{bundles.map(bundle=><option key={bundle.id} value={bundle.id}>{bundle.bundle_code}</option>)}</select></label><button onClick={()=>navigate('/admin/manuskrip/bendel/baru')}>Tambah bendel baru</button></div><p role="status">{message}</p></section>);
  if(path==='/admin/manuskrip/bendel/baru')return workspace(<section className="page-section admin-page"><p className="eyebrow">Manuskrip · Bendel baru</p><h1>Tambah bendel dari Cantaloupe</h1><p className="admin-context">Buat bendel dan daftarkan seluruh foto dari IIIF Image API. Setelah tersimpan, tambah judul dan isi rentang folionya.</p>{newBundleForm}<p role="status">{message}</p></section>);
  if(editRoute)return workspace(<section className="page-section admin-page"><p className="eyebrow">Manuskrip · Editor metadata</p>{routeUnit?<><h1>Edit metadata manuskrip</h1><div className="admin-edit-context"><strong>{routeTitle}</strong><span>ID manuskrip: {routeUnit.display_id||'—'}</span><span>Koleksi: {editing?.turots_collections?.name||'—'} · Status: {editing?.publication_status||'—'}</span></div>{editorForm}</>:adminLoaded?<div role="alert" className="empty"><h1>Manuskrip tidak ditemukan</h1><p>{message||`Tidak ada unit dengan ID ${routeUnitId}.`}</p></div>:<div role="status" className="empty"><h1>Memuat manuskrip…</h1><p>Editor terkunci ke ID <code>{routeUnitId}</code>.</p></div>}<p role="status">{message}</p></section>);
  if(bundleEditRoute)return workspace(<section className="page-section admin-page"><p className="eyebrow">Katalog manuskrip · metadata induk</p>{editingBundle?<><h1>Edit metadata bendel</h1><div className="admin-edit-context"><strong>{editingBundle.display_title||editingBundle.bundle_code}</strong><span>Kode bendel: {editingBundle.bundle_code}</span><span>{(editingBundle.turots_text_units||[]).length} judul di dalam bendel · Koleksi: {editingBundle.turots_collections?.name||'—'}</span></div><div className="admin-header-actions"><button className="secondary-action" onClick={()=>navigate(`/admin/manuskrip/bendel/${encodeURIComponent(editingBundle.id)}/judul/baru`)}>Tambah judul ke bendel</button><button className="admin-delete" disabled={saving} onClick={()=>void removeBundle(editingBundle)}>Hapus bendel</button></div>{bundleEditorForm}</>:adminLoaded?<div role="alert" className="empty"><h1>Bendel tidak ditemukan</h1><p>ID bendel: {editingBundleId}</p></div>:<div role="status" className="empty"><h1>Memuat metadata bendel…</h1></div>}<p role="status">{message}</p></section>);
  if(bundleTitleNewRoute)return workspace(<section className="page-section admin-page"><p className="eyebrow">Manuskrip · item judul baru</p>{editingBundle?<><h1>Tambah judul ke bendel {editingBundle.bundle_code}</h1><div className="admin-edit-context"><strong>{editingBundle.display_title||editingBundle.bundle_code}</strong><span>{(editingBundle.turots_pages||[]).length} foto tersimpan · Koleksi: {editingBundle.turots_collections?.name||'—'}</span></div>{bundleTitleForm}</>:adminLoaded?<div role="alert" className="empty"><h1>Bendel tidak ditemukan</h1></div>:<div role="status" className="empty"><h1>Memuat bendel…</h1></div>}<p role="status">{message}</p></section>);
  return workspace(<section className="page-section admin-page"><div role="alert" className="empty"><h1>Halaman admin tidak ditemukan</h1><button onClick={()=>navigate('/admin')}>Buka dashboard admin</button></div></section>);
}
