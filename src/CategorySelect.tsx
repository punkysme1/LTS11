import { CATALOG_CATEGORIES } from './catalogTaxonomy';

export default function CategorySelect({ value, onChange, className }: { value: string; onChange: (value: string) => void; className?: string }) {
  return <label className={className}>Kategori 1
    <select value={value} onChange={event => onChange(event.target.value)} required>
      <option value="">Pilih kategori</option>
      {value && !CATALOG_CATEGORIES.includes(value as any) && <option value={value} disabled>{value} (perlu dipetakan)</option>}
      {CATALOG_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
    </select>
  </label>;
}
