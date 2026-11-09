import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Animated from 'react-native-reanimated';

import {CustomText} from '../CustomText';
import {} from 'react-native-reanimated';
import {FadeOutUp, FadeIn} from 'react-native-reanimated';
import {COLORS} from '../../utils/theme';

interface connectionProps {
  handleClose?: () => void;
}

const NetConnectionModal = ({handleClose}: connectionProps) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(50)}
      style={styles.content}>
      <StatusBar backgroundColor={'transparent'} />
      <CustomText
        color={'#fff'}
        fontSize="S14"
        text={'   No Internet Connection'}
      />

      {/* <LargeText color={'#fff'}>🎢</LargeText> */}

      {/* </View> */}
    </Animated.View>
  );
};

export default NetConnectionModal;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(4),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999999,
    marginHorizontal: widthPercentageToDP(6),
    position: 'absolute',
    backgroundColor: COLORS.black,
    height: widthPercentageToDP(10),
    top: heightPercentageToDP(10),
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: widthPercentageToDP(10),
  },

  icon: {
    height: widthPercentageToDP(5),
    width: widthPercentageToDP(5),
    tintColor: '#fff',
    zIndex: 99999,
  },
});
