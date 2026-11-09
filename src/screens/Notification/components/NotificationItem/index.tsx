import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {NotificationItemProps} from './interface';
import {CustomImage, CustomText} from '../../../../components';
import {COLORS, FONT, IMAGES} from '../../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const NotificationItem: FC<NotificationItemProps> = ({title, time}) => {
  return (
    <View>
      <View style={styles.row}>
        <CustomImage
          source={IMAGES.logo}
          width={widthPercentageToDP(11)}
          height={widthPercentageToDP(11)}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />
        <View style={styles.textContainer}>
          <CustomText
            text={title}
            textStyle={styles.title}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
          <CustomText text={time} textStyle={styles.time} />
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(12),
  },
  time: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(12),
    color: COLORS.neutral400,
  },
  image: {
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    marginRight: widthPercentageToDP(3.5),
    alignSelf: 'flex-start',
  },
  textContainer: {
    flex: 1,
    maxWidth: '80%',
  },
});
