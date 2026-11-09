import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

export const COLORS = {
  primary: '#000000',
  white: '#FFFFFF',
  black: '#000000',
  neutral50: '#F5F5F5',
  neutral100: '#E8E8E8',
  neutral200: '#DCDCDC',
  neutral300: '#BDBDBD',
  neutral400: '#9C9C9C',
  neutral500: '#7C7C7C',
  neutral600: '#656565',
  neutral700: '#525252',
  neutral800: '#464646',
  neutral900: '#3D3D3D',
  neutral950: '#292929',
  error600: '#ED2015',
  error800: '#A5170F',
  warning500: '#FF9500',
  purple: '#8F00FF',
  neonGreen: '#E7F733',
  orange: '#FF5F00',
  lightOrange: '#FFD1A3',
  blue: '#3083FF',
  green: '#33bb78',
  darkGreen: '#105D38',
  lightBlue: '#EAF3FF',
};
export const FONT = {
  poppinsRegular: 'Poppins-Regular',
  poppins500: 'Poppins-Medium',
  poppins600: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',
  interRegular: 'Inter_18pt-Regular',
  inter500: 'Inter_18pt-Medium',
  inter600: 'Inter_18pt-SemiBold',
  inter900: 'Inter_24pt-Black',
};

export const IMAGES = {
  // bottom tab
  home: require('../assets/images/bottomtab/home.png'),
  home_active: require('../assets/images/bottomtab/home_active.png'),
  search: require('../assets/images/bottomtab/search.png'),
  hostingCarBottomTab: require('../assets/images/bottomtab/hosting_car.png'),
  bottomtabChat: require('../assets/images/bottomtab/bottomtab_chat.png'),
  chatIcon: require('../assets/images/chat.png'),
  setting: require('../assets/images/bottomtab/setting.png'),



  
  // onboarding
  onboarding: require('../assets/images/onboarding/onboarding.png'),





  // global
  back: require('../assets/images/back_icon.png'),
  logo: require('../assets/images/logo.png'),
  logoWhite: require('../assets/images/logo_white.png'),
  logoBlack: require('../assets/images/logo_black.png'),

  // home
  homeBanner1: require('../assets/images/home/home_banner1.png'),
  homeBanner2: require('../assets/images/home/home_banner2.png'),
  homeBanner1FR: require('../assets/images/home/home_banner1_fr.png'),
  homeBanner2FR: require('../assets/images/home/home_banner2_fr.png'),
  roleHostCar: require('../assets/images/home/role-host-car.png'),
  roleRenterCar: require('../assets/images/home/role-renter-car.png'),
  stripePayoutIllustration: require('../assets/images/home/stripe-payout-illustration.png'),
  stripeWordmark: require('../assets/images/home/stripe-wordmark.png'),
  popularCar1: require('../assets/images/home/popular_car_1.png'),
  popularCar2: require('../assets/images/home/popular_car_2.png'),
  assistance1: require('../assets/images/home/assistance_1.png'),
  assistance2: require('../assets/images/home/assistance_2.png'),
  assistanceThumbnail1: require('../assets/images/home/assistance_1_thumbnail.png'),
  assistanceThumbnail2: require('../assets/images/home/bannerx.png'),
  transmission: require('../assets/images/home/transmission.png'),
  assistanceThumbnailBanner: require('../assets/images/home/3dx.png'),
  calendarIcon: require('../assets/images/home/calendar.png'),
  // hosting
  hostingCar: require('../assets/images/hosting/hosting_car.png'),
  // setting
  myOrder: require('../assets/images/setting/my_order.png'),
  orderFromCar: require('../assets/images/setting/my_car_order.png'),
  editProfile: require('../assets/images/setting/edit_profile.png'),
  changePassword: require('../assets/images/setting/change_password.png'),
  drivingDetails: require('../assets/images/setting/driving_details.png'),
  helpCenter: require('../assets/images/setting/help_center.png'),
  logout: require('../assets/images/setting/logout.png'),

  addCarIcon: require('../assets/images/car_icon.png'),
  carIcon: require('../assets/images/car_icon.png'),
  car1: require('../assets/images/car1.png'),
  car2: require('../assets/images/car2.png'),
  car3: require('../assets/images/car3.png'),
  plusRoundIcon: require('../assets/images/plus_round_icon.png'),
  mapBadge: require('../assets/images/map_badge.png'),
  vehicleInspectionMap: require('../assets/images/inspection_map_icon.png'),
  hosterBadgePic: require('../assets/images/hoster_badge_pic.png'),
  imageUpload: require('../assets/images/image_upload.png'),
  licenseimageUpload: require('../assets/images/licence_image_upload.png'),
  emptyProfile: require('../assets/images/empty_profile.png'),
  cameraIcon: require('../assets/images/cemra_icon.png'),
  galeryIcon: require('../assets/images/galery.png'),
  crossIcon: require('../assets/images/cross.png'),
  editProfileIcon: require('../assets/images/edit_profile_icon.png'),

  price: require('../assets/images/CarDetailsInfoImages/price.png'),
  vehicleType: require('../assets/images/CarDetailsInfoImages/vehicle_type.png'),
  manufactureCity: require('../assets/images/CarDetailsInfoImages/manufacture_city.png'),
  registerationCity: require('../assets/images/CarDetailsInfoImages/registeration_city.png'),
  transmissionIcon: require('../assets/images/CarDetailsInfoImages/transmission.png'),
  color: require('../assets/images/CarDetailsInfoImages/color.png'),
  brand: require('../assets/images/CarDetailsInfoImages/brand.png'),
  yearOfCar: require('../assets/images/CarDetailsInfoImages/year_of_car.png'),
  mileage: require('../assets/images/CarDetailsInfoImages/mileage.png'),
  fuelEconomy: require('../assets/images/CarDetailsInfoImages/fuel_economy.png'),
  engineType: require('../assets/images/CarDetailsInfoImages/engine_type.png'),
  passengers: require('../assets/images/CarDetailsInfoImages/passengers.png'),
  luggage: require('../assets/images/CarDetailsInfoImages/luggage.png'),

  // info modal images
  info: require('../assets/images/infoModals/info.png'),
  right: require('../assets/images/infoModals/right.png'),
  carPlaceholderImage: require('../assets/images/car_placeholder_image.png'),
  closeCircle: require('../assets/images/close_circle.png'),
  locationSpark: require('../assets/images/location_spark.png'),
  paymentSuccess: require('../assets/images/payment_success.png'),
  filter: require('../assets/images/filter.png'),
  authIcon: require('../assets/images/auth_icon.png'),
  mapCar: require('../assets/images/map_car.png'),
  mapTeslaGreen: require('../assets/images/map_tesla_green.png'),
  masterCard: require('../assets/images/master_card.png'),
  trash: require('../assets/images/trash.png'),
  call: require('../assets/images/call.png'),
  locationPin: require('../assets/images/placeholder.png'),
  walletIcon: require('../assets/images/wallet.png'),
  notificationsIcon: require('../assets/images/setting/settings.png'),
  FrenchIcon: require('../assets/images/setting/france.png'),
  EnglishIcon: require('../assets/images/setting/us.png'),
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

export const toastConfig = (bottom: number) => ({
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={[
        styles.toast,
        styles.successBorder,
        { marginBottom: bottom - heightPercentageToDP(3) },
      ]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={[
        styles.toast,
        styles.errorBorder,
        { marginBottom: bottom - heightPercentageToDP(3) },
      ]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2Error}
    />
  ),
});

// style for toast
const styles = StyleSheet.create({
  toast: {
    marginTop: (StatusBar.currentHeight || 0) + 10,
    width: '90%',
    height: heightPercentageToDP(6),
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: heightPercentageToDP(1.5),
    fontFamily: 'Poppins-Medium',
  },
  text2: {
    fontSize: heightPercentageToDP(1),
    fontFamily: 'Poppins-Regular',
  },
  text2Error: {
    fontSize: heightPercentageToDP(1.3),
    fontFamily: 'Poppins-Regular',
  },
  successBorder: {
    borderLeftColor: 'green',
  },
  errorBorder: {
    borderLeftColor: 'red',
  },
});

export const globalStyles = StyleSheet.create({
  sectionPadding: {
    paddingVertical: widthPercentageToDP(2),
  },
  inputSpacing: {
    paddingVertical: widthPercentageToDP(1.5),
  },
  container: {
    flex: 1,
  },
});
