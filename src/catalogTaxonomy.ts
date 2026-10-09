export const CATALOG_CATEGORIES = [
  'Siroh', 'Sejarah', 'Fikih', 'Akidah', 'Quran', 'Hadis', 'Falak',
  'Nahwu', 'Shorof', 'Ilmu alat', 'Akhlaq', 'Khutbah', 'Doa', 'Fatwa',
  'Surat', 'Primbon', 'Mantiq', 'Maulid', 'Matematika',
] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];
