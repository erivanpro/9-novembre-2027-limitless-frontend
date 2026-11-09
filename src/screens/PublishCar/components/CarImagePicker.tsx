import React, {FC} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../../../utils/theme';
import {CustomImagePickerSheet} from '../../../components';
import {CarImagePickerProps} from '../interface';

const CarImagePicker: FC<CarImagePickerProps> = ({images, setImages}) => {
  const HandleImageChange = (
    img: ImageSourcePropType | undefined,
    index: number,
  ) => {
    const prevImages: any[] = [...images];
    prevImages[index] = img;
    setImages(prevImages);
    FastImage.clearDiskCache();
    FastImage.clearMemoryCache();
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        data={images}
        renderItem={({item, index}) => {
          // console.log('🚀 ~ item:', item);

          return (
            <View style={styles.item}>
              <CustomImagePickerSheet
                onChange={img => HandleImageChange(img, index)}
                onRemoveImage={() => HandleImageChange(undefined, index)}
                source={
                  typeof item === 'string'
                    ? {uri: item}
                    : item || IMAGES.carPlaceholderImage
                }
                carImage
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default CarImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: wp(2),
  },
  item: {
    width: wp(Platform.OS === 'ios' ? 21.5 : 21),
    height: wp(Platform.OS === 'ios' ? 20 : 20),

    marginRight: wp(0.5),
    marginLeft: wp(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
