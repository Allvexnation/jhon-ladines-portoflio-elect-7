'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { FaFacebook, FaBehance, FaInstagram, FaGithub, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { ShareModal } from '@/components/Modal';
import { useModalLogic } from '@/hooks/useModalLogic';
import { SocialCardProps } from '@/interface/SocialCardProps';
import { SocialProps } from '@/interface/SocialProps';

// Social Card Component
function SocialCard({ 
  icon: Icon, 
  title, 
  handle, 
  link, 
  bgColor, 
  textColor, 
  buttonText, 
  buttonBg,
  isFacebook, 
  isBehance,
  isInstagram,
  isGithub,
  isTiktok,
  isLinkedin,
  themeColors,
  isDarkMode,
  backgroundImage
}: SocialCardProps) {
  const shareModal = useModalLogic(title, link);

  return (
    <>
      <ShareModal
        open={shareModal.showShareModal}
        onOpenChange={shareModal.setShowShareModal}
        title={title}
        link={link}
        copyButtonText={shareModal.copyButtonText}
        handleCopy={shareModal.handleCopy}
        handleShareToApps={shareModal.handleShareToApps}
        isDarkMode={isDarkMode}
        themeColors={themeColors}
      />

      <div 
        className="rounded-2xl sm:rounded-3xl p-1.5 transition-all hover:scale-105 duration-300 relative"
        style={{
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: themeColors.border
        }}
      >
        <div 
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden h-full"
          style={{
            ...(backgroundImage ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : (
              bgColor?.startsWith('linear-gradient') ? { background: bgColor } : 
              bgColor?.startsWith('#') ? { backgroundColor: bgColor } : 
              { backgroundColor: themeColors.card }
            ))
          }}
        >
          {backgroundImage && (
            <div 
              className="absolute inset-0 z-0"
              style={{
                background: bgColor?.startsWith('linear-gradient') ? bgColor : (bgColor || 'rgba(0, 0, 0, 0.5)'),
                opacity: 0.8,
              }}
            />
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              shareModal.setShowShareModal(true);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg transition-all duration-300 z-20 hover:opacity-80"
            style={{
              backgroundColor: isDarkMode ? '#ffffff' : '#000000',
              color: isDarkMode ? '#000000' : '#ffffff'
            }}
            title="Share this link"
          >
            <Share2 className="w-4 h-4" strokeWidth={0.5} style={{ color: isDarkMode ? '#000000' : '#ffffff' }} />
          </button>

          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="mb-4 sm:mb-6">
              <h3 
                className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3"
                style={{ color: textColor || (themeColors.card === '#1a1a1a' ? '#ffffff' : '#000000') }}
              >
                {title}
              </h3>
              <p 
                className="text-xs sm:text-sm opacity-90"
                style={{ color: textColor || (themeColors.card === '#1a1a1a' ? '#ffffff' : '#000000') }}
              >
                {handle}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <a 
                href={shareModal.processedLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 sm:gap-2"
                style={{
                  backgroundColor: isDarkMode ? '#ffffff' : '#000000',
                  color: isDarkMode ? '#000000' : '#ffffff'
                }}
              >
                {buttonText}
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center opacity-80"
                style={{ color: textColor || (themeColors.card === '#1a1a1a' ? '#ffffff' : '#000000') }}
              >
                {isFacebook ? (
                  <FaFacebook className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : isBehance ? (
                  <FaBehance className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : isInstagram ? (
                  <FaInstagram className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : isGithub ? (
                  <FaGithub className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : isTiktok ? (
                  <FaTiktok className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : isLinkedin ? (
                  <FaLinkedin className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                ) : Icon ? (
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" strokeWidth={0.5} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Social({ 
  isLoading, 
  socials, 
  themeColors, 
  isDarkMode, 
  itemVariants, 
  staggerVariants,
  title 
}: SocialProps) {
  return (
    <>
      <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
        <h3 className="text-lg sm:text-xl font-normal" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
          {title}
        </h3>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12" variants={staggerVariants}>
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="rounded-2xl sm:rounded-3xl p-1.5"
              style={{
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: themeColors.border
              }}
            >
              <div 
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-[180px] sm:h-[200px] flex flex-col justify-between"
                style={{ backgroundColor: themeColors.card }}
              >
                <div>
                  <div 
                    className="h-7 w-2/3 mb-3 rounded-md"
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#e5e7eb' }}
                  />
                  <div 
                    className="h-4.5 w-5/6 rounded-md"
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#e5e7eb' }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div 
                    className="h-10 w-36 rounded-md"
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#e5e7eb' }}
                  />
                  <div 
                    className="h-14 w-14 rounded-xl"
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#e5e7eb' }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          socials.map((social, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <SocialCard
                {...social}
                themeColors={themeColors}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </>
  );
}
