import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { FieldValues, useForm } from 'react-hook-form';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomToggleRow,
  InputLabelRow,
} from '../../components';
import { COLORS, FONT } from '../../utils/theme';
import CarFeatures from './components/FeaturesBadge';
import { PublishCarChildProps } from './interface';
import usePublishCarStore from '../../service/store/publishCar.store';
import useTranslate from '../../hooks/useTranslate';
import { FadeIn } from 'react-native-reanimated';

const FeaturesAndDetails: FC<PublishCarChildProps> = ({
  scrollRef,
  setCurrentIndex,
  data,
}) => {
  const { t } = useTranslate();
  const { control, handleSubmit, reset } = useForm();
  const { setCarFeatures } = usePublishCarStore();

  const [insuranceIncluded, setInsuranceIncluded] = useState(false);
  const [petPolicy, setPetPolicy] = useState(false);
  const [smokingPolicy, setSmokingPolicy] = useState(false);
  const [activeBadges, setActiveBadges] = useState<string[]>([]);

  const toggleSwitch = (type: string) => {
    if (type === 'insurance') {
      setInsuranceIncluded(previousState => !previousState);
    } else if (type === 'pet') {
      setPetPolicy(previousState => !previousState);
    } else if (type === 'smoking') {
      setSmokingPolicy(previousState => !previousState);
    }
  };

  const HandleNext = (formData: FieldValues) => {
    const payload = {
      ...formData,
      features: activeBadges,
      insurance_included: insuranceIncluded,
      pet_policy: petPolicy,
      smoking_policy: smokingPolicy,
    };
    setCarFeatures(payload as any); // will change any to proper type once api is implemented as it will be according to api response
    setCurrentIndex(3);
    scrollRef.current?.scrollToIndex({ index: 3, animated: true });
  };

  const onSubmit = (formData: FieldValues) => {
    HandleNext(formData);
  };

  useEffect(() => {
    if (data?.car?.id) {
      setInsuranceIncluded(data.car?.insurance_included);
      setPetPolicy(data.car?.pet_policy);
      setSmokingPolicy(data.car?.smoking_policy);
      setActiveBadges(data.car?.features);
      const formDataToReset = {
        maximum_passengers: data.car?.maximum_passengers?.toString(),
        luggage_capacity: data.car?.luggage_capacity?.toString(),
      };
      reset(formDataToReset);
    }
  }, [data?.car?.id]);
  console.log({ activeBadges });
  return (
    <View 
    style={{ width: widthPercentageToDP(100) }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <InputLabelRow text={t('features')} requiredStarik />
        <CarFeatures
          activeBadges={activeBadges}
          setActiveBadges={setActiveBadges}
        />

        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title={t('maximumPassengers')}
          name="maximum_passengers"
          placeholder={t('maximumPassengers')}
          requiredStar
          rules={{
            required: t('maximumPassengersRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('maximumPassengersRequired'),
              min: (value: string) =>
                isNaN(Number(value))
                  ? t('invalidNumber')
                  : Number(value) >= 2 || t('minPassengers'),
              max: (value: string) =>
                isNaN(Number(value))
                  ? t('invalidNumber')
                  : Number(value) < 21 || t('maxPassengers'),
            },
          }}
        />

        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title={t('luggageCapacity')}
          name="luggage_capacity"
          placeholder={t('luggageCapacity')}
          requiredStar
          rules={{
            required: t('luggageCapacityRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('luggageCapacityRequired'),
              max: (value: string) =>
                isNaN(Number(value))
                  ? t('invalidNumber')
                  : Number(value) < 150 || t('maxLuggageCapacity'),
            },
          }}
        />

        <CustomToggleRow
          label={t('insuranceIncluded')}
          activeText={t('childSeat')}
          inActiveText={t('insuranceIncludedLabel')}
          isActive={insuranceIncluded}
          toggleSwitch={() => toggleSwitch('insurance')}
        />

        <CustomToggleRow
          label={t('petPolicy')}
          activeText={t('childSeat')}
          inActiveText={t('notAllowed')}
          isActive={petPolicy}
          toggleSwitch={() => toggleSwitch('pet')}
        />

        <CustomToggleRow
          label={t('smokingPolicy')}
          activeText={t('childSeat')}
          inActiveText={t('notAllowed')}
          isActive={smokingPolicy}
          toggleSwitch={() => toggleSwitch('smoking')}
        />
        <CustomButton
          title={t('reviewSummaryButton')}
          onPress={handleSubmit(onSubmit)}
          containerStyle={styles.reviewBtn}
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
  reviewBtn: {
    marginTop: widthPercentageToDP(3),
  },
});

export default FeaturesAndDetails;
