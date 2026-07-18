export interface ShareModalState {
  showShareModal: boolean;
  setShowShareModal: (value: boolean) => void;
  copyButtonText: string;
  handleCopy: () => void;
  handleShareToApps: () => void;
  processedLink: string;
}
