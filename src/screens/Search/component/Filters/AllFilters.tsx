import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  CustomHeader,
  CustomIcon,
  CustomRadioButtonGroup,
  CustomSlider,
  CustomText,
  RoundedBadge,
  Row,
} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  BRANDS,
  CAR_FEATURES,
  ENGINE_TYPES,
  GEAR_BOX,
  VEHICLE_TYPES,
} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import RecentCarsOnly from '../RecentCarsOnly';
import useTranslate from '../../../../hooks/useTranslate';
import {ScrollView} from 'react-native-gesture-handler';

interface AllFiltersProps {
  onBack: () => void;
  filters: any;
  setFilters: (e: Object) => void;
}

const AllFilters: FC<AllFiltersProps> = ({
  onBack,
  filters,
  setFilters,
  displayPrice,
  setDisplayPrice,
}) => {
  const {t} = useTranslate();
  const HandlePressFeatures = (value: string) => {
    let features = filters?.features?.length ? [...filters?.features] : [];
    if (features.includes(value)) {
      features = features.filter((item: string) => item !== value);
    } else {
      features.push(value);
    }
    setFilters({...filters, features});
  };

  const HandlePressBrands = (value: string) => {
    let brand = filters?.brand?.length ? [...filters?.brand] : [];
    if (brand.includes(value)) {
      brand = brand.filter((item: string) => item !== value);
    } else {
      brand.push(value);
    }
    setFilters({...filters, brand});
  };

  // console.log({filters});

  return (
    <View style={styles.container}>
      <CustomHeader title={t('allFilters')} handleBackPress={onBack} />
      <View style={{flex: 1, marginBottom: widthPercentageToDP(5)}}>
        {/* <ScrollView
          contentContainerStyle={{
            backgroundColor: 'blue',
            paddingBottom: widthPercentageToDP(15),
          }}
          showsVerticalScrollIndicator={false}> */}
        <CustomText
          text={t('vehicleType')}
          fontWeightPopins="600"
          textStyle={styles.vehicleHeading}
        />
        <FlatList
          data={VEHICLE_TYPES}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `feature-${item}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              title={t(item?.label)}
              backgroundColor={COLORS.white as keyof typeof COLORS}
              translatedValue={item?.value}
              activeBadge={filters?.vehicle_type}
              onPress={() =>
                setFilters((prev: Object) => ({
                  ...prev,
                  vehicle_type: item?.value,
                }))
              }
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
        <CustomText
          text={t('features')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <FlatList
          data={CAR_FEATURES}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `feature-${item}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              isMultiSelect
              title={t(item?.label)}
              translatedValue={item?.value}
              backgroundColor={COLORS.white as keyof typeof COLORS}
              activeBadges={filters?.features}
              onPress={HandlePressFeatures}
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
        <CustomText
          text={t('numberOfSeats')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <Row justifyContent="space-between">
          <CustomText
            text={t('minimumSeats')}
            fontWeightInter="500"
            fontSize="S12"
          />
          <Row>
            <View
              style={[
                styles.minSeatBtnContainer,
                filters?.minimum_seats < 3 && {
                  backgroundColor: COLORS.neutral100,
                },
              ]}>
              <CustomIcon
                icon="minus"
                type="AntDesign"
                size={RFValue(15)}
                color={COLORS.black}
                onPress={() =>
                  setFilters(prev => ({
                    ...prev,
                    minimum_seats:
                      prev?.minimum_seats > 3 ? prev?.minimum_seats - 1 : 2,
                  }))
                }
              />
            </View>
            <CustomText
              text={`${filters?.minimum_seats || 0}`}
              fontWeightInter="600"
              fontSize="S12"
              center
              textStyle={{minWidth: RFValue(15)}}
            />
            <View
              style={[
                styles.minSeatBtnContainer,
                filters?.minimum_seats == 20 && {
                  backgroundColor: COLORS.neutral100,
                },
              ]}>
              <CustomIcon
                icon="plus"
                type="AntDesign"
                size={RFValue(15)}
                color={COLORS.black}
                onPress={() =>
                  setFilters(prev => {
                    return {
                      ...prev,
                      minimum_seats:
                        prev?.minimum_seats === 20
                          ? prev?.minimum_seats
                          : prev?.minimum_seats
                          ? prev?.minimum_seats + 1
                          : 2,
                    };
                  })
                }
              />
            </View>
          </Row>
        </Row>
        <CustomText
          text={t('totalPrice')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomText
          text={`${t('lessThan')} €${displayPrice || 0}`}
          fontWeightInter="600"
          textStyle={styles.sliderText}
        />
        <CustomSlider
          setValue={price =>
            setFilters(prev => ({...prev, total_price: price}))
          }
          value={filters?.total_price}
          displayPrice={displayPrice}
          setDisplayPrice={setDisplayPrice}
        />
        <RecentCarsOnly
          active={filters?.less_than_five_years || false}
          setActive={recentCarsOnly => {
            setFilters(prev => ({
              ...prev,
              less_than_five_years: recentCarsOnly,
            }));
          }}
        />
        <CustomText
          text={t('transmissionType')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomRadioButtonGroup
          options={GEAR_BOX}
          containerStyle={styles.engineContainer}
          setSelectedValue={gearBox =>
            setFilters(prev => ({...prev, gearbox: gearBox}))
          }
          selectedValue={filters?.gearbox}
        />
        <CustomText
          text={t('engine')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomRadioButtonGroup
          options={ENGINE_TYPES}
          containerStyle={styles.engineContainer}
          setSelectedValue={engineType =>
            setFilters(prev => ({...prev, engine_type: engineType}))
          }
          selectedValue={filters?.engine_type}
        />
        <CustomText
          text={t('brand')}
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <FlatList
          data={BRANDS}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `brand-${item}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              isMultiSelect
              title={item?.value}
              translatedValue={item?.value}
              backgroundColor={COLORS.white as keyof typeof COLORS}
              activeBadges={filters?.brand}
              onPress={HandlePressBrands}
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default AllFilters;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),

    flex: 1,
    // backgroundColor: 'red',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: widthPercentageToDP(2),
  },
  vehicleHeading: {
    marginTop: widthPercentageToDP(2),
  },
  featureHeading: {
    marginTop: widthPercentageToDP(5),
  },
  SVcontentContainerStyle: {
    paddingBottom: widthPercentageToDP(15),
    flexGrow: 1,
  },
  sliderText: {
    marginTop: widthPercentageToDP(2),
    fontSize: RFValue(12),
  },
  engineContainer: {flexDirection: 'column', gap: 10},
  minSeatBtnContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: RFValue(30),
    height: RFValue(30),
    padding: RFValue(5),
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.neutral100,
  },
});
