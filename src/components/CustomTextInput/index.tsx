import React, {FC, useCallback, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import useAppAccentColor from '../../hooks/useAppAccentColor';
import {ICustomTextInput} from './interface';

type TextInputBlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0];
type TextInputFocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0];

const CustomTextInput: FC<ICustomTextInput> = props => {
  const {
    inputContainerStyle,
    placeholder,
    secureTextEntry,
    multiline,
    numberOfLines,
    keyboardType,
    onSubmitEditing,
    blurOnSubmit,
    maxLength,
    textStyle,
    error,
    onBlur,
    onFocus,
    value,
    onChangeText,
    editField,
    name,
    textInputRef,
    bottomTextInfo,
    title,
    titleTextStyle,
    autoCapitalize = 'none',
    requiredStar = false,
    disabled,
    changeBorderColorOnFocus = false,
    ...rest
  } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [canEdit, setCanEdit] = useState(editField);
  const [focus, setFocus] = useState(false);
  const accentColor = useAppAccentColor();
  const canEditRef = React.useRef(canEdit);
  const inputRef = React.useRef<TextInput>(null);
  const hasTypedValue =
    value !== undefined && value !== null && `${value}`.trim().length > 0;

  const onPressEdit = () => {
    setCanEdit(!canEdit);
    canEditRef.current = !canEditRef.current;
    inputRef?.current?.blur();
    if (!canEditRef.current) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    } else {
      inputRef?.current?.blur();
    }
  };

  const handleBlur = useCallback(
    (event: TextInputBlurEvent) => {
      setFocus(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (event: TextInputFocusEvent) => {
      setFocus(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.rowAndCenter}>
          <CustomText
            color={COLORS.black}
            fontWeightPopins="600"
            fontSize="S12"
            textStyle={[
              {
                marginBottom: hp(1),
              },
              titleTextStyle,
            ]}
            text={title}
          />

          {requiredStar && <CustomText color={COLORS.error600} text={' *'} />}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          changeBorderColorOnFocus &&
            focus &&
            hasTypedValue &&
            {borderColor: accentColor, borderWidth: 0.5},
          inputContainerStyle,
          error && {
            borderColor: COLORS.error600,
            borderWidth: StyleSheet.hairlineWidth,
          },
          {
            backgroundColor: disabled ? COLORS.neutral200 : COLORS.neutral50,
          },
        ]}>
        <View style={styles.flex1}>
          <TextInput
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry ? hidePassword : false}
            multiline={multiline}
            style={[styles.inputText, textStyle]}
            numberOfLines={numberOfLines}
            focusable={true}
            keyboardType={keyboardType}
            ref={textInputRef ?? inputRef}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            placeholderTextColor={COLORS.neutral500}
            maxLength={maxLength}
            editable={!disabled && !canEdit}

            key={name}
            {...rest}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </View>

        {!!secureTextEntry && (
          <CustomIcon
            icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            type="Ionicons"
            size={RFValue(18.75)}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          />
        )}
        {!!editField && (
          <CustomIcon
            icon={canEdit ? 'edit' : 'save'}
            type="Feather"
            size={RFValue(18.75)}
            onPress={onPressEdit}
            style={styles.eyeIcon}
          />
        )}
      </View>
      {!!bottomTextInfo && (
        <CustomText
          color={'#808080'}
          textStyle={styles.bottomTextInfo}
          text={bottomTextInfo}
        />
      )}
      {!!error && (
        <View style={styles.errorContainer}>
          <CustomText
            color={COLORS.error600}
            textStyle={!!error && styles.errorText}
            text={error}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: hp(0.9)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E7E3',
    minHeight: hp(6.8),
    borderRadius: RFValue(12),
    backgroundColor: COLORS.neutral50,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  inputText: {
    fontSize: RFValue(12),
    fontFamily: FONT.poppinsRegular,
    flex: 1,
    paddingHorizontal: RFValue(12),
    color: COLORS.black,
    paddingVertical: RFValue(8),
    textAlignVertical: 'center',
  },
  eyeIcon: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(10),
    marginRight: RFValue(2),
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: COLORS.neutral200,
  },
  bottomTextInfo: {
    fontSize: RFValue(10),
    lineHeight: RFValue(14),
    marginTop: hp(0.6),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
    marginLeft: RFValue(1.2),
  },
  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(10),
  },
  rowAndCenter: {
    flexDirection: 'row',
  },
  flex1: {flex: 1},
});

export default CustomTextInput;
