'use client';

import { User, GraduationCap, Laptop, Monitor } from 'lucide-react';
import { useAboutLogic } from '@/hooks/useAboutLogic';
import aboutEnglish from '@/static/about_english.json';
import aboutTagalog from '@/static/about_tagalog.json';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const getTranslatedContent = (lang: string = 'en'): any => {
  if (lang === 'tl') {
    return aboutTagalog.tl;
  }
  return aboutEnglish.en;
};

export default function About() {
  const { isDarkMode, sectionRef, isMounted, pageAnimated, themeColors } = useAboutLogic();
  const t = getTranslatedContent('en');
  
  const [cardSpotlights, setCardSpotlights] = useState<Record<number, { x: number; y: number; opacity: number }>>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardSpotlights(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  const handleCardMouseEnter = (index: number) => {
    setCardSpotlights(prev => ({
      ...prev,
      [index]: { ...prev[index], opacity: 0.6 }
    }));
  };

  const handleCardMouseLeave = (index: number) => {
    setCardSpotlights(prev => ({
      ...prev,
      [index]: { ...prev[index], opacity: 0 }
    }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen py-6 sm:py-8 px-4 sm:px-5 lg:px-6 transition-all duration-700 ease-out ${pageAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={
        {
          '--card-stroke-width': '1.5px',
          '--card-stroke-color': 'rgba(120, 120, 120, 0.3)',
        } as React.CSSProperties
      }
    >
      <main className="max-w-[1400px] mx-auto">
        <header className="mb-6 animate-fadeInUp animate-stagger-1">
          <h1
            className={`text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-3`}
          >
            {t.pageHeader.title}
          </h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
            {t.pageHeader.description}
          </p>
        </header>

        <hr className={`mb-8 animate-fadeInUp animate-stagger-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <section className="mb-12 animate-fadeInUp animate-stagger-3">
          <div className="space-y-4">
            {t.aboutIntro.paragraphs.map((paragraph: any, index: number) => {
              if (typeof paragraph === 'object' && paragraph.text) {
                return (
                  <p
                    key={index}
                    className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} leading-relaxed break-words`}
                  >
                    {paragraph.text}
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {paragraph.highlight}
                    </span>
                    {paragraph.continuation}
                  </p>
                );
              }
              return (
                <p
                  key={index}
                  className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} leading-relaxed break-words`}
                >
                  {paragraph as string}
                </p>
              );
            })}
          </div>

          <footer className="mt-8 flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={
                  isDarkMode ? t.aboutIntro.signature.logoDark : t.aboutIntro.signature.logoLight
                }
                alt="Jhon Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.aboutIntro.signature.text}
              </p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {t.aboutIntro.signature.name}
              </p>
            </div>
          </footer>
        </section>

        <hr className={`mb-12 animate-fadeInUp animate-stagger-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <section className="mb-12 animate-fadeInUp animate-stagger-5">
          <div className="flex flex-col gap-1.5 mb-5">
            <h2 className="flex items-center gap-3">
              <User
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <span
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.careerData.title}
              </span>
            </h2>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.careerData.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.careerData.positions.map((position: any, index: number) => (
              <motion.article
                key={index}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="rounded-2xl p-1.5 transition-all relative overflow-hidden"
                style={{
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: themeColors.border,
                }}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: cardSpotlights[index]?.opacity || 0,
                    background: `radial-gradient(circle at ${cardSpotlights[index]?.x || 0}px ${cardSpotlights[index]?.y || 0}px, ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}, transparent 80%)`
                  }}
                />
                <div
                  className="rounded-xl p-4 sm:p-6"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <figure className="flex-shrink-0">
                      <img
                        src={position.logo}
                        alt={position.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                      />
                    </figure>
                    <div className="flex-1">
                      <h3
                        className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-1`}
                      >
                        {position.title}
                      </h3>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                      >
                        {position.location}
                      </p>
                      <p
                        className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-2`}
                      >
                        {position.duration} • {position.length}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {position.level}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {position.type}
                        </span>
                      </div>
                      {position.responsibilities && position.responsibilities.length > 0 && (
                        <div>
                          <p
                            className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                          >
                            Responsibilities:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            {position.responsibilities.map((resp: string, idx: number) => (
                              <li
                                key={idx}
                                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                              >
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <hr className={`mb-12 animate-fadeInUp animate-stagger-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <section className="mb-12 animate-fadeInUp animate-stagger-7">
          <div className="flex flex-col gap-1.5 mb-5">
            <h2 className="flex items-center gap-3">
              <GraduationCap
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <span
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.educationData.title}
              </span>
            </h2>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.educationData.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.educationData.schools.map((school: any, index: number) => {
              const cardIndex = index + t.careerData.positions.length;
              return (
              <motion.article
                key={index}
                onMouseMove={(e) => handleCardMouseMove(e, cardIndex)}
                onMouseEnter={() => handleCardMouseEnter(cardIndex)}
                onMouseLeave={() => handleCardMouseLeave(cardIndex)}
                className="rounded-2xl p-1.5 transition-all relative overflow-hidden"
                style={{
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: themeColors.border,
                }}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: cardSpotlights[cardIndex]?.opacity || 0,
                    background: `radial-gradient(circle at ${cardSpotlights[cardIndex]?.x || 0}px ${cardSpotlights[cardIndex]?.y || 0}px, ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}, transparent 80%)`
                  }}
                />
                <div
                  className="rounded-xl p-4 sm:p-6"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <figure className="flex-shrink-0">
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                      />
                    </figure>
                    <div className="flex-1">
                      <h3
                        className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-1`}
                      >
                        {school.name}
                      </h3>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                      >
                        {school.degree}
                      </p>
                      <p
                        className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-1`}
                      >
                        {school.duration}
                      </p>
                      <p
                        className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-1`}
                      >
                        {school.location}
                      </p>
                      {school.gwa && (
                        <p
                          className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          GWA: {school.gwa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </section>

        <hr className={`mb-12 animate-fadeInUp animate-stagger-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <section className="mb-12 animate-fadeInUp animate-stagger-9">
          <div className="flex flex-col gap-1.5 mb-5">
            <h2 className="flex items-center gap-3">
              <Monitor
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <span
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.specsData.title}
              </span>
            </h2>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.specsData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.specsData.devices.map((device: any, index: number) => {
              const cardIndex = index + t.careerData.positions.length + t.educationData.schools.length;
              return (
              <motion.article
                key={index}
                onMouseMove={(e) => handleCardMouseMove(e, cardIndex)}
                onMouseEnter={() => handleCardMouseEnter(cardIndex)}
                onMouseLeave={() => handleCardMouseLeave(cardIndex)}
                className="rounded-2xl p-1.5 transition-all h-full relative overflow-hidden"
                style={{
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: themeColors.border,
                }}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: cardSpotlights[cardIndex]?.opacity || 0,
                    background: `radial-gradient(circle at ${cardSpotlights[cardIndex]?.x || 0}px ${cardSpotlights[cardIndex]?.y || 0}px, ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}, transparent 80%)`
                  }}
                />
                <div
                  className="rounded-xl p-4 sm:p-6 h-full flex flex-col"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {device.icon === 'Laptop' ? (
                      <Laptop
                        className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
                      />
                    ) : (
                      <Monitor
                        className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
                      />
                    )}
                    <h3
                      className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      {device.name}
                    </h3>
                  </div>
                  <div className="space-y-2 flex-1">
                    {device.specs.map((spec: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span
                          className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-[140px] flex-shrink-0`}
                        >
                          {spec.label}
                        </span>
                        <span
                          className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} flex-1`}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </section>
      </main>
    </section>
  );
}
