import { useMutation} from '@tanstack/react-query';

import {ErrorResponse} from '../utils/types/errorType';

import Toast from 'react-native-toast-message';
import useUserStore from '../service/store/user.store';
import useTranslate from '../hooks/useTranslate';
import { languageService } from '../services/settingsService';
import useCenterMessageWindowStore from '../service/store/centerMessageWindow.store';

export const useSettings = (_?: any) => {
  const {setUserDetails, userDetails, setIsFcmToken} = useUserStore();
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );

  const saveLanguageMutation = useMutation({
    mutationFn: (abc: {language: string}) => {
      return languageService(abc);
    },
    onError: (error: ErrorResponse) => {
      console.log('ERROR', error);
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      const title = t('error');
      const message = t(errorMessage);
      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
      showCenterMessageWindow({
        title,
        message,
        buttonText: t('ok'),
      });
    },
    onSuccess: _ => {
      console.log(_);
    }, // no success handling as FCM token is being saved while calling the api;
  });


  return {
    saveLanguageMutation: saveLanguageMutation.mutate,
    languageLoading: saveLanguageMutation.isPending,

   
  };
};
