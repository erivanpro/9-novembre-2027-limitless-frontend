import {useInfiniteQuery} from '@tanstack/react-query';

import {
  getHostOrdersService,
  getUserOrdersService,
} from '../services/orderService';

export const useOrders = (params?: any) => {
  const getMyOrdersQuery = useInfiniteQuery({
    queryKey: ['myOrders', params?.status],
    queryFn: ({pageParam = 0}) =>
      getUserOrdersService({skip: pageParam, take: 10, status: params?.status}),
    getNextPageParam: (_lastPage, pages) => {
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const getOrdersForMyCarQuery = useInfiniteQuery({
    queryKey: ['hostOrders', params?.status],
    queryFn: ({pageParam = 0}) =>
      getHostOrdersService({skip: pageParam, take: 10, status: params?.status}),
    getNextPageParam: (_lastPage, pages) => {
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  return {
    getMyOrders: getMyOrdersQuery,
    getMyOrdersLoading: getMyOrdersQuery.isFetching,

    getOrdersForMyCar: getOrdersForMyCarQuery,
    getOrdersForMyCarLoading: getOrdersForMyCarQuery.isPending,
  };
};
