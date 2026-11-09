import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomImagePickerSheet,
  CustomRHFDatePicker,
  CustomRHFTextInput,
  CustomText,
  InfoModal,
  InputLabelRow,
} from '../../../components';
import { FieldValues, useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';

import useUserStore from '../../../service/store/user.store';
import { useAuth } from '../../../hooks/useAuth';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import { navigateReplace, navigateReset } from '../../../utils/navigation';
import { COLORS, IMAGES } from '../../../utils/theme';
import { API_URL } from '../../../utils/constants';
import { UserDetailsType } from '../../../utils/types/apiResponseType';
import { useTranslate } from '../../../hooks/useTranslate';
import useCenterMessageWindowStore from '../../../service/store/centerMessageWindow.store';

type DrivingDetailsProps = {
  user_type: string;
  webViewUrl: string | null;
  setWebViewUrl: (url: string | null) => void;
};

const DrivingDetails: FC<DrivingDetailsProps> = ({
  user_type,
  webViewUrl,
  setWebViewUrl,
}) => {
  const { t } = useTranslate();
  const { userDetails } = useUserStore();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: userDetails as UserDetailsType,
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: '',
  });
  let accountId: any = userDetails?.host?.stripe_account_id;

  useEffect(() => {
    if (
      userDetails?.user_type.includes('host') &&
      userDetails?.host_onboarding_status == 'Stripe_Onboarding_Pending'
    ) {
      reCreateStripe(accountId);
    }
  }, []);
  console.log(userDetails?.user_type, userDetails?.host_onboarding_status);
  const HandleSuccessCallback = (url?: string) => {
    setIsModalVisible({ visible: false, url: '' });
    if (url) {
      setStripeLoading(true);
      setWebViewUrl(url);
      return;
    }

    navigateReplace('RootStack');
  };
  const { setDrivingDetails, setDrivingDetailsLoading, reCreateStripe } =
    useAuth({
      successCallback: HandleSuccessCallback,
      modalVisible: setIsModalVisible,
      accountId: accountId,
    });

  useEffect(() => {
    // reset(userDetails);
    if (userDetails?.license_image) {
      setLicenseImage(userDetails?.license_image);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (!licenseImage) {
      const title = t('error');
      const message = t('licenseImageRequired');
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
    setDrivingDetails({
      license_number: data?.license_number,
      expiry_date: data?.expiry_date,
      license_image: licenseImage,
      user_type: user_type || 'user',
    });
  };

  const [licenseImage, setLicenseImage] = useState<string | undefined>();

  const RETURN_URL = API_URL.replace(/\/+$/, '');

  const [stripeLoading, setStripeLoading] = useState(false);

  const HandleNavigationStateChange = (event: any) => {
    const currentUrl = String(event?.url || '')
      .split(/[?#]/, 1)[0]
      .replace(/\/+$/, '');
    if (
      currentUrl === RETURN_URL ||
      currentUrl.startsWith(`${RETURN_URL}/`)
    ) {
      Toast.show({
        type: 'success',
        text1: t('success'),
        text2: t('profileCreated'),
      });
      setIsModalVisible({ visible: false, url: '' });
      navigateReset('RootStack');
    }
  };

  useEffect(() => {
    setStripeLoading(false);
  }, [webViewUrl]);

  return (
    <View style={styles.container}>
      {stripeLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : !!webViewUrl ? (
        <WebView
          onLoad={() => setStripeLoading(false)}
          style={{ flex: 1 }}
          source={{ uri: webViewUrl }}
          onNavigationStateChange={HandleNavigationStateChange}
        />
      ) : (
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <CustomText
            color={COLORS.black}
            fontSize="S26"
            text={t('drivingDetails')}
            fontWeightPopins="600"
          />
          <CustomRHFTextInput
            control={control}
            title={t('licenseNumber')}
            name="license_number"
            placeholder={t('enterLicenseNumber')}
            requiredStar
            rules={{
              required: t('licenseNumberRequired'),
              validate: {
                positive: (value: string) =>
                  value.trim().length > 0 || t('licenseNumberRequired'),
                minLength: (value: string) =>
                  value.trim().length > 9 || t('licenseNumberMin'),
                maxLength: (value: string) =>
                  value.trim().length < 21 || t('licenseNumberMax'),
                pattern: (value: string) =>
                  /^[A-Za-z0-9-]+$/.test(value) || t('licenseNumberPattern'),
              },
            }}
          />
          <CustomRHFDatePicker
            label={t('expiryDate')}
            placeholder="MM DD YYYY"
            control={control}
            name="expiry_date"
            isDatePickerVisible={isDatePickerVisible}
            rules={{ required: t('licenseExpiryRequired') }}
            showDatePicker={() => setIsDatePickerVisible(true)}
            hideDatePicker={() => setIsDatePickerVisible(false)}
            handleConfirm={() => {
              setIsDatePickerVisible(false);
            }}
            minimumDate={new Date()}
            requiredStar
          />
          <InputLabelRow text={t('license')} requiredStarik />
          <CustomImagePickerSheet
            license
            source={
              licenseImage && typeof licenseImage === 'string'
                ? { uri: licenseImage }
                : licenseImage
            }
            onChange={img => setLicenseImage(img as any)}
          />
          <CustomButton
            title={t('submit')}
            onPress={handleSubmit(onSubmit)}
            loading={setDrivingDetailsLoading}
          />
        </ScrollView>
      )}
      <InfoModal
        iconImage={IMAGES.walletIcon}
        isVisible={isModalVisible.visible}
        title={t('completeSignupProcess')}
        description={t('hostOnboardingBank')}
        btnText={t('link')}
        btnOnPress={() => HandleSuccessCallback(isModalVisible.url)}
      />
    </View>
  );
};

export default DrivingDetails;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
  },
  scrollViewContainer: {
    padding: RFValue(15),
    flex: 1,
  },

  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
});
