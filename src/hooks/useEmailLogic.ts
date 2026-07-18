import { useState } from 'react';

export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useEmailLogic() {
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = async (data: EmailFormData) => {
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      setErrorMessage('All fields are required');
      setSendStatus('error');
      return false;
    }

    setIsSending(true);
    setSendStatus('idle');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send email');
      }

      setSendStatus('success');
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send email');
      setSendStatus('error');
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const resetStatus = () => {
    setSendStatus('idle');
    setErrorMessage(null);
  };

  return {
    isSending,
    sendStatus,
    errorMessage,
    sendEmail,
    resetStatus,
  };
}
