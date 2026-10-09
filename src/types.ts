export type AccessLevel = 'public_preview' | 'public_full' | 'researcher' | 'private';
export type MetadataStatus = 'imported' | 'curated' | 'verified' | 'provisional' | 'conflicting' | 'unknown';

export interface TurotsBundle {
  id: string;
  bundleCode: string;
  displayTitle?: string;
  collectionName: string;
  archiveIdentifier?: string;
  iiifManifestUrl?: string;
  accessLevel: AccessLevel;
  metadataStatus: MetadataStatus;
}

export interface TurotsTextUnit {
  id: string;
  displayId: string;
  bundleId: string;
  titleOriginal?: string;
  titleLatin?: string;
  titleCuratorial?: string;
  classification: string[];
  folioStart?: string;
  folioEnd?: string;
  sourceReference?: string;
  metadataStatus: MetadataStatus;
}

export interface TurotsPage {
  id: string;
  bundleId: string;
  pageOrder: number;
  folioLabel?: string;
  side?: 'recto' | 'verso' | 'unknown';
  iiifCanvasId?: string;
  imageUrl?: string;
  accessLevel: AccessLevel;
}
