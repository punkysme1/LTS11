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
      let val = cleanScalar(rawVal);
      if (!val) continue;
      if (key === 'title_page_ranges_label') val = normalizePageRangesLabel(val);
      if (key === 'title_category_primary') val = canonicalCategory(val);
      row[key] = val;
    }
    if (!row.bundle_bundle_code && fallbackBundleCode.trim()) {
      row.bundle_bundle_code = fallbackBundleCode.trim();
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
