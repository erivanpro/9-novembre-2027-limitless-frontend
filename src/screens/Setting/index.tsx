import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import {
  LogoutModal,
  CustomText,
  CustomWrapper,
  HostModeSwitch,
} from '../../components';
import ProfileItem from './components/ProfileItem';
import { COLORS, IMAGES } from '../../utils/theme';
import { ProfileList } from './components/ProfileItem/interface';
import useUserStore from '../../service/store/user.store';
import { navigateReset } from '../../utils/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotification';
import { queryClient } from '../../..';
import { useUserCar } from '../../hooks/useUserCar';
import { useIsFocused } from '@react-navigation/native';
import useLanguageStore from '../../service/store/language.store';
import { useTranslate } from '../../hooks/useTranslate';
import { useSettings } from '../../hooks/useSettings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const SettingScreen = () => {
  const { t, changeLanguage } = useTranslate();
  const { getUserDetailQuery } = useUserCar();
  const [showLogout, setShowLogout] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const {
    setAccessToken,
    setUserDetails,
    accessToken,
    userDetails,
    isHostMode,
    setHostMode,
  } = useUserStore();
  const { setLanguage, language } = useLanguageStore();
  console.log({ language });
  let data: ProfileList[] = [
    {
      icon: IMAGES.helpCenter,
      title: t('helpCenter'),
      path: 'HelpCenter',
    },
    {
      icon: language == 'en' ? IMAGES.EnglishIcon : IMAGES.FrenchIcon,
      title: language == 'en' ? 'English' : 'French',
      pref: language,
      callback: (newLang: string) => {
        // if (setLanguage) {
        //   setLanguage(newLang);
        // }
        changeLanguage(newLang);
      },
      isLanguage: true,
      isDisable: 'fr',
      isEnable: 'en',
    },
    {
      icon: IMAGES.helpCenter,
      title: t('privacyPolicy'),
      externalUrl: 'https://erivan.fr/limitless-confidentialite.html',
    },
    {
      icon: IMAGES.helpCenter,
      title: t('termsOfUse'),
      externalUrl: 'https://erivan.fr/limitless-conditions.html',
    },
    {
      icon: IMAGES.helpCenter,
      title: t('deleteAccount'),
      externalUrl: 'https://erivan.fr/limitless-suppression-compte.html',
    },
  ];

  const { logout } = useAuth();
  const { setNotificationSwitch } = useNotifications();
  const { languageLoading, saveLanguageMutation } = useSettings();

  if (accessToken) {
    data = [
      {
        icon: language == 'en' ? IMAGES.EnglishIcon : IMAGES.FrenchIcon,
        title: language == 'en' ? 'English' : 'French',

        pref: language,
        callback: (newLang: string) => {
          if (setLanguage) {
            setLanguage(newLang);
            console.log('Language in setting screen', newLang);
            let lang = newLang == 'en' ? 'ENGLISH' : 'FRENCH';
            saveLanguageMutation({ language: lang });
          }
          changeLanguage(newLang);
        },
        isLanguage: true,
        isDisable: 'fr',
        isEnable: 'en',
      },
      {
        icon: IMAGES.notificationsIcon,
        title: 'Notifications',
        pref: userDetails?.notification_preference,
        isDisable: 'InApp',
        isEnable: 'Push',
        callback: setNotificationSwitch,
      },
      {
        icon: IMAGES.myOrder,
        title: t('myOrders'),
        path: 'MyOrders',
      },

      {
        icon: IMAGES.orderFromCar,
        title: t('ordersForMyCars'),
        path: 'OrderForMyCar',
      },
      {
        icon: IMAGES.editProfile,
        title: t('editProfile'),
        path: 'EditProfile',
      },
      {
        icon: IMAGES.changePassword,
        title: t('changePassword'),
        path: 'ChangePassword',
      },
      {
        icon: IMAGES.drivingDetails,
        title: t('drivingDetails'),
        path: 'DrivingDetails',
      },
      {
        icon: IMAGES.helpCenter,
        title: t('helpCenter'),
        path: 'HelpCenter',
      },
      {
        icon: IMAGES.helpCenter,
        title: t('privacyPolicy'),
        externalUrl: 'https://erivan.fr/limitless-confidentialite.html',
      },
      {
        icon: IMAGES.helpCenter,
        title: t('termsOfUse'),
        externalUrl: 'https://erivan.fr/limitless-conditions.html',
      },
      {
        icon: IMAGES.helpCenter,
        title: t('deleteAccount'),
        externalUrl: 'https://erivan.fr/limitless-suppression-compte.html',
      },
      {
        icon: IMAGES.logout,
        title: t('logout'),
        callback: () => setShowLogout(true),
      },
    ];
  }

  const HandleLogout = async () => {
    console.log('first');
    logout({
      id: userDetails?.id as number,
      fcm_token: userDetails?.fcmToken ? userDetails?.fcmToken : null,
    });

    setShowLogout(!showLogout);
  };
  return (
    <CustomWrapper backgroundColor={COLORS.white} padding>
      <View style={styles.header}>
        <CustomText text={t('settings')} center fontWeightPopins="600" />
      </View>
      <LogoutModal
        isVisible={showLogout}
        onCancel={() => setShowLogout(!showLogout)}
        onLogout={HandleLogout}
        logoutLoading={false}
      />

      <View style={styles.hostModeContainer}>
        <HostModeSwitch
          value={!!isHostMode}
          onValueChange={value => setHostMode?.(value)}
        />
      </View>

      <FlatList
        style={styles.list}
        scrollEnabled={!!accessToken}
        data={data}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: bottom + RFValue(90) },
        ]}
        ListFooterComponent={<View style={styles.listFooter} />}
        renderItem={({ item, index }) => <ProfileItem data={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </CustomWrapper>
  );
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};
const styles = StyleSheet.create({
  separator: { height: RFValue(10) },
  header: {
    paddingVertical: widthPercentageToDP(5),
  },
  hostModeContainer: {
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(20),
    paddingHorizontal: widthPercentageToDP(4),
    marginBottom: RFValue(10),
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  listFooter: {
    height: RFValue(24),
  },
});

export default SettingScreen;
