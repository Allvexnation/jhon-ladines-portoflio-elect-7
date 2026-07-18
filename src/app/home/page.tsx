'use client';

import {
  PiCodeBold,
  PiCardsThreeBold,
  PiBriefcaseBold,
  PiChatTeardropDotsBold,
} from 'react-icons/pi';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { LuYoutube } from 'react-icons/lu';
import { BiUser, BiCategory, BiBook } from 'react-icons/bi';
import GlassIcons from '@/components/GlassIcons';
import { TechLogoIcon } from '@/components/TechLogoIcon';
import { SkillsCardTechs } from '@/components/SkillsCardTechs';
import Subjects from '@/components/Subjects';
import { useHomeLogic } from '@/hooks/useHomeLogic';
import { getAboutTranslations } from '@/functions/translation-utils';
import { useLanguageToggle } from '@/utils/toggle-language';
import ShinyText from '@/components/ShinyText';

export default function Home() {
  const { router, isDarkMode, sectionRef, isMounted, pageAnimated, t, themeColors } =
    useHomeLogic();
  const { lang } = useLanguageToggle();
  const glassIconItems = TechLogoIcon({ isDarkMode });
  const aboutT = getAboutTranslations(lang);

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
        {/* Hero Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-1">
          <h1
            className={`text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-2xl font-bold mb-4 break-words`}
          >
            <ShinyText
              text={t.greeting}
              speed={5}
              delay={0}
              color={isDarkMode ? "#b5b5b5" : "#333333"}
              shineColor={isDarkMode ? "#ffffff" : "#000000"}
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </h1>

          <div
            className={`flex flex-wrap items-center gap-3 mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-gray-400' : 'bg-black'} rounded-full`}
              />
              <span className="text-sm">{t.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-gray-400' : 'bg-black'} rounded-full`}
              />
              <span className="text-sm">{t.status}</span>
            </div>
          </div>

          <p
            className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} leading-relaxed max-w-4xl mb-6`}
          >
            {t.description}
          </p>
        </div>

        {/* Divider after Hero Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-2">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* Skills Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-3">
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-center gap-3">
              <PiCodeBold
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <h2
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {t.skillsTitle}
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              {t.skillsDescription}
            </p>
          </div>

          <GlassIcons
            compact={true}
            isDarkMode={isDarkMode}
            items={glassIconItems}
            className={isDarkMode ? 'text-white' : 'text-gray-900'}
          />
        </div>

        {/* Divider after Skills Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-4">
          <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>

        {/* Subject Section */}
        <div className="mb-12 animate-fadeInUp animate-stagger-5">
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-center gap-3">
              <PiCardsThreeBold
                className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-400' : 'text-black'}`}
              />
              <h2
                className={`text-base sm:text-lg font-bold leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                Jhon's Favorite Subjects
              </h2>
            </div>
            <p
              className={`text-sm sm:text-base font-medium opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}
            >
              Here are my favorite subjects
            </p>
          </div>

          <div
            className="featured-card rounded-2xl p-1.5 transition-all relative"
            style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: themeColors.border }}
          >
            <div
              className="relative overflow-hidden rounded-xl h-full w-full z-10 p-5"
              style={{ backgroundColor: themeColors.card }}
            >
              <Subjects isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
