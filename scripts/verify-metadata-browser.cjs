const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve('test-results/metadata');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = []; page.on('pageerror', error => { errors.push(error.message); console.error('Browser:', error.message); });
    const b = '00000000-0000-4000-8000-000000000001'; const u = '00000000-0000-4000-8000-000000000002';
    const user = { id: '00000000-0000-4000-8000-000000000003', email: 'test@example.invalid', aud: 'authenticated', role: 'authenticated' };
    const session = { access_token: 'test-token', refresh_token: 'test-refresh', expires_at: Math.floor(Date.now() / 1000) + 3600, expires_in: 3600, token_type: 'bearer', user };
    await page.addInitScript(session => localStorage.setItem('sb-api-auth-token', JSON.stringify(session)), session);
    const bundles = [{ id: b, bundle_code: 'DS 0097 00057', display_title: 'Bendel uji', publication_status: 'draft', metadata_status: 'imported', turots_collections: { name: 'Ndalem', source_project: 'Dreamsea' }, turots_text_units: [{ id: u, display_id: 'TEST-057-01', sequence_no: 1, title_original: 'كتاب الفقه', category_primary: 'Fikih', author: 'Penulis lama', metadata_status: 'imported' }], turots_pages: [] }];
    const writes = [];
    await page.route('https://api.naracode.id/**', async route => {
      const request = route.request(); const url = new URL(request.url());
      let data = [];
      if (url.pathname.includes('/auth/')) data = user;
      if (url.pathname.includes('turots_admins')) data = { user_id: user.id };
      if (url.pathname.endsWith('/turots_bundles')) data = bundles;
      if (request.method() !== 'GET' && request.method() !== 'OPTIONS') {
        writes.push({ url: request.url(), method: request.method(), body: request.postDataJSON() });
        data = request.method() === 'DELETE' ? [{ id: b }] : { id: u, ...request.postDataJSON() };
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) });
    });
    await page.goto('http://127.0.0.1:3005/admin/manuskrip');
    await page.waitForLoadState('networkidle');
    fs.writeFileSync(path.join(output, 'initial-dom.txt'), await page.locator('body').innerText());
    await page.getByRole('heading', { name: 'Metadata Excel', exact: true }).waitFor();
    const retiredCheck = await page.evaluate(async () => {
      const { bundleHeaders, metadataWorkbook, readMetadataXlsx } = await import('/src/services/metadataXlsx.ts');
      const { retiredBundleHeaders } = await import('/src/services/metadataFields.ts');
      const { planMetadataImport } = await import('/src/services/metadataImport.ts');
      const rows = [['bundle_bundle_code','bundle_collection_name','bundle_source_project',...retiredBundleHeaders],['DS TEST','Ndalem','Dreamsea',...retiredBundleHeaders.map(()=>'old value')]];
      return { headers: bundleHeaders, retired: retiredBundleHeaders, plan: planMetadataImport([Object.fromEntries(rows[0].map((key,i)=>[key,rows[1][i]]))],[],[]) };
    });
    assert(retiredCheck.retired.every(key=>!retiredCheck.headers.includes(key)));
    assert.equal(retiredCheck.plan.errors.length,0);
    assert(retiredCheck.plan.warnings.length>0);
    assert(retiredCheck.retired.every(key=>!(key.slice(7) in retiredCheck.plan.actions[0].values)));
    if (process.env.METADATA_COMPAT_FILE) {
      const bytes = [...fs.readFileSync(process.env.METADATA_COMPAT_FILE)];
      const counts = await page.evaluate(async bytes => {
        const { readMetadataXlsx } = await import('/src/services/metadataXlsx.ts');
        const parsed = await readMetadataXlsx(new File([new Uint8Array(bytes)],'legacy.xlsx'));
        return { bundles: parsed.bundles.length, titles: parsed.titles.length };
      }, bytes);
      console.log('Legacy workbook read without writes:', counts);
    }


    for (const [label, filename] of [['Unduh template Excel', 'template.xlsx'], ['Ekspor metadata + URL', 'export.xlsx']]) {
      const download = page.waitForEvent('download');
      await page.getByRole('button', { name: label, exact: true }).click();
      await (await download).saveAs(path.join(output, filename));
    }
    const fixtures = await page.evaluate(async () => {
      const excel = await import('/src/services/metadataXlsx.ts');
      const bytes = await excel.metadataWorkbook([{ id: '00000000-0000-4000-8000-000000000001', bundle_code: 'DS 0097 00057', turots_collections: { name: 'Ndalem', source_project: 'Dreamsea' }, turots_text_units: [{ id: '00000000-0000-4000-8000-000000000002', display_id: 'TEST-057-01', sequence_no: 1, title_original: 'كتاب جديد', category_primary: 'Fikih', metadata_status: 'imported', author: '' }] }]).arrayBuffer();
      const file = new File([bytes], 'update.xlsx');
      const parsed = await excel.readMetadataXlsx(file);
      if (parsed.titles[0].title_title_original !== 'كتاب جديد') throw new Error('Arabic round trip failed');
      const sparse = excel.xmlRows('<worksheet><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>a</t></is></c><c r="C1" t="inlineStr"><is><t>c</t></is></c></row><row r="3"><c r="B3" t="s"><v>0</v></c></row></sheetData></worksheet>', ['نص'], 'Judul');
      if (sparse[0][2] !== 'c' || sparse[0][1] !== undefined || sparse[2][1] !== 'نص') throw new Error('Sparse cell mapping failed');
      let rejected = false; try { excel.xmlRows('<worksheet><row r="1"><c r="A1"><f>1+1</f><v>2</v></c></row></worksheet>', [], 'Judul'); } catch { rejected = true; }
      if (!rejected) throw new Error('Formula not rejected');
      return Array.from(new Uint8Array(bytes));
    });
    fs.writeFileSync(path.join(output, 'update.xlsx'), Buffer.from(fixtures));
    await page.locator('.metadata-transfer input[type=file]').setInputFiles(path.join(output, 'update.xlsx'));
    await page.getByText('Pratinjau siap. Belum ada perubahan yang disimpan.').waitFor();
    assert.equal(writes.length, 0, 'Preview must not write');
    const save = page.getByRole('button', { name: 'Simpan 1 perubahan ke database' });
    assert.equal(await save.isDisabled(), true);
    await page.locator('.metadata-table-scroll details summary').first().click();
    await page.screenshot({ path: path.join(output, 'preview-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(output, 'preview-mobile.png'), fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'No horizontal page overflow');
    await page.getByRole('checkbox').check(); await save.click();
    await page.getByText(/1 baris selesai disimpan/).waitFor();
    assert.equal(writes.length, 1); assert.equal(writes[0].method, 'PATCH');
    assert.equal(writes[0].body.title_original, 'كتاب جديد');
    assert.equal('author' in writes[0].body, false, 'Blank author must preserve current value');
    const beforeDelete = writes.length;
    page.once('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', { name: 'Hapus bendel', exact: true }).click();
    assert.equal(writes.length, beforeDelete);
    page.once('dialog', dialog => dialog.accept('wrong-code'));
    await page.getByRole('button', { name: 'Hapus bendel', exact: true }).click();
    assert.equal(writes.length, beforeDelete);
    page.once('dialog', dialog => dialog.accept('DS 0097 00057'));
    await page.getByRole('button', { name: 'Hapus bendel', exact: true }).click();
    await page.getByText(/beserta metadata judul dan rekod halaman berhasil dihapus/).waitFor();
    assert.equal(writes.at(-1).method, 'DELETE');
    assert.ok(writes.at(-1).url.includes('id=eq.' + b));
    bundles[0].publication_status = 'published';
    bundles[0].turots_pages = [{ id: 'p1', canvas_id: 'c1', page_order: 1, folio_label: '1r', text_unit_id: null, image_url: '', thumbnail_url: '' }];
    await page.route('https://api.naracode.id/rest/v1/turots_bundles?**', async route => {
      const single = route.request().headers().accept?.includes('object');
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(single ? bundles[0] : bundles) });
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:3005/bendel/DS%200097%2000057');
    await page.getByRole('heading', { name: 'Metadata bendel', exact: true }).waitFor();
    await page.getByRole('navigation', { name: 'Pilih halaman manuskrip' }).waitFor();
    assert.equal(await page.getByRole('button', { name: '1r', exact: true }).count(), 1);
    assert.equal(await page.getByText('Buka seluruh foto bendel', { exact: false }).count(), 0);
    await page.locator('.bundle-landing > .reader').waitFor();
    const layout = await page.locator('.bundle-landing').boundingBox();
    const reader = await page.locator('.bundle-landing > .reader').boundingBox();
    const strip = await page.locator('.folio-strip').boundingBox();
    assert.ok(reader.width >= layout.width - 2, 'Reader must span the bundle content width');
    assert.ok(strip.y >= reader.y + reader.height, 'Thumbnails must follow the reader');
    await page.screenshot({ path: path.join(output, 'bundle-reader.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const mobileReader = await page.locator('.bundle-landing > .reader').boundingBox();
    const mobileMetadata = await page.locator('.bundle-landing > .metadata-detail').first().boundingBox();
    assert.ok(mobileMetadata.y > mobileReader.y + mobileReader.height);
    await page.screenshot({ path: path.join(output, 'bundle-reader-mobile.png'), fullPage: true });
    await page.goto('http://127.0.0.1:3005/admin/manuskrip/baru');
    await page.getByLabel('Bendel induk').selectOption(b);
    await page.getByRole('heading', { name: 'Tambah judul ke bendel DS 0097 00057', exact: true }).waitFor();
    assert.equal(await page.getByText('Ambil Manifest', { exact: false }).count(), 0);
    await page.goto(`http://127.0.0.1:3005/admin/manuskrip/${u}/edit`);
    await page.getByRole('button', { name: 'Simpan perubahan metadata', exact: true }).waitFor();
    assert.equal(await page.getByLabel('Archive Identifier / URL item').count(), 0);
    assert.equal(await page.getByLabel('Nomor DREAMSEA / identifier afiliasi').count(), 0);
    assert.equal(await page.getByLabel('Alas tulis / bahan kertas').count(), 0);
    await page.goto('http://127.0.0.1:3005/admin/artikel');
    await page.getByLabel('Judul', {exact:true}).fill('Artikel belum selesai');
    await page.getByLabel('Isi', {exact:true}).fill('Isi yang harus tetap ada');
    await page.getByRole('button', {name:'Informasi',exact:true}).click();
    await page.getByLabel('Judul', {exact:true}).fill('Informasi terpisah');
    await page.getByRole('button', {name:'Artikel',exact:true}).click();
    assert.equal(await page.getByLabel('Judul',{exact:true}).inputValue(),'Artikel belum selesai');
    await page.reload();
    await page.getByLabel('Isi',{exact:true}).waitFor().catch(async error=>{console.error(await page.locator('body').innerText());throw error;});
    assert.equal(await page.getByLabel('Isi',{exact:true}).inputValue(),'Isi yang harus tetap ada');
    await page.route('https://cloud.naracode.id/admin-upload/**',route=>route.fulfill({status:201,json:{uploaded:true}}));
    await page.locator('input[type=file]').setInputFiles({name:'cover.png',mimeType:'image/png',buffer:Buffer.from('mock image')});
    await page.getByText('Gambar berhasil diunggah.',{exact:false}).waitFor();
    assert.match(await page.getByLabel('URL gambar sampul',{exact:false}).inputValue(),/^https:\/\/cloud\.naracode\.id\/iiif\/3\/editorial-/);
    await page.reload();
    await page.getByLabel('URL gambar sampul',{exact:false}).waitFor();
    assert.match(await page.getByLabel('URL gambar sampul',{exact:false}).inputValue(),/editorial-/);
    await page.getByRole('button',{name:'Simpan konten',exact:false}).click();
    await page.getByText('Perubahan konten tersimpan.',{exact:true}).waitFor();
    await page.reload();
    await page.getByLabel('Judul',{exact:true}).waitFor();
    assert.equal(await page.getByLabel('Judul',{exact:true}).inputValue(),'');
    assert.deepEqual(errors, []);
    console.log('PASS: full admin UI, template/export downloads, Arabic XLSX round trip, sparse cells, formula rejection, preview read-only, explicit save, blank preservation, responsive layout. All server calls mocked.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
