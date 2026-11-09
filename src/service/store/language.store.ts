import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {LanguageStoreType} from '../../utils/types/ZustandStoreType';

export const defaultLanguageState = {};
const useLanguageStore = create(
  persist<LanguageStoreType>(
    (set, _) => ({
      language: 'en',
      setLanguage: (language: string) =>
        set({
          language: language,
        }),
    }),

    {
      name: 'language',
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);

export default useLanguageStore;
