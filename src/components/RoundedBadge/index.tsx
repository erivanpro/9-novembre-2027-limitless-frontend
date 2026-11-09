import React, {FC, useCallback} from 'react';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {RoundedBadgeProps} from './interface';
import {COLORS} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomText} from '../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import useTranslate from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

interface MultiSelectProps extends RoundedBadgeProps {
  isMultiSelect?: boolean;
  activeBadge?: string;
  activeBadges?: string[];
  setActiveBadges?: (badges: string[]) => void;
  onPress?: (e?: string) => void;
  translatedValue?: string;
}

const RoundedBadge: FC<MultiSelectProps> = ({
  title,
  isMultiSelect = false,
  activeBadge,
  setActiveBadge,
  activeBadges = [],
  setActiveBadges,
  disabled,
  backgroundColor,
  onPress,
  translatedValue,
}) => {
  const accentColor = useAppAccentColor();
  const isSelected = isMultiSelect
    ? activeBadges?.includes(translatedValue as string)
    : activeBadge === translatedValue;

  const handlePress = useCallback(() => {
    onPress?.(translatedValue);
    if (disabled) return;
    if (isMultiSelect && setActiveBadges) {
      setActiveBadges(
        isSelected
          ? activeBadges.filter(item => item !== translatedValue)
          : [...activeBadges, translatedValue as string],
      );
    } else if (!isMultiSelect && setActiveBadge) {
      setActiveBadge(translatedValue as string);
    }
  }, [
    onPress,
    title,
    disabled,
    isMultiSelect,
    setActiveBadges,
    setActiveBadge,
    isSelected,
    activeBadges,
  ]);

  const bgColor = isSelected
    ? accentColor
    : disabled
    ? COLORS.neutral50
    : backgroundColor || COLORS.white;
  // console.log({title});
  return (
    <Pressable
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={`${title} badge`}
      accessibilityRole="button">
      <CustomText
        text={title}
        fontSize="S12"
        fontWeightPopins="600"
        color={isSelected ? COLORS.white : COLORS.black}
        lineHeight={RFValue(16)}
      />
    </Pressable>
  );
};

export default RoundedBadge;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.neutral200,
    borderWidth: 1,
    paddingHorizontal: widthPercentageToDP(3.65),
    paddingVertical: widthPercentageToDP(2.5),
    borderRadius: widthPercentageToDP(20),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
});
