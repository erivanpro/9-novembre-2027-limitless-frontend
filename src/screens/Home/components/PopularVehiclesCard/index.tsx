import React, { FC } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { CustomImage, CustomText } from '../../../../components';
import { PopularVehiclesCardProps } from './interface';
import { COLORS, FONT, IMAGES } from '../../../../utils/theme';
import { navigate } from '../../../../utils/navigation';
import SkeletonLoading from 'react-native-skeleton-loading';
import HomeScreenSkeleton from '../../../../components/Skeleton/HomeScreenSkeleton';
import { useTranslation } from 'react-i18next';
const PopularVehiclesCard: FC<PopularVehiclesCardProps> = ({
  id,
  name,
  images,
  transmission_type,
  price_per_day = 0,
  price_per_hour = 0,
  getUserCarsLoading,
  // getUserCarsLoading ?
}) => {
  const { t } = useTranslation();
  // console.log({getUserCarsLoading});
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('UserCarDetails', { id })}
    >
      <View style={{ height: widthPercentageToDP(25) }}>
        <CustomImage
          source={{ uri: images?.[0] }}
          width={'100%'}
          height={widthPercentageToDP(25)}
          resizeMode="cover"
        />
      </View>
      <View style={styles.footerContainer}>
        <CustomText text={name} numberOfLines={1} textStyle={styles.title} />
        <View style={styles.transmissionContainer}>
          <CustomImage
            source={IMAGES.transmission}
            width={widthPercentageToDP(5)}
            height={widthPercentageToDP(5)}
            containerStyle={styles.transmissionIcon}
          />
          <CustomText
            numberOfLines={1}
            text={transmission_type}
            color={COLORS.neutral400}
            fontWeightInter="500"
            fontSize="S8"
            textStyle={{ width: RFValue(128) }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.rateContainer}>
          <CustomText
            text={`${price_per_day}€ ${t('perDay')}`}
            fontWeightPopins="600"
            fontSize="S12"
          />
        </View>
        <View style={styles.rateContainer}>
          <CustomText
            text={`${price_per_hour}€ ${t('perHour')}`}
            fontWeightPopins="600"
            fontSize="S12"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularVehiclesCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(10),
    justifyContent: 'center',
    width: widthPercentageToDP(45),
    paddingBottom: widthPercentageToDP(3),
    overflow: 'hidden',
  },

  footerContainer: {
    paddingHorizontal: widthPercentageToDP(2),
  },
  footerCtaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONT.poppins600,
    fontSize: RFValue(14),
    paddingVertical: widthPercentageToDP(0.8),
  },
  transmissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transmissionIcon: {
    marginRight: widthPercentageToDP(2),
  },
  transmission: {},
  divider: {
    height: 1,
    backgroundColor: COLORS.neutral100,
    marginTop: widthPercentageToDP(3),
    marginBottom: widthPercentageToDP(1.5),
  },
  rateContainer: {
    paddingVertical: widthPercentageToDP(Platform.OS === 'ios' ? 0.5 : 0),
  },
});
