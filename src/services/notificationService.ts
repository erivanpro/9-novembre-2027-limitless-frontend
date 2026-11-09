import axiosInstance from '../service/api';
import {
  getNotificationsEndpoint,
  notificationsPerference,
  saveFCMTokenEndpoint,
} from '../utils/endpoints';

export const getNotificationService = async ({
  skip = 0,
  take = 100,
}: {
  skip: number;
  take: number;
}) => {
  return await axiosInstance.get(
    `${getNotificationsEndpoint}?skip=${skip}&take=${take}`,
  );
};

export const saveFCMTokenService = async ({fcmToken}: {fcmToken: string}) => {
  return await axiosInstance.post(`${saveFCMTokenEndpoint}`, {
    fcmToken,
  });
};

export const setNotificationsSwitch = async (preference: string) => {
  return axiosInstance.post(`${notificationsPerference}`, {
    preference: preference,
  });
};
