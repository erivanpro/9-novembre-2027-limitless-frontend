import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomImage, CustomText} from '../../components';
import {IMAGES, COLORS} from '../../utils/theme';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import useUserStore from '../../service/store/user.store';

const PaymentCard: FC<{
  item: {card: {brand: string; last4: string}; id: string; adType: string};
  proceedDetachPaymentMethod: (paymentId: string) => void;
  proceedSetupIntent: (e: any) => void;
  isDetachLoading: boolean;
  detachPaymentItem: string;
}> = ({
  item,
  proceedSetupIntent,
  proceedDetachPaymentMethod,
  isDetachLoading,
  detachPaymentItem,
}) => {
  const {userDetails} = useUserStore();
  return (
    <TouchableOpacity
      onPress={() =>
        proceedSetupIntent({
          payment_method_id: item?.id,
          customer_id: userDetails?.stripe_customer_id,
          card: item?.card,
        })
      }
      style={styles.card}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <CustomImage
          source={IMAGES.masterCard}
          style={{
            height: RFValue(22),
            width: RFValue(22),
          }}
        />
        <View style={{gap: 4}}>
          <CustomText color={COLORS.black} text={item?.card?.brand} />
          <CustomText
            color={COLORS.neutral500}
            text={`**** **** **** **** ${item?.card?.last4}`}
          />
        </View>
      </View>
      <View>
        <CustomImage
          onPressImage={() => proceedDetachPaymentMethod(item?.id)}
          loading={detachPaymentItem === item?.id && isDetachLoading}
          source={IMAGES.trash}
          style={{
            height: RFValue(22),
            width: RFValue(22),
          }}

          // tintColor={isDetachLoading ? COLORS.neutral400 : COLORS.error600}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: widthPercentageToDP(6),
    justifyContent: 'space-between',
    marginVertical: heightPercentageToDP(0.5),
    paddingVertical: heightPercentageToDP(0.8),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neutral100,
  },
});
export default PaymentCard;
