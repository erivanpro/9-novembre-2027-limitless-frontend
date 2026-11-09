import React, {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import {PaymentScreenChildProps} from './interface';
import {
  CustomButton,
  CustomIcon,
  CustomImage,
  CustomText,
  Row,
} from '../../components';
import useBookingStore from '../../service/store/booking.store';
import {COLORS, IMAGES} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomTextInput from '../../components/CustomTextInput';
import {usePayment} from '../../hooks/usePayment';
import useUserStore from '../../service/store/user.store';
import useTranslate from '../../hooks/useTranslate';

const ConfirmPayment: FC<PaymentScreenChildProps> = ({
  scrollRef,
  setCurrentIndex,
}) => {
  const {t} = useTranslate();
  const {selectedCarDetails} = useBookingStore();
  const {userDetails} = useUserStore();
  const payable_amount = selectedCarDetails?.extra_details?.payable_amount;
  const start_date =
    selectedCarDetails?.extra_details?.booking_start_date_time?.split('T')[0];
  const end_date =
    selectedCarDetails?.extra_details?.booking_end_date_time?.split('T')[0];
  const pickup_address = selectedCarDetails?.extra_details?.car?.pickup_address;
  const car_name = selectedCarDetails?.extra_details?.car?.name;
  const car_rating = selectedCarDetails?.extra_details?.car?.stars;
  const HandleContinue = () => {
    let payload = {
      car_id: selectedCarDetails?.extra_details?.car?.id,
      car_name: selectedCarDetails?.extra_details?.car?.name,
      start_date_time:
        selectedCarDetails?.extra_details?.booking_start_date_time,
      end_date_time: selectedCarDetails?.extra_details?.booking_end_date_time,
      payable_amount: selectedCarDetails?.extra_details?.payable_amount,
      user_id: userDetails?.id,
      payment_method_id: selectedCarDetails?.payment_method_id,
    };
    paymentIntent(payload);
  };
  const successHandler = () => {
    setCurrentIndex(3);
    scrollRef.current.scrollToIndex({index: 3, animated: true});
  };
  const {paymentIntent, paymentIntentLoading} = usePayment({
    successHandler,
  });
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Row justifyContent="space-between">
          <CustomText text={car_name} textStyle={styles.carName} />
          <View style={styles.carStarRow}>
            <CustomIcon
              type="AntDesign"
              icon="star"
              color={COLORS.warning500}
              size={RFValue(15)}
            />
            <CustomText text={car_rating} textStyle={styles.carRating} />
          </View>
        </Row>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={false}>
          <CustomText text={t('overview')} />
          <View style={styles.row}>
            <CustomTextInput
              title={t('startDate')}
              value={start_date}
              inputContainerStyle={{minWidth: widthPercentageToDP(40)}}
              disabled
              editable={false}
            />
            <CustomTextInput
              title={t('endDate')}
              value={end_date}
              inputContainerStyle={{minWidth: widthPercentageToDP(40)}}
              disabled
              editable={false}
            />
          </View>
          <CustomTextInput
            disabled
            editable={false}
            title={t('pickUpLocation')}
            value={pickup_address}
          />

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingVertical: widthPercentageToDP(1),
              marginVertical: widthPercentageToDP(4),

              paddingHorizontal: widthPercentageToDP(5),
              borderColor: COLORS.neutral200,
              borderWidth: 1,
              borderRadius: RFValue(8),
            }}>
            <CustomImage
              source={IMAGES.masterCard}
              style={{
                height: RFValue(22),
                width: RFValue(22),
              }}
              containerStyle={{alignSelf: 'center', marginRight: RFValue(5)}}
            />
            <View>
              <CustomText text={`${selectedCarDetails?.card?.brand}`} />
              <CustomText
                text={`**** **** **** ${selectedCarDetails?.card?.last4}`}
                color={COLORS.neutral400}
              />
            </View>
          </View>
          <CustomButton
            title={t('payNowWithAmount', {amount: payable_amount})}
            onPress={HandleContinue}
            loading={paymentIntentLoading}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
    paddingVertical: widthPercentageToDP(10),
  },
  child: {
    flex: 1,
    backgroundColor: COLORS.black,
    borderTopRightRadius: RFValue(15),
    borderTopLeftRadius: RFValue(15),
    paddingHorizontal: RFValue(0),
  },
  contentContainerStyle: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: RFValue(15),
    borderTopLeftRadius: RFValue(15),
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: widthPercentageToDP(5),
  },
  carStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: widthPercentageToDP(5),
  },
  carName: {
    color: COLORS.white,
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: widthPercentageToDP(5),
  },
  carRating: {
    color: COLORS.white,
    paddingHorizontal: widthPercentageToDP(2),
  },
  starFilled: {},
  row: {
    flexDirection: 'row',
    gap: widthPercentageToDP(8),
    marginVertical: widthPercentageToDP(2),
  },
});
