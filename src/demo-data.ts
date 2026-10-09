import type { TurotsBundle, TurotsTextUnit } from './types';

export const demoBundle: TurotsBundle = {
  id: 'bundle-ds-001',
  bundleCode: 'DS.001',
  displayTitle: "Shu'bah al-Iman",
  collectionName: 'Ndalem',
  archiveIdentifier: 'REPLACE_WITH_ARCHIVE_IDENTIFIER',
  iiifManifestUrl: 'https://iiif.archive.org/iiif/REPLACE_WITH_ARCHIVE_IDENTIFIER/manifest.json',
  accessLevel: 'public_preview',
  metadataStatus: 'imported',
};

export const demoTextUnits: TurotsTextUnit[] = [
  {
    id: 'text-0001',
    displayId: '01.A.04.0001',
    bundleId: 'bundle-ds-001',
    titleOriginal: 'شعب الإيمان',
    titleCuratorial: 'Kitab Shu\'bah al-Iman',
    classification: ['Akidah'],
    sourceReference: 'DREAMSEA DS.001',
    metadataStatus: 'imported',
  },
  {
    id: 'text-0002',
    displayId: '01.A.04.0002',
    bundleId: 'bundle-ds-001',
    titleOriginal: 'شعر',
    titleCuratorial: 'Syair pendahulu tentang bagian-bagian iman',
    classification: ['Akidah', 'Syair'],
    folioStart: '2r',
    folioEnd: '2v',
    sourceReference: 'DREAMSEA DS.001',
    metadataStatus: 'provisional',
  },
];
