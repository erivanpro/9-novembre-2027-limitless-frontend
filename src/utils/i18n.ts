import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {translate} from './translation/language';

const resources = {
  en: {
    translation: translate.en,
  },
  fr: {
    translation: translate.fr,
  },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = getLocales();
    const deviceLanguage = locales[0]?.languageCode;
    const supportedLanguage = ['en', 'fr'].includes(deviceLanguage || '') ? deviceLanguage : 'en';
    callback(supportedLanguage || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
    compatibilityJSON: 'v4', 
  });

export default i18n;
