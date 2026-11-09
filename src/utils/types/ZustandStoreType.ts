import {
  CarFeaturesType,
  CarInfoType,
  CarSpecificationType,
  UserDetailsType,
} from './apiResponseType';

export interface UserStoreType {
  userDetails: UserDetailsType | null;
  accessToken: string;
  isFcmToken: boolean;
  isHost?: boolean;
  isHostMode?: boolean;
  appAccentColor: string;
  setUserDetails: (value: UserDetailsType) => void;
  setAccessToken: (value: string) => void;
  setHostMode?: (value: boolean) => void;
  setOnboardingStatus: (value: boolean) => void;
  shouldShowRoleChooser: boolean;
  setRoleChooserPending: (value: boolean) => void;
  setIsFcmToken: (value: boolean) => void;
  setAppAccentColor: (value: string) => void;
  hasSeenOnboarding?: boolean;
  fcmToken?: string | undefined | any;
  setFcmToken?: (value: string) => void;
}

export interface PublichCarStoreType {
  carInfo: CarInfoType | null;
  setCarInfo: (value: CarInfoType) => void;
  carSpecification: CarSpecificationType | null;
  setCarSpecification: (value: CarSpecificationType) => void;
  carFeatures: CarFeaturesType | null;
  setCarFeatures: (value: CarFeaturesType) => void;
}

export interface ChatStoreType {
  messages?: any;
  chatId: string | null;
  chatType: string | null;
  setChatId: (id: string) => void;
  setChatType: (type: string) => void;
  receiverId?: string | null;
  setReceiverId: (id: string) => void;
  senderId?: string | null;
  setSenderId: (id: string) => void;
}

export interface BookingStoreType {
  selectedCarDetails: any;
  setSelectedCarDetails?: (details: any) => void;
}
export interface LanguageStoreType {
  language: string;
  setLanguage: (language: string) => void;
}
