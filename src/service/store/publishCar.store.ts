import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {PublichCarStoreType} from '../../utils/types/ZustandStoreType';
import {
  CarFeaturesType,
  CarInfoType,
  CarSpecificationType,
} from '../../utils/types/apiResponseType';

export const defaultUserState = {};
const usePublishCarStore = create(
  persist<PublichCarStoreType>(
    (set, _) => ({
      carInfo: null,
      carSpecification: null,
      carFeatures: null,
      setCarInfo: (carInfo: CarInfoType) =>
        set({
          carInfo: carInfo,
        }),
      setCarSpecification: (carSpecification: CarSpecificationType) =>
        set({
          carSpecification: carSpecification,
        }),
      setCarFeatures: (carFeatures: CarFeaturesType) =>
        set({
          carFeatures: carFeatures,
        }),
    }),

    {
      name: 'carInfo', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);

export default usePublishCarStore;
