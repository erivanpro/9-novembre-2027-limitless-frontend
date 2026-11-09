import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../CustomImage';
import {COLORS, IMAGES} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {ResizeMode} from 'react-native-fast-image';
import ImageViewing from 'react-native-image-viewing';

type CarouselImage = string | number | {uri?: string; path?: string};

const ViewerHeader: FC<{
  imageIndex: number;
  totalImages: number;
  onClose: () => void;
}> = ({imageIndex, totalImages, onClose}) => {
  return (
    <View style={styles.viewerHeader}>
      <Pressable onPress={onClose} style={styles.closeBtn}>
        <CustomImage
          source={IMAGES.crossIcon}
          width={RFValue(12)}
          height={RFValue(12)}
          tintColor={COLORS.white}
        />
      </Pressable>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {imageIndex + 1}/{totalImages}
        </Text>
      </View>
    </View>
  );
};

const CustomHorizontalCarousel: FC<{
  height?: number;
  width?: number;
  images: Array<CarouselImage>;
  imageResizeMode?: ResizeMode;
}> = ({
  height = hp(30),
  width = wp(100),
  images,
  imageResizeMode = 'cover',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);

  const viewerData = useMemo(() => {
    const imageSources: ImageSourcePropType[] = [];
    const indexMap: Record<number, number> = {};

    images.forEach((image, originalIndex) => {
      if (typeof image === 'string' && image.trim().length > 0) {
        indexMap[originalIndex] = imageSources.length;
        imageSources.push({uri: image});
        return;
      }

      if (typeof image === 'number') {
        indexMap[originalIndex] = imageSources.length;
        imageSources.push(image);
        return;
      }

      const uri = image?.uri || image?.path;
      if (typeof uri === 'string' && uri.trim().length > 0) {
        indexMap[originalIndex] = imageSources.length;
        imageSources.push({uri});
      }
    });

    return {imageSources, indexMap};
  }, [images]);

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const openImageViewer = (index: number) => {
    const selectedIndex = viewerData.indexMap[index];
    if (selectedIndex === undefined) {
      return;
    }

    setViewerImageIndex(selectedIndex);
    setIsViewerVisible(true);
  };

  const closeImageViewer = useCallback(() => {
    setIsViewerVisible(false);
  }, []);

  const renderViewerHeader = useCallback(
    ({imageIndex}: {imageIndex: number}) => (
      <ViewerHeader
        imageIndex={imageIndex}
        totalImages={viewerData.imageSources.length}
        onClose={closeImageViewer}
      />
    ),
    [closeImageViewer, viewerData.imageSources.length],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{height, width}}
        onScroll={onScroll}
        decelerationRate={'fast'}
        renderItem={({item, index}) => {
          return (
            <CustomImage
              source={typeof item === 'string' ? {uri: item} : item}
              width={width}
              height={height}
              style={styles.image}
              resizeMode={imageResizeMode}
              containerStyle={styles.imageContainer}
              onPressImage={() => openImageViewer(index)}
            />
          );
        }}
      />
      {images?.length > 1 && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorItem,
                {
                  backgroundColor:
                    index === currentIndex ? COLORS.white : COLORS.neutral200,
                },
              ]}
            />
          ))}
        </View>
      )}
      {!!viewerData.imageSources.length && (
        <ImageViewing
          images={viewerData.imageSources}
          imageIndex={viewerImageIndex}
          visible={isViewerVisible}
          onRequestClose={closeImageViewer}
          onImageIndexChange={index => setViewerImageIndex(index)}
          backgroundColor={COLORS.black}
          swipeToCloseEnabled
          doubleTapToZoomEnabled
          HeaderComponent={renderViewerHeader}
        />
      )}
    </View>
  );
};
export default CustomHorizontalCarousel;

const styles = StyleSheet.create({
  container: {
    // height: hp(34),
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(2),
    alignSelf: 'center',
    gap: RFValue(2),
    backgroundColor: COLORS.neutral300,
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(10),
  },
  indicatorItem: {
    height: RFValue(5),
    width: RFValue(5),
    borderRadius: RFValue(10),
  },
  imageContainer: {
    borderRadius: RFValue(10),
    backgroundColor: COLORS.neutral200,
  },
  image: {
    borderRadius: RFValue(10),
  },
  viewerHeader: {
    width: '100%',
    paddingHorizontal: RFValue(16),
    paddingTop: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    height: RFValue(36),
    width: RFValue(36),
    borderRadius: RFValue(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  counterContainer: {
    borderRadius: RFValue(14),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(6),
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  counterText: {
    color: COLORS.white,
    fontSize: RFValue(12),
    fontWeight: '600',
  },
});
