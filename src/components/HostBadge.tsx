import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Source} from 'react-native-fast-image';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import CustomImage from './CustomImage';
import {CustomText} from './CustomText';
import {COLORS, SHADOWS} from '../utils/theme';
import {limitText} from '../utils/helper';
import CustomStarRating from './CustomStarRating';

const HostBadge = ({
  name,
  location,
  picture,
  rating,
}: {
  name: string;
  location?: string;
  picture: Source;
  rating?: number;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomImage
          source={typeof picture === 'string' ? {uri: picture} : picture}
          containerStyle={styles.picture}
          resizeMode="cover"
        />
        <View style={styles.textGroup}>
          <CustomText
            text={limitText(name, 17)}
            fontWeightPopins="600"
            fontSize="S9"
          />
          {location && (
            <CustomText
              text={limitText(location, 17)}
              color={COLORS.neutral300}
              fontWeightInter="500"
              fontSize="S8"
            />
          )}
          {(rating || rating === 0) && (
            <View>
              <CustomStarRating
                rating={rating}
                starStyle={{marginHorizontal: RFValue(-1)}}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HostBadge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingRight: RFValue(10),
    paddingLeft: RFValue(4),
    paddingVertical: RFValue(3),
    borderRadius: RFValue(100),

    ...SHADOWS.light,
  },
  picture: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGroup: {
    marginLeft: widthPercentageToDP(2),
  },
});
