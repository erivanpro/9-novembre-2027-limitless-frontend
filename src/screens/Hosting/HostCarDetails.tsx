import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';

import {
  CarAbout,
  CarDescription,
  CarExtraDetailsSection,
  CarFeatures,
  CarReviews,
  CustomHeader,
  CustomIcon,
  CustomPopupMenu,
  CustomText,
  CustomWrapper,
  InfoModal,
  Row,
} from '../../components';
import CarCarousel from './components/CarCarousel';
import CarRating from './components/CarRating';
import { RFValue } from 'react-native-responsive-fontsize';
import { IMAGES } from '../../utils/theme';
import { useHostCar } from '../../hooks/useHostCar';
import { navigate, navigateReset } from '../../utils/navigation';
import { CarReviewType } from '../../components/CarDetailsComponents/interface';
import useUserStore from '../../service/store/user.store';
import DiscriptionSkeleton from '../../components/Skeleton/Discription';
import { useTranslate } from '../../hooks/useTranslate';

const HostCarDetails = () => {
  const route = useRoute<any>();
  const { id } = route.params || {};
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const { userDetails } = useUserStore();
  const { t } = useTranslate();
  const {
    getHostCarDetails,
    unpublishCar,
    unpublishCarLoading,
    getHostCarDetailsLoading,
  } = useHostCar({
    id: id,
    successCallback: setModalMessage,
  });
  const focus = useIsFocused();

  useEffect(() => {
    focus && getHostCarDetails.refetch();
  }, [focus]);
  const data = getHostCarDetails?.data?.data?.car;
  const about = getHostCarDetails?.data?.about || [];
  const ratings = getHostCarDetails?.data?.data?.starsbyCount || [];
  const bookings: CarReviewType[] = data?.bookings || [];
  const { name, images, description } = data || {};
  const dataForEditCar = {
    car: {
      ...data,
      luggage_capacity: Number(data?.luggage_capacity),
      maximum_passengers: Number(data?.maximum_passengers),
    },
    about: about,
    ratings: ratings,
    bookings: bookings,
  };

  const HandleUnpublish = () => {
    setShowModal(true);
    unpublishCar({
      id: id,
      type: data?.is_unpublished ? 'Republish' : 'Unpublish',
    });
  };

  const HandleOk = () => {
    setShowModal(false);
    setModalMessage('');
    navigateReset('RootStack');
  };
  const menu = [{
    name: t('edit'),
    icon: <CustomIcon
      icon={'pencil-outline'}
      type={'MaterialCommunityIcons'}
      size={RFValue(16)}
    />,
    onPress: () => navigate('PublishCar', {
      data: dataForEditCar,
    })
  }, {
    name: data?.is_unpublished
      ? t('publish')
      : t('unpublish'),
    icon: <CustomIcon
      icon={data?.is_unpublished ? 'done' : 'cross'}
      type={data?.is_unpublished ? 'MaterialIcons' : 'Entypo'}
      size={RFValue(18)}
    />,
    onPress: () => HandleUnpublish()
  },]
  return (
    <CustomWrapper padding bottomInsert={-1}>
      <InfoModal
        isVisible={showModal}
        title={
          unpublishCarLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            modalMessage || ''
          )
        }
        iconImage={IMAGES.right}
        btnText={t('backToHomeButton')}
        btnOnPress={() => (unpublishCarLoading ? () => { } : HandleOk())}
      />
      <CustomHeader
        rightIcon={
          data?.host?.id == userDetails?.host?.id && (
            <Row
              style={styles.optionsButton}>
              <CustomText
                text={t('options')}
                fontWeightPopins="500"
                fontSize="S12"
                textStyle={styles.optionsLabel}
              />
              <View style={styles.optionsIconWrap}>
                <CustomPopupMenu menu={menu} />
              </View>
            </Row>
          )
        }
      />
      {getHostCarDetailsLoading ? (
        <DiscriptionSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomText text={name} fontWeightPopins="600" fontSize="S22" />
          <CarCarousel images={images} />
          <CarDescription description={description || ''} />
          <CarAbout data={about} />
          <CarExtraDetailsSection data={data} />
          {data?.features?.length && <CarFeatures data={data?.features} />}
          <CarRating data={ratings} />
          {!!bookings.length && <CarReviews reviews={bookings} />}
        </ScrollView>
      )}
    </CustomWrapper>
  );
};

export default HostCarDetails;

const styles = StyleSheet.create({
  optionsButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: RFValue(8),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(8),
    alignItems: 'center',
  },
  optionsLabel: {
    marginRight: RFValue(6),
  },
  optionsIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
