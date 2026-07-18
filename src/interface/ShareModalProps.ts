export interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  link: string;
  copyButtonText: string;
  handleCopy: () => void;
  handleShareToApps: () => void;
  isDarkMode: boolean;
  themeColors: any;
}
