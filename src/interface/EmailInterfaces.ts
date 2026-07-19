export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  address?: string;
}

export interface HandleSubmitParams {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  address?: string;
  setIsSubmitting: (value: boolean) => void;
  setSubmitStatus: (value: 'idle' | 'success' | 'error') => void;
  setIsModalOpen: (value: boolean) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setSubject: (value: string) => void;
  setMessage: (value: string) => void;
  setPhone?: (value: string) => void;
  setAddress?: (value: string) => void;
}
