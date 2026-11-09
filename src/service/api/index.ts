import axios from 'axios';
import {API_URL} from '../../utils/constants';
import useUserStore from '../store/user.store';
import MMKVStorage from '../../utils/MMKVStorage';
import {navigate, navigateReplace, navigateReset} from '../../utils/navigation';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = useUserStore.getState()?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken =
        useUserStore.getState()?.refreshToken ||
        (await MMKVStorage.getItem('refreshToken'));

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}auth/refresh`, {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;

          useUserStore.setState({accessToken: newAccessToken});
          await MMKVStorage.setItem('accessToken', newAccessToken);

          // // Retry the failed request with the new token
          // error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          // return axiosInstance.request(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          useUserStore.setState({
            accessToken: null,
            refreshToken: null,
            userDetails: null,
          });
          await MMKVStorage.removeItem('fcmtoken');
          // navigateReset('RootStack');
        }
      } else {
        // No refresh token, navigate to the login screen
        useUserStore.setState({
          accessToken: null,
          refreshToken: null,
          userDetails: null,
        });
        await MMKVStorage.removeItem('fcmtoken');
        // navigateReset('RootStack');
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
