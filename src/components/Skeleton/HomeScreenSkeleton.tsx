import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
const HomeScreenSkeleton = () => {
  return (
    <LottieView
      resizeMode="contain"
      source={require('./../../assets/Lottie/HomeBox.json')}
      autoPlay
      loop
      speed={1.5}
      style={{
        height: widthPercentageToDP(45),
        width: widthPercentageToDP(40),
      }}
    />
  );
};

export default HomeScreenSkeleton;

const styles = StyleSheet.create({});
