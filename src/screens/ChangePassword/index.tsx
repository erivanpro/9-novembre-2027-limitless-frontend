import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';

import {COLORS, FONT} from '../../utils/theme';
import {
  CustomButton,
  CustomHeader,
  CustomRHFTextInput,
  CustomWrapper,
} from '../../components';
import {useAuth} from '../../hooks/useAuth';
import {changePasswordType} from '../../utils/types/loginType';
import useTranslate from '../../hooks/useTranslate';

const SigninScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const {t} = useTranslate();

  const {changePassword, changePasswordLoading} = useAuth();

  const onSubmit = (data: FieldValues) => {
    changePassword(data as changePasswordType);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title={t('changePasswordTitle')} />

      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={100}
        useNativeDriver
        style={styles.container}>
        <View>
          <CustomRHFTextInput
            secureTextEntry
            placeholder={t('currentPassword')}
            requiredStar
            rules={{
              required: t('currentPasswordRequired'),
            }}
            control={control}
            name="old_password"
            title={t('currentPassword')}
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder={t('newPassword')}
            requiredStar
            rules={{
              required: t('newPasswordRequired'),
              validate: {
                notCommon: (value: string) => {
                  const blacklist = ['password', '123456', 'qwerty'];
                  return (
                    !blacklist.includes(value) ||
                    t('passwordTooCommon')
                  );
                },
                minLength: (value: string) =>
                  value.length >= 8 ||
                  t('passwordMinLength'),
                maxLength: (value: string) =>
                  value.length <= 16 ||
                  t('passwordMaxLength'),
                hasUppercase: (value: string) =>
                  /[A-Z]/.test(value) ||
                  t('passwordUppercase'),
                hasLowercase: (value: string) =>
                  /[a-z]/.test(value) ||
                  t('passwordLowercase'),
                hasNumber: (value: string) =>
                  /[0-9]/.test(value) ||
                  t('passwordNumber'),
                hasSymbol: (value: string) =>
                  /[\W_]/.test(value) ||
                  t('passwordSymbol'),
                noSpaces: (value: string) =>
                  !/\s/.test(value) || t('passwordNoSpaces'),
              },
            }}
            control={control}
            name="new_password"
            title={t('newPassword')}
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder={t('confirmNewPassword')}
            requiredStar
            control={control}
            rules={{
              required: t('confirmPasswordRequired'),
              validate: {
                positive: (value: string) =>
                  value === watch('new_password') || t('passwordsDontMatch'),
              },
            }}
            name="confirm_password"
            title={t('confirmNewPassword')}
          />
        </View>
        <CustomButton
          loading={changePasswordLoading}
          title={t('updatePassword')}
          onPress={handleSubmit(onSubmit)}
        />
      </Animatable.View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: widthPercentageToDP(5),
  },
  logo: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
  },
  flex1: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(5),
    flex: 1,
    justifyContent: 'space-between',
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: widthPercentageToDP(4),
    paddingBottom: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(3.5),
    fontFamily: FONT.poppins600,
    fontSize: RFValue(12),
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(4),
    fontSize: RFValue(24),
    fontFamily: FONT.poppins600,
    textAlign: 'center',
  },
});

export default SigninScreen;
