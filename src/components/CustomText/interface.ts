import {ReactNode} from 'react';
import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

// extend TextProps with custom text props

export interface CustomTextProps extends TextProps {
  text: ReactNode;

  underline?: boolean;

  color?: string;

  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;

  textStyle?: StyleProp<ViewStyle | TextStyle>;
  center?: boolean;

  fontSize?: FontSizeType;

  fontWeightPopins?: FontWeightsType;
  fontWeightInter?: FontWeightsType;
  lineHeight?: number;
  rest?: TextProps | Object;
}

export type FontSizeType =
  | 'S8'
  | 'S9'
  | 'S10'
  | 'S11'
  | 'S12'
  | 'S13'
  | 'S14'
  | 'S15'
  | 'S16'
  | 'S17'
  | 'S18'
  | 'S19'
  | 'S20'
  | 'S21'
  | 'S22'
  | 'S23'
  | 'S24'
  | 'S25'
  | 'S26'
  | 'S27'
  | 'S28';
export type FontWeightsType =
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
