import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import SignupCheckbox from './SignupCheckbox';
import {
  CustomButton,
  CustomHeader,
  CustomPhoneInput,
  CustomRHFTextInput,
  CustomText,
  CustomWrapper,
} from '../../../components';
import {COLORS} from '../../../utils/theme';
import {navigate, navigateReset} from '../../../utils/navigation';

import {useAuth} from '../../../hooks/useAuth';
import Toast from 'react-native-toast-message';
import {useUserCar} from '../../../hooks/useUserCar';
import useTranslate from '../../../hooks/useTranslate';
import useLanguageStore from '../../../service/store/language.store';
import useCenterMessageWindowStore from '../../../service/store/centerMessageWindow.store';
import useAppAccentColor from '../../../hooks/useAppAccentColor';

const SignupScreen = () => {
  const {t} = useTranslate();
  const accentColor = useAppAccentColor();
  type SignupProps = {
    SignupProps: {
      id: string;
      user_type: string;
    };
  };
  const routeParams = useRoute<RouteProp<SignupProps, 'SignupProps'>>().params;
  const {user_type} = routeParams || {};
  const {control, handleSubmit, watch} = useForm();
  const {setLanguage, language} = useLanguageStore();
  const {signup, signupLoading} = useAuth();
  const {getUserDetailQuery} = useUserCar();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const onSubmit = (data: FieldValues) => {
    if (data.phone_number?.length < 10) {
      const title = t('error');
      const message = t('invalidPhoneNumber');
      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
      showCenterMessageWindow({
        title,
        message,
        buttonText: t('ok'),
      });
      return;
    }
    const payload = data;
    delete payload.termsAccepted;
    payload.user_type = user_type || 'user';
    payload.language = language == 'en' ? 'ENGLISH' : 'FRENCH'; 
    signup(payload as any);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <View>
        <CustomHeader
          title={t('createAccountTitle')}
          handleBackPress={() => navigateReset('RootStack')}
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heading} />
          <View style={styles.descriptionContainer}>
            <CustomText
              text={t('afterRegistration')}
              fontSize="S16"
              fontWeightInter="500"
              color={COLORS.neutral400}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title={t('firstName')}
                name="first_name"
                autoCapitalize="words"
                placeholder={t('firstName')}
                requiredStar
                rules={{
                  required: t('firstNameRequired'),
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || t('firstNameRequired'),
                    minChar: (value: string) =>
                      value.trim().length > 2 ||
                      t('firstNameMinChar'),
                  },
                }}
              />
            </View>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title={t('lastName')}
                name="last_name"
                autoCapitalize="words"
                placeholder={t('lastName')}
                requiredStar
                rules={{
                  required: t('lastNameRequired'),
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || t('lastNameRequired'),
                    minChar: (value: string) =>
                      value.trim().length > 2 ||
                      t('lastNameMinChar'),
                  },
                }}
              />
            </View>
          </View>

          <CustomRHFTextInput
            control={control}
            name="email"
            title={t('emailAddress')}
            placeholder={t('emailAddress')}
            requiredStar
            rules={{
              required: t('emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t('invalidEmailAddress'),
              },
            }}
          />
          <View style={styles.phoneContainer}>
            <CustomPhoneInput
              control={control}
              label={t('phoneNumber')}
              name="phone_number"
              rules={{
                required: t('phoneNumberRequired'),
              }}
              requiredStar
            />
          </View>

          <CustomRHFTextInput
            secureTextEntry
            placeholder={t('password')}
            requiredStar
            rules={{
              required: t('passwordRequired'),
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
            name="password"
            title={t('password')}
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder={t('password')}
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
          <SignupCheckbox
            control={control}
            name="termsAccepted"
            rules={{
              validate: (value: string) =>
                value || t('acceptTermsRequired'),
            }}
          />

          <CustomButton
            containerStyle={{
              backgroundColor: accentColor,
              borderRadius: 100,
            }}
            loading={signupLoading}
            title={t('signUpButton')}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={styles.haveAccount}>
            <CustomText
              text={t('alreadyHaveAccount')}
              fontSize="S12"
              fontWeightInter="500"
              color={COLORS.neutral400}
            />
            <TouchableOpacity
              onPress={() => {
                getUserDetailQuery.refetch();
                navigate('Signin', {});
              }}>
              <CustomText
                text={t('signInButton')}
                fontWeightInter="500"
                textStyle={styles.bold}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingTop: widthPercentageToDP(2.5),
  },
  descriptionContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
    paddingTop: widthPercentageToDP(2),
  },
  flex1: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(20),
    flexGrow: 1,
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
  phoneContainer: {
    paddingVertical: widthPercentageToDP(1),
  },
});

export default SignupScreen;
