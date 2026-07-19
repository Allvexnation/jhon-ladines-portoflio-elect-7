import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeToggle } from '@/utils/ThemeToggle';
import { useLanguageToggle } from '@/utils/LanguageToggle';
import { getThemeColors } from '@/functions/ThemeFunction';
import contactEnglish from '@/static/contact_english.json';
import contactTagalog from '@/static/contact_tagalog.json';
import { ContactTranslations } from '@/interface/ContactTranslations';
import { handleSubmit } from './useEmailLogic';

export function useContactLogic() {
  const router = useRouter();
  const { isDarkMode } = useThemeToggle();
  const { lang } = useLanguageToggle();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [pageAnimated, setPageAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState<'social' | 'contact'>('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const themeColors = getThemeColors(isDarkMode);

  const getContactTranslations = (language: string): ContactTranslations => {
    const translations = language === 'tl' ? contactTagalog : contactEnglish;
    return translations[language as keyof typeof translations] as ContactTranslations;
  };

  const t = getContactTranslations(lang);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e, {
      name,
      email,
      subject,
      message,
      phone,
      address,
      setIsSubmitting,
      setSubmitStatus,
      setIsModalOpen,
      setName,
      setEmail,
      setSubject,
      setMessage,
      setPhone,
      setAddress,
    });
  };

  useEffect(() => {
    const animationTimer = setTimeout(() => setPageAnimated(true), 50);
    setIsMounted(true);
    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return {
    router,
    isDarkMode,
    sectionRef,
    isMounted,
    pageAnimated,
    activeTab,
    setActiveTab,
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    phone,
    setPhone,
    address,
    setAddress,
    isSubmitting,
    submitStatus,
    isModalOpen,
    setIsModalOpen,
    handleSubmit: handleContactSubmit,
    t,
    themeColors,
    lang,
    containerVariants,
    itemVariants,
    fadeInUpVariants,
    staggerVariants,
  };
}
