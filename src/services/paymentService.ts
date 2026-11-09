import axiosInstance from '../service/api';
import {
  paymentCardListEndpoint,
  paymentIntentEndpoint,
  paymentMethodEndpoint,
  setupIntentEndpoint,
} from '../utils/endpoints';

export const setupIntentService = async (payload: any) => {
  return await axiosInstance.post(setupIntentEndpoint, payload);
};

export const paymentMethodListService = async (payload: any) => {
  return await axiosInstance.get(
    `${paymentCardListEndpoint}?customer_id=${payload?.customer_id}&limit=10`,
  );
};

export const paymentIntentService = async (payload: any) => {
  return await axiosInstance.post(`${paymentIntentEndpoint}`, payload);
};

export const detachPaymentService = async (id: any) => {
  // console.log('🚀 ~ detachPaymentService ~ id:');
  return await axiosInstance.delete(`${paymentMethodEndpoint}/${id}`);
};

