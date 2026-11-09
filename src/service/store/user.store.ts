import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {UserStoreType} from '../../utils/types/ZustandStoreType';

export const defaultUserState = {};
const useUserStore = create(
  persist<UserStoreType>(
    (set, _) => ({
      userDetails: null,
      isHost: false,
      isHostMode: false,
      hasSeenOnboarding: false,
      shouldShowRoleChooser: false,
      isFcmToken: false,
      appAccentColor: '#33bb78',

      setUserDetails: userData => {
        set({
          isHost: userData?.user_type?.includes('host'),
          userDetails: userData,
        });
      },
      accessToken: '',
      setAccessToken: token =>
        set({
          accessToken: token,
        }),
      setHostMode: status =>
        set({
          isHostMode: status,
        }),
      setOnboardingStatus: (status: boolean) =>
        set({
          hasSeenOnboarding: status,
        }),
      setRoleChooserPending: (status: boolean) =>
        set({
          shouldShowRoleChooser: status,
        }),

      setIsFcmToken: (status: boolean) =>
        set({
          isFcmToken: status,
        }),
      setAppAccentColor: (color: string) =>
        set({
          appAccentColor: color,
        }),
    }),

    {
      name: 'userDetails', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useUserStore;
