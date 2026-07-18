'use client';

import { User, GraduationCap, Laptop, Monitor } from 'lucide-react';
import { useAboutLogic } from '@/hooks/useAboutLogic';
import aboutEnglish from '@/static/about_english.json';
import aboutTagalog from '@/static/about_tagalog.json';

const getTranslatedContent = (lang: string = 'en'): any => {
  if (lang === 'tl') {
    return aboutTagalog.tl;
  }
  return aboutEnglish.en;
};

export default function About() {
  const { isDarkMode, sectionRef, isMounted, pageAnimated, themeColors } = useAboutLogic();
  const t = getTranslatedContent('en');

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
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fadeInUp animate-stagger-1">
          <h1
            className={`text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-3`}
          >
            {t.pageHeader.title}
          </h1>
          <p
            className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
          >
            {t.pageHeader.description}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-8 animate-fadeInUp animate-stagger-2">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* About Intro Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-3">
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

          {/* Signature */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={isDarkMode ? t.aboutIntro.signature.logoDark : t.aboutIntro.signature.logoLight}
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
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12 animate-fadeInUp animate-stagger-4">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* Career Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-5">
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-center gap-3">
              <User
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <h2
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.careerData.title}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.careerData.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.careerData.positions.map((position: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl p-1.5 transition-all"
                style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: themeColors.border }}
              >
                <div
                  className="rounded-xl p-4 sm:p-6"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={position.logo}
                        alt={position.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                      />
                    </div>
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
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12 animate-fadeInUp animate-stagger-6">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* Education Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-7">
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-center gap-3">
              <GraduationCap
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <h2
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.educationData.title}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.educationData.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.educationData.schools.map((school: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl p-1.5 transition-all"
                style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: themeColors.border }}
              >
                <div
                  className="rounded-xl p-4 sm:p-6"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                      />
                    </div>
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
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12 animate-fadeInUp animate-stagger-8">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* Specs Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-9">
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-center gap-3">
              <Monitor
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <h2
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.specsData.title}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.specsData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.specsData.devices.map((device: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl p-1.5 transition-all h-full"
                style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: themeColors.border }}
              >
                <div
                  className="rounded-xl p-4 sm:p-6 h-full flex flex-col"
                  style={{ backgroundColor: themeColors.card }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {device.icon === 'Laptop' ? (
                      <Laptop className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`} />
                    ) : (
                      <Monitor className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`} />
                    )}
                    <h3
                      className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      {device.name}
                    </h3>
                  </div>
                  <div className="space-y-2 flex-1">
                    {device.specs.map((spec: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
