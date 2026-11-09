import {useQuery} from '@tanstack/react-query';
import {getHelpcenterDataService} from '../services/helpcenterService';

export const useHelpcenter = (params: any) => {

  const getHelpcenterData = useQuery({
    queryKey: ['terms', params?.search],
    queryFn: () => getHelpcenterDataService(params?.search),
  });

  return {
    getHelpcenterData: getHelpcenterData,
    getHelpcenterDataLoading: getHelpcenterData.isPending,
  };
};
