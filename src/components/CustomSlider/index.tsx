import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES,
  FC,
  useState,
} from 'react';
import Slider from '@react-native-community/slider';
import {COLORS} from '../../utils/theme';
import {Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface CustomSliderProps {
  setValue: (val: number) => void;
  minValue?: number;
  maxValue?: number;
  value?: number;
  setDisplayPrice: (e: number) => {};
}

const CustomSlider: FC<CustomSliderProps> = ({
  setValue,
  minValue = 0,
  maxValue = 10000,
  value,
  setDisplayPrice,
}) => {
  // console.log('valueeee', value);
  return (
    <Slider
      style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: Platform.OS === 'android' ? RFValue(-10) : 0,
        width: '100%',
      }}
      onValueChange={val => {
        setDisplayPrice?.(Math.floor(val));
      }}
      onSlidingComplete={val => {
        setValue?.(Math.floor(val));
      }}
      value={value}
      minimumValue={minValue}
      maximumValue={maxValue}
      maximumTrackTintColor={COLORS.neutral400}
      minimumTrackTintColor="#000000"
      thumbTintColor="#000000"
    />
  );
};

export default CustomSlider;
