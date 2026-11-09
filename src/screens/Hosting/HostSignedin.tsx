import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomImage, CustomText, CustomWrapper} from '../../components';
import {COLORS, FONT, IMAGES} from '../../utils/theme';
import EmptyScreen from '../../components/EmptyScreen';
import CarItem from './components/CarItem';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/navigation';
import {useHostCar} from '../../hooks/useHostCar';
import SearchScreenSkeleton from '../../components/Skeleton/SearchScreenSkeleton';
import {useTranslate} from '../../hooks/useTranslate';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HostSignedin = () => {
  const {getHostCars, getHostCarsLoading} = useHostCar();
  const {t} = useTranslate();
  const {bottom: safeBottomInset} = useSafeAreaInsets();
  const tabBarBottomOffset = safeBottomInset + heightPercentageToDP(2);
  const tabBarHeight = heightPercentageToDP(8);
  const plusIconBottom =
    tabBarBottomOffset + tabBarHeight + heightPercentageToDP(1.5);
  let data = getHostCars?.data?.pages[0]?.data?.cars;
  const ListEmptyComponent = () =>
    !getHostCarsLoading && (
      <EmptyScreen
        image={IMAGES.addCarIcon}
        title={t('emptyOrdersForMyCars')}
        btnOnPress={() => {}}
        imageContainerStyle={{
          height: widthPercentageToDP(30),
        }}
      />
    );
  return (
    <CustomWrapper padding bottomInsert={0.1} backgroundColor={COLORS.white}>
      <CustomText text={t('manageMyCar')} textStyle={styles.title} />

      {getHostCarsLoading ? (
        <View style={styles.loaderContainer}>
          <View style={{paddingVertical: RFValue(0)}}>
            {[1, 2, 3]?.map(i => (
              <View key={i}>
                <SearchScreenSkeleton />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!data?.length}
          contentContainerStyle={
            data?.length
              ? styles.contentContainerStyle
              : styles.contentContainerEmptyStyle
          }
          data={data}
          renderItem={({item}) => (
            <CarItem {...item} getHostCarsLoading={getHostCarsLoading} />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      <CustomImage
        source={IMAGES.plusRoundIcon}
        containerStyle={[styles.plusRoundIcon, {bottom: plusIconBottom}]}
        onPressImage={() => navigate('PublishCar', {})}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  contentContainerEmptyStyle: {
    paddingBottom: widthPercentageToDP(30),
    flex: 1,
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
  },
  plusRoundIcon: {
    position: 'absolute',
    right: widthPercentageToDP(1),
    height: widthPercentageToDP(22),
    width: widthPercentageToDP(22),
    zIndex: 20,
    elevation: 20,
  },
  loaderContainer: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
});

export default HostSignedin;
