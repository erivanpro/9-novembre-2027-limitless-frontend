import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {OrderCardProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../CustomText';
import CustomImage from '../CustomImage';
import {COLORS, IMAGES} from '../../utils/theme';
import {formatDate} from '../../utils/dayjs';
import useTranslate from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const OrderCard: FC<OrderCardProps> = ({
  name,
  images,
  price_per_day,
  price_per_hour,
  host,
  booking,
  user,
  handlePress,
}) => {
  const {t} = useTranslate();
  const accentColor = useAppAccentColor();
  const host_full_name = host?.full_name || user?.full_name || '';
  const address = host?.address || user?.address || '';
  const profile_picture = host?.profile_picture || user?.profile_picture;
  const carImageSource = images?.[0]
    ? {uri: images[0]}
    : IMAGES.carPlaceholderImage;
  const hasMultipleImages = (images?.length || 0) > 1;
  const profilePictureSource = profile_picture
    ? typeof profile_picture === 'string'
      ? {uri: profile_picture}
      : profile_picture
    : IMAGES.emptyProfile;
  const bookingStartDate = booking?.start_date_time
    ? formatDate(booking.start_date_time, 'DD MMM')
    : '--';
  const bookingEndDate = booking?.end_date_time
    ? formatDate(booking.end_date_time, 'DD MMM')
    : '--';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={handlePress}>
      <View style={styles.imageWrapper}>
        <CustomImage
          source={carImageSource}
          width="100%"
          height={widthPercentageToDP(40)}
          containerStyle={styles.image}
          resizeMode="cover"
        />
        {hasMultipleImages && (
          <View style={[styles.imageCountBadge, {backgroundColor: accentColor}]}>
            <CustomText
              text={`+${images.length - 1}`}
              fontWeightInter="600"
              fontSize="S10"
              color={COLORS.white}
            />
          </View>
        )}
        <View style={[styles.amountBadge, {backgroundColor: accentColor}]}>
          <CustomText
            text={`€${booking?.amount ?? 0}`}
            fontWeightInter="600"
            fontSize="S14"
            color={COLORS.white}
          />
        </View>
      </View>

      <View style={styles.contentSection}>
        <CustomText
          text={name || '--'}
          fontWeightInter="600"
          fontSize="S14"
          color={COLORS.neutral900}
          numberOfLines={1}
        />
        <View style={styles.datePill}>
          <CustomText
            text={`${bookingStartDate} - ${bookingEndDate}`}
            textStyle={styles.dateText}
          />
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceChip}>
            <CustomText
              text={`${price_per_day}€ ${t('perDay')}`}
              textStyle={styles.chipText}
              numberOfLines={1}
            />
          </View>
          <View style={styles.priceChip}>
            <CustomText
              text={`${price_per_hour}€ ${t('perHour')}`}
              textStyle={styles.chipText}
              numberOfLines={1}
            />
          </View>
        </View>

        <View style={styles.hostRow}>
          <CustomImage
            source={profilePictureSource}
            width={widthPercentageToDP(9)}
            height={widthPercentageToDP(9)}
            containerStyle={styles.hostImage}
            resizeMode="cover"
          />
          <View style={styles.hostMeta}>
            <CustomText
              text={host_full_name || '--'}
              fontWeightInter="600"
              fontSize="S12"
              color={COLORS.neutral900}
              numberOfLines={1}
            />
            <CustomText
              text={address || '--'}
              fontWeightInter="500"
              fontSize="S10"
              color={COLORS.neutral600}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: widthPercentageToDP(1.2),
    borderRadius: RFValue(18),
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.24)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    backgroundColor: 'rgba(51,187,120,0.12)',
  },
  imageCountBadge: {
    position: 'absolute',
    top: widthPercentageToDP(1.3),
    right: widthPercentageToDP(1.3),
    borderRadius: RFValue(100),
    paddingHorizontal: widthPercentageToDP(1.8),
    paddingVertical: widthPercentageToDP(0.65),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  amountBadge: {
    position: 'absolute',
    bottom: widthPercentageToDP(2),
    right: widthPercentageToDP(2),
    borderRadius: RFValue(100),
    paddingHorizontal: widthPercentageToDP(2.5),
    paddingVertical: widthPercentageToDP(1.2),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  contentSection: {
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(3),
  },
  datePill: {
    marginTop: widthPercentageToDP(1.4),
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(51,187,120,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.28)',
    borderRadius: RFValue(100),
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(1),
  },
  dateText: {
    color: COLORS.darkGreen,
    fontWeight: '500',
    fontSize: RFValue(10.5),
  },
  priceRow: {
    marginTop: widthPercentageToDP(2),
    flexDirection: 'row',
    gap: widthPercentageToDP(2),
  },
  priceChip: {
    flex: 1,
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: 'rgba(174,184,179,0.3)',
    backgroundColor: COLORS.white,
    paddingVertical: widthPercentageToDP(1.4),
    paddingHorizontal: widthPercentageToDP(2.2),
    alignItems: 'center',
  },
  chipText: {
    fontWeight: '500',
    color: COLORS.neutral800,
    fontSize: RFValue(10.5),
  },
  hostRow: {
    marginTop: widthPercentageToDP(2.4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostImage: {
    borderRadius: widthPercentageToDP(4.5),
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.24)',
    backgroundColor: COLORS.neutral100,
    marginRight: widthPercentageToDP(2),
  },
  hostMeta: {
    flex: 1,
  },
});
