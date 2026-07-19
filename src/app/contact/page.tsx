'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useContactLogic } from '@/hooks/useContactLogic';
import { useSocialLogic } from '@/hooks/useSocialLogic';
import Social from '@/components/Social';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ContactPage() {
  const {
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
    handleSubmit,
    t,
    themeColors,
    containerVariants,
    itemVariants,
    fadeInUpVariants,
    staggerVariants,
  } = useContactLogic();

  const { isLoading, socials } = useSocialLogic();

  if (!isMounted) {
    return null;
  }

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className={`relative pt-8 pb-4 lg:pt-7 lg:pb-7 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${pageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative max-w-[1400px] mx-auto">
        <motion.div className="mb-5" variants={itemVariants}>
          <h2
            className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-2xl font-bold mb-3"
            style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
          >
            {t.pageHeader.title}
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{t.pageHeader.description}</p>
        </motion.div>

        <motion.div
          className="border-t mb-5 sm:mb-8 border-dashed"
          style={{ borderColor: themeColors.border }}
          variants={itemVariants}
        ></motion.div>

        <motion.div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8" variants={staggerVariants}>
          {t.tabs.map((tab: any) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-all duration-300"
              variants={itemVariants}
              style={
                activeTab === tab.id
                  ? {
                      backgroundColor: isDarkMode ? '#ffffff' : '#000000',
                      color: isDarkMode ? '#000000' : '#ffffff',
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#9ca3af' : '#6b7280',
                      border: `1px solid ${themeColors.border}`,
                    }
              }
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = isDarkMode ? '#4b5563' : '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = themeColors.border;
                }
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {activeTab === 'social' && (
          <Social
            isLoading={isLoading}
            socials={socials}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
            itemVariants={itemVariants}
            staggerVariants={staggerVariants}
            title={
              t.tabs.find((tab: any) => tab.id === 'social')?.title || 'Find me on social media'
            }
          />
        )}

        {activeTab === 'contact' && (
          <motion.div className="mt-0" variants={itemVariants}>
            <h3
              className="text-lg sm:text-xl font-normal mb-4 sm:mb-6"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              {t.tabs.find((tab: any) => tab.id === 'contact')?.title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                  >
                    {t.contactForm.namePlaceholder}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contactForm.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                  >
                    {t.contactForm.emailPlaceholder}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contactForm.emailPlaceholder}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setPhone(value);
                    }}
                    placeholder="Phone (optional)"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                  >
                    Address
                  </label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address (optional)"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                  style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                >
                  {t.contactForm.subjectPlaceholder}
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t.contactForm.subjectPlaceholder}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                  style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                >
                  {t.contactForm.messagePlaceholder}
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={t.contactForm.messagePlaceholder}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 font-semibold rounded-lg transition-colors text-sm sm:text-base"
                style={
                  isSubmitting
                    ? {
                        backgroundColor: isDarkMode ? '#374151' : '#d1d5db',
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                        cursor: 'not-allowed',
                      }
                    : {
                        backgroundColor: isDarkMode ? '#ffffff' : '#000000',
                        color: isDarkMode ? '#000000' : '#ffffff',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {isSubmitting ? t.contactForm.sending : t.contactForm.sendButton}
              </button>
            </form>
          </motion.div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {submitStatus === 'success' ? (
                <CheckCircle2
                  className="w-6 h-6"
                  style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                />
              ) : (
                <XCircle
                  className="w-6 h-6"
                  style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                />
              )}
              <DialogTitle>{submitStatus === 'success' ? 'Success' : 'Error'}</DialogTitle>
            </div>
            <DialogDescription>
              {submitStatus === 'success'
                ? t.contactForm.successMessage
                : t.contactForm.errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
