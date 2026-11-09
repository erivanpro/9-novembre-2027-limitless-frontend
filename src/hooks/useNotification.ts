import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import {
  getNotificationService,
  saveFCMTokenService,
  setNotificationsSwitch,
} from '../services/notificationService';
import { ErrorResponse } from '../utils/types/errorType';
import { errorFormatter } from '../utils/helper';
import Toast from 'react-native-toast-message';
import useUserStore from '../service/store/user.store';
import useTranslate from '../hooks/useTranslate';
import useCenterMessageWindowStore from '../service/store/centerMessageWindow.store';

export const useNotifications = (_?: any) => {
  const { setUserDetails, userDetails, setIsFcmToken } = useUserStore();
  const { t } = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const getNotificationsQuery = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) =>
      getNotificationService({ skip: pageParam, take: 10 }),
    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      if (_lastPage.data.hasMore) {
        return pages.length * 10;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
  const notifications =
    getNotificationsQuery.data?.pages.flatMap(
      page => page.data?.notifications ?? [],
    ) ?? [];

  const saveFCMTokenMutation = useMutation({
    mutationFn: abc => {
      return saveFCMTokenService(abc);
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      const title = t('error');
      const message = t(errorFormatter(errorMessage));
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

      setIsFcmToken(false);
    },
    onSuccess: _ => {}, // no success handling as FCM token is being saved while calling the api;
  });

  const setNotificationPerf = useMutation({
    mutationFn: (value: string) => setNotificationsSwitch(value),
    onError: (error: ErrorResponse) => {
      const title = t('error');
      const message = t(error?.message);
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

    onSuccess: res => {
      console.log(res.data);
      setUserDetails({ ...userDetails, ...res?.data?.user });
    },
  });

  return {
    getNotifications: getNotificationsQuery,
    getNotificationsLoading: getNotificationsQuery.isPending,

    saveFCMToken: saveFCMTokenMutation.mutate,
    saveFCMTokenLoading: saveFCMTokenMutation.isPending,

    setNotificationSwitch: setNotificationPerf.mutate,
    notifications,
  };
};
