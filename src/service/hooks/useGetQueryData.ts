import {ApiResponse} from '../../utils/types/apiResponseType';
import {get} from '../api/api';
import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query';

interface ApiError extends Error {
  statusCode?: number;
  message: string;
  data?: any;
}

export const useGetQueryData = <T>({
  endPoint,
  query,

  ...rest
}: {
  endPoint: string;
  query?: string;
  rest?: UseQueryOptions<ApiResponse<T>, ApiError>;
}): UseQueryResult<ApiResponse<T>, ApiError> => {
  const {...queryInfo} = useQuery<ApiResponse<T>, ApiError>({
    queryKey: [endPoint, query],
    queryFn: () => get({endPoint, query}),
    ...rest,
  });

  return {...queryInfo};
};
