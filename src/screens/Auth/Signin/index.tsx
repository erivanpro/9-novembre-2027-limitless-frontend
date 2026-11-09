import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FieldValues, useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS, FONT } from '../../../utils/theme';
import {
  navigate,
  navigateGoBack,
  navigateReplace,
  navigationRef,
} from '../../../utils/navigation';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomText,
  CustomWrapper,
} from '../../../components';
import { AuthHeader } from '../components';
import { emailRegex } from '../../../utils/helper';
import { useAuth } from '../../../hooks/useAuth';
import { loginType } from '../../../utils/types/loginType';
import { useRoute } from '@react-navigation/native';
import useTranslate from '../../../hooks/useTranslate';
import useLanguageStore from '../../../service/store/language.store';
import useAppAccentColor from '../../../hooks/useAppAccentColor';

const SigninScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { login, loginLoading } = useAuth();
  const { setLanguage, language } = useLanguageStore();
  const accentColor = useAppAccentColor();

  const { t } = useTranslate();

  const params = useRoute().params as { user_type?: string } | undefined | any;
  const { user_type } = params || {};

  const onSubmit = async (data: FieldValues) => {
    let payload = {
      ...data,
      language: language == 'en' ? 'ENGLISH' : 'FRENCH',
    };
    let res = await login(payload as loginType);
  };

  const HandleBackPress = () => {
    if (navigationRef?.current?.canGoBack()) {
      navigateGoBack();
    } else {
      navigateReplace('RootStack');
    }
  };
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader
        heading={t('welcomeBack')}
        handleBackPress={HandleBackPress}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <CustomRHFTextInput
          control={control}
          name="email"
          title={t('emailAddress')}
          placeholder={t('emailAddress')}
          requiredStar
          rules={{
            required: t('emailRequired'),
            pattern: {
              value: emailRegex,
              message: t('invalidEmail'),
            },
          }}
        />

        <CustomRHFTextInput
          secureTextEntry
          placeholder={t('password')}
          requiredStar
          rules={{
            required: t('passwordRequired'),
          }}
          control={control}
          name="password"
          title={t('password')}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginTop: widthPercentageToDP(1.5),
            marginBottom: widthPercentageToDP(3.5),
          }}
          onPress={() => navigate('ForgotPassword')}
        >
          <CustomText
            text={t('forgotPassword')}
            color={COLORS.primary}
            textStyle={styles.forgotPassword}
          />
        </TouchableOpacity>
        <CustomButton
          containerStyle={{
            backgroundColor: accentColor,
          }}
          loading={loginLoading}
          title={t('signInButton')}
          onPress={handleSubmit(onSubmit)}
          disabled={
            !watch('email')?.length ||
            !watch('password')?.length ||
            watch('email')?.length < 5
          }
        />
        <View style={styles.haveAccount}>
          <CustomText
            text={t('signupPrompt').replace('Signup', '')}
            fontSize="S12"
            fontWeightInter="500"
            color={COLORS.neutral400}
          />
          <TouchableOpacity onPress={() => navigate('Signup', { user_type })}>
            <CustomText
              text={t('signUpButton')}
              fontSize="S12"
              fontWeightInter="500"
              color={COLORS.primary}
              textStyle={styles.bold}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: FONT.poppins600,
    fontSize: RFValue(12),
  },
});

export default SigninScreen;
