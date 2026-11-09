import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  CarAbout,
  CarDescription,
  CarExtraDetailsSection,
  CarFeatures,
  CarReviews,
  CustomButton,
  CustomHeader,
  CustomImage,
  CustomText,
  CustomWrapper,
  HostBadge,
  InfoModal,
} from '../../components';

import {COLORS, IMAGES} from '../../utils/theme';
import {useUserCar} from '../../hooks/useUserCar';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/navigation';
import {CarReviewType} from '../../components/CarDetailsComponents/interface';
import useUserStore from '../../service/store/user.store';
import useChatStore from '../../service/store/chat.store';
import CarCarousel from '../Hosting/components/CarCarousel';
import SearchScreenSkeleton from '../../components/Skeleton/SearchScreenSkeleton';
import BoxSkeleton from '../../components/Skeleton/BoxSkeleton';
import DiscriptionSkeleton from '../../components/Skeleton/Discription';
import PendingModal from '../../components/PendingModal/PendingModal';
import useTranslate from '../../hooks/useTranslate';

const UserCarDetails = () => {
  const {t} = useTranslate();
  const route = useRoute<any>();
  const {id} = route.params || {};

  const {userDetails, accessToken} = useUserStore();

  const [showModal, setShowModal] = React.useState(false);
  const [processModal, setProcessModal] = useState({
    isVerified: false,
    isRejected: false,
  });
  const {getUserCarDetails, getUserCarDetailsLoading} = useUserCar({
    id: id,
    // user_id: userDetails?.id,
    chat_type: 'As Customer',
  });

  const {setChatId, setChatType, setSenderId, setReceiverId} = useChatStore();

  const data = getUserCarDetails?.data?.data?.car;
  const bookings: CarReviewType[] = data?.bookings || [];
  const about = getUserCarDetails?.data?.about || [];
  const chatId = getUserCarDetails?.data?.data?.chat?.id;
  const {name, description} = data || {};
  const {getUserDetailQuery} = useUserCar();

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
  const HandleBookCar = async () => {
    if (!accessToken) {
      navigate('UserAuthCarDetailsScreen', {
        id: id,
        name,
        image: data?.images[0],
      });
      return;
    }
    await getUserDetailQuery.refetch();
    let user = getUserDetailQuery.data?.data;
    if (!user?.license_number) {
      navigate('SignupComplete', {
        user_type: 'user',
        recent_signup: false,
      });
      return;
    } else if (!user?.is_verified == !user?.is_rejected) {
      setProcessModal(pre => ({...pre, isVerified: true}));
      return;
    } else if (user?.is_rejected) {
      setProcessModal(pre => ({...pre, isRejected: true}));
      return;
    }
    navigate('PaymentScreen', {car_id: data?.id});
  };

  let isModalVisible = processModal?.isRejected || processModal.isVerified;
  const isDifferentHostCar = userDetails?.host?.id !== data?.host?.id;

  return (
    <CustomWrapper padding bottomInsert={-1}>
      <InfoModal
        isVisible={showModal}
        title={t('yourCarHasBeenUnpublishedSuccessfully')}
        iconImage={IMAGES.right}
        btnText={t('backToHomeButton')}
        btnOnPress={() => setShowModal(false)}
      />
      <CustomHeader title={t('carDetails')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {getUserCarDetailsLoading ? (
          <DiscriptionSkeleton />
        ) : (
          <>
            <CustomText
              text={name}
              fontWeightPopins="600"
              fontSize="S22"
              center
            />
            <CarCarousel images={data?.images} />
            {/* <CustomImage
              source={{uri: data?.images[0]}}
              resizeMode={'cover'}
              containerStyle={styles.imageContainer}
            /> */}
            <View style={styles.hostBadgeRow}>
              <HostBadge
                name={data?.host?.full_name}
                picture={data?.host?.profile_picture}
                rating={data?.host?.stars}
              />
              {!!isDifferentHostCar && (
                <CustomImage
                  source={IMAGES.chatIcon}
                  width={widthPercentageToDP(11)}
                  height={widthPercentageToDP(11)}
                  onPressImage={HandleChatNavigation}
                />
              )}
            </View>

            <CarDescription description={description} fontSize="S16" />
              <CarAbout data={about} hideHeading />
            <CarExtraDetailsSection data={data} />
            <CarFeatures data={data?.features} />
            <View style={{height: RFValue(20)}} />

            {!!bookings.length && <CarReviews reviews={bookings} />}
          </>
        )}
      </ScrollView>
      {!getUserCarDetailsLoading && !!isDifferentHostCar && (
        <CustomButton
          title={t('bookCar')}
          onPress={HandleBookCar}
          containerStyle={styles.buttonContainer}
        />
      )}

      {isModalVisible && (
        <PendingModal setState={setProcessModal} processModal={processModal} />
      )}
    </CustomWrapper>
  );
};

export default UserCarDetails;

const styles = StyleSheet.create({
  loaderContainer: {
    gap: heightPercentageToDP(2),
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: heightPercentageToDP(50),
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
});
