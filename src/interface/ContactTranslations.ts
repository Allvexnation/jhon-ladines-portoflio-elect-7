export interface ContactTranslations {
  pageHeader: {
    title: string;
    description: string;
  };
  shareModal: {
    shareTitle: string;
    shareDescription: string;
    copyLink: string;
    copied: string;
    share: string;
  };
  tabs: Array<{
    id: string;
    label: string;
    title: string;
  }>;
  contactForm: {
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
  };
}
