import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {RFValue} from 'react-native-responsive-fontsize';
import {Controller} from 'react-hook-form';
import {FONT, COLORS, SHADOWS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CustomTextInput from '../CustomTextInput';
import useTranslate from '../../hooks/useTranslate';

type Props = {
  label?: string;
  search?: boolean;
  data: any;
  placeholder?: string;
  control: any;
  name: string;
  rules?: any;
  defaultValue?: any;
  disabled?: boolean;
  position?: 'top' | 'bottom';
  requiredStar?: boolean;
};

const CustomDropdown = (props: Props) => {
  const {
    label,
    search,
    data,
    placeholder,
    control,
    name,
    rules,
    defaultValue = null,
    disabled,
    position,
    requiredStar,
  } = props || {};
  const [_, setIsFocus] = useState(false);
  const {t} = useTranslate();
  const renderLabel = () => {
    return label ? (
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

        {requiredStar && <CustomText color={COLORS.error600} text={' *'} />}
      </View>
    ) : (
      <View />
    );
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{t(item.label)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || null} // Ensure it starts as null if not provided
        key={name}
        disabled={disabled}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => {
          // console.log({value, label});
          return (
            <View>
              {renderLabel()}
              <Dropdown
                dropdownPosition={position || 'bottom'}
                disable={disabled}
                mode="modal"
                containerStyle={{
                  backgroundColor: '#fff',
                  height: '80%',
                  ...SHADOWS.light,
                  borderRadius: 20,
                  paddingTop: heightPercentageToDP(2),
                }}
                autoScroll={false}
                style={[
                  {
                    ...styles.dropdown,
                    borderColor: COLORS.neutral100,
                    backgroundColor: disabled
                      ? COLORS.neutral200
                      : COLORS.neutral50,
                  },
                  error && {borderColor: COLORS.error600},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data.map((item: any) => ({
                  ...item,
                  label: t(item.label),
                }))}
                search={true}
                // keyboardAvoiding={true}
                onFocus={() => setIsFocus(true)}
                onBlur={onBlur}
                onChange={item => {
                  console.log({item});
                  onChange(item?.value);
                }} // Update value based on selection
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder || t('select')} // Show placeholder until an item is selected
                searchPlaceholder={t('search')}
                value={value} // Pass the value to dropdown
                renderItem={renderItem}
                searchPlaceholderTextColor="#000"
              />
              {error && (
                <CustomText
                  color={COLORS.error600}
                  textStyle={!!error && styles.errorText}
                  text={error?.message}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: RFValue(4),
  },
  dropdown: {
    marginBottom: RFValue(4),
    marginTop: RFValue(0),
    height: RFValue(45),
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(10),
    width: '100%',
    alignSelf: 'center',
    padding: 12,
    borderColor: COLORS.neutral50,
    borderWidth: 1,
  },

  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  placeholderStyle: {
    fontSize: RFValue(12),
    marginLeft: RFValue(5),
    fontFamily: FONT.inter500,
    fontWeight: '500',
    color: COLORS.neutral400,
  },
  selectedTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
  rowAndCenter: {
    flexDirection: 'row',
  },
});
