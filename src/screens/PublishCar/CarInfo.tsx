import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import {
  CustomButton,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomText,
  InputLabelRow,
} from '../../components';
import { COUNTRIES, getCities } from '../../utils/countries';
import { COLORS, FONT } from '../../utils/theme';
import CarImagePicker from './components/CarImagePicker';
import usePublishCarStore from '../../service/store/publishCar.store';
import { PublishCarChildProps } from './interface';
import { BRANDS, VEHICLE_TYPES } from '../../utils/constants';
import useTranslate from '../../hooks/useTranslate';

const CarInfo: FC<PublishCarChildProps> = ({
  scrollRef,
  setCurrentIndex,
  data,
}) => {
  const { t } = useTranslate();
  const { control, handleSubmit, reset, resetField } = useForm();
  const { setCarInfo } = usePublishCarStore();

  const [cityOptions, setCityOptions] = useState([]);
  const selectedCountry = useWatch({ control, name: 'country_of_manufacture' });
  const [images, setImages] = useState(Array.from({ length: 7 }));
  const [errors, setErrors] = useState<{
    car_images: string | undefined;
  }>({
    car_images: undefined,
  });

  const HandleNext = (formData: FieldValues) => {
    if (Object.values(errors).filter(Boolean).length > 0) {
      return;
    }
    const payload = {
      ...formData,
      images: images.filter(image => image),
    };
    setCarInfo(payload as any); // will change any to proper type once api is implemented as it will be according to api response
    setCurrentIndex(1);
    scrollRef.current?.scrollToIndex({ index: 1, animated: true });
  };

  const onSubmit = (formData: FieldValues) => {
    HandleNext(formData);
  };

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
      resetField('city_of_registeration', undefined);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (data?.car?.id) {
      let formData = JSON.parse(JSON.stringify(data?.car));
      let formImages = formData?.images || [];
      formImages.push(
        ...Array.from({ length: Number(7 - formImages?.length) }),
      );
      setImages(formImages);
      let formDataToReset = {
        name: data?.car?.name,
        brand: data?.car?.brand,
        description: data?.car?.description,
        price_per_day: String(data?.car?.price_per_day),
        price_per_hour: String(data?.car?.price_per_hour),
        vehicle_type: data?.car?.vehicle_type,
        country_of_manufacture: data?.car?.country_of_manufacture,
        city_of_registeration: data?.car?.city_of_registeration,
      };
      reset(formDataToReset);
    }
  }, [data?.car?.id]);
  return (
    <View
      style={{ flex: 1, width: widthPercentageToDP(100) }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <InputLabelRow
          text={t('carImages')}
          requiredStarik
          rightText={
            t('carImages').includes('(') ? undefined : '(Max 7 Photos)'
          }
        />
        <CarImagePicker
          images={images}
          setImages={e => {
            setErrors({ ...errors, car_images: undefined });
            setImages(e);
          }}
        />
        {!!errors.car_images && (
          <View style={styles.errorContainer}>
            <CustomText
              color={COLORS.error600}
              textStyle={styles.errorText}
              text={errors.car_images}
            />
          </View>
        )}
        <CustomRHFTextInput
          control={control}
          title={t('carName')}
          name="name"
          placeholder={t('carName')}
          requiredStar
          rules={{
            required: t('carNameRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('carNameRequired'),
              min: (value: string) =>
                value.trim().length >= 4 || t('carNameMinLength'),
              max: (value: string) =>
                value.trim().length < 16 || t('carNameMaxLength'),
            },
          }}
        />
        <CustomRHFDropdown
          placeholder={t('brand')}
          label={t('brand')}
          data={BRANDS}
          control={control}
          name="brand"
          requiredStar
          rules={{ required: t('brandNameRequired') }}
        />
        <CustomRHFTextInput
          control={control}
          numberOfLines={3}
          multiline={true}
          title={t('carDescription')}
          name="description"
          placeholder={t('carDescription')}
          requiredStar
          rules={{
            required: t('carDescriptionRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('carDescriptionRequired'),
              minLength: (value: string) =>
                value.trim().length >= 10 || t('carDescriptionMinLength'),
              maxLength: (value: string) =>
                value.trim().length < 250 || t('carDescriptionMaxLength'),
            },
          }}
          style={styles.descriptionInput}
        />
        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title={t('pricePerDay')}
          name="price_per_day"
          placeholder={t('pricePerDay')}
          requiredStar
          rules={{
            required: t('pricePerDayRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('pricePerDayRequired'),
              int: (value: string) =>
                (/^([1-9]\d*)(\.\d+)?$/.test(value) &&
                  Number(value) < 500000) ||
                t('invalidPrice'),
            },
          }}
        />
        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title={t('pricePerHour')}
          name="price_per_hour"
          placeholder={t('pricePerHour')}
          requiredStar
          rules={{
            required: t('pricePerHourRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('pricePerHourRequired'),
              int: (value: string) =>
                (/^([1-9]\d*)(\.\d+)?$/.test(value) &&
                  Number(value) < 500000) ||
                t('invalidPrice'),
            },
          }}
        />

        <CustomRHFDropdown
          label={t('vehicleType')}
          placeholder={t('vehicleType')}
          data={VEHICLE_TYPES?.filter(val => val.label !== 'vehicleTypeAll')}
          control={control}
          name="vehicle_type"
          requiredStar
          rules={{ required: t('vehicleTypeRequired') }}
        />
        <CustomRHFDropdown
          label={t('countryOfManufacture')}
          placeholder={t('country')}
          data={COUNTRIES}
          control={control}
          name="country_of_manufacture"
          requiredStar
          rules={{ required: t('countryRequired') }}
        />
        <CustomRHFDropdown
          label={t('cityOfRegistration')}
          placeholder={t('city')}
          data={cityOptions}
          control={control}
          name="city_of_registeration"
          disabled={!selectedCountry}
          requiredStar
          rules={{ required: t('cityRequired') }}
        />

        <CustomButton
          title={t('nextButton')}
          onPress={() => {
            setErrors({
              car_images:
                images.filter(image => image).length < 1
                  ? t('carImagesRequired')
                  : undefined,
            });
            handleSubmit(onSubmit)();
          }}
          containerStyle={styles.nextBtn}
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
    padding: RFValue(13),
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
    paddingBottom: RFValue(Platform.OS === 'ios' ? 40 : 60),
    flexGrow: 1,
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
  descriptionInput: {
    minHeight: RFValue(80),
    padding: RFValue(14),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    color: COLORS.black,
  },
  nextBtn: {
    marginTop: RFValue(20),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(-1),
    marginBottom: heightPercentageToDP(1),
    marginLeft: RFValue(0.93),
  },

  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
});

export default CarInfo;
