import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  getUserCarByIdService,
  getUserCarDetailsService,
  getUserCarMapService,
  getUserCarsService,
  getUserDetailsService,
} from '../services/userCarService';
import { IMAGES } from '../utils/theme';
import { carColors } from '../utils/constants';
import { prepareDataForDisplay } from '../utils/translation/translationUtils';
import useLanguageStore from '../service/store/language.store';
import { userDetailEndPoint } from '../utils/endpoints';
import useUserStore from '../service/store/user.store';
import useOffsetDate from '../service/hooks/useOffsetDate';
import useTranslate from './useTranslate';

export const useUserCar = (params?: any) => {
  const { encodeTime } = useOffsetDate();
  const { t } = useTranslate();
  const getUserCarsQuery = useInfiniteQuery({
    queryKey: ['getUserCars', params?.applyFilter, params?.applySearchFilter],
    queryFn: async ({ pageParam = 0 }) => {
      let payload = params;
      delete payload?.applyFilter;
      payload.vehicle_type =
        payload.vehicle_type === 'All' ? undefined : payload.vehicle_type;

      let startDate = encodeTime(decodeURIComponent(payload.start_date_time));
      let endDate = encodeTime(decodeURIComponent(payload.end_date_time));

      payload.end_date_time = endDate;
      payload.start_date_time = startDate;
      
      const cleanedObj = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) =>
            value !== null &&
            value !== undefined &&
            !(Array.isArray(value) && value.length === 0),
        ),
      );
      return await getUserCarsService({
        skip: pageParam,
        take: 100,
        // address: params?.address,
        // start_date_time: params?.start_date_time,
        // end_date_time: params?.end_date_time,
        filters: { ...cleanedObj },
        // vehicle_type: params?.vehicle_type,
      });
    },

    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  // to be implemented for limited car information on maps card
  const getUserCarByIdQuery = useQuery({
    queryKey: ['getUserCarById', params?.id],
    queryFn: () => getUserCarByIdService({ id: params?.id }),
  });
  const getUserDetailQuery = useQuery({
    queryKey: ['getuserDetail'],
    queryFn: () => getUserDetailsService(),
  });
  // const {mutate:getUserDetailMutation} = useMutation({
  //   mutationFn: getUserDetailsService, // first time set with license image,
  //   onError: () => {

  //   },
  //   onSuccess: data => {
  //     // if (data?.data?.message) {
  //       console.log({data})
  //       // setUserDetails({

  //       //   ...data?.data?.data,
  //       //   ...data?.data?.host,
  //       // });

  //     // }
  //   },
  // });

  const getUserCarMapQuery = useInfiniteQuery({
    queryKey: ['getUserCarMap'],
    queryFn: async ({ pageParam = 0 }) => {
      return await getUserCarMapService({
        skip: pageParam,
        take: 100,
      });
    },

    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const getUserCarDetailsQuery = useQuery({
    queryKey: ['getUserCarDetails', params?.id],
    queryFn: () =>
      getUserCarDetailsService({
        id: params?.id,
        // user_id: params?.user_id,
        chat_type: params?.chat_type,
      }),
    select: data => {
      const { language } = useLanguageStore.getState();

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
      return { ...data, about: arr };
    },
  });

  return {
    getUserCars: getUserCarsQuery,
    getUserCarsLoading: getUserCarsQuery.isFetching,

    getUserCarById: getUserCarByIdQuery,
    getUserCarByIdLoading: getUserCarByIdQuery.isPending,

    getUserCarMap: getUserCarMapQuery,
    getUserCarMapLoading: getUserCarMapQuery.isPending,

    getUserCarDetails: getUserCarDetailsQuery,
    getUserCarDetailsLoading: getUserCarDetailsQuery.isFetching,

    // getUserDetail:getUserDetailMutation
    getUserDetailQuery: getUserDetailQuery,
  };
};
