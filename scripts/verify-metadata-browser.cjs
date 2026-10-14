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
        data = { id: u, ...request.postDataJSON() };
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) });
    });
    await page.goto('http://127.0.0.1:3005/admin/manuskrip');
    await page.waitForLoadState('networkidle');
    fs.writeFileSync(path.join(output, 'initial-dom.txt'), await page.locator('body').innerText());
    await page.getByRole('heading', { name: 'Metadata Excel', exact: true }).waitFor();
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
    assert.deepEqual(errors, []);
    console.log('PASS: full admin UI, template/export downloads, Arabic XLSX round trip, sparse cells, formula rejection, preview read-only, explicit save, blank preservation, responsive layout. All server calls mocked.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
