import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {SearchListItemProps} from './interface';
import {
  CustomIcon,
  CustomImage,
  CustomStarRating,
  CustomText,
  HostBadge,
} from '../../../components';
import {COLORS, FONT} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {dayjs, formatDate} from '../../../utils/dayjs';
import {navigate} from '../../../utils/navigation';
import SearchScreenSkeleton from '../../../components/Skeleton/SearchScreenSkeleton';
import useTranslate from '../../../hooks/useTranslate';

const SearchListItem: FC<SearchListItemProps> = ({
  id,
  name,
  images,
  price_per_day,
  price_per_hour,
  available_start_date_time,
  available_end_date_time,
  host,
  stars,
  onClose,
  isButton = false,
  isMap = false,
  getUserCarsLoading = true,
}) => {
  const {t} = useTranslate();
  return getUserCarsLoading && !isMap ? (
    <View style={{paddingVertical: RFValue(10)}}>
      <SearchScreenSkeleton />
    </View>
  ) : (
    // </View>
    <TouchableOpacity style={isMap ? styles.mapContainer : styles.container}>
      {isButton && (
        <Pressable style={{alignSelf: 'center'}} onPress={onClose}>
          <CustomIcon type="AntDesign" icon="down" />
        </Pressable>
      )}
      <TouchableOpacity onPress={() => navigate('UserCarDetails', {id: id})}>
        <CustomImage
          source={{uri: images?.[0]}}
          containerStyle={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            paddingHorizontal: widthPercentageToDP(2),
            paddingVertical: widthPercentageToDP(2),
          }}>
          <View style={styles.priceContainer}>
            <HostBadge
              name={host?.full_name || ''}
              location={host?.address}
              picture={host?.profile_picture}
            />
            <View style={styles.ratingContainer}>
              <CustomStarRating rating={Number(host?.stars)} />

              <CustomText
                text={` ${
                  isNaN(host?.stars as number) ? 0 : Number(host?.stars)
                }`}
                textStyle={styles.price}
              />
            </View>
          </View>
          <View style={[styles.priceContainer, styles.dateContainer]}>
            <CustomText
              text={`${dayjs(available_start_date_time).format(
                'DD MMM',
              )} - ${dayjs(available_end_date_time).format('DD MMM')}`}
              textStyle={styles.date}
            />
            <CustomText text={name} textStyle={styles.date} />
          </View>
          <View style={styles.priceContainer}>
            <CustomText
              text={`${price_per_day}€  ${t('perDay')}`}
              textStyle={styles.price}
            />
            <CustomText
              text={`${price_per_hour}€  ${t('perHour')}`}
              textStyle={styles.price}
            />
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(5),
    borderWidth: 0.8,
    borderColor: COLORS.neutral100,
    overflow: 'hidden',
  },

  mapContainer: {
    backgroundColor: COLORS.neutral50,
    marginVertical: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(5),
    borderWidth: 0.8,
    borderColor: COLORS.neutral100,
    overflow: 'hidden',
  },
  image: {
    // width: widthPercentageToDP(100),
    height: widthPercentageToDP(36),
    // marginVertical: widthPercentageToDP(3),
    borderTopLeftRadius: widthPercentageToDP(2),
    borderTopRightRadius: widthPercentageToDP(2),

    // borderRadius: widthPercentageToDP(6),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP(1),
    // width: widthPercentageToDP(80),
  },
  dateContainer: {
    paddingBottom: widthPercentageToDP(2),
  },
  name: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(16),
  },
  price: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(12),
    // backgroundColor: COLORS.neutral50,
  },
  date: {
    fontFamily: FONT.inter500,
    fontWeight: '500',
    fontSize: RFValue(12),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starStyle: {
    marginHorizontal: widthPercentageToDP(0),
  },
});
