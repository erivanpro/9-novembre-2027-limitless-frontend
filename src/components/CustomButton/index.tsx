import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../utils/theme';

import {CustomButtonProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';

import {CustomText} from '../CustomText';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  containerStyle,
  disabled = false,
  isValid = null,
  textStyle,

  children,
}) => {
  const accentColor = useAppAccentColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || (isValid != null && !isValid)}
      style={[
        styles.container,
        styles.primaryButton,
        {backgroundColor: accentColor},
        containerStyle,
        isValid != null && !isValid && styles.disabledButton,
        disabled && styles.disabledButton,
      ]}>
      {loading ? (
        <ActivityIndicator size={RFValue(20)} color="white" />
      ) : children ? (
        children
      ) : (
        <CustomText
          center
          color={isValid != null && !isValid ? '#B3B3B3' : COLORS.white}
          textStyle={[{fontFamily: FONT.poppins600, fontWeight: '800'}, textStyle]}
          text={title}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonBorder: {
    borderWidth: 1.5,
    borderColor: '#B3B3B3',
  },
  primaryButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: hp(1.7),
  },
    SecondaryButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    maxWidth: 200,
    paddingVertical: hp(1.5),
  },
  socialAuth: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: hp(1.7),
    borderWidth: 1,
    borderColor: COLORS.neutral200,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
  },
});
