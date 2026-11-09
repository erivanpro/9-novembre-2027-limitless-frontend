import {useMutation, useQuery} from '@tanstack/react-query';
import {
  cancelBookingService,
  getCarBookingsByIdService,
  getHostBookingByIdService,
  getUserBookingByIdService,
  giveReviewsService,
  validateBookingService,
} from '../services/bookingService';
import Toast from 'react-native-toast-message';
import {ErrorResponse} from '../utils/types/errorType';
import {errorFormatter} from '../utils/helper';
import {IMAGES} from '../utils/theme';
import {carColors} from '../utils/constants';
import {navigateReplace, navigateReset} from '../utils/navigation';
import useOffsetDate from '../service/hooks/useOffsetDate';
import {prepareDataForDisplay} from '../utils/translation/translationUtils';
import useLanguageStore from '../service/store/language.store';
import useTranslate from '../hooks/useTranslate';
import useCenterMessageWindowStore from '../service/store/centerMessageWindow.store';

export const useBooking = (params?: any) => {
  const {encodeTime} = useOffsetDate();
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const validateBookingMutation = useMutation({
    mutationKey: ['validateBooking', params?.validate],
    mutationFn: mutationParams => {
      let payload: any = mutationParams;
      delete payload?.validate;



      payload.start_date_time = encodeTime(payload.start_date_time);
      payload.end_date_time = encodeTime(payload.end_date_time);

      return validateBookingService(payload);
    },
    onSuccess: res => {
      params?.handleSuccess?.(res);
    },
    onError: error => {
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
    },
  });

  const getHostBookingByIdQuery = useQuery({
    queryKey: ['getHostCarById', params?.host_booking_id],
    queryFn: () => getHostBookingByIdService({id: params?.host_booking_id}),
  });

  const getUserBookingByIdQuery = useQuery({
    queryKey: ['getUserCarById', params?.user_booking_id],
    queryFn: () => getUserBookingByIdService({id: params?.user_booking_id}),
    select: data => {
      const {language} = useLanguageStore.getState();

      // Convert API data to display language
      const displayData = prepareDataForDisplay(
        data?.data?.car || {},
        language as 'en' | 'fr',
      );

      const {
        price_per_day,
        price_per_hour,
        vehicle_type,
        country_of_manufacture,
        city_of_registeration,
        transmission_type,
        color_code,
        brand,
        mileage,
        fuel_economy,
        engine_type,
        maximum_passengers,
        luggage_capacity,
      } = displayData;
      const arr = [
        {
          key: t('pricePerDay'),
          value: `${price_per_day} €`,
          icon: IMAGES.price,
        },
        {
          key: t('pricePerHour'),
          value: `${price_per_hour} €`,
          icon: IMAGES.price,
        },
        {
          key: t('vehicleType'),
          value: vehicle_type,
          icon: IMAGES.vehicleType,
        },
        {
          key: t('maufactureCity'),
          value: country_of_manufacture,
          icon: IMAGES.manufactureCity,
        },
        {
          key: t('cityRegistration'),
          value: city_of_registeration,
          icon: IMAGES.registerationCity,
        },
        {
          key: t('transmission'),
          value: transmission_type,
          icon: IMAGES.transmissionIcon,
        },
        {
          key: t('color'),
          value: color_code,
          icon: IMAGES.color,
        },
        {
          key: t('brand'),
          value: brand,
          icon: IMAGES.brand,
        },
        {
          key: t('mileage'),
          value: `${mileage}`,
          icon: IMAGES.mileage,
        },
        {
          key: t('fuelEconomy'),
          value: `${fuel_economy}`,
          icon: IMAGES.fuelEconomy,
        },
        {
          key: t('engineType'),
          value: `${engine_type}`,
          icon: IMAGES.engineType,
        },
        {
          key: t('passengers'),
          value: maximum_passengers,
          icon: IMAGES.passengers,
        },
        {
          key: t('luggage'),
          value: luggage_capacity,
          icon: IMAGES.luggage,
        },
      ];
      const reviews = data?.data?.car?.bookings;
      return {
        reviews: reviews,
        about: arr,
        car: data?.data?.car,
        bookingDetails: data?.data?.booking_details,
        chat: data?.data?.chat,
      };
    },
  });

  const cancelBookingMutation = useMutation({
    mutationKey: ['validateBooking', params?.cancel_booking_id],
    mutationFn: payload => cancelBookingService(payload),
    onSuccess: res => {
      // params?.handleSuccess?.(res);
      navigateReset('RootStack');
    },
    onError: error => {
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
    },
  });
  const setBookingReviewMutation = useMutation({
    mutationKey: ['validateBooking', params?.cancel_booking_id],
    mutationFn: payload => giveReviewsService(payload),
    onSuccess: res => {
      // params?.handleSuccess?.(res);
      Toast.show({
        type: 'success',
        text1: t('success'),
        text2: t('reviewAddedSuccessfully'),
      });
      navigateReplace('RootStack');
      // navigateReset('RootStack');
    },
    onError: error => {
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
    },
  });

  const getCarBookingsQuery = useQuery({
    queryKey: ['getCarBookings', params?.id],
    queryFn: () => getCarBookingsByIdService({id: params?.id}),
  });

  return {
    validateBooking: validateBookingMutation.mutate,
    validateBookingLoading: validateBookingMutation.isPending,

    cancelBooking: cancelBookingMutation.mutate,
    cancelBookingLoading: cancelBookingMutation.isPending,

    getHostBookingById: getHostBookingByIdQuery,
    getHostBookingByIdLoading: getHostBookingByIdQuery.isPending,

    getUserBookingById: getUserBookingByIdQuery,
    getUserBookingByIdLoading: getUserBookingByIdQuery.isPending,

    setReview: setBookingReviewMutation.mutate,
    reviewLoading: setBookingReviewMutation.isPending,

    getCarBookings: getCarBookingsQuery,
    getCarBookingsLoading: getCarBookingsQuery.isPending,
  };
};




