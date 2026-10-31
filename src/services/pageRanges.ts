import { imageRanges } from './imageRanges';

export function canonicalFolioLabel(raw: unknown): string {
  const cleaned = String(raw ?? '').trim().replace(/\/+$/, '');
  const m = cleaned.match(/^0*(\d+)([rv])$/i);
  return m ? `${Number(m[1])}${m[2].toLowerCase()}` : cleaned.toLowerCase();
}

export function resolvePhotoPageRanges(value: unknown, pages: Array<{ page_order?: number; folio_label?: string; label?: string }> = []): Array<[number, number]> {
  const text = String(value ?? '').trim().replace(/\/+$/, '');
  if (!text) return [];
  if (/[rv]/i.test(text) && pages.length > 0) {
    const parts = text.split(/[;,]/).map(s => s.trim()).filter(Boolean);
    const resolved: Array<[number, number]> = [];
    for (const part of parts) {
      const [rawStart, rawEnd = rawStart] = part.split('-').map(s => s.trim());
      const startTarget = canonicalFolioLabel(rawStart);
      const endTarget = canonicalFolioLabel(rawEnd);
      const startIdx = pages.findIndex(p => canonicalFolioLabel(p.folio_label || p.label) === startTarget);
      const endIdx = pages.findIndex(p => canonicalFolioLabel(p.folio_label || p.label) === endTarget);
      if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) {
        throw new Error(`Folio ${part} tidak ditemukan pada daftar foto bendel ini.`);
      }
      const startOrder = Number(pages[startIdx].page_order ?? (startIdx + 1));
      const endOrder = Number(pages[endIdx].page_order ?? (endIdx + 1));
      if (endOrder < startOrder) {
        throw new Error(`Folio ${part} tidak ditemukan pada daftar foto bendel ini.`);
      }
      resolved.push([startOrder, endOrder]);
    }
    return resolved;
  }
  return parsePhotoPageRanges(text);
}

export function parsePhotoPageRanges(value: unknown): Array<[number, number]> {
  const text = String(value ?? '').trim().replace(/\/+$/, '');
  if (!text) return [];
  let ranges: Array<[number, number]> | null;
  try { ranges = imageRanges(text, ''); }
  catch { throw new Error('Rentang halaman foto harus memakai nomor urut (mis. 1-100;101-174) atau folio naskah (mis. 066v-088r).'); }
  if (!ranges) throw new Error('Rentang halaman foto harus memakai nomor urut (mis. 1-100;101-174) atau folio naskah (mis. 066v-088r).');
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
