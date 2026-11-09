import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import SectionHeading from '../SectionHeading';
import PopularVehiclesCard from '../PopularVehiclesCard';
import {COLORS, IMAGES} from '../../../../utils/theme';
import {RoundedBadge} from '../../../../components';
import {useUserCar} from '../../../../hooks/useUserCar';
import EmptyScreen from '../../../../components/EmptyScreen';
import {VEHICLE_TYPES} from '../../../../utils/constants';
import useUserStore from '../../../../service/store/user.store';
import {useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import HomeScreenSkeleton from '../../../../components/Skeleton/HomeScreenSkeleton';
import useTranslate from '../../../../hooks/useTranslate';

const PopularVehicles = () => {
  const {t} = useTranslate();
  const [activeBadge, setActiveBadge] = React.useState('All');
  const [applyFilter, setApplyFilter] = React.useState(false);

  const {getUserCars, getUserCarsLoading} = useUserCar({
    vehicle_type: activeBadge === 'All' ? undefined : activeBadge,
    applyFilter: applyFilter,
  });

const data = getUserCars.data?.pages[0]?.data?.cars;

const isFocused = useIsFocused();

useEffect(() => {
  setApplyFilter(prev => !prev);
}, [isFocused]);
const ListEmptyComponent = () =>
  !getUserCarsLoading && (
    <View style={styles.emptyScreenContainer}>
      <EmptyScreen
        image={IMAGES.carIcon}
        title={t('noPopularVehicle')}
        btnOnPress={() => {}}
        flex={1}
        imageContainerStyle={styles.emptyImageContainerStyle}
      />
    </View>
  );

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};
return (
  <View style={{marginTop:10}}>
    <SectionHeading heading={t('popularVehicles')} />
    <>
      <View style={styles.popularBadgeContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={VEHICLE_TYPES}
          renderItem={({item}) => (
            <RoundedBadge
              title={t(item?.label as any)}
              activeBadge={activeBadge}
              translatedValue={item?.value}
              setActiveBadge={active => {
                setApplyFilter(prev => !prev);
                setActiveBadge(item?.value);
              }}
            />
          )}
          ItemSeparatorComponent={() => ItemSeparatorComponent()}
        />
      </View>
      {getUserCarsLoading ? (
        <View style={styles.loaderContainer}>
          <View style={{flexDirection: 'row', gap: RFValue(3)}}>
            {[1, 2, 3]?.map(i => (
              <View key={i} style={{paddingVertical: RFValue(4)}}>
                <HomeScreenSkeleton />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <PopularVehiclesCard
              {...item}
              getUserCarsLoading={getUserCarsLoading}
            />
          )}
          ItemSeparatorComponent={() => ItemSeparatorComponent()}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </>
  </View>
);
};

export default PopularVehicles;

const styles = StyleSheet.create({
  separator: {width: widthPercentageToDP(2.5)},
  popularBadgeContainer: {
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(6),
  },
  emptyScreenContainer: {
    width: widthPercentageToDP(95),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
  emptyImageContainerStyle: {
    marginBottom: widthPercentageToDP(-4),
  },
});
