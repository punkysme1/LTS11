export const PROJECT_CODES: Record<string,string> = {Dreamsea:'01',NT:'02','Nahdlatut Turots':'02',EAP:'03','British Library':'03'};
export const COLLECTION_CODES: Record<string,string> = {Ndalem:'A','Ainun Niam':'B',Wasil:'C','Ahmad Wasil':'C',Zamroni:'D',Burhan:'E',Zaim:'F'};
export const CATEGORY_CODES: Record<string,number> = {Siroh:1,Sejarah:2,Fikih:3,Akidah:4,Quran:5,Hadis:6,Falak:7,Nahwu:8,Shorof:9,'Ilmu alat':10,Akhlaq:11,Khutbah:12,Doa:13,Fatwa:14,Surat:15,Primbon:16,Mantiq:17,Maulid:18,Matematika:19};
export function inventoryCode(project:string,collection:string,category:string,sequence:string) {
 const n=Number(sequence);
 if(!PROJECT_CODES[project]||!COLLECTION_CODES[collection]||!CATEGORY_CODES[category]||!Number.isInteger(n)||n<1||n>9999)return '';
 return [PROJECT_CODES[project],COLLECTION_CODES[collection],String(CATEGORY_CODES[category]).padStart(2,'0'),String(n).padStart(4,'0')].join('.');
}
export function normalizeBundleCodeInput(raw:string,bundles?:Array<{bundle_code:string}>):string {
 const clean=String(raw||'').trim();
 if(!clean)return '';
 if(bundles?.some(b=>b.bundle_code.toLowerCase()===clean.toLowerCase()))return bundles.find(b=>b.bundle_code.toLowerCase()===clean.toLowerCase())!.bundle_code;
 const dsMatch=clean.match(/^DS[.\s_-]*0*(\d+)$/i);
 if(dsMatch){
  const target=`DS 0097 ${String(Number(dsMatch[1])).padStart(5,'0')}`;
  if(!bundles||bundles.some(b=>b.bundle_code===target))return target;
 }
 const ntMatch=clean.match(/^NT[.\s_-]*0*(\d+(?:\.\d+)?)$/i);
 if(ntMatch){
  const parts=ntMatch[1].split('.');
  const target=`NT ${parts[0].padStart(3,'0')}${parts[1]?'.'+parts[1]:''}`;
  if(!bundles||bundles.some(b=>b.bundle_code===target))return target;
 }
 const eapMatch=clean.match(/^EAP1564[/._-](\d+)[/._-]0*(\d+)$/i);
 if(eapMatch){
  const target=`EAP1564_${eapMatch[1]}_${Number(eapMatch[2])}`;
  if(!bundles||bundles.some(b=>b.bundle_code===target))return target;
 }
 return clean;
}
export function readItems(value:string|undefined,legacyKey='text'): any[] {
 if(!value?.trim())return [];
 try{const items=JSON.parse(value);if(Array.isArray(items))return items.filter(v=>v&&typeof v==='object'&&!Array.isArray(v));}catch{}
 return [{[legacyKey]:value}];
}
export function safeLink(value:string|undefined) {try {const u=new URL(value||'');return ['http:','https:'].includes(u.protocol)?u.href:undefined;}catch{return undefined;}}
export function dimension(value:string|undefined): [string,string] {
 const m=(value||'').match(/^\s*(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*(?:cm)?\s*$/i);
 return m?[m[1].replace(',','.'),m[2].replace(',','.')]:['',''];
}
export function validateMetadata(m:Record<string,string>) {
 for(const [key,name] of [['totalPages','Jumlah halaman'],['blankPages','Halaman kosong'],['linesPerPage','Baris per halaman']]){
  if(m[key]&&!/^\d+(?:\s*(?:pages|hlm|halaman|lembar))?$/i.test(m[key].trim()))throw new Error(name+' harus berupa bilangan bulat (misal 242 atau 242 pages).');
 }
 const tpNum=m.totalPages?Number((m.totalPages.match(/\d+/)||[])[0]):0;
 const bpNum=m.blankPages?Number((m.blankPages.match(/\d+/)||[])[0]):0;
 if(tpNum&&bpNum&&bpNum>tpNum)throw new Error('Lembar kosong tidak boleh melebihi jumlah lembar.');
 for(const key of ['coverSize','paperSize','dimensions']){
  if(!m[key]||m[key]==='Tidak ada'||m[key].toLowerCase()==='tidak ada')continue;
  const [p,l]=dimension(m[key]);if(!p||!l||Number(p)<=0||Number(l)<=0)throw new Error('Lengkapi panjang dan lebar ukuran dalam cm.');
 }
 for(const r of readItems(m.references,'citation'))if(r.url&&!safeLink(r.url))throw new Error('Tautan referensi harus berupa URL http atau https.');
 if(m.categoryTertiary&&!m.categorySecondary)throw new Error('Isi kategori 2 sebelum kategori 3.');
 for(const [index,item] of readItems(m.provenance,'claim').entries()) {
  if(!item.field?.trim()||!item.value?.trim())throw new Error(`Provenance ${index+1}: field dan nilai klaim wajib diisi.`);
  if(!item.source?.trim())throw new Error(`Provenance ${index+1}: sumber klaim wajib diisi.`);
  if(item.confidence&&!['tinggi','sedang','rendah','belum dinilai'].includes(item.confidence))throw new Error(`Provenance ${index+1}: tingkat kepastian tidak valid.`);
 }
}
const PROVENANCE_MARKER='\n\n[PROVENANCE_KLAIM_V1]';
export function packNotesAndProvenance(notes:string|undefined,provenance:string|undefined) {
 const claims=readItems(provenance,'claim');
 const note=(notes||'').split(PROVENANCE_MARKER)[0].trim();
 return claims.length?`${note}${PROVENANCE_MARKER}${JSON.stringify(claims)}`:note;
}
export function unpackNotesAndProvenance(value:string|undefined) {
 const [notes,encoded]=(value||'').split(PROVENANCE_MARKER,2);
 let provenance:any[]=[];
 if(encoded){try{const parsed=JSON.parse(encoded);if(Array.isArray(parsed))provenance=parsed.filter(x=>x&&typeof x==='object');}catch{}}
 return {notes:notes||'',provenance};
}
export function manuscriptPath(bundle:any,unit:any) {
 return unit.slug?'/katalog/'+encodeURIComponent(unit.slug):'/katalog/'+bundle.id+'?unit='+unit.id;
}
