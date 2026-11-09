// all helper functions here

import {dayjs, formatDate, isToday} from './dayjs';
import MMKVStorage from './MMKVStorage';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const errorFormatter = (error: any) => {
  if (error.includes('Unauthorized')) {
    return 'Unauthorized';
  }
  if (Array.isArray(error)) {
    return error.map(err => err).join('\n');
  }
  return error?.message || error;
};

export const getInitials = (name: string) => {
  let first_name = name.split(' ')[0];
  let last_name = name.split(' ')[1];
  let full_name = first_name + ' ' + last_name.charAt(0) + '.';
  return full_name;
};

export const formatStars = (stars: number) => {
  return stars.toFixed(1);
};

export const limitText = (text: string, limit: number) => {
  return text?.length > limit ? text?.substring(0, limit) + '...' : text;
};

export function transformNotificationData(rowData) {
  if (!rowData) {
    return [];
  }
  const groupedMap = rowData.reduce((acc, item) => {
    const dateObj = item.createdAt;

    const dateKey = isToday(dateObj)
      ? 'Today'
      : dayjs(dateObj).format('DD MMM');

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push({
      title: item.message,
      time: dayjs(item.createdAt).format('hh:mm A'),
    });

    return acc;
  }, {});

  return Object.entries(groupedMap).map(([date, data]) => ({date, data}));
}

export async function GetFCMToken() {
  let fcmtoken = await MMKVStorage.getItem('fcmtoken');
  console.log({fcmtoken});
  if (fcmtoken) {
    return fcmtoken;
  } else if (!fcmtoken) {
    try {
      const newToken = await messaging().getToken();
      if (newToken) {
        await MMKVStorage.setItem('fcmtoken', newToken);
      }
      return newToken;
    } catch (error) {}
  }
}

export function convertTo12HourFormat(time24) {
  // Split the input time into hours, minutes, and seconds
  const [hours, minutes, seconds] = time24.split(':').map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour time to 12-hour time
  const hours12 = hours % 12 || 12; // If hours is 0 or 12, set to 12

  // Format the time in 12-hour format with leading zeros
  const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${period}`;

  return formattedTime;
}

export const getUserLocation = async (): Promise<{
  lat: number;
  lng: number;
} | null> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return null;
      }
    }

    return new Promise((resolve, reject) => {
      let isResolved = false;

      Geolocation.getCurrentPosition(
        position => {
          if (!isResolved) {
            isResolved = true;
            const {latitude, longitude} = position.coords;
            console.log('Location:', latitude, longitude);
            resolve({lat: latitude, lng: longitude});
          }
        },
        error => {
          if (!isResolved) {
            isResolved = true;
            console.log('Geolocation error:', error);
            resolve(null);
          }
        },
        // {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
      );

      // Safety timeout to prevent callback loss
      setTimeout(() => {
        if (!isResolved) {
          console.log('Location request timeout');
          isResolved = true;
          resolve(null);
        }
      }, 20000);
    });
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

export const getCeil30MinInterval = (now: Date) => {
  const minutes = now.getMinutes();

  const flooredMinutes = Math.ceil(minutes / 30) * 30;

  now.setMinutes(flooredMinutes, 0, 0);

  return now;
};
