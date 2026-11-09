import axiosInstance from '../service/api';
import {
  BookingEndpoint,
  CancelBookingEndpoint,
  userBookingEndpoint,
  userBookingReviewEndpoint,
} from '../utils/endpoints';

export const validateBookingService = async (payload: any) =>
  await axiosInstance.post(`${BookingEndpoint}`, payload);

export const cancelBookingService = async (payload: any) => {
  return await axiosInstance.patch(
    `${CancelBookingEndpoint}/${payload?.cancel_booking_id}`,
    {
      cancellation_reason: payload?.reason,
    },
  );
};
export const giveReviewsService = async (payload: any) => {
  return await axiosInstance.post(`${userBookingReviewEndpoint}`, payload);
};
export const getHostBookingByIdService = async ({id}: any) => {
  return await axiosInstance.get(`${BookingEndpoint}/${id}`);
};

export const getUserBookingByIdService = async ({id}: any) => {
  return await axiosInstance.get(`${userBookingEndpoint}/${id}`);
};

export const getCarBookingsByIdService = async ({id}: any) => {
  return await axiosInstance.get(`car/${id}/bookings`);
};
