import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {ResizeMode, Source} from 'react-native-fast-image';

export interface CustomImageProps {
  editable?: boolean;
  source?: Source;
  height?: number | string;
  width?: number | string;
  onPressImage?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  resizeMode?: ResizeMode;
  loading?: boolean;
  style?: StyleProp<ImageStyle>;
  tintColor?: string;
}
