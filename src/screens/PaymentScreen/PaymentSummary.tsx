import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {PaymentScreenChildProps} from './interface';
import {CustomButton, CustomText} from '../../components';
import {navigateReset} from '../../utils/navigation';
import {COLORS} from '../../utils/theme';
import useBookingStore from '../../service/store/booking.store';
import {useTranslate} from '../../hooks/useTranslate';
import PaymentSuccessSkia from './components/PaymentSuccessSkia';

const PaymentSummary: FC<PaymentScreenChildProps> = ({
  scrollRef: _scrollRef,
  setCurrentIndex: _setCurrentIndex,
}) => {
  const {selectedCarDetails} = useBookingStore();
  const {t} = useTranslate();
  const payable_amount = selectedCarDetails?.extra_details?.payable_amount;
  const HandleDone = () => {
    navigateReset('MyOrders');
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <PaymentSuccessSkia size={widthPercentageToDP(30)} />
      </View>

      <CustomText
        text={t('paymentSuccessful')}
        fontWeightPopins="600"
        center
        fontSize="S16"
        textStyle={styles.amount}
      />
      <CustomText
        text={t('paymentCompletedSuccessfully')}
        color={COLORS.neutral400}
        center
        fontWeightInter="500"
        fontSize="S14"
      />
      <CustomText
        text={t('totalPayment')}
        color={COLORS.neutral400}
        center
        fontWeightInter="500"
        fontSize="S14"
      />
      <CustomText
        text={`€${payable_amount}`}
        center
        fontWeightPopins="600"
        fontSize="S14"
        textStyle={styles.amount}
      />

      <CustomButton
        title={t('done')}
        onPress={HandleDone}
        containerStyle={styles.btnContainerStyle}
      />
    </View>
  );
};

export default PaymentSummary;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
    paddingTop: widthPercentageToDP(20),
  },
  btnContainerStyle: {
    marginHorizontal: widthPercentageToDP(5),
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: widthPercentageToDP(5),
  },
  amount: {
    marginVertical: widthPercentageToDP(4),
  },
});
