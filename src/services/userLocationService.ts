import axiosInstance from '../service/api';
import {saveUserLocationEndpoint} from '../utils/endpoints';

export const saveUserLocationService = async (location: Object) => {
  // console.log({location});
  return await axiosInstance.patch(`${saveUserLocationEndpoint}`, location);
};
