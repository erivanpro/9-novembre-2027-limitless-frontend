import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
const BoxSkeleton = () => {
  return (
    <LottieView
      resizeMode="cover"
      source={require('./../../assets/Lottie/detail.json')}
      autoPlay
      loop
      speed={1.5}
      style={{
        height: heightPercentageToDP(100),
        width: widthPercentageToDP(100),
      }}
    />
  );
};

export default BoxSkeleton;

const styles = StyleSheet.create({});
