'use client';

import React from 'react';
import { Share2, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShareModalProps } from '@/interface/ShareModalProps';

export function ShareModal({
  open,
  onOpenChange,
  title,
  link,
  copyButtonText,
  handleCopy,
  handleShareToApps,
  isDarkMode,
  themeColors,
}: ShareModalProps) {
  const processedLink = link && !link.includes('://') && !link.startsWith('mailto:') && link.includes('@') 
    ? `mailto:${link}` 
    : link;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
          <DialogDescription>
            Share this link with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-lg p-4 mb-6" style={{ 
          backgroundColor: themeColors.background,
          borderColor: themeColors.border
        }}>
          <p className="text-sm break-all text-gray-600">
            {processedLink.replace('mailto:', '')}
          </p>
        </div>

        <DialogFooter className="gap-3">
          <Button
            onClick={handleCopy}
            className="flex-1"
            style={{
              backgroundColor: isDarkMode ? '#ffffff' : '#000000',
              color: isDarkMode ? '#000000' : '#ffffff'
            }}
          >
            <Copy className="w-4 h-4 mr-2" style={{ color: isDarkMode ? '#000000' : '#ffffff' }} />
            {copyButtonText}
          </Button>
          <Button
            onClick={handleShareToApps}
            className="flex-1"
            style={{
              backgroundColor: isDarkMode ? '#ffffff' : '#000000',
              color: isDarkMode ? '#000000' : '#ffffff'
            }}
          >
            <Share2 className="w-4 h-4 mr-2" style={{ color: isDarkMode ? '#000000' : '#ffffff' }} />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
