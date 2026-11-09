import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FieldValues, useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { COLORS, FONT } from '../../../utils/theme';
import { navigate } from '../../../utils/navigation';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomWrapper,
} from '../../../components';
import { AuthHeader } from '../components';
import { useAuth } from '../../../hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import { useTranslate } from '../../../hooks/useTranslate';
import useLanguageStore from '../../../service/store/language.store';

const SetPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();

  const params = useRoute().params;

  const { resetPassword, resetPasswordLoading } = useAuth();
  const { t } = useTranslate();
  const { language: lang } = useLanguageStore();

  const onSubmit = (data: FieldValues) => {
    let language = lang == 'en' ? 'ENGLISH' : 'FRENCH';
    let payload = {
      language: language as 'ENGLISH' | 'FRENCH',
      email: params?.email,
      otp: params?.otp,
      ...data,
    };
    resetPassword(payload);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader
        heading={t('setNewPassword')}
        description={t('description')}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <CustomRHFTextInput
          secureTextEntry
          placeholder={t('enterNewPassword')}
          requiredStar
          rules={{
            required: t('newPasswordRequired'),
            validate: {
              notCommon: (value: string) => {
                const blacklist = ['password', '123456', 'qwerty'];
                return !blacklist.includes(value) || t('passwordTooCommon');
              },
              minLength: (value: string) =>
                value.length >= 8 || t('passwordMinLength'),
              maxLength: (value: string) =>
                value.length <= 16 || t('passwordMaxLength'),
              hasUppercase: (value: string) =>
                /[A-Z]/.test(value) || t('passwordUppercase'),
              hasLowercase: (value: string) =>
                /[a-z]/.test(value) || t('passwordLowercase'),
              hasNumber: (value: string) =>
                /[0-9]/.test(value) || t('passwordNumber'),
              hasSymbol: (value: string) =>
                /[\W_]/.test(value) || t('passwordSymbol'),
              noSpaces: (value: string) =>
                !/\s/.test(value) || t('passwordNoSpaces'),
            },
          }}
          control={control}
          name="password"
          title={t('newPassword')}
        />

        <CustomRHFTextInput
          secureTextEntry
          placeholder={t('enterConfirmNewPassword')}
          requiredStar
          control={control}
          rules={{
            required: t('confirmPasswordRequired'),
            validate: {
              positive: (value: string) =>
                value === watch('password') || t('passwordsDontMatch'),
            },
          }}
          name="confirmPassword"
          title={t('confirmNewPassword')}
        />

        <CustomButton
          loading={resetPasswordLoading}
          title={t('savePasswordButton')}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: widthPercentageToDP(20),
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: widthPercentageToDP(4),
    paddingBottom: widthPercentageToDP(2),
  },
  bold: { fontWeight: '600', fontSize: RFValue(12) },
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

export default SetPasswordScreen;
