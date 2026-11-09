import {RootStackNavigationType} from '../../../../utils/types/navigationType';

export interface ProfileItemProps {
  data: {
    icon: string;
    title: string;
    path?: keyof RootStackNavigationType;
    externalUrl?: string;
    callback?: (va?: any) => void | undefined;
    isToggle?: any;
    isEnable?: string;
    isDisable?: string;
    pref?: string;
    isLanguage?: boolean;
  };
}

export interface ProfileList {
  icon: string;
  title: string;
  path?: keyof RootStackNavigationType;
  externalUrl?: string;
  callback?: (va: any) => void | undefined;
  isEnable?: string;
  isDisable?: string;
  pref?: string;
  isLanguage?: boolean;
}
