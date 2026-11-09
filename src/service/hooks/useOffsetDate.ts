import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
const useOffsetDate = () => {
  const encodeTime = (selectedDate: any) => {


    const getUserTimeZone = () => {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const userTimeZone = getUserTimeZone();

    let res: string = dayjs(selectedDate)
      .tz(userTimeZone)
      .local()
      .format('YYYY-MM-DDTHH:mm:ssZ');

    let date = encodeURIComponent(res);
    let response = date == 'Invalid%20Date' ? undefined : date;
    return response;
  };
  return {encodeTime};
};

export default useOffsetDate;
