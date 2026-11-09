import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {Alert, Button, Platform, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {FlatList, Pressable, ScrollView} from 'react-native-gesture-handler';
import {
  CalendarPicker,
  CustomButton,
  CustomRHFDatePicker,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomText,
  GooglePlacesInput,
  InputLabelRow,
} from '../../components';
import {getCities} from '../../utils/countries';
import {COLORS, FONT, SHADOWS} from '../../utils/theme';
import ColorItem from './components/ColorItem';
import {carColors} from '../../utils/tempDb';
import {
  CarSpecificationErrors,
  CarSpecificationLocation,
  PublishCarChildProps,
} from './interface';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import usePublishCarStore from '../../service/store/publishCar.store';
import {ENGINE_TYPES, TRANSMISSION_TYPES} from '../../utils/constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import {formatDate} from '../../utils/dayjs';
import Toast from 'react-native-toast-message';
import useTranslate from '../../hooks/useTranslate';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import CustomColorPicker from './components/CustomColorPicker';

const Specification: FC<PublishCarChildProps> = ({
  scrollRef,
  setCurrentIndex,
  data,
}) => {
  const {t} = useTranslate();
  const {control, handleSubmit, reset} = useForm();
  const {setCarSpecification} = usePublishCarStore();
  const selectedCountry = useWatch({control, name: 'country'});
  const [hidePicker, setHidePicker] = useState(Boolean);
  const [_, setCityOptions] = useState([]);
  const [errors, setErrors] = useState<CarSpecificationErrors>({
    color: undefined,
    pickup_address: undefined,
    dropoff_address: undefined,
    booking_dates: undefined,
  });
  const [selectedColor, setSelectedColor] = useState<string | undefined>('');

  const [location, setLocation] = useState<CarSpecificationLocation>({
    pickup_address: undefined,
    dropoff_address: undefined,
  });
  // const handleCovertToIso = (date: any, time: any) => {
  //   let isoDate = new Date(date);
  //   let covertedDated = isoDate?.toISOString();

  //   return covertedDated;
  // };

  const handleCovertToIso = (date: any, time: any) => {
    if (typeof date == 'string' && typeof time == 'string') {
      return date;
    }
    const extractDate = new Date(date);

    // Extract the date components (year, month, day) from the date object
    const year = extractDate.getFullYear();
    const month = extractDate.getMonth(); // Month is 0-indexed (January = 0)
    const day = extractDate.getDate();

    // Extract the time components (hours, minutes) from the time object
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Create a new Date object combining both date and time
    const combinedDate = new Date(year, month, day, hours, minutes);

    // Convert to ISO string
    const isoString = combinedDate.toISOString();

    // Return the ISO string with only 2 second digits (without milliseconds)
    return isoString.slice(0, -5) + 'Z'; // Replace the milliseconds with '00'
  };

  const HandleNext = (formData: FieldValues) => {
    // let startDate = handleCovertToIso(bookingDates?.start, bookingTime?.start);
    // let endDate = handleCovertToIso(bookingDates?.end, bookingTime?.end);

    const payload = {
      ...formData,
      color_code: selectedColor,
      pickup_address: pickup_address_ref?.current?.getAddressText(),
      dropoff_address: dropoff_address_ref?.current?.getAddressText(),
      available_start_date: bookingDates.start,
      available_start_time: bookingTime.start,
      available_end_date: bookingDates.end,
      available_end_time: bookingTime.end,
    };
    setCarSpecification(payload as any); // will change any to proper type once api is implemented as it will be according to api response
    setCurrentIndex(2);
    scrollRef.current?.scrollToIndex({index: 2, animated: true});
  };

  const onSubmit = (formData: FieldValues) => {
    HandleNext(formData);
  };

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (data?.car?.id) {
      setSelectedColor(data.car.color_code);
      pickup_address_ref?.current?.setAddressText(data.car.pickup_address);
      dropoff_address_ref?.current?.setAddressText(data.car.dropoff_address);
      setLocation({
        pickup_address: data.car.pickup_address,
        dropoff_address: data.car.dropoff_address,
      });
      setBookingDates({
        start: data.car?.available_start_date_time,
        end: data.car?.available_end_date_time,
      });
      setBookingTime({
        start: data.car?.available_start_date_time,
        end: data.car?.available_end_date_time,
      });

      const formDataToReset = {
        mileage: data?.car?.mileage.toString(),
        fuel_economy: data?.car?.fuel_economy.toString(),
        engine_type: data?.car?.engine_type,
        transmission_type: data?.car?.transmission_type,
      };
      reset(formDataToReset);
    }
  }, [data?.car?.id]);

  const calenderBottomSheetRef = useRef<BottomSheetModal>(null);
  const pickup_address_ref = useRef(null);
  const dropoff_address_ref = useRef(null);
  const [bookingDates, setBookingDates] = useState({
    start: null,
    end: null,
  });

  const [bookingTime, setBookingTime] = useState({
    start: null,
    end: null,
  });

  const HandleContinue = () => {
    if (bookingDates?.end || bookingTime?.end || bookingTime?.start) {
      setErrors(prev => ({...prev, booking_dates: undefined}));
    }

    if (!bookingTime?.end || !bookingTime?.start) {
      Alert.alert('Error', 'Please select a time');
      return;
    }

    if (String(bookingDates?.start) == String(bookingDates?.end)) {
      let startTime = new Date(bookingTime?.start);
      let endTime = new Date(bookingTime?.end);
      startTime?.setHours(startTime?.getHours() + 12);
      endTime?.setHours(endTime?.getHours());
      console.log(
        String(startTime),
        String(bookingDates?.start),
        new Date(startTime).getDate(),
        new Date(bookingDates?.start).getDate(),
      );
      if (
        endTime < startTime ||
        startTime.getDate() !== new Date(bookingDates?.start).getDate()
      ) {
        Alert.alert(
          'Error',
          'End time must be at least 12 hours after the start time and cannot extend into the next day.',
        );
        return;
      }
    }

    calenderBottomSheetRef.current?.close();
  };

  return (
    <View
      style={{
        width: widthPercentageToDP(100),
      }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets>
       
        {/* <FlatList
          data={Object.values(carColors)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatlistRow}
          renderItem={({item}) => (
            <ColorItem
              color={item}
              setSelectedColor={i => {
                setErrors({...errors, color: undefined});
                setSelectedColor(i);
              }}
              selectedColor={selectedColor === item}
            />
          )}
        /> */}

        {/* <Modal visible={true} animationType="slide"> */}



        
        {/* 
        <CustomColorPicker
          hidePicker={hidePicker}
          setHidePicker={setHidePicker}
          setErrors={setErrors}
          setSelectedColor={setSelectedColor}
          errors={errors}
        /> */}

        {/* <Button title="Ok" onPress={() => ()} /> */}
        {/* </Modal> */}

        {!!errors.color && (
          <View style={styles.errorContainer}>
            <CustomText
              color={COLORS.error600}
              textStyle={styles.errorText}
              text={errors.color}
            />
          </View>
        )}
        <CustomRHFTextInput
          control={control}
          title={t('mileage')}
          name="mileage"
          keyboardType="numeric"
          placeholder={t('mileage')}
          requiredStar
          rules={{
            required: t('carMileageRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('carMileageRequired'),
              maxLength: (value: number) =>
                value < 500001 || t('maxCarMileage'),
            },
          }}
        />



         <InputLabelRow text={t('colorOfCar')} requiredStarik />
        <View style={{backgroundColor: '#fff'}}>

          <CustomColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setErrors={setErrors}

            errors={errors}

          />
        </View>



        <CustomRHFDropdown
          placeholder={t('engineType')}
          label={t('engineType')}
          data={ENGINE_TYPES}
          control={control}
          name="engine_type"
          requiredStar
          rules={{required: t('carEngineTypeRequired')}}
        />
        <CustomRHFDropdown
          placeholder={t('transmissionType')}
          label={t('transmissionType')}
          data={TRANSMISSION_TYPES.filter(({value}) => value !== 'ALL')}
          control={control}
          name="transmission_type"
          requiredStar
          rules={{required: t('transmissionTypeRequired')}}
        />

        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title={t('fuelEconomy')}
          name="fuel_economy"
          placeholder={t('fuelEconomy')}
          requiredStar
          rules={{
            required: t('fuelEconomyRequired'),
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || t('fuelEconomyRequired'),
            },
          }}
        />

        <CalendarPicker
          title={t('bookingDates')}
          requiredStar
          calenderBottomSheetRef={calenderBottomSheetRef}
          handleContinue={HandleContinue}
          date={bookingDates}
          setDate={setBookingDates}
          isStartAndEndTimeNeeded={true}
          setTime={setBookingTime}
          time={bookingTime}
        />
        {!!errors.booking_dates && (
          <View style={styles.errorContainer}>
            <CustomText
              color={COLORS.error600}
              textStyle={styles.errorText}
              text={errors.booking_dates}
            />
          </View>
        )}
        {/* <CustomRHFDatePicker
          label="Booking Date"
          placeholder="MM DD YYYY"
          control={control}
          name="available_start_date_time"
          isDatePickerVisible={isDatePickerVisible}
          rules={{required: 'Booking Date is required'}}
          showDatePicker={() => setIsDatePickerVisible(true)}
          hideDatePicker={() => setIsDatePickerVisible(false)}
          handleConfirm={() => {
            setIsDatePickerVisible(false);
          }}
          minimumDate={new Date()}
          requiredStar
        /> */}
        <InputLabelRow text={t('pickupLocation')} requiredStarik />
        <View style={styles.pickupLocationInputContainer}>
          <GooglePlacesInput
            value={location.pickup_address}
            isPinLocation={true}
            inputRef={pickup_address_ref}
            setAddress={e => {
              setLocation(prev => ({...prev, pickup_address: e}));
              setErrors({...errors, pickup_address: undefined});
            }}
          />
          {!!errors.pickup_address && (
            <View style={styles.errorContainer}>
              <CustomText
                color={COLORS.error600}
                textStyle={styles.errorText}
                text={errors.pickup_address}
              />
            </View>
          )}
        </View>

        <InputLabelRow text={t('dropoffLocation')} requiredStarik />
        <View style={styles.pickupLocationInputContainer}>
          <GooglePlacesInput
            inputRef={dropoff_address_ref}
            isPinLocation={true}
            value={location.dropoff_address}
            placeholder={t('dropoffLocation')}
            setAddress={e => {
              setErrors({...errors, dropoff_address: undefined});
              setLocation(prev => ({...prev, dropoff_address: e}));
            }}
          />
          {!!errors.dropoff_address && (
            <View style={styles.errorContainer}>
              <CustomText
                color={COLORS.error600}
                textStyle={styles.errorText}
                text={errors.dropoff_address}
              />
            </View>
          )}
        </View>
        <CustomButton
          title={t('nextButton')}
          onPress={handleSubmit(data => {
            // console.log({data});

            const err = {
              color: selectedColor ? undefined : t('selectCarColor'),
              pickup_address: location.pickup_address
                ? undefined
                : t('selectPickupLocation'),
              dropoff_address: location.dropoff_address
                ? undefined
                : t('selectDropoffLocation'),
              booking_dates:
                bookingDates?.end && bookingTime?.end && bookingTime?.start
                  ? undefined
                  : t('selectBookingDates'),
            };

            if (Object.values(err).some(error => error)) {
              setErrors(err);
              return;
            }

            HandleNext({
              ...data,
              color_code: selectedColor,
              pickup_address: location.pickup_address,
              dropoff_address: location.dropoff_address,
            });
          })}
          containerStyle={styles.ctaBtn}
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
    paddingBottom: RFValue(Platform.OS === 'ios' ? 40 : 60),
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
  flatlistRow: {
    flexDirection: 'row',
  },
  pickupLocationInputContainer: {
    marginTop: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(2),
  },
  ctaBtn: {
    marginTop: widthPercentageToDP(4),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(0.4),
    marginLeft: RFValue(0.93),
  },
  transmissionErrorContainer: {
    marginTop: heightPercentageToDP(-0.5),
  },
  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
});

export default Specification;
