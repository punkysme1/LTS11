import { CATALOG_CATEGORIES } from '../catalogTaxonomy';

const PLACEHOLDER_RE = /^(\s*|kosong|null|n\/a|-|\[.*\])$/i;
const IGNORED_AUTO_KEYS = new Set([
  'title_record_no', 'record_no',
  'title_display_id', 'display_id',
  'title_category_sequence_no', 'category_sequence_no',
  'title_url', 'url',
  'title_admin_url', 'admin_url',
]);

const FIELD_TO_EDITOR_KEY: Record<string, string> = {
  title_metadata_status: 'metadataStatus',
  title_title_latin: 'titleLatin',
  title_title_curatorial: 'titleTeam',
  title_category_secondary: 'categorySecondary',
  title_category_tertiary: 'categoryTertiary',
  title_description: 'description',
  title_author: 'author',
  title_scribe: 'scribe',
  title_year_original: 'yearOriginal',
  title_year_masehi: 'yearMasehi',
  title_copying_location: 'copyingLocation',
  title_manuscript_origin: 'manuscriptOrigin',
  title_language: 'language',
  title_script: 'script',
  title_cover: 'cover',
  title_cover_size: 'coverSize',
  title_binding: 'binding',
  title_paper_size: 'paperSize',
  title_dimensions: 'dimensions',
  title_watermark: 'watermark',
  title_countermark: 'countermark',
  title_ink: 'ink',
  title_total_pages: 'totalPages',
  title_blank_pages: 'blankPages',
  title_lines_per_page: 'linesPerPage',
  title_rubrication: 'rubrication',
  title_illumination: 'illumination',
  title_illustration: 'illustration',
  title_marginal_notes: 'marginalNotes',
  title_meaning_notes: 'meaningNotes',
  title_colophon: 'colophon',
  title_marginal_note: 'marginalNote',
  title_physical_condition: 'physicalCondition',
  title_readability: 'readability',
  title_completeness: 'completeness',
  title_paper_type: 'paperType',
  title_notes: 'notes',
  title_keywords: 'keywords',
  title_glossary: 'glossary',
  title_references_text: 'references',
  title_related_manuscripts: 'relatedManuscripts',
  title_related_persons: 'relatedPersons',
};

function stripCodeFence(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(/^```(?:json)?\s*\r?\n?([\s\S]*?)\r?\n?```$/i);
  return match ? match[1].trim() : trimmed;
}

function cleanScalar(value: unknown): string {
  if (value == null) return '';
  if (Array.isArray(value)) {
    return value.map(item => (typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item))).join(', ').trim();
  }
  if (typeof value === 'object') return JSON.stringify(value);
  const text = String(value).trim();
  return PLACEHOLDER_RE.test(text) ? '' : text;
}

const PERSON_ROLE_MAP = new Map(
  ['Pengarang', 'Penyalin', 'Pemilik', 'Pemberi naskah', 'Pemberi catatan', 'Penerjemah', 'Tokoh disebut']
    .map(role => [role.toLowerCase(), role]),
);

function sanitizeHttpUrl(raw: unknown): string {
  const text = cleanScalar(raw);
  if (!text) return '';
  try {
    const parsed = new URL(text);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? text : '';
  } catch {
    return '';
  }
}

function splitLegacyList(raw: string, allowComma: boolean): string[] {
  const delimiter = allowComma && !raw.includes(';') && !raw.includes('\n') ? /\s*,\s*/ : /\s*(?:;|\r?\n)+\s*/;
  return raw.split(delimiter).map(part => part.trim()).filter(Boolean);
}

function parseJsonArrayIfPossible(raw: unknown): unknown[] | null {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fall back to legacy text parsing.
      }
    }
  }
  return null;
}

function normalizeStructuredGlossary(rawVal: unknown): string {
  const items: Array<{ term: string; definition: string }> = [];
  const pushFromText = (text: string) => {
    const paren = text.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (paren) {
      items.push({ term: paren[1].trim(), definition: paren[2].trim() });
      return;
    }
    const colonIdx = text.indexOf(':');
    if (colonIdx > 0) {
      items.push({ term: text.slice(0, colonIdx).trim(), definition: text.slice(colonIdx + 1).trim() });
      return;
    }
    items.push({ term: text, definition: '' });
  };

  const arr = parseJsonArrayIfPossible(rawVal);
  if (arr) {
    for (const entry of arr) {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const obj = entry as Record<string, unknown>;
        const term = cleanScalar(obj.term ?? obj.istilah ?? obj.word ?? obj.kata);
        const definition = cleanScalar(obj.definition ?? obj.makna ?? obj.penjelasan ?? obj.meaning);
        if (term || definition) items.push({ term, definition });
      } else {
        const text = cleanScalar(entry);
        if (text) pushFromText(text);
      }
    }
  } else {
    const text = cleanScalar(rawVal);
    if (text) splitLegacyList(text, false).forEach(pushFromText);
  }
  return items.length ? JSON.stringify(items) : '';
}

function normalizeStructuredReferences(rawVal: unknown): string {
  const items: Array<{ citation: string; url: string }> = [];
  const pushFromText = (text: string) => {
    const urlMatch = text.match(/https?:\/\/\S+/i);
    const url = urlMatch ? sanitizeHttpUrl(urlMatch[0].replace(/[),.;]+$/, '')) : '';
    const citation = (urlMatch ? text.replace(urlMatch[0], '') : text).replace(/\s*[-–—|]+\s*$/, '').trim();
    if (citation || url) items.push({ citation, url });
  };

  const arr = parseJsonArrayIfPossible(rawVal);
  if (arr) {
    for (const entry of arr) {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const obj = entry as Record<string, unknown>;
        const citation = cleanScalar(obj.citation ?? obj.referensi ?? obj.title ?? obj.text);
        const url = sanitizeHttpUrl(obj.url ?? obj.link ?? obj.tautan);
        if (citation || url) items.push({ citation, url });
      } else {
        const text = cleanScalar(entry);
        if (text) pushFromText(text);
      }
    }
  } else {
    const text = cleanScalar(rawVal);
    if (text) splitLegacyList(text, !/https?:\/\//i.test(text)).forEach(pushFromText);
  }
  return items.length ? JSON.stringify(items) : '';
}

function normalizePersonRole(raw: unknown): string {
  const text = cleanScalar(raw);
  if (!text) return '';
  return PERSON_ROLE_MAP.get(text.toLowerCase()) ?? '';
}

function normalizeStructuredPersons(rawVal: unknown): string {
  const items: Array<{ name: string; role: string; text: string }> = [];
  const pushFromText = (rawText: string) => {
    const paren = rawText.match(/^(.+?)\s*\(([^)]+)\)\s*(?:[-–—:]\s*(.+))?$/);
    if (paren) {
      const role = normalizePersonRole(paren[2]);
      const extraText = cleanScalar(paren[3]);
      items.push({
        name: paren[1].trim(),
        role,
        text: role ? extraText : [paren[2].trim(), extraText].filter(Boolean).join(' — '),
      });
      return;
    }
    items.push({ name: rawText, role: '', text: '' });
  };

  const arr = parseJsonArrayIfPossible(rawVal);
  if (arr) {
    for (const entry of arr) {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const obj = entry as Record<string, unknown>;
        const name = cleanScalar(obj.name ?? obj.nama ?? obj.person ?? obj.tokoh);
        const role = normalizePersonRole(obj.role ?? obj.peran);
        const text = cleanScalar(obj.text ?? obj.hubungan ?? obj.keterangan ?? obj.description ?? obj.note);
        if (name || role || text) items.push({ name, role, text });
      } else {
        const text = cleanScalar(entry);
        if (text) pushFromText(text);
      }
    }
  } else {
    const text = cleanScalar(rawVal);
    if (text) splitLegacyList(text, true).forEach(pushFromText);
  }
  return items.length ? JSON.stringify(items) : '';
}

function normalizePageRangesLabel(raw: string): string {
  return raw
    .replace(/^(?:hlm|hal|halaman|folio|fol)\.?\s*/i, '')
    .replace(/[–—]/g, '-')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s*([,;])\s*/g, '$1 ')
    .trim();
}

function canonicalCategory(raw: string): string {
  const cleaned = raw.trim().toLowerCase();
  return CATALOG_CATEGORIES.find(cat => cat.toLowerCase() === cleaned) || raw.trim();
}

function normalizeIntegerField(raw: string): { value: string; changed: boolean } {
  const cleaned = raw.trim();
  if (/^\d+$/.test(cleaned)) return { value: cleaned, changed: false };
  const rangeMatch = cleaned.match(/(\d+)\s*[-–—]\s*(\d+)/);
  if (rangeMatch) {
    const mid = Math.round((Number(rangeMatch[1]) + Number(rangeMatch[2])) / 2);
    return { value: String(mid), changed: true };
  }
  const singleMatch = cleaned.match(/(\d+)/);
  if (singleMatch) return { value: singleMatch[1], changed: true };
  return { value: '', changed: true };
}

function normalizeKey(rawKey: string): string {
  const key = rawKey.trim();
  if (key === 'bundle_code' || key === 'bundle_bundle_code') return 'bundle_bundle_code';
  if (key.startsWith('title_') || key.startsWith('bundle_')) return key;
  return `title_${key}`;
}

export function parseAiTitleJsonBatch(
  rawText: string,
  fallbackBundleCode = '',
): { titles: Record<string, string>[]; warnings: string[] } {
  const cleaned = stripCodeFence(rawText);
  if (!cleaned) throw new Error('Tempelkan JSON dari Notebook Gemini terlebih dahulu.');
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('Format JSON tidak valid. Pastikan Anda menyalin seluruh blok { ... } atau [ ... ].');
  }

  let rawItems: unknown[];
  if (Array.isArray(parsed)) rawItems = parsed;
  else if (parsed && typeof parsed === 'object') {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.titles)) rawItems = obj.titles;
    else if (Array.isArray(obj.items)) rawItems = obj.items;
    else rawItems = [obj];
  } else {
    throw new Error('JSON harus berupa objek satu judul atau array beberapa judul.');
  }

  if (!rawItems.length) throw new Error('JSON tidak berisi satu pun judul.');

  const warnings: string[] = [];
  const titles = rawItems.map((entry, idx) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error(`Item JSON ke-${idx + 1} bukan objek metadata judul.`);
    }
    const row: Record<string, string> = {};
    for (const [rawKey, rawVal] of Object.entries(entry as Record<string, unknown>)) {
      if (IGNORED_AUTO_KEYS.has(rawKey.trim())) continue;
      const key = normalizeKey(rawKey);
      if (IGNORED_AUTO_KEYS.has(key)) continue;
      let val =
        key === 'title_glossary'
          ? normalizeStructuredGlossary(rawVal)
          : key === 'title_references_text'
            ? normalizeStructuredReferences(rawVal)
            : key === 'title_related_persons'
              ? normalizeStructuredPersons(rawVal)
              : cleanScalar(rawVal);
      if (!val) continue;
      if (key === 'title_page_ranges_label') val = normalizePageRangesLabel(val);
      if (key === 'title_category_primary') val = canonicalCategory(val);
      if (key === 'title_lines_per_page') {
        const normalized = normalizeIntegerField(val);
        if (normalized.changed) {
          warnings.push(normalized.value
            ? `Judul ke-${idx + 1}: title_lines_per_page "${val}" dinormalkan menjadi "${normalized.value}".`
            : `Judul ke-${idx + 1}: title_lines_per_page "${val}" diabaikan karena bukan angka bulat.`);
        }
        val = normalized.value;
        if (!val) continue;
      }
      row[key] = val;
    }
    if (!row.bundle_bundle_code && fallbackBundleCode.trim()) {
      row.bundle_bundle_code = fallbackBundleCode.trim();
    }
    if (!row.title_title_original) {
      const fallbackTitle = row.title_title_curatorial || row.title_title_latin || '';
      if (fallbackTitle) row.title_title_original = fallbackTitle;
    }
    if (!row.title_metadata_status) {
      row.title_metadata_status = 'curated';
    }
    if (row.title_category_primary && !CATALOG_CATEGORIES.includes(row.title_category_primary as (typeof CATALOG_CATEGORIES)[number])) {
      warnings.push(`Judul ke-${idx + 1}: kategori "${row.title_category_primary}" tidak ada di daftar baku.`);
    }
    return row;
  });

  return { titles, warnings };
}

export function mapAiRowToEditorPatch(row: Record<string, string>): {
  titleOriginal?: string;
  category?: string;
  photoPageRanges?: string;
  metadataPatch: Record<string, string>;
} {
  const metadataPatch: Record<string, string> = {};
  for (const [field, editorKey] of Object.entries(FIELD_TO_EDITOR_KEY)) {
    const val = row[field];
    if (val) metadataPatch[editorKey] = val;
  }
  return {
    ...(row.title_title_original ? { titleOriginal: row.title_title_original } : {}),
    ...(row.title_category_primary ? { category: row.title_category_primary } : {}),
    ...(row.title_page_ranges_label ? { photoPageRanges: row.title_page_ranges_label } : {}),
    metadataPatch,
  };
}
