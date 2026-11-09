import React, {FC, useEffect} from 'react';

import {FlatList, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomImage,
  CustomText,
  InputLabelRow,
} from '../../components';
import {COLORS, FONT} from '../../utils/theme';
import SummaryItemRow from './components/SummaryItemRow';
import usePublishCarStore from '../../service/store/publishCar.store';
import {PublishCarChildProps} from './interface';
import {useHostCar} from '../../hooks/useHostCar';
import {formatDate} from '../../utils/dayjs';
import useOffsetDate from '../../service/hooks/useOffsetDate';
import useTranslate from '../../hooks/useTranslate';

const SummaryReview: FC<PublishCarChildProps | any> = ({data}) => {
  const {t} = useTranslate();
  const {carInfo, carSpecification, carFeatures} = usePublishCarStore();

  const {encodeTime} = useOffsetDate();
  const {
    images,
    name,
    brand,
    description,
    price_per_day,
    price_per_hour,
    vehicle_type,
    country_of_manufacture,
    city_of_registeration,
  } = carInfo || {};
  const {
    color_code,
    mileage,
    engine_type,
    transmission_type,
    fuel_economy,
    available_start_date,
    available_end_date,
    available_start_time,
    available_end_time,
    pickup_address,
    dropoff_address,
  } = carSpecification || ({} as any);
  const {
    features,
    maximum_passengers,
    luggage_capacity,
    insurance_included,
    pet_policy,
    smoking_policy,
  } = carFeatures || ({} as any);
  const {publishCar, publishCarLoading, updateCar, updateCarLoading} =
    useHostCar();
  const handleSubmit = () => {
    if (data?.car?.id) {
      updateCar({
        id: data?.car?.id,
        carDetails: {
          ...carInfo,
          ...carSpecification,
          ...carFeatures,
        },
        images: carInfo?.images,
        encodeTime,
      });
      return;
    }
    carSpecification;
    publishCar({
      carDetails: {
        ...carInfo,
        ...carSpecification,
        ...carFeatures,
      },
      images: carInfo?.images,
      encodeTime,
    });
  };

  return (
    <View style={{width: widthPercentageToDP(100)}}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomText
          text={t('carInformation')}
          fontWeightPopins="600"
          fontSize="S16"
        />
        <View style={{flex: 1}}>
          <InputLabelRow text={t('carImages')} />
          <FlatList
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(_, index) => index.toString()}
            numColumns={4}
            data={carInfo?.images}
            renderItem={({item}: any) => {
              return (
                <View style={styles.item}>
                  <CustomImage
                    source={{uri: item?.path || item}}
                    style={styles.carImageStyle}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />

          <SummaryItemRow title={t('carName')} value={name || ''} />
          <SummaryItemRow title={t('brand')} value={brand || ''} />
          <SummaryItemRow
            title={t('carDescription')}
            value={description || ''}
          />
          <SummaryItemRow
            title={t('pricePerDay')}
            value={`€${price_per_day}`}
          />
          <SummaryItemRow
            title={t('pricePerHour')}
            value={`€${price_per_hour}`}
          />
          <SummaryItemRow title={t('vehicleType')} value={vehicle_type || ''} />
          <SummaryItemRow
            title={t('countryOfManufacture')}
            value={country_of_manufacture || ''}
          />
          <SummaryItemRow
            title={t('cityOfRegistration')}
            value={city_of_registeration || ''}
          />
          <View style={styles.headingContainer}>
            <CustomText
              text={t('specification')}
              fontWeightPopins="600"
              fontSize="S16"
            />
          </View>
          <SummaryItemRow
            title={t('colorOfCar')}
            value={color_code}
            isColor={true}
          />
          <SummaryItemRow title={t('mileage')} value={`${mileage} miles`} />
          <SummaryItemRow title={t('engineType')} value={engine_type || ''} />
          <SummaryItemRow
            title={t('transmissionType')}
            value={
              transmission_type || ''
              // TRANSMISSION_TYPES?.find(v => v?.value === transmission_type)
              //   ?.label || ''
            }
          />
          <SummaryItemRow
            title={t('fuelEconomy')}
            value={`${fuel_economy} mpg`}
          />
          <SummaryItemRow
            title={t('bookingDates')}
            value={`${formatDate(
              available_start_date,
              'DD MMM YYYY',
            )} ${formatDate(available_start_time, 'hh:mm A')}  - ${formatDate(
              available_end_date,
              'DD MMM YYYY',
            )} ${formatDate(available_end_time, 'hh:mm A')}`}
          />
          <SummaryItemRow
            title={t('dropoffLocation')}
            value={dropoff_address || ''}
          />
          <SummaryItemRow
            title={t('pickupLocation')}
            value={pickup_address || ''}
          />
          <View style={styles.headingContainer}>
            <CustomText
              text={t('featuresAndDetails')}
              fontWeightPopins="600"
              fontSize="S16"
            />
          </View>
          <SummaryItemRow
            title={t('features')}
            value={
              features?.map((feature: string) => t(feature)).join(', ') || 'None'
            }
          />
          <SummaryItemRow
            title={t('maximumPassengers')}
            value={String(maximum_passengers || 1)}
          />
          <SummaryItemRow
            title={t('luggageCapacity')}
            value={String(luggage_capacity)}
          />
          <SummaryItemRow
            title={t('insuranceIncluded')}
            value={insurance_included ? t('yes') : t('no')}
          />
          <SummaryItemRow
            title={t('petPolicy')}
            value={pet_policy ? t('allowed') : t('notAllowed')}
          />
          <SummaryItemRow
            title={t('smokingPolicy')}
            value={smoking_policy ? t('allowed') : t('notAllowed')}
          />
          <CustomButton
            title={t('submitButton')}
            onPress={handleSubmit}
            loading={publishCarLoading || updateCarLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral50,
  },
  container: {
    padding: RFValue(15),
    flex: 1,
  },
  imageUpload: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(100),
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
  contentContainerStyle: {
    paddingBottom: RFValue(100),
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFValue(20),
  },
  clickToUpload: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imageUploadText: {
    color: COLORS.neutral600,
    fontFamily: FONT.poppins600,
    fontWeight: '600',
  },
  contentContainer: {
    paddingVertical: widthPercentageToDP(2),
  },
  item: {
    width: widthPercentageToDP(Platform.OS === 'ios' ? 21.5 : 21),
    height: widthPercentageToDP(Platform.OS === 'ios' ? 20 : 20),

    marginRight: widthPercentageToDP(0.5),
    marginLeft: widthPercentageToDP(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  carImageStyle: {
    width: RFValue(Platform.OS === 'ios' ? 65 : 75),
    height: RFValue(Platform.OS === 'ios' ? 58 : 60),
    borderRadius: RFValue(10),
    marginHorizontal: widthPercentageToDP(Platform.OS === 'ios' ? 1.5 : 0.4),
  },
  headingContainer: {
    marginVertical: widthPercentageToDP(3),
  },
});

export default SummaryReview;
