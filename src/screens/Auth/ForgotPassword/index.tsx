import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FieldValues, useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { COLORS, FONT } from '../../../utils/theme';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomWrapper,
} from '../../../components';
import { AuthHeader } from '../components';

import { useAuth } from '../../../hooks/useAuth';
import { emailRegex } from '../../../utils/helper';
import { API_REASONS } from '../../../utils/constants';
import { useTranslate } from '../../../hooks/useTranslate';
import useLanguageStore from '../../../service/store/language.store';
import useAppAccentColor from '../../../hooks/useAppAccentColor';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { requestOtp, requestOtpLoading } = useAuth();
  const { t } = useTranslate();
  const accentColor = useAppAccentColor();
  const { language: lang } = useLanguageStore();
  const onSubmit = ({ email }: FieldValues) => {
    let language = lang == 'en' ? 'ENGLISH' : 'FRENCH';
    const res = requestOtp({
      language: language as 'ENGLISH' | 'FRENCH',
      email,
      reason: API_REASONS.FORGOT_PASSWORD as keyof typeof API_REASONS,
    });
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader heading={t('forgotPassword')} />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <CustomRHFTextInput
          control={control}
          name="email"
          title={t('emailAddress')}
          placeholder={t('enterYourEmail')}
          requiredStar
          rules={{
            required: t('emailRequired'),
            pattern: {
              value: emailRegex,
              message: t('invalidEmail'),
            },
          }}
        />

        <CustomButton
          loading={requestOtpLoading}
          title={t('continueButton')}
          containerStyle={{
            backgroundColor: accentColor,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={!watch('email')?.length || watch('email')?.length < 5}
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

export default ForgotPasswordScreen;
