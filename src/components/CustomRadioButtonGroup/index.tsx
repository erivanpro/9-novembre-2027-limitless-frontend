import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewProps,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
// import {useResponsive} from 'react-native-responsive-hook';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useTranslate from '../../hooks/useTranslate';
// import {TextSmall} from '../CustomText';

const RadioButton: FC<{
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}> = ({label, selected, onPress}) => {
  const {styles} = useStyles();
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <CustomText
        color={COLORS.black}
        text={label}
        fontSize="S12"
        fontWeightPopins="400"
      />
    </TouchableOpacity>
  );
};

const CustomRadioButtonGroup: FC<{
  options: Array<{label: string; value: string}>;
  selectedValue: any;
  setSelectedValue: any;
  setSelectedPickupTypeValueError?: any;
  setSelectedDeliveryTypeValueError?: any;
  containerStyle?: StyleProp<any>;
}> = ({
  options,
  selectedValue,
  setSelectedValue,
  setSelectedPickupTypeValueError,
  setSelectedDeliveryTypeValueError,
  containerStyle,
}) => {
  const {styles} = useStyles();
  const {t} = useTranslate();
  return (
    <View style={[styles.container, containerStyle]}>
      {options?.map((option: {label: string; value: any}) => (
        <RadioButton
          key={option.value}
          label={t(option.label)}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={() => {
            if (setSelectedPickupTypeValueError) {
              setSelectedPickupTypeValueError(null);
            } else {
              setSelectedDeliveryTypeValueError?.(null);
            }
            setSelectedValue(option.value);
          }}
        />
      ))}
    </View>
  );
};

const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      width: '70%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: widthPercentageToDP(1.5),
      marginBottom: widthPercentageToDP(3.5),
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    radioCircle: {
      height: RFValue(15),
      width: RFValue(15),
      borderRadius: 10,
      borderWidth: 2,
      borderColor: COLORS.neutral200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedRadio: {
      borderColor: COLORS.black,
    },
    innerCircle: {
      height: RFValue(8),
      width: RFValue(8),
      borderRadius: 5,
      backgroundColor: COLORS.black,
    },
    radioText: {
      //   marginLeft: 10,
    },
  });
  return {styles};
};

export default CustomRadioButtonGroup;
