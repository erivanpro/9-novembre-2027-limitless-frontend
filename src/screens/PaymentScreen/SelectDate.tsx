import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {PaymentScreenChildProps} from './interface';
import {CustomButton, Row} from '../../components';

import RangePicker from '../../components/RangePicker';
import TimePicker from '../../components/TimePicker';
import {dayjs, formatDate} from '../../utils/dayjs';
import {RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import {useBooking} from '../../hooks/useBooking';
import useBookingStore from '../../service/store/booking.store';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {useTranslate} from '../../hooks/useTranslate';
import useCenterMessageWindowStore from '../../service/store/centerMessageWindow.store';

dayjs.extend(utc);
dayjs.extend(timezone);

const SelectDate: FC<PaymentScreenChildProps> = ({
  scrollRef,
  setCurrentIndex,
  car_id,
}) => {
  const [date, setDate] = useState({start: '', end: ''});
  const [time, setTime] = useState({start: '', end: ''});

  const handleSuccess = (res: any) => {
    setSelectedCarDetails?.(res?.data);
    setCurrentIndex(1);
    scrollRef.current.scrollToIndex({index: 1, animated: true});
  };

  const {validateBooking, getCarBookings, getCarBookingsLoading} = useBooking({
    handleSuccess,
    id: car_id,
  });

  const carBookings = getCarBookings?.data?.data;
  // console.log('carBookingscarBookingscarBookings', carBookings);
  const {setSelectedCarDetails} = useBookingStore();
  const {t} = useTranslate();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );

  const checkClash = (
    item: {
      start_date: string;
      end_date: string;
      start_time: string;
      end_time: string;
    },
    selected: {
      selectedStartDate: string;
      selectedEndDate: string;
      selectedStartTime: string;
      selectedEndTime: string;
    },
  ) => {
    const gmtOffsetHours = new Date().getTimezoneOffset() / -60;

    // LOGIC TO HANDLE GMT OFFSET IN UPCOMING DATES FROM BACKEND TO MATCH THE CALENDAR DATE AND TIME
    // the reason to multiply by 2 is that when we use dayjs it will convert the time to UTC and then it will add the gmt offset hours to the time.
    // so we need to add the gmt offset hours to the time twice to get the correct time.

    let startTimeFromBackend: any = item.start_time?.split(':');
    startTimeFromBackend[0] = `${
      Number(startTimeFromBackend[0]) + gmtOffsetHours * 2
    }`;
    startTimeFromBackend = startTimeFromBackend.join(':');

    let endTimeFromBackend: any = item.end_time?.split(':');
    endTimeFromBackend[0] = `${
      Number(endTimeFromBackend[0]) + gmtOffsetHours * 2
    }`;
    endTimeFromBackend = endTimeFromBackend.join(':');

    // END LOGIC TO HANDLE GMT OFFSET IN UPCOMING DATES FROM BACKEND TO MATCH THE CALENDAR DATE AND TIME

    const itemStart = dayjs(
      `${item.start_date} ${startTimeFromBackend}`,
      'DD-MM-YYYY HH:mm',
    );
    const itemEnd = dayjs(
      `${item.end_date} ${endTimeFromBackend}`,
      'DD-MM-YYYY HH:mm',
    );

    const selectedStart = dayjs(
      `${selected.selectedStartDate} ${selected.selectedStartTime}`,
      'DD-MM-YYYY HH:mm',
    );
    const selectedEnd = dayjs(
      `${selected.selectedEndDate} ${selected.selectedEndTime}`,
      'DD-MM-YYYY HH:mm',
    );

    const isClashing =
      (selectedStart.isAfter(itemStart) && selectedStart.isBefore(itemEnd)) ||
      (selectedEnd.isAfter(itemStart) && selectedEnd.isBefore(itemEnd)) ||
      (selectedStart.isSame(itemStart) && selectedEnd.isSame(itemEnd));
    return isClashing
      ? {
          isClashing: true,
          itemStart: itemStart,
          itemEnd: itemEnd,
        }
      : {
          isClashing: false,
          itemStart: null,
          itemEnd: null,
        };
  };

  const HandleContinue = () => {
    if (!date.start || !date.end || !time.start || !time.end) {
      const title = t('error');
      const message = t('pleaseFillAllFields');
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

    // check whether the selected time clash with the existing bookings
    let isClash = false;

    const selectedStartDate = dayjs(date.start).format('DD-MM-YYYY');
    const selectedEndDate = dayjs(date.end).format('DD-MM-YYYY');
    const selectedStartTime = dayjs(time.start).format('HH:mm');
    const selectedEndTime = dayjs(time.end).format('HH:mm');
    const selectedDateAndTimeObject = {
      selectedStartDate,
      selectedEndDate,
      selectedStartTime,
      selectedEndTime,
    };
    carBookings?.forEach((item: any) => {
      // key start_date and end_date format 08-04-2025 - DD-MM-YYYY
      // key end_date format 08-04-2025 - DD-MM-YYYY
      // key start_time format 13:00 - HH:mm
      // key end_time format 13:00 - HH:mm
      const checkIsClashing = checkClash(item, selectedDateAndTimeObject);
      if (checkIsClashing.isClashing) {
        isClash = true;
        const title = t('error');
        const message =
          t('carAlreadyBooked') +
          ` ${dayjs(checkIsClashing.itemStart)
            .utc()
            .format('DD-MM-YYYY hh:mm A')} to ${dayjs(checkIsClashing.itemEnd)
            .utc()
            .format('DD-MM-YYYY hh:mm A')}
          `;
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
    });

    if (isClash) {
      return;
    }

    let bookingPayload = {
      car_id: car_id,
      start_date_time: `${formatDate(date.start, 'YYYY-MM-DD')}T${formatDate(
        time.start,
        'HH:mm:ss',
      )}`,
      end_date_time: `${formatDate(date.end, 'YYYY-MM-DD')}T${formatDate(
        time.end,
        'HH:mm:ss',
      )}`,
      validate: true,
    };
    // console.log('bookingPayload', bookingPayload);
    validateBooking(bookingPayload);
  };

  const generateDateArray = (startDate, endDate) => {
    let start = dayjs(startDate, 'DD-MM-YYYY');
    let end = dayjs(endDate, 'DD-MM-YYYY');

    if (!start.isValid() || !end.isValid()) {
      console.error('Invalid date format');
      return [];
    }

    let daysDiff = end.diff(start, 'day') + 1; // Including end date
    let dateArray = [];

    for (let i = 0; i < daysDiff; i++) {
      dateArray.push(start.add(i, 'day').format('YYYY-MM-DD'));
    }

    return dateArray;
  };

  const getDisabledDates = () => {
    // returning the empty array as because of we don't want to show disable dates anymore.
    return [];

    // just remove the above return statement in case you want to show the disable dates.
    let datesArray: any = [];

    carBookings?.forEach((item: any) => {
      const localDatesArray = generateDateArray(
        item.start_date,
        item?.end_date,
      );
      console.log({localDatesArray});
      datesArray = [...new Set([...datesArray, ...localDatesArray])];
    });

    return datesArray;
  };

  return (
    <View style={styles.container}>
      <RangePicker
        date={date}
        setEndDate={e => setDate((prev: any) => ({...prev, end: e}))}
        setStartDate={e => setDate((prev: any) => ({...prev, start: e}))}
        disabledDates={getDisabledDates()}
      />

      <Row justifyContent="space-between" style={styles.timeContainer}>
        <TimePicker
          value={time.start ? String(time.start) : ''}
          onPress={tim => setTime((prev: any) => ({...prev, start: tim}))}
          label={t('pickUpTime')}
        />
        <TimePicker
          value={time.end ? String(time?.end) : null}
          onPress={tim => setTime((prev: any) => ({...prev, end: tim}))}
          label={t('returnTime')}
        />
      </Row>
      <CustomButton title={t('continueButton')} onPress={HandleContinue} />
    </View>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: widthPercentageToDP(10),
  },
  timeContainer: {
    gap: RFValue(12),
    marginVertical: RFValue(15),
  },
});
