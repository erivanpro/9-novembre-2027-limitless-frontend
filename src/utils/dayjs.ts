import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat); // parsing date in calendar --- DO NOT REMOVE IT

const formatDate = (date: string, format = 'MMM DD YYYY ') => {
  return dayjs(date).format(format);
};

const getMaxAgeDate = (years = 18) => {
  return dayjs().subtract(years, 'years').toDate();
};

const addUnitTime = (value = 18, key = 'years') => {
  return dayjs().add(value, key).toDate();
};

export const isToday = (date: string) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export {dayjs, formatDate, getMaxAgeDate, addUnitTime};
