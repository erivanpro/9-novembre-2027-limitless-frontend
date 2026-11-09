import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const ChatListSkeleton = () => {
  return (
    <LottieView
      resizeMode="cover"
      source={require('../../assets/Lottie/chat.json')}
      autoPlay
      loop
      speed={2.5}
      style={{
        height: heightPercentageToDP(14),
        width: widthPercentageToDP(90),
      }}
    />
  );
};

export default ChatListSkeleton;

const styles = StyleSheet.create({});
