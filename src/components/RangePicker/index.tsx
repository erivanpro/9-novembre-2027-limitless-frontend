import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {addUnitTime} from '../../utils/dayjs';
import {COLORS} from '../../utils/theme';
import {useTranslate} from '../../hooks/useTranslate';

const RangePicker = ({
  date,
  setEndDate,
  setStartDate,
  disabledDates,
}: {
  date: any;
  setStartDate?: (e: any) => void;
  setEndDate?: (e: any) => void;
  disabledDates?: [];
}) => {
  const {t} = useTranslate();
  const minDate = new Date(); // Today

  const HandleDateChange = (date: Date, type: string) => {
    if (type === 'END_DATE') {
      setEndDate?.(date);
    } else {
      setStartDate?.(date);
      setEndDate?.('');
    }
  };
  return (
    <CalendarPicker
      startFromMonday={true}
      allowRangeSelection={true}
      allowBackwardRangeSelect={true}
      minDate={minDate}
      weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
      previousTitle={t('prev')}
      nextTitle={t('next')}
      // maxDate={addUnitTime(6, 'month')}
      todayBackgroundColor={COLORS.neutral400}
      selectedDayColor={COLORS.primary}
      selectedDayTextColor="#FFFFFF"
      selectedStartDate={date?.start}
      selectedEndDate={date?.end}
      onDateChange={HandleDateChange}
      disabledDates={disabledDates}
    />
  );
};

export default RangePicker;
