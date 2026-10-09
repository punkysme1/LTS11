export const PROJECT_CODES: Record<string,string> = {Dreamsea:'01',NT:'02',EAP:'03'};
export const COLLECTION_CODES: Record<string,string> = {Ndalem:'A','Ainun Niam':'B',Wasil:'C',Zamroni:'D',Burhan:'E',Zaim:'F'};
export const CATEGORY_CODES: Record<string,number> = {Siroh:1,Sejarah:2,Fikih:3,Akidah:4,Quran:5,Hadis:6,Falak:7,Nahwu:8,Shorof:9,'Ilmu alat':10,Akhlaq:11,Khutbah:12,Doa:13,Fatwa:14,Surat:15,Primbon:16,Mantiq:17,Maulid:18,Matematika:19};
export function inventoryCode(project:string,collection:string,category:string,sequence:string) {
 const n=Number(sequence);
 if(!PROJECT_CODES[project]||!COLLECTION_CODES[collection]||!CATEGORY_CODES[category]||!Number.isInteger(n)||n<1||n>9999)return '';
 return [PROJECT_CODES[project],COLLECTION_CODES[collection],String(CATEGORY_CODES[category]).padStart(2,'0'),String(n).padStart(4,'0')].join('.');
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
  if(m[key]&&!/^\d+$/.test(m[key]))throw new Error(name+' harus berupa bilangan bulat, tanpa satuan.');
 }
 if(m.totalPages&&m.blankPages&&Number(m.blankPages)>Number(m.totalPages))throw new Error('Lembar kosong tidak boleh melebihi jumlah lembar.');
 for(const key of ['coverSize','paperSize','dimensions']){
  if(!m[key]||m[key]==='Tidak ada')continue;
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
