type SlugRow = {
  b: { id?: string; bundle_code?: string; display_title?: string };
  u: { id?: string; sequence_no?: number; display_id?: string; title_original?: string; title_curatorial?: string };
};

export function slugify(value: string) {
  return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'manuskrip';
}

export function buildCatalogSlugMap<T extends SlugRow>(rows: T[]) {
  const ordered = [...rows].sort((left, right) =>
    String(left.b.bundle_code || left.b.id || '').localeCompare(String(right.b.bundle_code || right.b.id || '')) ||
    Number(left.u.sequence_no || 0) - Number(right.u.sequence_no || 0) ||
    String(left.u.display_id || left.u.id || '').localeCompare(String(right.u.display_id || right.u.id || '')),
  );
  const occurrences = new Map<string, number>();
  const used = new Set<string>();
  const slugs = new Map<string, string>();

  for (const row of ordered) {
    if (!row.u.id) continue;
    const base = slugify(row.u.title_original || row.u.display_id || row.b.display_title || row.b.bundle_code || 'manuskrip');
    const occurrence = (occurrences.get(base) || 0) + 1;
    occurrences.set(base, occurrence);
    let candidate = occurrence === 1 ? base : `${base}-${occurrence}`;
    let suffix = occurrence;
    while (used.has(candidate)) candidate = `${base}-${++suffix}`;
    used.add(candidate);
    slugs.set(row.u.id, candidate);
  }

  return slugs;
}
