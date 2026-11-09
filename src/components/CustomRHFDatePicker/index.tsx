import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../CustomText';
import {COLORS, FONT} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {formatDate} from '../../utils/dayjs';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  control: any;
  name: string;
  rules?: any;
  defaultValue?: Date;
  isDatePickerVisible: boolean;
  handleConfirm: (date: Date | string) => void;
  hideDatePicker: () => void;

  value?: Date | String | undefined;
  showDatePicker: () => void;

  label: string;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  disabled?: boolean;
  requiredStar?: boolean;
};

const CustomRHFDatePicker = (props: Props) => {
  const {
    control,
    name,
    rules = {},
    defaultValue = null,
    isDatePickerVisible,
    handleConfirm,
    hideDatePicker,

    showDatePicker,
    maximumDate,
    minimumDate = new Date('1900-01-01'), // default minimum date (e.g., January 1, 1900)

    label,
    placeholder,
    disabled,
    requiredStar,
  } = props;

  return (
    <View style={{paddingVertical: RFValue(2)}}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <Pressable onPress={disabled ? () => {} : showDatePicker}>
              {label && (
                <View style={styles.rowAndCenter}>
                  <CustomText
                    color={COLORS.black}
                    fontWeightPopins="600"
                    fontSize="S12"
                    textStyle={{
                      marginBottom: heightPercentageToDP(1),
                    }}
                    text={label}
                  />

                  {requiredStar && (
                    <CustomText color={COLORS.error600} text={' *'} />
                  )}
                </View>
              )}
              {/* <CustomText
                text={label}
                textStyle={{
                  ...styles.labelStyle,
                  color: COLORS.black,
                }}
                // containerStyle={styles.labelContainerStyle}
              /> */}
              <View
                style={[
                  {
                    ...styles.inputContainer,
                    borderColor: COLORS.neutral50,
                    backgroundColor: disabled
                      ? COLORS.neutral300
                      : COLORS.neutral50,
                  },
                  error && {borderColor: COLORS.error600},
                ]}>
                <CustomText
                  text={String(
                    isNaN(new Date(value).getTime())
                      ? value
                      : formatDate(value) !== 'Invalid Date'
                      ? formatDate(value)
                      : placeholder || 'Select date',
                  )}
                  textStyle={{
                    fontFamily: FONT.poppinsRegular,
                    color: !value ? COLORS.neutral500 : COLORS.black,
                    fontSize: RFValue(11),
                  }}
                />
                <CustomIcon
                  type="Feather"
                  icon="calendar"
                  color={!value ? COLORS.neutral400 : COLORS.black}
                />
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              disabled={disabled}
              mode="date"
              onConfirm={date => {
                disabled
                  ? () => {}
                  : // onChange(date);
                    onChange(date);
                handleConfirm(date);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
              date={value ? new Date(value) : maximumDate}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />

            {/* {error?.message && (
              <CustomText
                textStyle={{color: COLORS.error600, marginBottom: RFValue(10)}}
                text={error.message}
              />
            )} */}
            {!!error && (
              <View style={styles.errorContainer}>
                <CustomText
                  color={COLORS.error600}
                  textStyle={!!error && styles.errorText}
                  text={error?.message}
                />
              </View>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainerStyle: {
    paddingVertical: RFValue(5),
  },
  labelStyle: {fontFamily: FONT.poppinsRegular},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(15),
    marginBottom: RFValue(5),
    borderWidth: 1,
    borderRadius: RFValue(10),
    borderColor: COLORS.neutral50,
    backgroundColor: COLORS.neutral50,

    padding: RFValue(5),
    height: RFValue(40),
    marginTop: RFValue(0),
  },
  calendarIcon: {marginLeft: RFValue(10), color: COLORS.black},
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(0.4),
    marginLeft: RFValue(0.93),
  },
  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
  rowAndCenter: {
    flexDirection: 'row',
  },
});

export default CustomRHFDatePicker;
