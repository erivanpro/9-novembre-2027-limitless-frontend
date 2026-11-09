import React, { useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {
  CalendarTimePicker,
  CustomButton,
  CustomImage,
  CustomText,
  CustomWrapper,
  GooglePlacesInput,
} from '../../components';
import { AssistanceSection, HomeHeader, PopularVehicles } from './components';
import { COLORS, IMAGES } from '../../utils/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import {
  Button,
  Dimensions,
  Image,
  ImageStyle,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  StyleProp,
  View,
} from 'react-native';
import MMKVStorage from '../../utils/MMKVStorage';
import { navigate } from '../../utils/navigation';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {CustomIcon} from '../../components/CustomIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import { useUserCar } from '../../hooks/useUserCar';
import useUserStore from '../../service/store/user.store';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { useLocation } from '../../hooks/useLocation';
import { getUserLocation } from '../../utils/helper';
import { set } from 'react-native-reanimated';
import useTranslate from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const HomeScreen = () => {
  // Variables
  const focus = useIsFocused();
  const tabNavigation = useNavigation<any>();
  const { t, language } = useTranslate();
  const accentColor = useAppAccentColor();

  const { saveUserLocation } = useLocation();
  const calenderBottomSheetRef = useRef<BottomSheetModal>(null);
  const roleChooserSheetRef = useRef<BottomSheetModal>(null);
  const navigateToHostingAfterDismiss = useRef(false);
  const {shouldShowRoleChooser, setRoleChooserPending} = useUserStore();
  const [location, setLocation] = useState('');

  const [date, setDate] = useState({ start: '', end: '' });
  const [time, setTime] = useState({ start: '', end: '' });
  const [refreshing, setRefreshing] = useState(false);

  const googlePlaceAutoCompleteRef = useRef<any>(null);

  // Functions
  const HandleContinue = () => {
    calenderBottomSheetRef.current?.close();
  };

  const handleRefreshLocation = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await handleLocation();
    setRefreshing(false);
  };

  const handleLocation = async () => {
    try {
      const res = await getUserLocation();
      console.log('===>>>', { res });
      if (res?.lat) {
        saveUserLocation({
          location: {
            lat: Number(res?.lat),
            long: Number(res?.lng),
          },
        });
      } else {
        saveUserLocation({
          location: {
            lat: undefined,
            long: undefined,
          },
        });
      }
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  };

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    if (!shouldShowRoleChooser || !focus) {
      return;
    }

    const timer = setTimeout(() => {
      roleChooserSheetRef.current?.present();
    }, 350);

    return () => clearTimeout(timer);
  }, [focus, shouldShowRoleChooser]);

  const handleRoleChooserDismiss = () => {
    setRoleChooserPending(false);
    if (navigateToHostingAfterDismiss.current) {
      navigateToHostingAfterDismiss.current = false;
      tabNavigation.navigate('Hosting');
    }
  };

  const handleChooseHost = () => {
    navigateToHostingAfterDismiss.current = true;
    setRoleChooserPending(false);
    roleChooserSheetRef.current?.dismiss();
  };

  const handleChooseRenter = () => {
    navigateToHostingAfterDismiss.current = false;
    setRoleChooserPending(false);
    roleChooserSheetRef.current?.dismiss();
  };

  // UseEffects
  useEffect(() => {
    googlePlaceAutoCompleteRef.current?.setAddressText('');
    setDate({ start: '', end: '' });
    setTime({ start: '', end: '' });
  }, [focus]);
  const HandleFindCars = () => {
    let payload = {
      location: googlePlaceAutoCompleteRef?.current?.getAddressText(),
      date: {
        start: '',
        end: '',
      },
      time: {
        start: '',
        end: '',
      },
    };
    if (date.end) {
      payload.date.start = String(date.start);
      payload.date.end = String(date.end);
    }
    if (time.end) {
      payload.time.start = String(time.start);
      payload.time.end = String(time.end);
    }
    navigate('Search', {
      data: payload,
    });
  };

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await MMKVStorage.getItem('hasSeenOnboarding');
      console.log('onboardingStatus on home', onboardingStatus);
    };

    checkOnboardingStatus();
    handleLocation();
  }, []);

  return (
    <>
      <CustomWrapper padding backgroundColor={COLORS.white}>
        <HomeHeader />

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefreshLocation()}
            />
          }>
        <GooglePlacesInput
          inputRef={googlePlaceAutoCompleteRef}
          predefinedPlaces={[]}
          setAddress={e => {
            setLocation(e);
          }}
        />
        <CalendarTimePicker
          calenderBottomSheetRef={calenderBottomSheetRef}
          handleContinue={HandleContinue}
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />

        <CustomButton
          containerStyle={[
            styles.findCarsButton,
            { backgroundColor: accentColor },
          ]}
          title={t('findCars')}
          onPress={HandleFindCars}
        />

        {/*
        <Animatable.View
          animation={{
            0: { opacity: 0, transform: [{ scale: 0.95 }] }, // start slightly smaller & invisible
            1: { opacity: 1, transform: [{ scale: 1 }] }, // end fully visible & normal size
          }}
          duration={500}
          delay={300}
          useNativeDriver
        >
          <CustomImage
            source={
              language === 'en' ? IMAGES.homeBanner1 : IMAGES.homeBanner1FR
            }
            style={styles.homeBanner as StyleProp<ImageStyle>}
            onPressImage={() => navigate('Search' as any)}
          />
        </Animatable.View>
        */}

        <Animatable.View
          animation={{
            0: { opacity: 0, transform: [{ scale: 0.95 }] }, // start invisible and slightly smaller
            1: { opacity: 1, transform: [{ scale: 1 }] }, // end fully visible and normal size
          }}
          duration={500} // animation duration
          delay={500} // delay to stagger after banners, optional
          useNativeDriver
        >
          <PopularVehicles />
        </Animatable.View>

        {/*
        <Animatable.View
          animation={{
            0: { opacity: 0, transform: [{ scale: 0.95 }] }, // start slightly smaller and invisible
            1: { opacity: 1, transform: [{ scale: 1 }] }, // end fully visible and normal size
          }}
          duration={500} // animation duration
          delay={300} // optional delay
          useNativeDriver
        >
          <CustomImage
            source={
              language === 'en' ? IMAGES.homeBanner2 : IMAGES.homeBanner2FR
            }
            style={styles.homeBanner as StyleProp<ImageStyle>}
            onPressImage={() => navigate('Hosting')}
          />
        </Animatable.View>
      */}

        <AssistanceSection />
        </ScrollView>
      </CustomWrapper>

      <BottomSheetModal
        ref={roleChooserSheetRef}
        snapPoints={['56%']}
        enablePanDownToClose
        onDismiss={handleRoleChooserDismiss}
        backgroundStyle={styles.roleSheetBackground}
        handleIndicatorStyle={styles.roleSheetHandle}>
        <BottomSheetView style={styles.roleSheetContent}>
          <CustomText
            text={t('roleChooserTitle')}
            center
            textStyle={styles.roleSheetTitle}
          />
          <CustomText
            text={t('roleChooserDescription')}
            center
            textStyle={styles.roleSheetDescription}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('roleHostTitle')}
            style={styles.roleOption}
            onPress={handleChooseHost}>
            <Image
              source={IMAGES.roleHostCar}
              style={styles.roleCarImage}
              resizeMode="contain"
              accessible={false}
            />
            <View style={styles.roleOptionText}>
              <CustomText text={t('roleHostTitle')} textStyle={styles.roleOptionTitle} />
              <CustomText
                text={t('roleHostDescription')}
                textStyle={styles.roleOptionDescription}
              />
            </View>
            <CustomIcon
              type="Feather"
              icon="chevron-right"
              color={COLORS.neutral500}
              size={RFValue(18)}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('roleRenterTitle')}
            style={styles.roleOption}
            onPress={handleChooseRenter}>
            <Image
              source={IMAGES.roleRenterCar}
              style={styles.roleCarImage}
              resizeMode="contain"
              accessible={false}
            />
            <View style={styles.roleOptionText}>
              <CustomText
                text={t('roleRenterTitle')}
                textStyle={styles.roleOptionTitle}
              />
              <CustomText
                text={t('roleRenterDescription')}
                textStyle={styles.roleOptionDescription}
              />
            </View>
            <CustomIcon
              type="Feather"
              icon="chevron-right"
              color={COLORS.neutral500}
              size={RFValue(18)}
            />
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  homeBanner: {
    width: '100%',
    height: (Dimensions.get('screen').width / 1.7) * 0.692,
    marginVertical: widthPercentageToDP(6),
    zIndex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  findCarsButton: {
    backgroundColor: 'transparent',
    width: 150,
    borderRadius: 100,
    height: 50,
  },
  roleSheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFValue(24),
    borderTopRightRadius: RFValue(24),
  },
  roleSheetHandle: {
    width: widthPercentageToDP(12),
    backgroundColor: COLORS.neutral200,
  },
  roleSheetContent: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(7),
  },
  roleSheetTitle: {
    color: COLORS.black,
    fontSize: RFValue(17),
    lineHeight: RFValue(23),
    fontWeight: '600',
    paddingHorizontal: widthPercentageToDP(2),
  },
  roleSheetDescription: {
    color: COLORS.neutral500,
    fontSize: RFValue(11),
    lineHeight: RFValue(16),
    marginTop: widthPercentageToDP(1.5),
    marginBottom: widthPercentageToDP(4),
  },
  roleOption: {
    minHeight: widthPercentageToDP(21),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFValue(15),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.neutral200,
    backgroundColor: COLORS.white,
    paddingHorizontal: widthPercentageToDP(3.5),
    paddingVertical: widthPercentageToDP(3),
    marginBottom: widthPercentageToDP(3),
  },
  roleCarImage: {
    width: widthPercentageToDP(25),
    height: widthPercentageToDP(15),
    marginRight: widthPercentageToDP(3),
  },
  roleOptionText: {
    flex: 1,
    paddingRight: widthPercentageToDP(2),
  },
  roleOptionTitle: {
    color: COLORS.black,
    fontSize: RFValue(12),
    lineHeight: RFValue(17),
    fontWeight: '600',
  },
  roleOptionDescription: {
    color: COLORS.neutral500,
    fontSize: RFValue(9.5),
    lineHeight: RFValue(14),
    marginTop: RFValue(2),
  },
});
export default HomeScreen;
