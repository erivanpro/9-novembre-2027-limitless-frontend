import {useMutation} from '@tanstack/react-query';
import {mutationFunction} from '../api/api';
import {ApiResponse} from '../../utils/types/apiResponseType';
import useUserStore, {defaultUserState} from '../store/user.store';

interface ApiError extends Error {
  status: number;
  message: string;
  data?: any;
}

export const useMutationQueryData = <Payload, T>({
  endPoint,
  method,
  errorFunction,
  successFunction,
  mutateFunction,
  stopToast,
}: {
  endPoint: string;
  method: 'post' | 'put' | 'delete' | 'get';
  stopToast?: boolean;
  errorFunction?: (error: ApiError) => void;
  successFunction?: ({data, variable}: {data: T; variable: Payload}) => void;
  mutateFunction?: (variable: Payload) => void;
}) => {
  const {setUserDetails, setAccessToken} = useUserStore();
  const {...mutationData} = useMutation<ApiResponse<T>, ApiError, Payload>({
    mutationFn: (data: Payload) =>
      mutationFunction({
        endPoint,
        body: data,
        method: method,
        stopToast,
      }) as any,
    onMutate: (variable: Payload) => {
      mutateFunction && mutateFunction(variable);
    },
    onError: (error: ApiError) => {
      if (error.status === 410 || error.status === 403) {
        setAccessToken('');
        setUserDetails(defaultUserState);
        // navigateReset('SelectRole');
      }

      errorFunction && errorFunction(error);
    },
    onSuccess: (data, variable) => {
      successFunction &&
        successFunction({data, variable} as {data: T; variable: Payload});
    },
  });
  return {...mutationData};
};
