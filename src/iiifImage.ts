export function iiifInfoUrl(imageUrl: string) {
  if (/\/info\.json(?:\?.*)?$/i.test(imageUrl)) return imageUrl;
  const serviceRoot = imageUrl.replace(/\/full\/[^/]+\/\d+\/default\.[^/?]+(?:\?.*)?$/i, '');
  return serviceRoot !== imageUrl ? `${serviceRoot}/info.json` : null;
}
