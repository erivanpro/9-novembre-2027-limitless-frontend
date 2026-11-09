import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  CustomButton,
  CustomHeader,
  CustomImagePickerSheet,
  CustomPhoneInput,
  CustomRHFDatePicker,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomWrapper,
  InputLabelRow,
  RoundedBadge,
} from '../../components';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, IMAGES} from '../../utils/theme';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useUserStore from '../../service/store/user.store';
import {COUNTRIES, getCities} from '../../utils/countries';
import {formatDate, getMaxAgeDate} from '../../utils/dayjs';
import {UserDetailsType} from '../../utils/types/apiResponseType';
import {useAuth} from '../../hooks/useAuth';
import {updateProfileType} from '../../utils/types/loginType';
import {Source} from 'react-native-fast-image';
import useTranslate from '../../hooks/useTranslate';

const EditProfile = () => {
  const {t} = useTranslate();
  const {userDetails} = useUserStore();
  const {updateProfile, updateProfileLoading} = useAuth();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: userDetails as UserDetailsType,
  });

  let emergencyContact = watch('emergency_contact');

  const selectedCountry = useWatch({
    control,
    name: 'country',
  });
  const [cityOptions, setCityOptions] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [profile_picture, setProfilePicture] = useState<
    Source | string | undefined
  >(userDetails?.profile_picture);

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  const onSubmit = (data: FieldValues) => {
    let payload: updateProfileType = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      profile_picture: data.profile_picture,
      date_of_birth: formatDate(data?.date_of_birth, 'YYYY-MM-DD'),
      emergency_contact: data.emergency_contact,
      country: data.country,
      city: data.city,
      address: data.address,
    };
    console.log(payload.profile_picture);
    updateProfile({
      payload: {
        ...payload,
        profile_picture: profile_picture as string,
        uid: String(userDetails?.id),
      },
    });
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={100}
        useNativeDriver
        style={styles.container}>
        <CustomHeader title={t('editProfile')} />
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <CustomImagePickerSheet
            defaultImage={IMAGES.emptyProfile}
            editProfile
            // source={profile_picture as Source}
            source={
              typeof profile_picture === 'string'
                ? {uri: profile_picture}
                : profile_picture
            }
            onChange={image => setProfilePicture(image as Source)}
          />
          <View style={styles.row}>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title={t('firstName')}
                name="first_name"
                placeholder={t('firstName')}
                requiredStar
                rules={{
                  required: t('firstNameRequired'),
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || t('firstName'),
                    minChar: (value: string) =>
                      value.trim().length > 2 || t('firstNameMin'),
                  },
                }}
              />
            </View>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title={t('lastName')}
                name="last_name"
                placeholder={t('lastName')}
                requiredStar
                rules={{
                  required: t('lastNameRequired'),
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || t('lastName'),
                    minChar: (value: string) =>
                      value.trim().length > 2 || t('lastNameMin'),
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
            editable={false}
            disabled
            rules={{
              required: t('emailAddress'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t('invalidEmail'),
              },
            }}
          />

          <CustomPhoneInput
            control={control}
            requiredStar
            label={t('phoneNumber')}
            name="phone_number"
            rules={{
              required: t('phoneNumber'),
              validate: value =>
                value !== emergencyContact || t('emergencyContactNotMatch'),
              maxLength: {
                value: 20,
                message: t('phoneNumberMax'),
              },
            }}
          />

          <CustomRHFDatePicker
            label={t('dateOfBirth')}
            placeholder={t('dateOfBirth')}
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

          <CustomRHFTextInput
            control={control}
            keyboardType="numeric"
            maxLength={20}
            title={t('emergencyContact')}
            name="emergency_contact"
            placeholder={t('emergencyContact')}
            rules={{
              required: t('emergencyContact'),
            }}
          />

          <CustomRHFDropdown
            placeholder={t('country')}
            label={t('country')}
            data={COUNTRIES}
            control={control}
            name="country"
            requiredStar
            rules={{required: t('countryRequired')}}
          />

          <CustomRHFDropdown
            placeholder={t('city')}
            label={t('city')}
            data={cityOptions}
            control={control}
            name="city"
            disabled={!selectedCountry}
            requiredStar
            rules={{required: t('cityRequired')}}
          />

          <CustomRHFTextInput
            control={control}
            title={t('address')}
            name="address"
            placeholder={t('address')}
            requiredStar
            rules={{
              required: t('addressIsRequired'),
            }}
          />

          <View>
            <InputLabelRow text={t('idCard')} />
            <View
              style={{
                maxWidth: widthPercentageToDP(30),
                marginTop: RFValue(5),
                marginBottom: RFValue(10),
              }}>
              <RoundedBadge title={t('verified')} disabled />
            </View>
          </View>

          <CustomButton
            title={t('saveChanges')}
            onPress={handleSubmit(onSubmit)}
            loading={updateProfileLoading}
          />
        </ScrollView>
      </Animatable.View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
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
    paddingBottom: widthPercentageToDP(60),
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
});

export default EditProfile;
