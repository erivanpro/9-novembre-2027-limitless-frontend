import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {BookingStoreType} from '../../utils/types/ZustandStoreType';

export const defaultChatState = {};
const useBookingStore = create(
  persist<BookingStoreType>(
    (set, _) => ({
      selectedCarDetails: null,
      setSelectedCarDetails: (details: any) =>
        set({
          selectedCarDetails: details,
        }),
    }),

    {
      name: 'chat', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useBookingStore;
