import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {COLORS} from '../../utils/theme';
import {CustomIconProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  type,
  color,
  onPress,
  size,
  style,
  onLongPress,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={
        typeof onPress === 'function'
          ? false
          : typeof onLongPress === 'function'
          ? false
          : true
      }>
      {type === 'Entypo' && (
        <Entypo
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'Ionicons' && (
        <Ionicons
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'FontAwesome' && (
        <FontAwesome
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'FontAwesome6' && (
        <FontAwesome6
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'Fontisto' && (
        <Fontisto
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'FontAwesome5' && (
        <FontAwesome5
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'Feather' && (
        <Feather
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'MaterialIcons' && (
        <MaterialIcons
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          disabled
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'Foundation' && (
        <Foundation
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'AntDesign' && (
        <AntDesign
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'SimpleLineIcons' && (
        <SimpleLineIcons
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'EvilIcons' && (
        <EvilIcons
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type === 'Octicons' && (
        <Octicons
          name={icon}
          color={color || COLORS.black}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
    </TouchableOpacity>
  );
};
