import axiosInstance from '../service/api';
import {
  getUserCarDetailsEndpoint,
  getUserCarMapEndpoint,
  getUserCarsEndpoint,
  userDetailEndPoint,
  userDetailMainPoint,
} from '../utils/endpoints';

export const getUserCarsService = async ({skip, take, filters}: any) => {
  // console.log({filters});

  const resp = await axiosInstance.get(`${getUserCarsEndpoint}`, {
    params: {skip, take, ...filters},
  });

  return resp;
};

// to be implemented for limited car information on maps card
export const getUserCarByIdService = async ({id}: {id: number}) => {
  return await axiosInstance.get(`${getUserCarDetailsEndpoint}`, {
    params: {id},
  });
};

export const getUserDetailsService = async () => {
  return await axiosInstance.get(`${userDetailEndPoint}`);
};

export const getUserCarMapService = async ({skip, take}: any) => {
  return await axiosInstance.get(`${getUserCarMapEndpoint}`, {
    params: {skip, take},
  });
};

export const getUserCarDetailsService = async (filters: any) => {
  const res = await axiosInstance.get(
    `${getUserCarDetailsEndpoint}/${filters.id}`,
    {
      params: {
        // user_id: filters.user_id,
        chat_type: filters.chat_type,
      },
    },
  );
  return res;
};
