import axiosInstance from '../service/api';
import {HelpcenterEndpoint} from '../utils/endpoints';

export const getHelpcenterDataService = async (search: string) => {
  const response = await axiosInstance.get(
    `${HelpcenterEndpoint}?search=${search}`,
  );

  return response;
};