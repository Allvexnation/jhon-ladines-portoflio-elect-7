import translationsEn from '@/static/home_english.json';
import translationsTl from '@/static/home_tagalog.json';
import aboutTranslationsEn from '@/static/about_english.json';
import aboutTranslationsTl from '@/static/about_tagalog.json';

export function getTranslations(lang: string) {
  return lang === 'en' ? translationsEn.en : translationsTl.tl;
}

export function getAboutTranslations(lang: string) {
  return lang === 'en' ? aboutTranslationsEn.en : aboutTranslationsTl.tl;
}
