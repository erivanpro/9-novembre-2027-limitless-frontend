import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {CarItemProps} from './interface';
import {CustomImage, CustomText} from '../../../components';
import {COLORS, FONT, IMAGES, SHADOWS} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../../utils/navigation';
import useTranslate from '../../../hooks/useTranslate';

const CarItem: FC<CarItemProps> = ({
  id,
  name,
  images,
  price_per_day,
  price_per_hour,
}) => {
  const {t} = useTranslate();
  const imageSource = images?.[0]
    ? {uri: images[0]}
    : IMAGES.carPlaceholderImage;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => navigate('CarDetails', {id})}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={imageSource}
          containerStyle={styles.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <CustomText text={name} textStyle={styles.name} numberOfLines={2} />
        <View style={styles.priceContainer}>
          <View style={styles.priceTag}>
            <CustomText text={`${price_per_day}€`} textStyle={styles.price} />
            <CustomText text={t('perDay')} textStyle={styles.priceLabel} />
          </View>
          <View style={styles.priceTag}>
            <CustomText text={`${price_per_hour}€`} textStyle={styles.price} />
            <CustomText text={t('perHour')} textStyle={styles.priceLabel} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: widthPercentageToDP(1.4),
    borderRadius: widthPercentageToDP(4),
    borderWidth: 1,
    borderColor: COLORS.neutral100,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  imageContainer: {
    width: '100%',
    height: widthPercentageToDP(40),
    backgroundColor: COLORS.neutral50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: widthPercentageToDP(2.8),
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(2.3),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: widthPercentageToDP(1.5),
    gap: widthPercentageToDP(1.6),
  },
  priceTag: {
    flex: 1,
    backgroundColor: COLORS.neutral50,
    borderRadius: widthPercentageToDP(2),
    paddingVertical: widthPercentageToDP(1.2),
    paddingHorizontal: widthPercentageToDP(1.8),
    alignItems: 'center',
  },
  name: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(13),
    lineHeight: RFValue(18),
  },
  price: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(12),
  },
  priceLabel: {
    fontFamily: FONT.poppinsRegular,
    color: COLORS.neutral600,
    fontSize: RFValue(10),
  },
});
