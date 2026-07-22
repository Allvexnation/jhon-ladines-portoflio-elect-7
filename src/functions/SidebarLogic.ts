'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useThemeToggle } from '@/utils/ThemeToggle';
import { useLanguageToggle } from '@/utils/LanguageToggle';
import type { SideBarProps } from '@/types/components';
import {
  BiHomeCircle,
  BiUser,
  BiBook,
  BiMessageRoundedDots,
  BiPhotoAlbum,
  BiCategory,
} from 'react-icons/bi';
import {
  PiBriefcaseBold,
  PiCardsThreeBold,
  PiChatTeardropDotsBold,
  PiCodeBold,
} from 'react-icons/pi';
import { TbStack2 } from 'react-icons/tb';
import { LuYoutube } from 'react-icons/lu';
import { RotateCcw, Monitor } from 'lucide-react';
import englishLabels from '@/static/sidebar_english.json';
import tagalogLabels from '@/static/sidebar_tagalog.json';
import sidebarConfig from '@/static/sidebar.json';

export const PROFILE_IMAGE =
  'https://res.cloudinary.com/dbob1wota/image/upload/8847D2E8-EEA2-49D5-9A36-45DEB2C2974E_v9nalq.jpg';
export const VERIFIED_BADGE =
  'https://res.cloudinary.com/dbob1wota/image/upload/verified_svtr7d.png';

export const labels: Record<'en' | 'tl', Record<string, string>> = {
  en: englishLabels,
  tl: tagalogLabels,
};

const iconMap: Record<string, React.ComponentType<any>> = {
  BiHomeCircle,
  BiUser,
  BiBook,
  BiPhotoAlbum,
  BiCategory,
  PiBriefcaseBold,
  PiCardsThreeBold,
  PiChatTeardropDotsBold,
  TbStack2,
  LuYoutube,
  RotateCcw,
  Monitor,
};

export const useSidebarLogic = ({
  isDarkMode: externalIsDarkMode,
  toggleTheme: externalToggleTheme,
  activeTab: externalActiveTab,
  setActiveTab: externalSetActiveTab,
  navLayout: externalNavLayout,
  setNavLayout: externalSetNavLayout,
}: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode: internalIsDarkMode, toggleTheme: internalToggleTheme } = useThemeToggle();
  const { lang, toggleLanguage, setLanguage } = useLanguageToggle();

  const isDarkMode = externalIsDarkMode ?? internalIsDarkMode;
  const toggleTheme = externalToggleTheme ?? internalToggleTheme;

  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(externalActiveTab || pathname?.slice(1) || 'home');
  const [navLayout, setNavLayout] = useState(externalNavLayout || 'sidebar');

  const themeColors = {
    mobile: {
      background: isDarkMode ? '#0a0a0a' : '#ffffff',
      menuBackground: isDarkMode ? '#0a0a0a' : '#ffffff',
    },
    desktop: {
      profileBorder: isDarkMode ? '#333333' : '#e5e5e5',
    },
  };

  const textPrimary = isDarkMode ? 'text-white' : 'text-black';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-800';
  const dividerClass = isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-300';
  const mobileTopBorderClass = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const togglePillBorderClass = isDarkMode ? 'border border-gray-700' : 'border border-gray-300';
  const controlBtnClass = isDarkMode
    ? 'w-10 h-10 bg-[#1a1a1a] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center'
    : 'w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center';

  const navActiveClass = isDarkMode
    ? 'bg-[#262626] text-white border-2 border-transparent'
    : 'bg-gray-100 text-black border-2 border-transparent';
  const navInactiveClass = isDarkMode
    ? 'text-gray-400 hover:text-white border-2 border-transparent'
    : 'text-gray-800 hover:text-black border-2 border-transparent';

  const currentLabels = labels[lang as keyof typeof labels];

  const allNavItems = sidebarConfig.navItems.map((item) => ({
    href: item.href,
    icon: iconMap[item.icon],
    text: currentLabels[item.textKey as keyof typeof currentLabels],
    id: item.id,
  }));

  const primaryNavItems = sidebarConfig.primaryNavOrder
    .map((id) => allNavItems.find((item) => item.id === id))
    .filter(Boolean) as typeof allNavItems;

  const handleNavClick = (item: (typeof allNavItems)[0]) => {
    setActiveTab(item.id);
    if (externalSetActiveTab) {
      externalSetActiveTab(item.id);
    }
    setIsOpen(false);
    router.push(item.href);
  };

  useEffect(() => {
    setImageLoaded(true);
    setMounted(true);
  }, []);

  return {
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
  };
};
