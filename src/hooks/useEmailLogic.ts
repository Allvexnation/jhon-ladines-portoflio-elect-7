import { useState } from 'react';
import { EmailFormData, HandleSubmitParams } from '@/interface/EmailInterfaces';

export const handleSubmit = async (e: React.FormEvent, params: HandleSubmitParams) => {
  e.preventDefault();

  const { name, email, subject, message, phone, address, setIsSubmitting, setSubmitStatus, setIsModalOpen, setName, setEmail, setSubject, setMessage, setPhone, setAddress } = params;

  if (!name || !email || !subject || !message) {
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus('idle');

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
        phone,
        address,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    setIsSubmitting(false);
    setSubmitStatus('success');
    setIsModalOpen(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setPhone?.('');
    setAddress?.('');
  } catch (error) {
    console.error('Error submitting form:', error);
    setIsSubmitting(false);
    setSubmitStatus('error');
    setIsModalOpen(true);
  }
};

export function useEmailLogic() {
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = async (data: EmailFormData) => {
    const { name, email, subject, message, phone, address } = data;

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
          phone,
          address,
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
