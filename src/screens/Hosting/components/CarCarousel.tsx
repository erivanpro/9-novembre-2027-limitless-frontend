import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CustomHorizontalCarousel} from '../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const CarCarousel = ({images}: {images: string[]}) => {
  const carouselWidth = widthPercentageToDP(92);
  const carouselHeight = widthPercentageToDP(52);

  return (
    <View style={styles.caresulContainer}>
      <CustomHorizontalCarousel
        width={carouselWidth}
        height={carouselHeight}
        images={images}
        imageResizeMode="contain"
      />
    </View>
  );
};

export default CarCarousel;

const styles = StyleSheet.create({
  caresulContainer: {
    paddingTop: widthPercentageToDP(1),
  },
});
