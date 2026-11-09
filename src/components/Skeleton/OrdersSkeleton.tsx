import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
const OrdersSkeleton = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.neutral100,
        overflow: 'hidden',
        borderRadius: 12,
      }}>
      <LottieView
        resizeMode="cover"
        source={require('../../assets/Lottie/myOrders.json')}
        autoPlay
        loop
        speed={0.5}
        style={{
          height: heightPercentageToDP(20),
          width: widthPercentageToDP(95),
        }}
      />
    </View>
  );
};

export default OrdersSkeleton;
