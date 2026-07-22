'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudSun, CloudMoon, PanelTop, PanelLeft, ArrowRight } from 'lucide-react';
import type { SideBarProps } from '@/types/components';
import { useSidebarLogic, PROFILE_IMAGE, VERIFIED_BADGE } from '@/functions/SidebarLogic';

const SideBar: React.FC<SideBarProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    imageLoaded,
    mounted,
    activeTab,
    setActiveTab,
    navLayout,
    setNavLayout,
    isDarkMode,
    toggleTheme,
    lang,
    toggleLanguage,
    setLanguage,
    themeColors,
    textPrimary,
    textSecondary,
    dividerClass,
    mobileTopBorderClass,
    togglePillBorderClass,
    controlBtnClass,
    navActiveClass,
    navInactiveClass,
    allNavItems,
    primaryNavItems,
    handleNavClick,
    externalSetNavLayout,
  } = useSidebarLogic(props);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-[100] border-b ${mobileTopBorderClass} backdrop-blur-sm bg-opacity-95`}
        style={{ backgroundColor: themeColors.mobile.background }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div
            className={`flex items-center gap-3 transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          >
            <div
              className="relative cursor-pointer hover:opacity-80 transition-opacity lg:hidden"
              onClick={() => handleNavClick(allNavItems[0])}
              style={{
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? '#333333' : '#e5e5e5',
                borderRadius: '50%',
                padding: '0.1875rem',
                transition: 'all 0.7s ease-in-out',
                transform: imageLoaded ? 'scale(1)' : 'scale(0.8)',
                opacity: imageLoaded ? 1 : 0,
              }}
            >
              <div className="relative overflow-hidden rounded-full">
                <img
                  src={PROFILE_IMAGE}
                  alt="Jhon Ladines"
                  className={`w-9 h-9 rounded-full object-cover transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </div>
            </div>
            <div
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavClick(allNavItems[0])}
            >
              <h2 className={`text-sm font-bold ${textPrimary} flex items-center gap-1`}>
                Jhon Ladines
                <img
                  src={VERIFIED_BADGE}
                  alt="Verified"
                  className="w-4 h-4 select-none pointer-events-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none' }}
                />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                } ${isDarkMode ? 'bg-[#1a1a1a] border border-gray-700 hover:bg-gray-800' : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'}`}
              >
                <button
                  onClick={toggleTheme}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <CloudSun className="w-4 h-4" />
                  ) : (
                    <CloudMoon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                } ${isDarkMode ? 'bg-[#1a1a1a] border border-gray-700 hover:bg-gray-800' : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'}`}
              >
                <button
                  onClick={toggleLanguage}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700`}
                  aria-label="Toggle language"
                >
                  <span className="text-sm font-medium">{lang === 'en' ? '🇺🇸' : '🇵🇭'}</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  if (!isOpen) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={controlBtnClass}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-center items-center relative">
                  <span
                    className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-2'
                    }`}
                  ></span>
                  <span
                    className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        <motion.nav
          className="lg:hidden fixed inset-0 z-[90]"
          initial={{ y: '-100%' }}
          animate={{ y: isOpen ? 0 : '-100%' }}
          exit={{ y: '-100%' }}
          transition={{
            type: 'tween',
            duration: 0.6,
            ease: 'easeInOut',
          }}
          style={{
            backgroundColor: themeColors.mobile.menuBackground,
            willChange: 'transform',
          }}
        >
          <div
            className="flex flex-col h-full pt-20 p-6 overflow-y-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              className="text-left mb-6"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.9,
                y: isOpen ? 0 : -10,
              }}
              transition={{
                delay: isOpen ? 0.3 : 0,
                duration: 0.5,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-center gap-3 mb-4 mt-4">
                <motion.div
                  className="relative cursor-pointer hover:opacity-80 transition-opacity lg:hidden"
                  onClick={() => {
                    handleNavClick(allNavItems[0]);
                    setIsOpen(false);
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: imageLoaded ? (isOpen ? 1 : 0.8) : 0.8,
                    opacity: imageLoaded ? (isOpen ? 1 : 0) : 0,
                  }}
                  transition={{
                    delay: isOpen ? 0.4 : 0,
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                  style={{
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    borderColor: isDarkMode ? '#333333' : '#e5e5e5',
                    borderRadius: '50%',
                    padding: '0.375rem',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div className="relative overflow-hidden rounded-full">
                    <img
                      src={PROFILE_IMAGE}
                      alt="Jhon Ladines"
                      className={`w-16 h-16 rounded-full object-cover transition-all duration-700 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                    />
                  </div>
                </motion.div>
                <div
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    handleNavClick(allNavItems[0]);
                    setIsOpen(false);
                  }}
                >
                  <h2
                    className={`text-base font-bold ${textPrimary} mb-0.5 flex items-center gap-1.5`}
                  >
                    Jhon Ladines
                    <img
                      src={VERIFIED_BADGE}
                      alt="Verified"
                      className="w-4 h-4 select-none pointer-events-none"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ userSelect: 'none' }}
                    />
                  </h2>
                  <p className={`text-xs ${textSecondary}`}>@jhonladines</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={`relative flex items-center rounded-full p-0.5 ${togglePillBorderClass} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'} transition-colors duration-300`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-[calc(50%-0.125rem)] h-[calc(100%-0.25rem)] rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      lang === 'tl' ? 'translate-x-full' : 'translate-x-0'
                    } bg-blue-600`}
                    style={{
                      boxShadow: isDarkMode
                        ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <button
                    onClick={() => setLanguage('en')}
                    className={`relative z-10 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      lang === 'en'
                        ? 'text-white scale-105'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    🇺🇸
                  </button>
                  <button
                    onClick={() => setLanguage('tl')}
                    className={`relative z-10 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      lang === 'tl'
                        ? 'text-white scale-105'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    🇵🇭
                  </button>
                </div>

                <div
                  className={`relative flex items-center rounded-full p-0.5 ${togglePillBorderClass} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'} transition-colors duration-300`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-[calc(50%-0.125rem)] h-[calc(100%-0.25rem)] rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      isDarkMode ? 'translate-x-full' : 'translate-x-0'
                    } ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    style={{
                      boxShadow: isDarkMode
                        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <button
                    onClick={() => {
                      if (isDarkMode) toggleTheme();
                    }}
                    className={`relative z-10 p-2 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-300 scale-100'
                        : 'text-gray-700 hover:text-gray-900 scale-110'
                    }`}
                    aria-label="Light mode"
                  >
                    <CloudSun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (!isDarkMode) toggleTheme();
                    }}
                    className={`relative z-10 p-2 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-gray-400 scale-110'
                        : 'text-gray-700 hover:text-gray-900 scale-100'
                    }`}
                    aria-label="Dark mode"
                  >
                    <CloudMoon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <hr className={`w-full ${dividerClass} mb-4`} />

            <nav className="space-y-0 pr-1">
              {primaryNavItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group hover:scale-105 relative overflow-hidden ${
                    activeTab === item.id ? navActiveClass : navInactiveClass
                  }`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : -15,
                  }}
                  transition={{
                    delay: isOpen ? 0.7 + index * 0.08 : 0,
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {activeTab !== item.id && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.5rem',
                        overflow: 'visible',
                      }}
                    >
                      <rect
                        x="1"
                        y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        rx="7"
                        ry="7"
                        fill="none"
                        stroke={isDarkMode ? '#4b5563' : '#9ca3af'}
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        style={{
                          animation: 'navDashSpin 4s linear infinite',
                          transformOrigin: 'center',
                          transformBox: 'fill-box',
                        }}
                      />
                    </svg>
                  )}
                  <item.icon className="w-5 h-5 transition-all duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="text-base font-medium">{item.text}</span>
                  {activeTab === item.id && <ArrowRight className="w-2.5 h-2.5 ml-auto" />}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.nav>
      </AnimatePresence>

      <AnimatePresence>
        <motion.aside
          className="hidden lg:block fixed left-16 top-0 bottom-0 w-64 z-40"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.25,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className="flex flex-col h-full px-5 overflow-y-auto"
            style={{
              paddingTop: '2rem',
              paddingBottom: '1rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="text-center mb-3">
              <div
                className="relative inline-block mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNavClick(allNavItems[0])}
              >
                <img
                  src={PROFILE_IMAGE}
                  alt="Jhon Ladines"
                  className={`w-24 h-24 mt-5 rounded-full object-cover border-2 transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ borderColor: themeColors.desktop.profileBorder }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </div>
              <div
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNavClick(allNavItems[0])}
              >
                <h2
                  className={`text-base font-bold ${textPrimary} mb-0.5 flex items-center justify-center gap-1.5`}
                >
                  Jhon Ladines
                  <img
                    src={VERIFIED_BADGE}
                    alt="Verified"
                    className="w-3.5 h-3.5 select-none pointer-events-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none' }}
                  />
                </h2>
              </div>
              <p className={`text-xs ${textSecondary}`}>@jhonladines</p>
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-center gap-1.5"
                aria-label="Language selector"
              >
                <div
                  className={`relative flex items-center rounded-full p-0.5 ${togglePillBorderClass} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'} transition-colors duration-300`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-[calc(50%-0.125rem)] h-[calc(100%-0.25rem)] rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      lang === 'tl' ? 'translate-x-full' : 'translate-x-0'
                    } ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                    style={{
                      boxShadow: isDarkMode
                        ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <button
                    onClick={() => setLanguage('en')}
                    className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      lang === 'en'
                        ? 'text-white scale-105'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    US
                  </button>
                  <button
                    onClick={() => setLanguage('tl')}
                    className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      lang === 'tl'
                        ? 'text-white scale-105'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    PH
                  </button>
                </div>

                <div
                  className={`relative flex items-center rounded-full p-0.5 ${togglePillBorderClass} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'} transition-colors duration-300`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-[calc(50%-0.125rem)] h-[calc(100%-0.25rem)] rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      isDarkMode ? 'translate-x-full' : 'translate-x-0'
                    } ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    style={{
                      boxShadow: isDarkMode
                        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <button
                    onClick={() => {
                      if (isDarkMode) toggleTheme();
                    }}
                    className={`relative z-10 p-1.5 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-300 scale-100'
                        : 'text-gray-700 hover:text-gray-900 scale-110'
                    }`}
                    aria-label="Light mode"
                  >
                    <CloudSun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (!isDarkMode) toggleTheme();
                    }}
                    className={`relative z-10 p-1.5 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-gray-400 scale-110'
                        : 'text-gray-700 hover:text-gray-900 scale-100'
                    }`}
                    aria-label="Dark mode"
                  >
                    <CloudMoon className="w-4 h-4" />
                  </button>
                </div>

                {externalSetNavLayout && (
                  <div
                    className={`relative flex items-center rounded-full p-0.5 ${togglePillBorderClass} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'} transition-colors duration-300`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-[calc(100%-0.25rem)] h-[calc(100%-0.25rem)] rounded-full shadow-sm ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                      style={{
                        boxShadow: isDarkMode
                          ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <button
                      onClick={() =>
                        externalSetNavLayout(navLayout === 'sidebar' ? 'topbar' : 'sidebar')
                      }
                      className={`relative z-10 p-1.5 rounded-full transition-all duration-300 text-gray-700 hover:text-gray-900 scale-110`}
                      aria-label="Toggle layout"
                    >
                      {navLayout === 'sidebar' ? (
                        <PanelLeft className="w-4 h-4" />
                      ) : (
                        <PanelTop className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr className={`w-full ${dividerClass} mb-4`} />

            <nav className="space-y-0 pr-1">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-1.5 rounded-lg transition-all duration-200 no-underline group relative hover:scale-105 overflow-hidden ${
                    activeTab === item.id ? navActiveClass : navInactiveClass
                  }`}
                >
                  {activeTab !== item.id && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                      }}
                    >
                      <rect
                        x="1"
                        y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        rx="7"
                        ry="7"
                        fill="none"
                        stroke={isDarkMode ? '#4b5563' : '#9ca3af'}
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        style={{
                          animation: 'navDashSpin 4s linear infinite',
                          transformOrigin: 'center',
                          transformBox: 'fill-box',
                        }}
                      />
                    </svg>
                  )}
                  <item.icon className="w-5 h-5 transition-all duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="text-base font-medium">{item.text}</span>
                  {activeTab === item.id && <ArrowRight className="w-5 h-5 ml-auto" />}
                </button>
              ))}
            </nav>

            <hr className={`w-full ${dividerClass} my-2`} />

            <footer className="pt-2 pb-6">
              <p className="text-[14px] text-gray-500 text-center leading-tight font-bold">
                COPYRIGHT © 2026
              </p>
              <p className="text-[12px] text-gray-500 text-center leading-tight">
                Jhon Ladines. All rights reserved.
              </p>
            </footer>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default SideBar;
