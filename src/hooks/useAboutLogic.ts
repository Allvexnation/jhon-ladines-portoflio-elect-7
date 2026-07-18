import { useState, useEffect, useRef } from 'react';
import { useThemeToggle } from '@/utils/theme-toggle';
import { useLanguageToggle } from '@/utils/toggle-language';
import { getThemeColors } from '@/functions/theme-utils';
import { getAboutTranslations } from '@/functions/translation-utils';

export function useAboutLogic() {
  const { isDarkMode } = useThemeToggle();
  const { lang } = useLanguageToggle();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [pageAnimated, setPageAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const t = getAboutTranslations(lang);

  const themeColors = getThemeColors(isDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const animationTimer = setTimeout(() => setPageAnimated(true), 50);
    setIsMounted(true);
    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return {
    isDarkMode,
    sectionRef,
    isMounted,
    pageAnimated,
    isMobile,
    t,
    themeColors,
    lang,
  };
}
