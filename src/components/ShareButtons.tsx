// src/components/ShareButtons.tsx
import React from 'react';
import { WhatsappIcon, FacebookIcon, TwitterIcon } from './icons';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bagikan:</span>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan di WhatsApp"
        className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
      >
        <WhatsappIcon className="w-6 h-6" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan di Facebook"
        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
      >
        <FacebookIcon className="w-6 h-6" />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan di Twitter"
        className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
      >
        <TwitterIcon className="w-6 h-6" />
      </a>
    </div>
  );
};

export default ShareButtons;