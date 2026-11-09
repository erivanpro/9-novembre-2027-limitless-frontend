import { useTranslation } from 'react-i18next';
import useLanguageStore from '../service/store/language.store';

export const useTranslate = () => {
  const { t: i18nT, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const t = (key: string, vars?: Record<string, any>): string => {
    if (vars) {
      return i18nT(key, vars) as string;
    }
    return i18nT(key) as string;
  };

  return {
    t,
    language: i18n.language as 'en' | 'fr',
    changeLanguage: (newLang: string) => {
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
    },
    i18n,
    stateLanguage: language,
  };
};

export default useTranslate;
