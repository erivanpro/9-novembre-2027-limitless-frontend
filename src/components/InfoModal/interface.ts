import type {ImageSourcePropType} from 'react-native';

export interface InfoModalProps {
  isVisible: boolean;
  iconImage?: ImageSourcePropType;
  btnText?: string;
  title: string;
  description?: string;
  btnOnPress?: () => void|any;
  btnLoading?: boolean;
  btnBackgroundColor?: string;
  maxHeight?: number;
  iconStyle?: any;
  secondaryBtnText?: string;
  secondaryBtnOnPress?: () => void;
}
