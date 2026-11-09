import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const CustomStarRating = ({
  rating,
  starStyle,
  setRating,
  starSize,
  emptyColor = false,
  containerStyle,
  enableHalfStar,
}: {
  rating: number;
  starStyle?: StyleProp<ViewStyle>;
  setRating?: (value: number) => void | undefined;
  starSize?: number;
  emptyColor?: boolean;
  containerStyle?: ViewStyle;
  enableHalfStar?: boolean;
}) => {
  return (
    <View style={containerStyle}>
      <StarRating
        rating={isNaN(rating as number) ? 0 : Number(rating)}
        onChange={setRating || (() => {})}
        starStyle={[styles.starStyle, starStyle]}
        starSize={starSize || RFValue(15)}
        color={COLORS.warning500}
        emptyColor={emptyColor ? '#000' : COLORS.warning500}
        enableHalfStar={enableHalfStar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  starStyle: {
    marginHorizontal: widthPercentageToDP(0),
  },
});

export default React.memo(CustomStarRating);
