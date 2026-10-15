// Numeric ranges refer to image order; r/v ranges retain the existing folio mapping.
export function imageRanges(start: unknown, end: unknown): Array<[number, number]> | null {
  const raw = String(start || '').trim();
  if (!raw || /[rv]/i.test(raw)) return null;
  const expression = end ? `${raw}-${String(end).trim()}` : raw;
  if (!/^\d+(?:\s*-\s*\d+)?(?:\s*[;,]\s*\d+(?:\s*-\s*\d+)?)*$/.test(expression)) throw new Error('Rentang foto harus seperti 1-5;12-14.');
  return expression.split(/[;,]/).map(part => {
    const [a, b = a] = part.split('-').map(Number);
    if (!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<1||b<a) throw new Error('Rentang foto tidak valid.');
    return [a,b];
  });
}
export function matchesImageRange(page: {page_order?:number}, ranges: Array<[number,number]>) {
  return ranges.some(([a,b])=>Number(page.page_order)>=a&&Number(page.page_order)<=b);
}
