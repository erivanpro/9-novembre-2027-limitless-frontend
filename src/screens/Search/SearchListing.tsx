import React, {FC, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {SearchListingScreenProps} from './interface';
import SearchListItem from './component/SearchListItem';
import {COLORS, FONT, IMAGES} from '../../utils/theme';
import {
  CalendarTimePicker,
  CustomText,
  CustomWrapper,
  GooglePlacesInput,
  Row,
} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {useUserCar} from '../../hooks/useUserCar';
import Filters from './component/Filters';
import {formatDate} from '../../utils/dayjs';
import {useRoute} from '@react-navigation/native';
import SearchScreenSkeleton from '../../components/Skeleton/SearchScreenSkeleton';
import {useTranslate} from '../../hooks/useTranslate';

const SearchListingScreen: FC<SearchListingScreenProps> = () => {
  const {t} = useTranslate();
  const params = useRoute().params || {};

  const [filters, setFilters] = useState({
    vehicle_type: null,
    features: [],
    minimum_seats: 2,
    total_price: null,
    less_than_five_years: false,
    gearbox: null,
    engine_type: null,
    brand: null,
  });
  const calenderBottomSheetRef = useRef<BottomSheetModal>(null);
  const googlePlaceAutoCompleteRef = useRef<any>('');

  const [date, setDate] = useState({start: '', end: ''});
  const [time, setTime] = useState({start: '', end: ''});
  const [location, setLocation] = useState('');
  const [applySearchFilter, setApplySearchFilter] = useState(0);
  const [clear, setClear] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const hasInitializedAutoApply = useRef(false);


  const {getUserCars, getUserCarsLoading} = useUserCar({
    address: location || undefined,
    start_date_time: date.end
      ? `${formatDate(date.start, 'YYYY-MM-DD')}${
          time.start ? `T${formatDate(time.start, 'HH:mm:ss')}` : ''
        }`
      : undefined,
    end_date_time: date.end
      ? `${formatDate(date.end, 'YYYY-MM-DD')}${
          time.end ? `T${formatDate(time.end, 'HH:mm:ss')}` : ''
        }`
      : undefined,
    ...filters,
    applyFilter: applySearchFilter,
  });

  const data = getUserCars.data?.pages[0]?.data?.cars;
  const HandleContinue = () => {
    calenderBottomSheetRef.current?.close();
  };
  let isLocation = location || clear;
  let isFilteredApplied = JSON.parse(JSON.stringify(filters));
  isFilteredApplied?.minimum_seats < 3 &&
    delete isFilteredApplied?.minimum_seats;
  isFilteredApplied?.features?.length < 1 && delete isFilteredApplied?.features;
  isFilteredApplied =
    Object.values(isFilteredApplied).filter(Boolean).length ||
    date.start ||
    date.end ||
    time.start ||
    time.end ||
    isLocation;
  const HandleClearFilter = () => {
    setFilters({
      vehicle_type: null,
      features: [],
      minimum_seats: 2,
      total_price: null,
      less_than_five_years: false,
      gearbox: null,
      engine_type: null,
      brand: null,
    });
    setDisplayPrice(0);
    setDate({start: '', end: ''});
    setTime({start: '', end: ''});
    setLocation('');
    googlePlaceAutoCompleteRef.current?.setAddressText('');
    setClear(false);
  };

  const HandleApplyFilter = () => {
    setClear(true);
  };

  useEffect(() => {
    if (!hasInitializedAutoApply.current) {
      hasInitializedAutoApply.current = true;
      return;
    }

    setApplySearchFilter(prev => prev + 1);
  }, [filters, date, time, location]);

  useEffect(() => {
    if (params?.data?.location) {
      googlePlaceAutoCompleteRef.current?.setAddressText(
        params?.data?.location,
      );
      setLocation(params?.data?.location);
    }
    if (params?.data?.date) {
      setDate({
        start: params?.data?.date?.start,
        end: params?.data?.date?.end,
      });
    }
    if (params?.data?.time) {
      setTime({
        start: params?.data?.time?.start,
        end: params?.data?.time?.end,
      });
    }
    setClear(true);
    if (!params?.data?.location && !params?.data?.date) {
      setClear(false);
    }
  }, [params?.data?.location, params?.data?.date, params?.data?.time]);

  const ListEmptyComponent = () =>
    !getUserCarsLoading && (
      <EmptyScreen
        image={IMAGES.carIcon}
        title={t('noCarsFoundMessage')}
        btnOnPress={() => {}}
        imageContainerStyle={{
          marginTop: widthPercentageToDP(10),
        }}
      />
    );


  return (
    <CustomWrapper padding backgroundColor={COLORS.white} bottomInsert={-1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View
          style={{
            minHeight: widthPercentageToDP(14),
          }}>
          <GooglePlacesInput
            inputRef={googlePlaceAutoCompleteRef}
            value={location}
            setAddress={e => {
              console.log({e});
              setLocation(e);
            }}
          />
        </View>
        <CalendarTimePicker
          calenderBottomSheetRef={calenderBottomSheetRef}
          handleContinue={HandleContinue}
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />
        <Filters
          HandleClearFilter={HandleClearFilter}
          HandleApplyFilter={HandleApplyFilter}
          filters={filters}
          setFilters={setFilters}
          displayPrice={displayPrice}
          setDisplayPrice={setDisplayPrice}
        />
        {!!isFilteredApplied && (
          <Row justifyContent="space-between">
            <CustomText
              text={t('clearFiltersX')}
              fontWeightInter="600"
              fontSize="S12"
              textStyle={styles.clearFilter}
              onPress={HandleClearFilter}
            />
            <CustomText
              text={t('applyFilters')}
              fontWeightPopins="600"
              fontSize="S12"
              textStyle={styles.applyFilter}
              onPress={HandleApplyFilter}
            />
          </Row>
        )}
        {getUserCarsLoading ? (
          <View style={styles.loaderContainer}>
            <View style={{}}>
              {[1, 2, 3]?.map(i => (
                <View key={i} style={{paddingVertical: RFValue(4)}}>
                  <SearchScreenSkeleton />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            data={data}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => {
              return (
                <SearchListItem
                  {...item}
                  getUserCarsLoading={getUserCarsLoading}
                />
              );
            }}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
  },

  loaderContainer: {
    // minHeight: widthPercentageToDP(52),
    // justifyContent: 'center',
  },
  clearFilter: {
    marginTop: widthPercentageToDP(4),
    marginBottom: widthPercentageToDP(1),
  },
  applyFilter: {
    marginTop: widthPercentageToDP(4),
    marginBottom: widthPercentageToDP(1),
  },
});

export default SearchListingScreen;
