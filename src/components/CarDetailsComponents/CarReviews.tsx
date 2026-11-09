import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {carReviews} from '../../utils/tempDb';
import {COLORS, FONT} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import Row from '../Row';
import {CarReviewType} from './interface';
import {formatStars, getInitials} from '../../utils/helper';
import {formatDate} from '../../utils/dayjs';
import {useTranslate} from '../../hooks/useTranslate';

interface CarReviewsProps {
  reviews: CarReviewType[];
}

const CarReviews: FC<CarReviewsProps> = ({reviews}) => {
  const {t} = useTranslate();

  return (
    <View style={styles.container}>
      <Row justifyContent="space-between">
        <CustomText text={t('reviews')} fontWeightPopins="600" fontSize="S16" />
        {/* <CustomText
          text={t('seeAll')}
          textStyle={styles.seeAll}
          onPress={() => {}}
        /> */}
      </Row>

      <FlatList
        data={reviews}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
const renderItem = ({item}: any) => {
  return (
    <View>
      <Row justifyContent="space-between" style={styles.nameContainer}>
        <CustomText
          text={getInitials(item?.user?.full_name)}
          fontWeightPopins="500"
        />
        <CustomText
          text={formatDate(item?.createdAt)}
          color={COLORS.neutral500}
          fontSize="S12"
        />
      </Row>
      <Row>
        <CustomIcon
          type="AntDesign"
          icon="star"
          color={COLORS.warning500}
          style={styles.starFilled}
        />
        <CustomText text={`${formatStars(item?.stars)}`} />
      </Row>
      <CustomText
        text={`${item?.review_message}`}
        fontWeightPopins="400"
        fontSize="S10"
        textStyle={styles.reviewContainer}
      />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};
export default CarReviews;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.neutral100,
    borderWidth: 2,
    padding: widthPercentageToDP(3),
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginBottom: widthPercentageToDP(5),
  },
  starFilled: {
    marginRight: widthPercentageToDP(2),
  },
  nameContainer: {
    paddingTop: widthPercentageToDP(3),
    paddingBottom: widthPercentageToDP(2),
  },
  reviewContainer: {
    paddingVertical: widthPercentageToDP(3),
  },
  itemSeparator: {
    height: widthPercentageToDP(0.5),
    backgroundColor: COLORS.neutral100,
  },
  seeAll: {
    textDecorationLine: 'underline',
    color: COLORS.neutral600,
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(12),
  },
});
