import { CATALOG_CATEGORIES } from '../catalogTaxonomy';
import { bundleFields, titleFields } from './metadataFields';
import type { CatalogRow, ExcelRow } from './metadataImport';
const xmlEscape = (value: unknown) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const colName = (index: number) => { let n = index + 1; let out = ''; while (n) { const r = (n - 1) % 26; out = String.fromCharCode(65 + r) + out; n = Math.floor((n - 1) / 26); } return out; };

function sheetXml(rows: unknown[][], links: Array<{ cell: string; url: string }> = []) {
  const content = rows.map((row, r) => `<row r="${r + 1}">${row.map((value, c) => {
    const address = `${colName(c)}${r + 1}`;
    const style = r === 0 ? 1 : links.some(link => link.cell === address) ? 2 : 0;
    if (typeof value === 'number' && Number.isFinite(value)) return `<c r="${address}" s="${style}"><v>${value}</v></c>`;
    return `<c r="${address}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
  }).join('')}</row>`).join('');
  const hyperlinks = links.length ? `<hyperlinks>${links.map((link, i) => `<hyperlink ref="${link.cell}" r:id="rId${i + 1}"/>`).join('')}</hyperlinks>` : '';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="${rows[0]?.length || 1}" width="28" customWidth="1"/></cols><sheetData>${content}</sheetData>${hyperlinks}</worksheet>`;
}

const utf8 = (value: string) => new TextEncoder().encode(value);
const crcTable = (() => { const table = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; } return table; })();
function crc32(bytes: Uint8Array) { let crc = 0xffffffff; for (const byte of bytes) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; }
function zipStore(entries: Array<[string, string]>) {
  const local: Uint8Array[] = []; const central: Uint8Array[] = []; let offset = 0;
  const u16 = (view: DataView, pos: number, value: number) => view.setUint16(pos, value, true);
  const u32 = (view: DataView, pos: number, value: number) => view.setUint32(pos, value, true);
  for (const [name, source] of entries) {
    const path = utf8(name); const data = utf8(source); const crc = crc32(data);
    const head = new Uint8Array(30 + path.length); const h = new DataView(head.buffer); u32(h, 0, 0x04034b50); u16(h, 4, 20); u16(h, 6, 0x0800); u16(h, 8, 0); u32(h, 14, crc); u32(h, 18, data.length); u32(h, 22, data.length); u16(h, 26, path.length); head.set(path, 30);
    local.push(head, data);
    const dir = new Uint8Array(46 + path.length); const d = new DataView(dir.buffer); u32(d, 0, 0x02014b50); u16(d, 4, 20); u16(d, 6, 20); u16(d, 8, 0x0800); u16(d, 10, 0); u32(d, 16, crc); u32(d, 20, data.length); u32(d, 24, data.length); u16(d, 28, path.length); u32(d, 42, offset); dir.set(path, 46); central.push(dir); offset += head.length + data.length;
  }
  const centralBytes = central.reduce((sum, part) => sum + part.length, 0); const end = new Uint8Array(22); const e = new DataView(end.buffer); u32(e, 0, 0x06054b50); u16(e, 8, entries.length); u16(e, 10, entries.length); u32(e, 12, centralBytes); u32(e, 16, offset);
  return new Blob([...local, ...central, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export const bundleHeaders = ['bundle_bundle_code', 'bundle_collection_name', 'bundle_source_project', ...bundleFields.filter(field => field !== 'bundle_code').map(field => `bundle_${field}`), 'bundle_id', 'bundle_url', 'bundle_admin_url'];
export const titleHeaders = ['bundle_bundle_code', ...titleFields.map(field => `title_${field}`), 'title_id', 'title_url', 'title_admin_url'];
const publicOrigin = 'https://turots.qomaruddin.com';
export function catalogLinks(bundle: CatalogRow, unit?: CatalogRow, origin = publicOrigin) {
  const base = origin.replace(/\/+$/, '');
  return unit ? {
    title_url: `${base}/katalog/${encodeURIComponent(unit.display_id)}?unit=${encodeURIComponent(unit.id)}&bundle=${encodeURIComponent(bundle.id)}`,
    title_admin_url: `${base}/admin/manuskrip/${encodeURIComponent(unit.id)}/edit`,
  } : {
    bundle_url: `${base}/bendel/${encodeURIComponent(bundle.bundle_code)}?bundle=${encodeURIComponent(bundle.id)}`,
    bundle_admin_url: `${base}/admin/manuskrip/bendel/${encodeURIComponent(bundle.id)}/edit`,
  };
}
const asRows = (headers: string[], records: CatalogRow[]) => [headers, ...records.map(row => headers.map(header => row[header] ?? ''))];
const instructions = [
  ['Petunjuk', 'Keterangan'],
  ['Alur', 'Unggah foto dan simpan ke bendel → ekspor metadata → isi Excel → pratinjau impor → simpan → ekspor ulang untuk mendapatkan URL.'],
  ['Bendel', 'Satu baris per bendel. Bendel baru memerlukan bundle_bundle_code, bundle_collection_name, bundle_source_project. Kode harus sama persis dengan bendel foto.'],
  ['Judul', 'Satu baris per judul. Judul baru memerlukan bundle_bundle_code, title_display_id, title_title_original, title_category_primary. ID judul unik di seluruh katalog.'],
  ['Tambah atau perbarui', 'Kode/ID yang sudah ada diperbarui. Kode/ID baru ditambahkan. Bendel baru disimpan sebagai draft. Tidak ada publikasi otomatis.'],
  ['Sel kosong', 'Kosong berarti pertahankan data lama. Tulis #HAPUS untuk mengosongkan field opsional. Kolom yang tidak disertakan tidak diubah.'],
  ['Identitas', 'Jangan ubah kode bendel, ID inventaris, bundle_id, atau title_id pada hasil ekspor. Untuk baris baru, kosongkan UUID dan URL.'],
  ['Folio', 'Gunakan 1r, 1v, 2r, dan seterusnya. Isi folio awal dan akhir setelah foto terdaftar. Rentang tidak boleh bertabrakan dengan judul lain.'],
  ['URL', 'URL adalah tautan klik, bukan sinkronisasi langsung. URL dan UUID dibaca saja. Tautan publik memerlukan bendel published; tautan admin memerlukan login. Ekspor ulang setelah impor untuk memperoleh URL baru.'],
  ['Foto / manifest', 'source_identifier, archive_identifier, item_url, iiif_manifest_url adalah informasi sumber yang tidak diubah melalui impor. Kelola foto di editor bendel.'],
  ['Tipe data', 'Simpan kode, ID, tahun, tanggal, dan folio sebagai teks. Gunakan nilai biasa, bukan formula. Teks Arab didukung. right_to_left: Ya/Tidak.'],
  ['Penyimpanan', 'Pratinjau tidak menulis database. Simpan menulis per baris. Jika jaringan gagal, sebagian baris mungkin sudah tersimpan; baca laporan dan pratinjau ulang sebelum mencoba lagi.'],
];
export function metadataWorkbook(bundles: CatalogRow[], template = false, origin = publicOrigin) {
  const bundleRecords = template ? [] : bundles.map(bundle => ({
    ...Object.fromEntries(bundleFields.map(field => [`bundle_${field}`, bundle[field]])),
    bundle_collection_name: bundle.turots_collections?.name, bundle_source_project: bundle.turots_collections?.source_project,
    bundle_id: bundle.id, ...catalogLinks(bundle, undefined, origin),
  }));
  const titleRecords = template ? [] : bundles.flatMap(bundle => (bundle.turots_text_units || []).map((unit: CatalogRow) => ({
    ...Object.fromEntries(titleFields.map(field => [`title_${field}`, unit[field]])),
    bundle_bundle_code: bundle.bundle_code, title_id: unit.id, ...catalogLinks(bundle, unit, origin),
  })));
  const sheets: Array<{ name: string; rows: unknown[][] }> = [
    { name: 'Bendel', rows: asRows(bundleHeaders, bundleRecords) },
    { name: 'Judul', rows: asRows(titleHeaders, titleRecords) },
    { name: 'Petunjuk', rows: instructions },
    { name: 'Referensi', rows: [['Kategori judul', 'Status metadata'], ...CATALOG_CATEGORIES.map((category, i) => [category, ['imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown'][i] || ''])] },
  ];
  const entries: Array<[string, string]> = [];
  const ns = 'http://schemas.openxmlformats.org';
  entries.push(['[Content_Types].xml', `<Types xmlns="${ns}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`]);
  entries.push(['_rels/.rels', `<Relationships xmlns="${ns}/package/2006/relationships"><Relationship Id="rId1" Type="${ns}/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`]);
  entries.push(['xl/workbook.xml', `<workbook xmlns="${ns}/spreadsheetml/2006/main" xmlns:r="${ns}/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, i) => `<sheet name="${sheet.name}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`]);
  entries.push(['xl/_rels/workbook.xml.rels', `<Relationships xmlns="${ns}/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="${ns}/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="styles" Type="${ns}/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`]);
  entries.push(['xl/styles.xml', `<styleSheet xmlns="${ns}/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font><font><u/><color rgb="FF0563C1"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF304B40"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="3"><xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0"/><xf fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1"/><xf fontId="2" fillId="0" borderId="0" xfId="0"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`]);
  sheets.forEach((sheet, index) => {
    const links: Array<{ cell: string; url: string }> = [];
    sheet.rows.slice(1).forEach((row, r) => row.forEach((value, c) => {
      if (String(sheet.rows[0][c]).endsWith('_url') && /^https?:\/\//.test(String(value))) links.push({ cell: `${colName(c)}${r + 2}`, url: String(value) });
    }));
    entries.push([`xl/worksheets/sheet${index + 1}.xml`, sheetXml(sheet.rows, links)]);
    if (links.length) entries.push([`xl/worksheets/_rels/sheet${index + 1}.xml.rels`, `<Relationships xmlns="${ns}/package/2006/relationships">${links.map((link, i) => `<Relationship Id="rId${i + 1}" Type="${ns}/officeDocument/2006/relationships/hyperlink" Target="${xmlEscape(link.url)}" TargetMode="External"/>`).join('')}</Relationships>`]);
  });
  return zipStore(entries);
}
export function downloadMetadataXlsx(bundles: CatalogRow[], template = false, origin = publicOrigin) {
  const url = URL.createObjectURL(metadataWorkbook(bundles, template, origin));
  const anchor = document.createElement('a'); anchor.href = url;
  anchor.download = `${template ? 'template' : 'metadata'}-turots-${new Date().toISOString().slice(0, 10)}.xlsx`;
  anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function parseXml(xml: string) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('Deklarasi XML eksternal tidak didukung.');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('XML Excel tidak valid.');
  return doc;
}
async function unzipXlsx(file: File) {
  if (file.size > 20 * 1024 * 1024) throw new Error('Excel metadata maksimal 20 MB. Foto diunggah terpisah.');
  const bytes = new Uint8Array(await file.arrayBuffer()); const view = new DataView(bytes.buffer);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('File bukan XLSX yang valid.');
  const count = view.getUint16(eocd + 10, true); let offset = view.getUint32(eocd + 16, true); let total = 0;
  const files = new Map<string, string>();
  if (count > 1000) throw new Error('Terlalu banyak bagian dalam workbook.');
  for (let i = 0; i < count; i++) {
    if (view.getUint32(offset, true) !== 0x02014b50) throw new Error('Daftar berkas XLSX rusak.');
    const method = view.getUint16(offset + 10, true); const size = view.getUint32(offset + 20, true); const unpacked = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true); const extra = view.getUint16(offset + 30, true); const comment = view.getUint16(offset + 32, true); const local = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    total += unpacked;
    if (total > 50 * 1024 * 1024) throw new Error('Isi workbook terlalu besar (maksimal 50 MB setelah diekstrak).');
    const start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
    let content: Uint8Array = bytes.subarray(start, start + size);
    if (method === 8) {
      const reader = new Blob([content]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
      const chunks: Uint8Array[] = []; let actual = 0;
      while (true) { const next = await reader.read(); if (next.done) break; actual += next.value.length; if (actual > unpacked || actual > 50 * 1024 * 1024) { await reader.cancel(); throw new Error('Ukuran kompresi XLSX tidak valid.'); } chunks.push(next.value); }
      content = new Uint8Array(actual); let at = 0; for (const chunk of chunks) { content.set(chunk, at); at += chunk.length; }
    } else if (method !== 0) throw new Error('Kompresi XLSX tidak didukung. Simpan sebagai .xlsx standar.');
    if (content.length !== unpacked) throw new Error('Ukuran bagian XLSX tidak cocok.');
    if (name.endsWith('.xml') || name.endsWith('.rels')) files.set(name, new TextDecoder().decode(content));
    offset += 46 + nameLength + extra + comment;
  }
  return files;
}
export function xmlRows(xml: string, shared: string[], sheet: string) {
  const rows: string[][] = [];
  for (const node of Array.from(parseXml(xml).getElementsByTagName('row'))) {
    const rowNumber = Number(node.getAttribute('r') || rows.length + 1);
    if (!Number.isInteger(rowNumber) || rowNumber < 1 || rowNumber > 10001) throw new Error(`${sheet}: maksimal 10.000 baris metadata.`);
    while (rows.length < rowNumber) rows.push([]);
    const row = rows[rowNumber - 1];
    for (const cell of Array.from(node.getElementsByTagName('c'))) {
      const reference = cell.getAttribute('r') || '';
      const column = reference.match(/^([A-Z]+)\d+$/)?.[1];
      if (!column) throw new Error(`${sheet}: alamat sel tidak valid.`);
      const index = [...column].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1;
      if (index > 199) throw new Error(`${sheet}: maksimal 200 kolom.`);
      const type = cell.getAttribute('t');
      if (cell.getElementsByTagName('f').length) throw new Error(`${sheet}!${reference}: ubah formula menjadi nilai sebelum impor.`);
      if (type === 'e') throw new Error(`${sheet}!${reference}: sel mengandung error Excel.`);
      const value = cell.getElementsByTagName('v')[0]?.textContent || '';
      row[index] = type === 'inlineStr' ? Array.from(cell.getElementsByTagName('t')).map(t => t.textContent || '').join('') : type === 's' ? shared[Number(value)] ?? '' : value;
    }
  }
  return rows;
}
function records(rows: string[][], headers: string[], required: string[]) {
  if (!rows.length) return [];
  const names = Array.from(rows[0], value => (value || '').trim());
  const active = names.filter(Boolean);
  if (new Set(active).size !== active.length) throw new Error('Nama kolom berulang.');
  for (const name of active) if (!headers.includes(name)) throw new Error(`Kolom ${name} tidak dikenal. Gunakan header dari template.`);
  for (const name of required) if (!names.includes(name)) throw new Error(`Kolom wajib ${name} tidak ditemukan.`);
  return rows.slice(1).map(row => {
    if (row.some((value, i) => value?.trim() && !names[i])) throw new Error('Ada isi pada kolom tanpa header.');
    return Object.fromEntries(names.map((name, i) => [name, row[i] ?? ''])) as ExcelRow;
  });
}
export async function readMetadataXlsx(file: File) {
  const files = await unzipXlsx(file); const workbook = files.get('xl/workbook.xml');
  if (!workbook) throw new Error('Workbook Excel tidak ditemukan.');
  const shared = files.has('xl/sharedStrings.xml') ? Array.from(parseXml(files.get('xl/sharedStrings.xml')!).getElementsByTagName('si')).map(si => Array.from(si.getElementsByTagName('t')).map(t => t.textContent || '').join('')) : [];
  const rels = parseXml(files.get('xl/_rels/workbook.xml.rels') || '<Relationships/>');
  const targets = new Map(Array.from(rels.getElementsByTagName('Relationship')).map(rel => [rel.getAttribute('Id'), rel.getAttribute('Target') || '']));
  const found = new Map<string, string[][]>();
  for (const sheet of Array.from(parseXml(workbook).getElementsByTagName('sheet'))) {
    const name = sheet.getAttribute('name') || '';
    if (!['Bendel', 'Judul'].includes(name)) continue;
    const target = targets.get(sheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id'));
    const path = target?.startsWith('/') ? target.slice(1) : `xl/${target}`;
    const xml = files.get(path);
    if (!xml) throw new Error(`Lembar ${name} tidak dapat dibaca.`);
    found.set(name, xmlRows(xml, shared, name));
  }
  if (!found.size) throw new Error('Workbook harus memiliki lembar Bendel atau Judul.');
  // Keep blank rows so validation reports the real Excel row number.
  return {
    bundles: records(found.get('Bendel') || [], bundleHeaders, ['bundle_bundle_code']),
    titles: records(found.get('Judul') || [], [...titleHeaders, 'title_access_level'], ['bundle_bundle_code', 'title_display_id']),
  };
}
