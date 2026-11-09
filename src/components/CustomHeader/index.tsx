import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomHeaderProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, IMAGES} from '../../utils/theme';
import CustomImage from '../CustomImage';
import {navigateGoBack} from '../../utils/navigation';
import {CustomText} from '../CustomText';

const CustomHeader: FC<CustomHeaderProps> = ({
  title,
  handleBackPress,
  hideBackBtn,
  containerStyle,
  rightIcon,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!hideBackBtn ? (
        <CustomImage
          onPressImage={handleBackPress || navigateGoBack}
          source={IMAGES.back}
          height={RFValue(34)}
          width={RFValue(34)}
        />
      ) : (
        <View style={styles.emptyImage} /> // for title to be always in center
      )}
      {!!title ? (
        <View style={{right: RFValue(15)}}>
          <CustomText
            numberOfLines={1}
            text={title}
            textStyle={{maxWidth: RFValue(360)}}
            color={COLORS.black}
            fontWeightPopins="600"
            fontSize="S16"
          />
        </View>
      ) : (
        <View />
      )}
      {rightIcon ? rightIcon : <View />}
      {/* <View /> */}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(5),
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: COLORS.neutral100,
    borderRadius: RFValue(100),
    padding: RFValue(3),
  },
  emptyImage: {
    width: RFValue(34),
    height: RFValue(34),
  },
});
