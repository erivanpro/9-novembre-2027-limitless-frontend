import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
const SearchScreenSkeleton = () => {
  return (
    <LottieView
      resizeMode="cover"
      source={require('./../../assets/Lottie/search.json')}
      autoPlay
      loop
      speed={1.5}
      style={{
        height: widthPercentageToDP(90),
        width: widthPercentageToDP(90),
        alignSelf: 'center',

        // top: 10,
      }}
    />
  );
};

export default SearchScreenSkeleton;

const styles = StyleSheet.create({});
