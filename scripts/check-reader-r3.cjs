const { chromium } = require('C:/Users/legion/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try {
  const page=await browser.newPage({viewport:{width:1400,height:950}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/rest/v1/**',async route=>{
   const url=new URL(route.request().url());let data=[];
   if(url.pathname.endsWith('/turots_bundles'))data={id:'b1',bundle_code:'NT.001',display_title:'Bendel uji',publication_status:'published',access_level:'public_full',affiliation_url:'https://example.org/source'};
   if(url.pathname.endsWith('/turots_text_units'))data=[{id:'u1',bundle_id:'b1',title_original:'Manuskrip uji',display_id:'TQ001',metadata_status:'curated',sequence_no:1}];
   if(url.pathname.endsWith('/turots_pages'))data=[{id:'p1',bundle_id:'b1',text_unit_id:'u1',page_order:1,image_url:'http://127.0.0.1:4321/fixture.svg',label:'Foto uji'}];
   await route.fulfill({contentType:'application/json',body:JSON.stringify(data)});
  });
  await page.route('**/fixture.svg',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="#cfbd95"/><text x="100" y="200" font-size="70" fill="#685439">Manuskrip uji</text></svg>'}));
  await page.goto('http://127.0.0.1:4321/katalog/uji?bundle=b1&unit=u1');await page.waitForLoadState('networkidle');
  await page.getByRole('button',{name:'Kontras Tinta',exact:true}).waitFor();
  const feedback=page.getByRole('button',{name:'Beri Masukan',exact:true});
  const source=page.getByRole('link',{name:'Sumber afiliasi'});
  assert.ok((await feedback.boundingBox()).y>(await source.boundingBox()).y);
  await page.getByRole('button',{name:'Kontras Tinta',exact:true}).click();
  await page.getByRole('button',{name:'Inversi',exact:true}).click();
  const filter=await page.locator('.iiif-canvas').evaluate(e=>getComputedStyle(e).filter);
  assert.match(filter,/contrast\(1.7\)/);assert.match(filter,/invert\(1\)/);
  await page.screenshot({path:'../../../outputs/nara-perbaikan-20261101/turots-reader-r3.png',fullPage:true});
  await page.getByRole('button',{name:'Gambar Asli',exact:true}).click();
  assert.equal(await page.getByRole('button',{name:'Inversi',exact:true}).getAttribute('aria-pressed'),'false');
  await page.setViewportSize({width:390,height:844});await page.waitForLoadState('networkidle');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'../../../outputs/nara-perbaikan-20261101/turots-reader-mobile-r3.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: feedback below affiliation, contrast + inversion + reset, mobile width; no browser exceptions.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
