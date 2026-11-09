import {Platform, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../utils/theme';
import {CustomText} from '../CustomText';
import CustomImage from '../CustomImage';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useTranslate from '../../hooks/useTranslate';

const CarDetailInfoCard: FC<any> = ({item, index, data}) => {
  const {key, value, icon} = item;
  console.log({ value, key })
  const { t } = useTranslate()
  return (
    <View key={index} style={[styles.container]}>
      <CustomImage source={icon} style={styles.icon} />

      <CustomText text={key} textStyle={styles.text} />
      {key == t('color') ? (
        <View
          style={{
            height: 15,
            width: 25,
            borderRadius: 5,
            backgroundColor: value,
            top: 3,
          }}></View>
      ) : (
        <CustomText
          text={value}
          numberOfLines={1}
          textStyle={[styles.description]}
        />
      )}
    </View>
  );
};

export default React.memo(CarDetailInfoCard);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(6),
    borderColor: COLORS.neutral100,
    borderWidth: 1,
    borderRadius: RFValue(10),
    width: '31%',
    marginVertical: RFValue(3),
    marginHorizontal: '1%',

  },
  icon: {
    width: RFValue(20),
    height: RFValue(20),
  },
  text: {
    fontFamily: FONT.inter500,
    fontWeight: '500',
    fontSize: RFValue(Platform.OS === 'android' ? 9 : 7),
    color: COLORS.neutral400,
    paddingTop: RFValue(10),
  },
  description: {
    fontFamily: FONT.poppins600,
    fontSize: RFValue(10),
    color: COLORS.black,
    paddingVertical: RFValue(2),
  },
  skeleton: {
    width: RFValue(30),
    height: RFValue(20),
    backgroundColor: COLORS.neutral100,
  },
});
