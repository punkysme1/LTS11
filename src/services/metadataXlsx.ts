import { CATALOG_CATEGORIES } from '../catalogTaxonomy';
import { resolveCollection, updateBundle, updateTextUnit } from './turotsRepository';

const bundleFields = ['bundle_code','display_title','source_identifier','archive_identifier','item_url','iiif_manifest_url','affiliation','affiliation_url','dreamsea_identifier','institution','surrogate_format','country','city_province','right_to_left','subject_matter','copyist','copying_date_native','copying_place','bundle_script','writing_support','current_status','rubrication','bundle_description','colophon','cover','cover_size','binding','paper_size','dimensions','paper_type','watermark','countermark','ink','extent_pages','blank_pages','physical_condition','completeness','illumination','illustration','bundle_notes'] as const;
const titleFields = ['display_id','sequence_no','title_original','title_latin','title_curatorial','title_from_team','scholarly_classification_1','scholarly_classification_2','scholarly_classification_3','category_primary','category_secondary','category_tertiary','description','folio_separator','folio_start','folio_end','author','scribe','year_original','year_masehi','copying_location','manuscript_origin','language','script','lines_per_page','rubrication','marginal_notes','meaning_notes','colophon','marginal_note','readability','completeness','notes','keywords','glossary','references_text','related_manuscripts','related_persons','metadata_status','access_level'] as const;
const numberFields = new Set(['extent_pages','blank_pages','sequence_no','lines_per_page']);
const booleanFields = new Set(['right_to_left']);
const bundleHeaders = ['bundle_collection_name','bundle_source_project', ...bundleFields.map((field) => `bundle_${field}`)];
const titleHeaders = ['bundle_bundle_code', ...titleFields.map((field) => `title_${field}`)];
const xmlEscape = (value: unknown) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const colName = (index: number) => { let n = index + 1; let out = ''; while (n) { const r = (n - 1) % 26; out = String.fromCharCode(65 + r) + out; n = Math.floor((n - 1) / 26); } return out; };

function sheetXml(rows: unknown[][]) {
  const content = rows.map((row, r) => `<row r="${r + 1}">${row.map((value, c) => {
    const address = `${colName(c)}${r + 1}`;
    if (typeof value === 'number' && Number.isFinite(value)) return `<c r="${address}"><v>${value}</v></c>`;
    return `<c r="${address}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
  }).join('')}</row>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${content}</sheetData></worksheet>`;
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

function bundleRows(bundles: any[]) {
  return bundles.map((bundle) => [bundle.turots_collections?.name, bundle.turots_collections?.source_project, ...bundleFields.map((field) => bundle[field])]);
}
function titleRows(bundles: any[]) {
  return bundles.flatMap((bundle) => (bundle.turots_text_units || []).map((unit: any) => [bundle.bundle_code, ...titleFields.map((field) => unit[field])]));
}

export function downloadMetadataXlsx(bundles: any[]) {
  const entries: Array<[string, string]> = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Bendel" sheetId="1" r:id="rId1"/><sheet name="Judul" sheetId="2" r:id="rId2"/></sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>'],
    ['xl/worksheets/sheet1.xml', sheetXml([bundleHeaders, ...bundleRows(bundles)])],
    ['xl/worksheets/sheet2.xml', sheetXml([titleHeaders, ...titleRows(bundles)])],
  ];
  const url = URL.createObjectURL(zipStore(entries)); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `metadata-manuskrip-${new Date().toISOString().slice(0, 10)}.xlsx`; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function findEocd(bytes: Uint8Array) { for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) if (new DataView(bytes.buffer, bytes.byteOffset + i, 4).getUint32(0, true) === 0x06054b50) return i; throw new Error('Struktur XLSX/ZIP tidak valid.'); }
async function unzipXlsx(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer()); const view = new DataView(bytes.buffer); const eocd = findEocd(bytes); const count = view.getUint16(eocd + 10, true); let offset = view.getUint32(eocd + 16, true); const files = new Map<string, string>();
  for (let i = 0; i < count; i++) {
    if (view.getUint32(offset, true) !== 0x02014b50) throw new Error('Daftar berkas XLSX rusak.');
    const method = view.getUint16(offset + 10, true); const compressedSize = view.getUint32(offset + 20, true); const nameLength = view.getUint16(offset + 28, true); const extraLength = view.getUint16(offset + 30, true); const commentLength = view.getUint16(offset + 32, true); const localOffset = view.getUint32(offset + 42, true); const name = new TextDecoder().decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true); const localExtraLength = view.getUint16(localOffset + 28, true); const start = localOffset + 30 + localNameLength + localExtraLength; let content = bytes.subarray(start, start + compressedSize);
    if (method === 8) { if (typeof DecompressionStream === 'undefined') throw new Error('Browser tidak dapat membaca kompresi XLSX. Gunakan versi terbaru Chrome atau Edge.'); const stream = new Blob([content]).stream().pipeThrough(new DecompressionStream('deflate-raw' as CompressionFormat)); content = new Uint8Array(await new Response(stream).arrayBuffer()); }
    else if (method !== 0) throw new Error(`Metode kompresi XLSX ${method} belum didukung.`);
    files.set(name, new TextDecoder('utf-8').decode(content)); offset += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}
function xmlRows(xml: string, shared: string[]) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml'); if (doc.querySelector('parsererror')) throw new Error('Lembar Excel berisi XML yang tidak valid.');
  return [...doc.getElementsByTagName('row')].map((row) => [...row.getElementsByTagName('c')].map((cell) => { const type = cell.getAttribute('t'); if (type === 'inlineStr') return cell.getElementsByTagName('t').item(0)?.textContent || ''; const value = cell.getElementsByTagName('v').item(0)?.textContent || ''; return type === 's' ? (shared[Number(value)] ?? '') : value; }));
}
async function workbookRows(file: File) {
  const files = await unzipXlsx(file); const workbook = files.get('xl/workbook.xml'); if (!workbook) throw new Error('File bukan workbook Excel yang bisa dibaca.');
  const sharedDoc = files.get('xl/sharedStrings.xml'); const shared = sharedDoc ? [...new DOMParser().parseFromString(sharedDoc, 'application/xml').getElementsByTagName('si')].map((item) => [...item.getElementsByTagName('t')].map((node) => node.textContent || '').join('')) : [];
  const relationDoc = new DOMParser().parseFromString(files.get('xl/_rels/workbook.xml.rels') || '', 'application/xml'); const targets = new Map([...relationDoc.getElementsByTagName('Relationship')].map((rel) => [rel.getAttribute('Id') || '', rel.getAttribute('Target') || ''])); const sheets = [...new DOMParser().parseFromString(workbook, 'application/xml').getElementsByTagName('sheet')];
  const byName = new Map<string, string[][]>();
  for (const sheet of sheets) { const relation = sheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id'); const target = targets.get(relation || ''); if (!target) continue; const path = target.startsWith('/') ? target.slice(1) : `xl/${target}`; const xml = files.get(path); if (xml) byName.set(sheet.getAttribute('name') || '', xmlRows(xml, shared)); }
  return byName;
}
function records(rows: string[][], required: string) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((value) => value.trim()); if (!headers.includes(required)) throw new Error(`Kolom wajib ${required} tidak ditemukan di lembar ini.`);
  return rows.slice(1).filter((row) => row.some((value) => value.trim())).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ''])));
}
function dbValues(row: Record<string, string>, prefix: string, fields: readonly string[]) { const protectedBundleFields = new Set(['bundle_code','source_identifier','archive_identifier','item_url','iiif_manifest_url']); return Object.fromEntries(fields.filter((field) => field !== 'display_id' && !(prefix === 'bundle' && protectedBundleFields.has(field)) && !(prefix === 'bundle' && field === 'bundle_code')).map((field) => { const raw = row[`${prefix}_${field}`] ?? ''; return [field, raw === '' ? null : numberFields.has(field) ? Number(raw) : booleanFields.has(field) ? ['true','yes','ya','1'].includes(raw.toLowerCase()) : raw]; })); }

export async function importMetadataXlsx(file: File, bundles: any[]) {
  const sheets = await workbookRows(file); const bundleRowsFound = records(sheets.get('Bendel') || [], 'bundle_bundle_code'); const titleRowsFound = records(sheets.get('Judul') || [], 'title_display_id'); let updated = 0; const errors: string[] = []; const updatedBundles = new Set<string>();
  for (const [index, row] of bundleRowsFound.entries()) { const code = (row.bundle_bundle_code || '').trim(); const bundle = bundles.find((item) => item.bundle_code === code); if (!bundle) { errors.push(`Bendel baris ${index + 2}: ${code || '(kosong)'} tidak ditemukan.`); continue; } const collectionName = (row.bundle_collection_name || bundle.turots_collections?.name || '').trim(); const sourceProject = (row.bundle_source_project || bundle.turots_collections?.source_project || '').trim(); const values = dbValues(row, 'bundle', bundleFields); if (collectionName && sourceProject) values.collection_id = await resolveCollection(collectionName, sourceProject); await updateBundle(bundle.id, values); updatedBundles.add(bundle.id); }
  for (const [index, row] of titleRowsFound.entries()) { const code = (row.bundle_bundle_code || '').trim(); const displayId = (row.title_display_id || '').trim(); const bundle = bundles.find((item) => item.bundle_code === code); if (!bundle) { errors.push(`Judul baris ${index + 2}: bendel ${code || '(kosong)'} tidak ditemukan.`); continue; } const unit = (bundle.turots_text_units || []).find((item: any) => item.display_id === displayId || (row.title_id && item.id === row.title_id)); if (!unit) { errors.push(`Judul baris ${index + 2}: ${displayId || '(kosong)'} tidak ditemukan dalam ${code}.`); continue; } const category = (row.title_category_primary || '').trim(); if (!CATALOG_CATEGORIES.includes(category as any)) { errors.push(`Judul baris ${index + 2}: kategori harus salah satu dari 19 kategori yang ditetapkan.`); continue; } await updateTextUnit(unit.id, dbValues(row, 'title', titleFields)); updated++; }
  return { updated, updatedBundles: updatedBundles.size, errors };
}
