import React, {useEffect, useLayoutEffect} from 'react';
import {PixelRatio, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Initialize i18n
import './src/utils/i18n';

import {toastConfig} from './src/utils/theme';
import AuthStack from './src/navigation/AuthStack';
import NotificationListener from './src/screens/Notification/components/NotificationListner';
import Reviews from './src/screens/Reviews/index';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content';
import {useInterNetInfo} from './src/service/hooks/useNetInfo';
import NetConnectionModal from './src/components/NetConnectionModal/index';
import {GetFCMToken} from './src/utils/helper';
import useUserStore from './src/service/store/user.store';
import {useNotifications} from './src/hooks/useNotification';
import {LogBox} from 'react-native';
import CenterMessageWindow from './src/components/windows/CenterMessageWindow';
const App = () => {
  const {top} = useSafeAreaInsets();
  const {internetStatus} = useInterNetInfo();
  const {isFcmToken, userDetails, setIsFcmToken} = useUserStore();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {saveFCMToken} = useNotifications();
  const handle = async () => {
    const fcmToken = await GetFCMToken();
    if (!isFcmToken && fcmToken && userDetails?.id) {
      saveFCMToken({fcmToken: fcmToken} as any);
      setIsFcmToken(true);
      return;
    }
  };

  useEffect(() => {
    if (userDetails?.id) {
      handle();
    }
  }, [userDetails?.id]);

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />
      {internetStatus && <NetConnectionModal />}
      <AuthStack />
      {/* <Reviews/> */}
      <NotificationListener />
      <CenterMessageWindow />
      <Toast position="top" autoHide={true} config={toastConfig(top)} />
    </>
  );
};

export default App;
