import { CATALOG_CATEGORIES } from '../catalogTaxonomy';
export const presence = ['Ada', 'Tidak ada'];
export const scripts = ['Arab', 'Pegon', 'Jawi', 'Latin', 'Jawa'];
export const languages = ['Arab', 'Pegon', 'Jawa', 'Indonesia', 'Melayu', 'Sunda', 'Madura', 'Belanda'];
export const bundleOptions: Record<string, string[]> = {
  surrogateFormat: ['Digital', 'Fisik', 'Digital dan fisik', 'Lainnya'],
  rightToLeft: ['Ya', 'Tidak'], bundleScript: scripts,
  currentStatus: ['In situ', 'Dipinjamkan', 'Disimpan di repositori', 'Tidak diketahui'],
  cover: presence, binding: presence, rubrication: presence, illumination: presence, illustration: presence,
  watermark: presence, countermark: presence,
  paperType: ['Kertas Eropa', 'Kertas Daluang', 'Kertas Strimin bergaris', 'Kertas HVS', 'Lainnya'],
  physicalCondition: ['Rusak Parah', 'Rusak Sebagian', 'Rusak Sedang', 'Baik', 'Sangat Baik'],
  completeness: ['Lengkap', 'Tidak Lengkap', 'Belum diperiksa'],
};
export const excelOptions: Record<string, string[]> = {
  ...Object.fromEntries(Object.entries(bundleOptions).map(([key, values]) => ['bundle_' + key.replace(/[A-Z]/g, char => '_' + char.toLowerCase()), values])),
  title_category_primary: [...CATALOG_CATEGORIES],
  title_metadata_status: ['imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown'],
  title_language: languages, title_script: scripts,
  title_rubrication: presence, title_marginal_notes: presence, title_marginal_note: presence,
  title_meaning_notes: presence, title_colophon: presence,
  title_readability: ['Tidak Terbaca', 'Terbaca Sebagian', 'Terbaca'],
  title_completeness: ['Lengkap', 'Tidak Lengkap'],
};
