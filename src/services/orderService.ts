import axiosInstance from '../service/api';
import {getHostOrdersEndpoint, getUserOrdersEndpoint} from '../utils/endpoints';

export const getUserOrdersService = async ({
  skip,
  take,
  status = 'Ongoing',
}: {
  skip: number;
  take: number;
  status: string;
}) => {
  return await axiosInstance.get(
    `${getUserOrdersEndpoint}?skip=${skip}&take=${take}&status=${status}`,
  );
};

export const getHostOrdersService = async ({
  skip,
  take,
  status = 'Ongoing',
}: {
  skip: number;
  take: number;
  status: string;
}) => {
  return await axiosInstance.get(
    `${getHostOrdersEndpoint}?skip=${skip}&take=${take}&status=${status}`,
  );
};
