'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useEmailLogic, EmailFormData } from '@/hooks/useEmailLogic';

interface EmailContextType {
  isSending: boolean;
  sendStatus: 'idle' | 'success' | 'error';
  errorMessage: string | null;
  sendEmail: (data: EmailFormData) => Promise<boolean>;
  resetStatus: () => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const emailLogic = useEmailLogic();

  return (
    <EmailContext.Provider value={emailLogic}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
}
