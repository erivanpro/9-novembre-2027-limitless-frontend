import {Source} from 'react-native-fast-image';

export interface EmptyScreenProps {
  image?: Source;
  title?: string;
  description?: string;
  btnText?: string;
  btnOnPress?: () => void;
  flex?: number;
  imageContainerStyle?: any;
}
