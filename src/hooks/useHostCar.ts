import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  getHostCarDetailsService,
  getHostCarsService,
  publishCarProcess,
  unpublishCarService,
  updateCarService,
} from '../services/hostCarService';
import {errorFormatter} from '../utils/helper';
import {
  navigateGoBack,
  navigateReplace,
  navigateReset,
} from '../utils/navigation';
import {carColors} from '../utils/constants';
import {IMAGES} from '../utils/theme';
import {prepareDataForDisplay} from '../utils/translation/translationUtils';
import useLanguageStore from '../service/store/language.store';
import useTranslate from '../hooks/useTranslate';
import useCenterMessageWindowStore from '../service/store/centerMessageWindow.store';

export const useHostCar = (params?: any) => {
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const publishCarMutation = useMutation({
    mutationFn: publishCarProcess,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.data?.message;
        console.log(errorMessage);
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
    onSuccess: data => {
      if (data?.data?.car?.id) {
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t(data?.data?.message || 'carPublishedSuccessfully'),
        });
        navigateReset('RootStack');
      }
    },
  });

  const unpublishCarMutation = useMutation({
    mutationFn: unpublishCarService,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Error in unpublishing process';
      params?.successCallback(errorMessage);
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
    onSuccess: data => {
      params?.successCallback(data?.data?.message);
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: updateCarService,
    onError: (error: any) => {
      console.log({error});
      const errorMessage =
        error?.response?.data?.message || 'Error in publishing process';
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
    onSuccess: data => {
      if (data?.data?.car?.id) {
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t(data?.data?.message || 'carPublishedSuccessfully'),
        });
        navigateGoBack();
      }
    },
  });

  const getHostCarsQuery = useInfiniteQuery({
    queryKey: ['getHostCars'],
    queryFn: ({pageParam = 0}) =>
      getHostCarsService({skip: pageParam, take: 10}),
    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const getHostCarDetailsQuery = useQuery({
    queryKey: ['getHostCarDetails', params?.id],
    queryFn: () =>
      getHostCarDetailsService({
        id: params?.id,
      }),
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
          key: t('countryOfManufacture'),
          value: country_of_manufacture,
          icon: IMAGES.manufactureCity,
        },
        {
          key: t('cityOfRegistration'),
          value: city_of_registeration,
          icon: IMAGES.registerationCity,
        },
        {
          key: t('transmissionType'),
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
          value: `${fuel_economy} MPG`,
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
          value: `${luggage_capacity} KG`,
          icon: IMAGES.luggage,
        },
      ];
      return {...data, about: arr};
    },
  });

  return {
    publishCar: publishCarMutation.mutate,
    publishCarLoading: publishCarMutation.isPending,

    unpublishCar: unpublishCarMutation.mutate,
    unpublishCarLoading: unpublishCarMutation.isPending,

    updateCar: updateCarMutation.mutate,
    updateCarLoading: updateCarMutation.isPending,

    getHostCars: getHostCarsQuery,
    getHostCarsLoading: getHostCarsQuery.isFetching,

    getHostCarDetails: getHostCarDetailsQuery,
    getHostCarDetailsLoading: getHostCarDetailsQuery.isFetching,
  };
};
