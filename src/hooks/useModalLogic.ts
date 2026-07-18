import { useState } from 'react';
import { ShareModalState } from '@/interface/ShareModalState';

export function useModalLogic(title: string, link: string): ShareModalState {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy Link');
  
  const processedLink = link && !link.includes('://') && !link.startsWith('mailto:') && link.includes('@') 
    ? `mailto:${link}` 
    : link;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedLink);
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy Link');
        setShowShareModal(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err as Error);
    }
  };

  const handleShareToApps = async () => {
    const shareData = {
      title: title,
      text: `Check out my ${title} profile`,
      url: processedLink
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShowShareModal(false);
      } else {
        await handleCopy();
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Failed to share:', err as Error);
      }
    }
  };

  return {
    showShareModal,
    setShowShareModal,
    copyButtonText,
    handleCopy,
    handleShareToApps,
    processedLink,
  };
}
