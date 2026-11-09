import {useMutation} from '@tanstack/react-query';
import {saveUserLocationService} from '../services/userLocationService';
import {queryClient} from '../..';

export const useLocation = () => {
  const saveUserLocation = useMutation({
    mutationKey: ['userLocation'],
    mutationFn: saveUserLocationService,

    onSuccess: async data => {

      queryClient.invalidateQueries({
        queryKey: ['getUserCars'],
      });
    },
  });

  return {
    saveUserLocation: saveUserLocation.mutate,
    saveUserLocationLoading: saveUserLocation.isPending,
  };
};
