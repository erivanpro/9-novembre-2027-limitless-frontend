import React from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  CarAbout,
  CarDescription,
  CarExtraDetailsSection,
  CarFeatures,
  CarReviews,
  CustomHeader,
  CustomImage,
  CustomPopupMenu,
  CustomText,
  CustomWrapper,
  HostBadge,
  Row,
} from '../../components';

import {COLORS, IMAGES} from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/navigation';
import {CarReviewType} from '../../components/CarDetailsComponents/interface';
import useUserStore from '../../service/store/user.store';
import useChatStore from '../../service/store/chat.store';
import {useBooking} from '../../hooks/useBooking';
import {dayjs, formatDate} from '../../utils/dayjs';
import {MenuType} from '../../utils/types/globalType';
import {useTranslate} from '../../hooks/useTranslate';

const UserBookingDetails = () => {
  const {t} = useTranslate();
  const route = useRoute<any>();
  const {id, showCancelBtn} = route.params || {};

  const {userDetails} = useUserStore();

  const {getUserBookingById, getUserBookingByIdLoading} = useBooking({
    user_booking_id: id,
  });

  const {setChatId, setChatType, setSenderId, setReceiverId} = useChatStore();

  const data = getUserBookingById?.data?.car;
  const reviews: CarReviewType[] = getUserBookingById?.data?.reviews || [];
  const bookingStartDate =
    getUserBookingById?.data?.bookingDetails?.booking_start_date_time || '';

  const bookingEndDate =
    getUserBookingById?.data?.bookingDetails?.booking_end_date_time || '';

  const about = getUserBookingById?.data?.about || [];

  const chatId = getUserBookingById?.data?.chat?.id;
  const hostPhoneNumber = data?.host?.phone_number;

  const {name, description} = data || {};

  const HandleChatNavigation = () => {
    if (userDetails?.id) {
      setChatId(chatId);
      setReceiverId(data?.host?.host_user_id);
      setSenderId(String(userDetails?.id));
      setChatType('As Customer');

      navigate('SingleChat', {
        receiver_name: data?.host?.full_name,
      });
    } else {
      navigate('Signin', {});
    }
  };

  const menu: MenuType[] = [
    {
      name: t('cancelBooking'),
      onPress: () =>
        navigate('CancelBooking', {
          id: getUserBookingById?.data?.bookingDetails?.id,
          car_picture: data?.images[0],
          car_name: data?.name,
        }),
    },
  ];

  return (
    <CustomWrapper padding bottomInsert={-1}>
      <CustomHeader
        title={t('bookingDetails')}
        rightIcon={
          showCancelBtn ? (
            <CustomPopupMenu
              optionsContainerStyle={{width: RFValue(155)}}
              menu={menu}
            />
          ) : null
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {getUserBookingByIdLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <>
            <CustomText
              text={name}
              fontWeightPopins="600"
              fontSize="S22"
              center
            />
            <CustomText
              text={`${dayjs(bookingStartDate).format(
                'DD MMM YY, hh:mm A',
              )} - ${dayjs(bookingEndDate).format('DD MMM YY, hh:mm A')}`}
              fontSize="S12"
              center
            />
            <CustomImage
              source={{uri: data?.images[0]}}
              resizeMode={'cover'}
              containerStyle={styles.imageContainer}
            />
            <View style={styles.hostBadgeRow}>
              <HostBadge
                name={data?.host?.full_name}
                picture={data?.host?.profile_picture}
                rating={data?.host?.stars}
              />
              <Row>
                <CustomImage
                  source={IMAGES.chatIcon}
                  width={widthPercentageToDP(11)}
                  height={widthPercentageToDP(11)}
                  containerStyle={styles.chatIcon}
                  onPressImage={HandleChatNavigation}
                />
                {hostPhoneNumber && (
                  <CustomImage
                    source={IMAGES.call}
                    width={widthPercentageToDP(11)}
                    height={widthPercentageToDP(11)}
                    onPressImage={() =>
                      Linking.openURL(`tel:${hostPhoneNumber}`)
                    }
                  />
                )}
              </Row>
            </View>
            <CarDescription description={description} fontSize="S16" />
            <CarAbout data={about} hideHeading />
            <CarExtraDetailsSection data={data} />
            <CarFeatures data={data?.features} />
            <View style={{height: RFValue(20)}} />

            {!!reviews.length && <CarReviews reviews={reviews} />}
          </>
        )}
      </ScrollView>
    </CustomWrapper>
  );
};

export default UserBookingDetails;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP(50),
  },
  imageContainer: {
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginBottom: RFValue(10),
    backgroundColor: COLORS.neutral200,
    maxHeight: widthPercentageToDP(45),
  },
  buttonContainer: {
    marginBottom: widthPercentageToDP(10),
    marginVertical: widthPercentageToDP(5),
    marginHorizontal: widthPercentageToDP(5),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: widthPercentageToDP(4),
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(20),
  },
  hostBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: widthPercentageToDP(2),
  },
  chatIcon: {
    marginRight: RFValue(10),
  },
});
