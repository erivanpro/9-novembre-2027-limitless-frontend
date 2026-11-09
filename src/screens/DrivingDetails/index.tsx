import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {
  CustomButton,
  CustomHeader,
  CustomRHFDatePicker,
  CustomRHFTextInput,
  CustomWrapper,
  InputLabelRow,
  RoundedBadge,
} from '../../components';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import {useAuth} from '../../hooks/useAuth';
import {formatDate} from '../../utils/dayjs';
import useTranslate from '../../hooks/useTranslate';

const DrivingDetails = () => {
  const {t} = useTranslate();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {control, handleSubmit} = useForm();
  const {userDetails} = useUserStore();
  const {updateDrivingDetails, updateDrivingDetailsLoading} = useAuth();

  const onSubmit = ({expiry_date}: FieldValues) => {
    updateDrivingDetails({
      expiry_date: formatDate(expiry_date, 'YYYY-MM-DD'),
    });
  };
  return (
    <CustomWrapper backgroundColor={COLORS.white} padding>
      <CustomHeader title={t('drivingDetails')} />
      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={100}
        useNativeDriver
        style={styles.container}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomRHFTextInput
            control={control}
            canEdit={!String(userDetails?.license_number).length}
            editable={!String(userDetails?.license_number).length}
            disabled={!!String(userDetails?.license_number).length}
            defaultValue={userDetails?.license_number}
            title={t('licenseNumber')}
            name="license_number"
            placeholder={t('licenseNumber')}
            requiredStar
            rules={{
              required: 'License number is required',
              validate: {
                positive: (value: string) =>
                  value.trim().length > 0 || 'License number is required',
              },
            }}
          />
          <CustomRHFDatePicker
            label={t('expiryDate')}
            placeholder={t('expiryDate')}
            control={control}
            defaultValue={new Date(userDetails?.expiry_date || new Date())}
            name="expiry_date"
            isDatePickerVisible={isDatePickerVisible}
            rules={{required: 'Licence expiry date is required'}}
            showDatePicker={() => setIsDatePickerVisible(true)}
            hideDatePicker={() => setIsDatePickerVisible(false)}
            handleConfirm={() => {
              setIsDatePickerVisible(false);
            }}
            minimumDate={new Date()}
            requiredStar
          />
          <InputLabelRow text={t('license')} requiredStarik />
          <View style={{maxWidth: widthPercentageToDP(30)}}>
            <RoundedBadge title={t('verified')} disabled />
          </View>
        </ScrollView>
        <View style={{paddingBottom: RFValue(10)}}>
          <CustomButton
            title={t('submitButton')}
            onPress={handleSubmit(onSubmit)}
            loading={updateDrivingDetailsLoading}
          />
        </View>
      </Animatable.View>
    </CustomWrapper>
  );
};

export default DrivingDetails;

const styles = StyleSheet.create({
  container: {
    // width: widthPercentageToDP(100),
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },

  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
});
