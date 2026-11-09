import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {CompletedOrderCardProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../CustomText';
import {COLORS, IMAGES} from '../../utils/theme';
import {formatDate} from '../../utils/dayjs';
import Row from '../Row';
import CustomStarRating from '../CustomStarRating';
import CustomImage from '../CustomImage';
import {formatStars} from '../../utils/helper';
import useTranslate from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const CompletedOrderCard: FC<CompletedOrderCardProps> = ({
  host,
  user,
  booking,
  images,
  handlePress,
}) => {
  const {t} = useTranslate();
  const accentColor = useAppAccentColor();
  const profile_picture = user?.profile_picture || host?.profile_picture;
  const full_name = user?.full_name || host?.full_name;
  const hasMultipleImages = (images?.length || 0) > 1;
  const carImageSource = images?.[0]
    ? {uri: images[0]}
    : IMAGES.carPlaceholderImage;
  const profilePictureSource = profile_picture
    ? typeof profile_picture === 'string'
      ? {uri: profile_picture}
      : profile_picture
    : IMAGES.emptyProfile;
  const startDate = booking?.start_date_time
    ? formatDate(booking.start_date_time, 'DD MMM')
    : '--';
  const endDate = booking?.end_date_time
    ? formatDate(booking.end_date_time, 'DD MMM')
    : startDate;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={handlePress}>
      <Row justifyContent="space-between" style={styles.topRow}>
        <View style={styles.carImageWrapper}>
          <CustomImage
            source={carImageSource}
            width={widthPercentageToDP(31)}
            height={widthPercentageToDP(18)}
            resizeMode="cover"
            containerStyle={styles.carImgContainer}
            style={styles.carImg}
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
        </View>
        <View style={styles.topRight}>
          <CustomText
            text="Total"
            fontWeightInter="500"
            fontSize="S10"
            color={COLORS.neutral600}
          />
          <CustomText
            text={`€${booking?.amount ?? 0}`}
            fontWeightInter="600"
            fontSize="S20"
            color={accentColor}
          />
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: accentColor, borderColor: accentColor},
            ]}>
            <CustomText
              text={t('completed')}
              fontWeightInter="500"
              fontSize="S10"
              color={COLORS.white}
            />
          </View>
        </View>
      </Row>
      <Row style={styles.dateContainer}>
        <View style={styles.dateChip}>
          <CustomText
            text={startDate}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral800}
          />
        </View>
        <View style={styles.dateGap} />
        <View style={styles.dateChip}>
          <CustomText
            text={endDate}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral800}
          />
        </View>
      </Row>
      <Row justifyContent="space-between" style={styles.bottomRow}>
        <Row style={styles.userRow}>
          <CustomImage
            source={profilePictureSource}
            width={RFValue(24)}
            height={RFValue(24)}
            containerStyle={styles.profilePic}
            resizeMode="cover"
          />
          <CustomText
            numberOfLines={1}
            text={full_name || '--'}
            fontWeightInter="600"
            fontSize="S12"
            textStyle={styles.nameText}
            color={COLORS.neutral900}
          />
        </Row>
        <Row style={styles.ratingRow}>
          <CustomStarRating
            rating={Number(booking?.stars)}
            enableHalfStar={false}
            starSize={RFValue(12)}
          />
          <CustomText
            text={` ${formatStars(booking?.stars)}`}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral800}
          />
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default CompletedOrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: widthPercentageToDP(1.5),
    borderRadius: RFValue(16),
    paddingHorizontal: widthPercentageToDP(3.2),
    paddingVertical: widthPercentageToDP(3.2),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 7,
    elevation: 2,
  },
  topRow: {
    marginBottom: widthPercentageToDP(2),
    alignItems: 'center',
  },
  carImageWrapper: {
    position: 'relative',
  },
  carImgContainer: {
    borderRadius: RFValue(12),
    backgroundColor: 'rgba(51,187,120,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.32)',
  },
  carImg: {
    borderRadius: RFValue(12),
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
  topRight: {
    flex: 1,
    marginLeft: widthPercentageToDP(3),
    alignItems: 'flex-end',
  },
  statusBadge: {
    marginTop: widthPercentageToDP(1),
    borderWidth: 1,
    borderRadius: RFValue(99),
    paddingHorizontal: widthPercentageToDP(2.4),
    paddingVertical: widthPercentageToDP(0.8),
  },
  dateContainer: {
    marginBottom: widthPercentageToDP(2.2),
  },
  dateChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: widthPercentageToDP(1.5),
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: 'rgba(174, 184, 179, 0.28)',
    backgroundColor: COLORS.white,
  },
  dateGap: {
    width: widthPercentageToDP(2),
  },
  bottomRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(51,187,120,0.2)',
    paddingTop: widthPercentageToDP(2.2),
  },
  userRow: {
    flex: 1,
    marginRight: widthPercentageToDP(2),
  },
  profilePic: {
    borderRadius: RFValue(14),
    marginRight: widthPercentageToDP(2),
    backgroundColor: COLORS.neutral100,
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.22)',
  },
  nameText: {
    maxWidth: RFValue(135),
  },
  ratingRow: {
    paddingHorizontal: widthPercentageToDP(2.2),
    paddingVertical: widthPercentageToDP(1),
    borderRadius: RFValue(100),
    borderWidth: 1,
    borderColor: 'rgba(51,187,120,0.3)',
    backgroundColor: 'rgba(51,187,120,0.1)',
  },
});
