import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getGoogleDriveUrl(url: string, type: 'image' | 'preview' | 'osd' = 'image'): string | string[] | null {
  if (!url || !url.trim()) return null;
  
  // Split by comma in case of multiple links
  const urls = url.split(',').map(u => u.trim()).filter(Boolean);
  
  if (urls.length === 0) return null;

  const results = urls.map(u => {
    // If it's already a direct image link (cloudinary or ends in common image extension), return as is
    if (u.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) || u.includes('cloudinary.com') || u.includes('images.unsplash.com')) {
      return u;
    }

    if (!u.includes('drive.google.com')) return u;

    // Extract ID from file link or folder link
    const fileIdMatch = u.match(/\/d\/([^/?]+)/) || u.match(/id=([^&]+)/);
    const folderIdMatch = u.match(/\/folders\/([^/?]+)/);
    
    const id = fileIdMatch ? fileIdMatch[1] : (folderIdMatch ? folderIdMatch[1] : null);
    
    if (!id) return u;

    if (type === 'preview') {
      if (folderIdMatch) {
        return `https://drive.google.com/embeddedfolderview?id=${id}#grid`;
      }
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    
    if (type === 'osd') {
      if (folderIdMatch) return u;
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
    }

    // For images (covers)
    if (folderIdMatch) return null;
    return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
  }).filter((r): r is string => r !== null);

  if (results.length === 0) return null;
  return results.length === 1 ? results[0] : results;
}
