import {ReactNode} from 'react';
import {TextStyle} from 'react-native';

export interface CustomButtonProps {
  title?: string;
  onPress: () => void;
  loading?: boolean;
  loadingColor?: string;
  containerStyle?: Object;
  disabled?: boolean;
  isValid?: boolean;
  textStyle?: TextStyle | undefined;
  secondary?: boolean;
  children?: ReactNode;
}
