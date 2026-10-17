import { imageRanges } from './imageRanges';

export function parsePhotoPageRanges(value: unknown): Array<[number, number]> {
  const text = String(value ?? '').trim();
  if (!text) return [];
  let ranges: Array<[number, number]> | null;
  try { ranges = imageRanges(text, ''); }
  catch { throw new Error('Rentang halaman foto harus memakai nomor urut, misalnya 1-100;101-174.'); }
  if (!ranges) throw new Error('Rentang halaman foto harus memakai nomor urut, misalnya 1-100;101-174.');
  for (let index = 0; index < ranges.length; index += 1) {
    const [start, end] = ranges[index];
    if (ranges.some(([otherStart, otherEnd], otherIndex) => otherIndex < index && start <= otherEnd && end >= otherStart)) {
      throw new Error('Rentang halaman foto saling bertumpang tindih. Setiap foto hanya dapat masuk ke satu judul.');
    }
  }
  return ranges;
}

export function formatPhotoPageRanges(pageOrders: unknown[]): string {
  const orders = [...new Set(pageOrders.map(Number).filter(order => Number.isSafeInteger(order) && order > 0))].sort((a, b) => a - b);
  if (!orders.length) return '';
  const ranges: Array<[number, number]> = [];
  for (const order of orders) {
    const last = ranges[ranges.length - 1];
    if (last && order === last[1] + 1) last[1] = order;
    else ranges.push([order, order]);
  }
  return ranges.map(([start, end]) => start === end ? String(start) : `${start}-${end}`).join(';');
}
