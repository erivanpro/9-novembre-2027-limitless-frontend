import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {dayjs, formatDate} from '../../utils/dayjs';
import {FONT, COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import Row from '../Row';
import useTranslate from '../../hooks/useTranslate';

const CarExtraDetailsSection = ({data}: any) => {
  const {
    available_start_date_time,
    available_end_date_time,
    pickup_address,
    dropoff_address,
    insurance_included,
    pet_policy,
    smoking_policy,
  } = data || {};

  const {t} = useTranslate();
  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <CustomText
            text={t('availability')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={`${dayjs(available_start_date_time).format(
              'DD/MM/YYYY, hh:mm A',
            )} - ${dayjs(available_end_date_time).format(
              'DD/MM/YYYY, hh:mm A',
            )}`}
            textStyle={styles.twoColumnDesciption}
          />
        </View>
        <View style={styles.column}>
          <CustomText
            text={t('pickupLocation')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={pickup_address}
            textStyle={styles.twoColumnDesciption}
          />
        </View>
      </Row>
      <Row justifyContent="space-between" style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <CustomText
            text={t('dropOffLocation')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={dropoff_address}
            style={styles.twoColumnDesciption}
          />
        </View>
        <View style={styles.column}>
          <CustomText
            text={t('insuranceIncluded')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={insurance_included ? t('yes') : t('no')}
            textStyle={styles.twoColumnDesciption}
          />
        </View>
      </Row>

      <Row justifyContent="space-between" style={styles.twoColumnContainer}>
        <View style={styles.column}>
          <CustomText
            text={t('petPolicy')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={pet_policy ? t('allowed') : t('notAllowed')}
            textStyle={styles.twoColumnDesciption}
          />
        </View>
        <View style={styles.column}>
          <CustomText
            text={t('smokingPolicy')}
            textStyle={styles.twoColumnHeading}
          />
          <CustomText
            text={smoking_policy ? t('allowed') : t('notAllowed')}
            textStyle={styles.twoColumnDesciption}
          />
        </View>
      </Row>
    </View>
  );
};

export default CarExtraDetailsSection;

const styles = StyleSheet.create({
  container: {paddingVertical: widthPercentageToDP(4)},
  column: {
    minWidth: widthPercentageToDP(40),
    maxWidth: widthPercentageToDP(45),
    alignSelf: 'flex-start',
  },
  twoColumnHeading: {
    fontSize: RFValue(12),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    paddingVertical: widthPercentageToDP(1),
  },
  twoColumnDesciption: {
    fontFamily: FONT.inter500,
    fontWeight: '500',
    fontSize: RFValue(12),
    color: COLORS.neutral400,
  },
  twoColumnContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral100,
    paddingVertical: widthPercentageToDP(2),
    minWidth: widthPercentageToDP(50),
  },
});
