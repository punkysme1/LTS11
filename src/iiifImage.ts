export function iiifInfoUrl(imageUrl: string) {
  if (/\/info\.json(?:\?.*)?$/i.test(imageUrl)) return imageUrl;
  const serviceRoot = imageUrl.replace(/\/full\/[^/]+\/\d+\/default\.[^/?]+(?:\?.*)?$/i, '');
  return serviceRoot !== imageUrl ? `${serviceRoot}/info.json` : null;
}

export function iiifThumbnailUrl(imageUrl: string | undefined) {
 if (!imageUrl) return imageUrl;
 return imageUrl.replace(/\/full\/(?:max|full)\/0\/default\.(jpg|png)(?=\?|$)/i, '/full/!320,320/0/default.$1');
}
