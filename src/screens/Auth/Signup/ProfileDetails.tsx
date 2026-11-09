import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  CustomButton,
  CustomImagePickerSheet,
  CustomPhoneInput,
  CustomRHFDatePicker,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomText,
  InputLabelRow,
} from '../../../components';
import {COLORS, FONT, IMAGES} from '../../../utils/theme';
import {ImageSourcePropType, ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {formatDate, getMaxAgeDate} from '../../../utils/dayjs';
import {COUNTRIES, getCities} from '../../../utils/countries';
import {Source} from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import useUserStore from '../../../service/store/user.store';
import {useAuth} from '../../../hooks/useAuth';
import {useTranslate} from '../../../hooks/useTranslate';
import useCenterMessageWindowStore from '../../../service/store/centerMessageWindow.store';

type ProfileDetailsProps = {
  scrollRef: any;
  setCurrentIndex: (index: number) => void;
  isHost?: boolean;
  user_type?: 'host' | 'user';
};

const ProfileDetails: FC<ProfileDetailsProps> = ({
  scrollRef,
  setCurrentIndex,
  user_type,
}) => {
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const [cityOptions, setCityOptions] = useState([]);
  const {control, handleSubmit, reset} = useForm();
  const {userDetails} = useUserStore();
  const selectedCountry = useWatch({control, name: 'country'});
  const [profilePic, setProfilePic] = useState<
    Source | ImageSourcePropType | null | any
  >(userDetails?.profile_picture);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const HandleNext = () => {
    setCurrentIndex(1);
    scrollRef.current.scrollToEnd();
  };

  useEffect(() => {
    if (
      (userDetails?.user_type.includes('host') &&
        userDetails?.host_onboarding_status == 'Driving_Details_Pending') ||
      userDetails?.host_onboarding_status == 'Stripe_Onboarding_Pending'
    ) {
      setTimeout(() => {
        HandleNext();
      }, 250);
    }
  }, [scrollRef, userDetails?.user_type, userDetails?.host_onboarding_status]);
  useEffect(() => {
    if (userDetails) {
      reset(userDetails);
    }
  }, [user_type, userDetails, reset]);

  const [idCard, setIdCard] = useState({
    id_card_front: userDetails?.id_card_front || '',
    id_card_back: userDetails?.id_card_back || '',
  });

  const {setProfile, setProfileLoading} = useAuth({
    successCallback: HandleNext,
  });

  const onSubmit = useCallback(
    (data: FieldValues) => {
      if (!profilePic) {
        const title = t('error');
        const message =
          t('profilePictureRequired') || t('pleaseFillAllFields');
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
      } else if (!idCard?.id_card_back || !idCard?.id_card_front) {
        const title = t('error');
        const message = t('idCardRequired') || t('pleaseFillAllFields');
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

      setProfile({
        payload: {
          emergency_contact: data?.emergency_contact,
          country: data?.country,
          city: data?.city,
          address: data?.address,
          date_of_birth: formatDate(data?.date_of_birth, 'YYYY-MM-DD'),
          user_type: user_type || 'user',
          profile_picture: profilePic,
          idCard: idCard,
          uid: userDetails?.id,
        },
      });
    },
    [profilePic, idCard],
  );

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  return (
    <View style={{width: widthPercentageToDP(100)}}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomText
          color={COLORS.black}
          fontSize="S26"
          text={t('personalDetails')}
          fontWeightPopins="600"
        />

        <CustomImagePickerSheet
          onChange={va => setProfilePic(va)}
          source={
            profilePic && typeof profilePic !== 'string'
              ? profilePic
              : profilePic
              ? {uri: profilePic}
              : IMAGES.imageUpload
          }
          defaultImage={IMAGES.imageUpload}
          profileDetails
        />

        <CustomRHFDatePicker
          label={t('dateOfBirth')}
          placeholder={t('dateOfBirthPlaceholder')}
          control={control}
          name="date_of_birth"
          isDatePickerVisible={isDatePickerVisible}
          rules={{required: t('dobRequired')}}
          showDatePicker={() => setIsDatePickerVisible(true)}
          hideDatePicker={() => setIsDatePickerVisible(false)}
          handleConfirm={() => {
            setIsDatePickerVisible(false);
          }}
          requiredStar
          maximumDate={getMaxAgeDate(18)}
        />

        <View style={styles.phoneContainer}>
          <CustomPhoneInput
            control={control}
            label={t('emergencyContact')}
            name="emergency_contact"
            rules={{
              validate: value =>
                value?.trim() != userDetails?.phone_number?.trim() ||
                t('emergencyContactNotMatch'),
              maxLength: {
                value: 20,
                message: t('phoneNumberMax'),
              },
            }}
          />
        </View>
        <CustomRHFDropdown
          placeholder={t('selectCountry') || t('country')}
          label={t('countryOfBirth') || t('country')}
          data={COUNTRIES}
          control={control}
          search={true}
          name="country"
          requiredStar
          rules={{required: t('countryRequired')}}
        />

        <CustomRHFDropdown
          placeholder={t('selectCity') || t('city')}
          label={t('cityOfResidence') || t('city')}
          data={cityOptions}
          control={control}
          search={true}
          name="city"
          disabled={!selectedCountry}
          requiredStar
          rules={{required: t('cityRequired')}}
        />

        <CustomRHFTextInput
          control={control}
          title={t('address')}
          name="address"
          placeholder={t('enterAddress') || t('address')}
          requiredStar
          rules={{
            required: t('addressRequired'),
          }}
        />
        <InputLabelRow text={t('idCardFront')} requiredStarik />

        
        <CustomImagePickerSheet
          license
          onChange={img =>
            setIdCard(prev => ({...prev, id_card_front: img ?? ''}))
          }
          source={
            idCard?.id_card_front && typeof idCard?.id_card_front !== 'string'
              ? idCard?.id_card_front
              : idCard?.id_card_front
              ? {uri: idCard?.id_card_front}
              : IMAGES.imageUpload
          }
        />



        <InputLabelRow text={t('idCardBack')} requiredStarik />
        <CustomImagePickerSheet
          license
          onChange={img =>
            setIdCard(prev => ({...prev, id_card_back: img ?? ''}))
          }
          source={
            idCard?.id_card_back && typeof idCard?.id_card_back !== 'string'
              ? idCard?.id_card_back
              : idCard?.id_card_back
              ? {uri: idCard?.id_card_back}
              : IMAGES.imageUpload
          }
        />
        <CustomButton
          title={t('nextButton')}
          onPress={handleSubmit(onSubmit)}
          loading={setProfileLoading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral50,
  },
  container: {
    padding: RFValue(15),
    flex: 1,
  },
  imageUpload: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(100),
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFValue(20),
  },
  clickToUpload: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imageUploadText: {
    color: COLORS.neutral600,
    fontFamily: FONT.poppins600,
    fontWeight: '600',
  },
  phoneContainer: {
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(1),
  },
});

export default ProfileDetails;
