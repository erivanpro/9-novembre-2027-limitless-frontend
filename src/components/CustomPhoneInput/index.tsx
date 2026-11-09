import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';
import {COLORS, FONT} from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomIcon} from '../CustomIcon';
import CustomImage from '../CustomImage';
import {CustomText} from '../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomPhoneInput: React.FC<{
  style?: ViewStyle;
  name: string;
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  defaultValue?: string;
  label: string;
  containerStyle?: ViewStyle;
  labelStyle?: Object;
  disabled?: boolean;
  requiredStar?: boolean;
}> = ({
  //   errorColor,
  //   Error,
  style,

  name,
  control,
  rules,
  defaultValue,
  label,
  containerStyle,
  labelStyle,
  disabled,
  requiredStar,
}) => {
  const {styles} = useStyles();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: {
          onChange,
          //  onBlur,
          value,
        },
        fieldState: {error},
      }) => (
        <>
          <View style={[containerStyle, {}]}>
            <View style={[styles.textContainer, labelStyle]}>
              <View style={styles.rowAndCenter}>
                <CustomText
                  color={COLORS.black}
                  fontWeightPopins="600"
                  fontSize="S12"
                  textStyle={[{}]}
                  text={label}
                />

                {requiredStar && (
                  <CustomText color={COLORS.error600} text={' *'} />
                )}
              </View>
            </View>
            <View
              style={[
                styles.input_container,
                style,

                error && {borderColor: COLORS.error600},
              ]}>
              <View style={styles.input_container_content}>
                <PhoneInput
                  initialCountry="us"
                  // key={value}
                  initialValue={value}
                  pickerBackgroundColor={'#fff'}
                  disabled={disabled}
                  onChangePhoneNumber={onChange}
                  textStyle={styles.input}
                  
                  flagStyle={{
                    borderRadius: widthPercentageToDP(100),
                    height: widthPercentageToDP(6),
                    width: widthPercentageToDP(6),
                  }}
                  textProps={{
                    placeholder: '(000) 000-0000',
                    placeholderTextColor: COLORS.neutral500,
                    value,
                  }}
                  renderFlag={({imageSource}) => {
                    return (
                      <View style={styles.flag}>
                        <CustomImage
                          source={imageSource as any}
                          width={widthPercentageToDP(5)}
                          height={heightPercentageToDP(5)}
                        />
                        <CustomIcon icon="chevron-small-down" type="Entypo" />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
          {error && (
            <View style={styles.errorContainer}>
              <CustomText
                color={COLORS.error600}
                textStyle={!!error && styles.errorText}
                text={error.message}
              />
            </View>
          )}
          {/* {error && <CustomText text={error.message} color={COLORS.error600} />} */}
        </>
      )}
    />
  );
};

export default CustomPhoneInput;

const useStyles = () => {
  const styles = StyleSheet.create({
    input_container: {
      height: heightPercentageToDP(6),
      backgroundColor: COLORS.neutral50,
      alignSelf: 'center',
      borderRadius: RFValue(12),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: widthPercentageToDP(3),
      borderColor: '#E1E7E3',
      marginBottom: heightPercentageToDP(1),
    },
    input_container_content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    input: {
      flex: 1,
      color: 'black',
      fontSize: widthPercentageToDP(3.6),
    },
    flag: {
      height: heightPercentageToDP(6),
      paddingRight: widthPercentageToDP(2),
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      borderWidth: 1,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: '#DDE3DF',
    },
    textContainer: {
      paddingBottom: heightPercentageToDP(0.4),
    },
    rowAndCenter: {
      flexDirection: 'row',
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: RFValue(0.93),
    },
    errorText: {
      fontFamily: FONT.poppinsRegular,
      fontSize: RFValue(9.5),
    },
  });
  return {styles};
};
