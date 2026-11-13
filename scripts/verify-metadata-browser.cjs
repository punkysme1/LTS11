const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const output=path.resolve('test-results/metadata');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const b='00000000-0000-4000-8000-000000000001',u='00000000-0000-4000-8000-000000000002';
 const user={id:'00000000-0000-4000-8000-000000000003',email:'test@example.invalid',aud:'authenticated',role:'authenticated'};
 const session={access_token:'test-token',refresh_token:'test-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user};
 await page.addInitScript(session=>localStorage.setItem('sb-audit-auth-token',JSON.stringify(session)),session);
 const unit={id:u,bundle_id:b,display_id:'01.A.03.0001',record_no:'TQ0001',category_sequence_no:1,sequence_no:1,title_original:'كتاب الفقه',title_curatorial:'Kitab Fikih',category_primary:'Fikih',author:'Penulis lama',language:'Arab; Jawa',script:'Arab; Pegon',metadata_status:'imported',page_ranges_label:'1-2'};
 const photos=Array.from({length:20000},(_,i)=>({id:'p'+i,bundle_id:b,page_order:i+1,text_unit_id:i<2?u:null,image_url:'https://images.invalid/'+i,access_level:'public_preview'}));
 const bundle={id:b,bundle_code:'DS 0097 00057',display_title:'Bendel uji',publication_status:'draft',metadata_status:'imported',turots_collections:{name:'Ndalem',source_project:'Dreamsea'},turots_text_units:[unit],turots_pages:photos};
 const writes=[];
 await page.route('https://**/*',async route=>{
  const req=route.request(),url=new URL(req.url());let data=[];
  if(url.hostname!=='audit.invalid')return route.fulfill({status:404,body:''});
  if(url.pathname.includes('/auth/'))data=user;
  if(url.pathname.endsWith('/turots_admins'))data={user_id:user.id};
  if(url.pathname.endsWith('/turots_bundles'))data=[bundle];
  if(url.pathname.endsWith('/turots_text_units'))data=[unit];
  if(url.pathname.endsWith('/turots_pages'))data=photos;
  if(Array.isArray(data)) {
   const range=req.headers().range;const from=Number(url.searchParams.get('offset')||range?.split('-')[0]||0);const count=Number(url.searchParams.get('limit')||(range?Number(range.split('-')[1])-from+1:1000));data=data.slice(from,from+count);
  }
  if(req.headers().accept?.includes('vnd.pgrst.object+json') && Array.isArray(data))data=data[0]||null;
  if(!['GET','OPTIONS'].includes(req.method())) {
   writes.push({url:req.url(),body:req.postDataJSON()});
   if(url.pathname.endsWith('/apply_turots_title_metadata_v2'))data={completed:req.postDataJSON().p_operations.map(o=>'Judul '+o.key)};
  }
  return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 await page.goto('http://127.0.0.1:3005/admin/manuskrip');
 await page.getByRole('heading',{name:'Metadata Excel',exact:true}).waitFor();
 const exported=await page.evaluate(async bundle=>{
  const {metadataWorkbook,readMetadataXlsx}=await import('/src/services/metadataXlsx.ts');
  const {planMetadataImport}=await import('/src/services/metadataImport.ts');
  const blob=metadataWorkbook([bundle]);const parsed=await readMetadataXlsx(new File([blob],'metadata.xlsx'));
  const plan=planMetadataImport(parsed.bundles,parsed.titles,[bundle],parsed.photos);
  return {bytes:Array.from(new Uint8Array(await blob.arrayBuffer())),errors:plan.errors,changed:plan.actions.filter(a=>a.kind!=='skip').length};
 },bundle);
 assert.deepEqual(exported.errors,[]);assert.equal(exported.changed,0);
 const normal=path.join(output,'roundtrip.xlsx'),legacy=path.join(output,'legacy-20000-foto.xlsx');fs.writeFileSync(normal,Buffer.from(exported.bytes));
 execFileSync('python',['-c',`
import sys,zipfile,xml.etree.ElementTree as E
with zipfile.ZipFile(sys.argv[1]) as z: files={n:z.read(n) for n in z.namelist()}
ns='http://schemas.openxmlformats.org/spreadsheetml/2006/main'; rel='http://schemas.openxmlformats.org/officeDocument/2006/relationships'; pkg='http://schemas.openxmlformats.org/package/2006/relationships'
w=E.fromstring(files['xl/workbook.xml']); sheets=w.find('{'+ns+'}sheets')
assert [x.attrib['name'] for x in sheets]==['Bendel','Judul','Petunjuk','Referensi']
E.SubElement(sheets,'{'+ns+'}sheet',{'name':'Foto','sheetId':'5','{'+rel+'}id':'rId5'})
files['xl/workbook.xml']=E.tostring(w)
r=E.fromstring(files['xl/_rels/workbook.xml.rels']);E.SubElement(r,'{'+pkg+'}Relationship',{'Id':'rId5','Type':rel+'/worksheet','Target':'worksheets/sheet5.xml'});files['xl/_rels/workbook.xml.rels']=E.tostring(r)
files['xl/worksheets/sheet5.xml']=('<worksheet xmlns="'+ns+'"><sheetData>'+''.join('<row r="'+str(i)+'"><c r="A'+str(i)+'" t="inlineStr"><is><t>foto</t></is></c></row>' for i in range(1,20002))+'</sheetData></worksheet>').encode()
with zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED) as z:
 for n,v in files.items():z.writestr(n,v)
`,normal,legacy]);
 const legacyCheck=await page.evaluate(async ({bytes,bundle})=>{
  const {readMetadataXlsx}=await import('/src/services/metadataXlsx.ts');const {planMetadataImport}=await import('/src/services/metadataImport.ts');
  const parsed=await readMetadataXlsx(new File([Uint8Array.from(bytes)],'lama.xlsx'));const plan=planMetadataImport(parsed.bundles,parsed.titles,[bundle],parsed.photos);
  return {errors:plan.errors,photos:parsed.photos.length,changed:plan.actions.filter(a=>a.kind!=='skip').length};
 },{bytes:Array.from(fs.readFileSync(legacy)),bundle});
 assert.deepEqual(legacyCheck,{errors:[],photos:0,changed:0});
 await page.getByRole('button',{name:'Edit judul',exact:true}).first().click();
 await page.getByRole('heading',{name:'Edit metadata manuskrip'}).waitFor();
 assert.equal(await page.getByLabel('ID inventaris',{exact:true}).getAttribute('readonly'),'');
 assert.equal(await page.getByText('Hlm pemisah (mis. 066v-088r atau 1-30)',{exact:true}).count(),0);
 await page.getByLabel('Bahasa',{exact:true}).fill('Arab; Jawa; Melayu');
 await page.getByLabel('Judul kuratorial',{exact:true}).fill('Kitab hasil kurasi');
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:path.join(output,'editor-mobile.png'),fullPage:true});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'mobile must not overflow');
 await page.getByRole('button',{name:/Simpan perubahan/}).click();
 await page.waitForTimeout(300);
 assert.equal(writes.length,1);assert(writes[0].url.endsWith('/apply_turots_title_metadata_v2'));
 const op=writes[0].body.p_operations[0];assert.equal(op.id,u);assert.equal(op.values.title_curatorial,'Kitab hasil kurasi');assert.equal(op.values.language,'Arab; Jawa; Melayu');assert(!('record_no' in op.values));
 await page.goto('http://127.0.0.1:3005/admin/manuskrip/bendel/'+b+'/judul/baru');
 await page.getByRole('heading',{name:'Tambah judul ke bendel '+bundle.bundle_code}).waitFor();
 await page.getByLabel('Judul asli',{exact:true}).fill('Judul baru');
 await page.getByRole('combobox',{name:'Kategori (Klasifikasi Keilmuan 1)',exact:true}).selectOption('Fikih');
 await page.getByLabel('Rentang halaman / folio (hlm)',{exact:false}).fill('3-5');
 assert.equal(await page.getByLabel('ID inventaris (otomatis dari proyek + koleksi + kategori)',{exact:true}).getAttribute('readonly'),'');
 await page.getByRole('button',{name:'Tambah judul ke bendel',exact:true}).click();
 await page.getByRole('dialog',{name:'Metadata berhasil disimpan'}).waitFor();
 assert.equal(writes.length,2);const created=writes[1].body.p_operations[0];
 assert.equal(created.values.title_original,'Judul baru');assert(!created.id);assert(!('record_no' in created.values));assert(!('display_id' in created.values));assert.deepEqual(created.folios,{ranges:[[3,5]]});
 assert.deepEqual(errors,[]);
 console.log('PASS browser: real XLSX roundtrip with 20,000 photos; legacy Foto ignored; four sheets; mobile editor; readonly inventory; UUID title-only RPC; multi-language and curatorial title. All network mocked.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
