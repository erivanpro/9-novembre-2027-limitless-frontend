import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {PaymentScreenChildProps} from './interface';
import {CustomButton, CustomText} from '../../components';
import {usePaymentSheet} from '@stripe/stripe-react-native';
import {usePayment} from '../../hooks/usePayment';
import useUserStore from '../../service/store/user.store';
import PaymentCard from './PaymentCard';
import useBookingStore from '../../service/store/booking.store';
import {COLORS} from '../../utils/theme';
import useTranslate from '../../hooks/useTranslate';

const Payment: FC<PaymentScreenChildProps> = ({scrollRef, setCurrentIndex}) => {
  const {t} = useTranslate();


  const intentCreationCallbackRef = useRef<any>(null);
  const successHandler = async (res: any) => {
    if (!res?.data?.clientSecret || res?.data?.clientSecret == undefined) {
      getPaymentCardList?.refetch();
      return;
    }

    try {
      if (intentCreationCallbackRef.current) {
        intentCreationCallbackRef.current({
          clientSecret: res?.data?.clientSecret,
        });

        initializePaymentSheet();
      }
    } catch (error) {
    } finally {
      getPaymentCardList?.refetch();
    }
  };
  const {initPaymentSheet, presentPaymentSheet, resetPaymentSheetCustomer} =
    usePaymentSheet();
  const {
    setupIntent,
    getPaymentCardList,
    getPaymentCardListLoading,
    detachPayment,
    detachPaymentLoading,
  } = usePayment({
    successHandler,
  });

  const HandleContinue = async () => {
    resetPaymentSheetCustomer();
    try {
      const res = await presentPaymentSheet();
      console.log({res});

      if (res?.error?.message?.includes('initPaymentSheet')) {
        await initializePaymentSheet();
        await presentPaymentSheet();
      }
    } catch (error) {}
  };
  const previousCards = getPaymentCardList?.data?.data?.data;
  const {userDetails} = useUserStore();
  const {setSelectedCarDetails, selectedCarDetails} = useBookingStore();

  const initializePaymentSheet = async () => {
    const response = await initPaymentSheet({
      merchantDisplayName: 'Go Limitless, Inc.',
      intentConfiguration: {
        mode: {
          currencyCode: 'EUR',
          setupFutureUsage: 'OffSession',
        },

        confirmHandler: confirmHandler,
      },
      returnURL: 'limitless_mobile_app://stripe-redirect',
    });
  };

  const confirmHandler = async (
    paymentMethod: any,
    shouldSavePaymentMethod: any,
    intentCreationCallback: any,
  ) => {
    try {
      let payload = {
        customer_id: userDetails?.stripe_customer_id,
        payment_method_id: paymentMethod?.id,
      };
      intentCreationCallbackRef.current = intentCreationCallback;
      setupIntent(payload);
    } catch (error) {}
  };

  useEffect(() => {
    if (!getPaymentCardListLoading) {
      initializePaymentSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousCards?.length, getPaymentCardListLoading]);

  const handlePaymentFromSavedCard = ({
    payment_method_id,
    customer_id,
    card,
  }) => {
    setSelectedCarDetails?.({
      ...selectedCarDetails,
      payment_method_id,
      customer_id,
      card,
    });
    setCurrentIndex(2);
    scrollRef.current.scrollToIndex({index: 2, animated: true});
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          marginTop: heightPercentageToDP(2),
          paddingBottom: heightPercentageToDP(4),
        }}
        scrollEnabled={!!previousCards?.length}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>
            <CustomText
              text={t('noPaymentMethod')}
              color={COLORS.neutral400}
              center
            />
          </View>
        )}
        data={previousCards}
        renderItem={({item}) => (
          <PaymentCard
            item={item}
            key={item?.id}
            proceedSetupIntent={handlePaymentFromSavedCard}
            proceedDetachPaymentMethod={async paymentId => {
              console.log('🚀 ~ paymentId:', paymentId);

              setTimeout(() => {
                detachPayment(paymentId);
              }, 100);
            }}
            isDetachLoading={detachPaymentLoading}
            detachPaymentItem={''}
          />
        )}
      />
      <CustomButton
        title={t('addNewCard')}
        onPress={HandleContinue}
        containerStyle={{
          marginHorizontal: widthPercentageToDP(5),
          marginBottom: widthPercentageToDP(3),
        }}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
  },
});
