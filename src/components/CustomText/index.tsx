import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {CustomTextProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../utils/theme';

const fontSizeLevel = {
  S6: RFValue(6),
  S8: RFValue(8),
  S9: RFValue(9),
  S10: RFValue(10),
  S12: RFValue(12),
  S14: RFValue(12.5),
  S16: RFValue(14),
  S18: RFValue(17),
  S20: RFValue(19),
  S22: RFValue(20),
  S24: RFValue(24),
  S26: RFValue(26),
  S28: RFValue(28),
  S32: RFValue(32),
  S40: RFValue(40),
};
const fontWeightsPopin = {
  '400': FONT.poppinsRegular,
  '500': FONT.poppins500,
  '600': FONT.poppins600,
  '900': FONT.poppinsBold,
};

const fontWeightsInter = {
  '400': FONT.poppinsRegular,
  '500': FONT.inter500,
  '600': FONT.inter600,
  '900': FONT.inter900,
};

export const CustomText: React.FC<CustomTextProps> = ({
  text,
  textStyle,
  color,
  center,

  onPress,
  underline,
  numberOfLines,
  fontWeightPopins,
  fontWeightInter,
  fontSize,
  lineHeight,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        underline && styles.underline,
        fontWeightPopins && {
          fontFamily:
            fontWeightsPopin[fontWeightPopins as keyof typeof fontWeightsPopin],
        },
        fontWeightInter && {
          fontFamily:
            fontWeightsInter[fontWeightInter as keyof typeof fontWeightsInter],
        },
        center && styles.center,
        {color: color || COLORS.black},
        lineHeight && ({lineHeight: lineHeight} as any),
        fontSize && {
          fontSize: fontSizeLevel[fontSize as keyof typeof fontSizeLevel],
        },
        textStyle,
      ]}
      disabled={typeof onPress === 'function' ? false : true}
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      numberOfLines={numberOfLines}
      {...rest}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT.poppinsRegular,
    fontSize: fontSizeLevel.S14,
    color: COLORS.black,
  },
  underline: {textDecorationLine: 'underline'},
  center: {textAlign: 'center'},
});
