import React from 'react';
import {Image, ImageSourcePropType, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CustomImageProps} from './interface';

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  height,
  width,
  onPressImage,
  containerStyle,
  disabled,
  resizeMode,
  style,
  tintColor,
}) => {
  return (
    <>
      <Pressable
        disabled={typeof onPressImage !== 'function' || disabled}
        onPress={() =>
          typeof onPressImage === 'function' ? onPressImage() : {}
        }
        style={[
          {
            height: height as number | undefined,
            width: width as number | undefined,
          },
          styles.container,
          containerStyle,
        ]}>
        {source?.uri || source?.path ? (
          <FastImage
            source={{uri: source?.uri || source?.path}}
            style={[styles.image, style]}
            resizeMode={resizeMode || 'contain'}
            placeholder={{blurhash: 'LcGJ1-IU$+InWEWBM{WB~XjbNFof'}}
          />
        ) : (
          <Image
            source={source as ImageSourcePropType}
            style={[styles.image, style]}
            resizeMode={resizeMode || 'contain'}
            tintColor={tintColor}
          />
        )}
      </Pressable>
    </>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 1000,
  },
  image: {height: '100%', width: '100%'},
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
