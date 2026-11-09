import React, {FC} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomIcon, CustomImage, CustomText} from '../../../../components';
import {AssistanceCardProps} from './interface';
import {COLORS, FONT} from '../../../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import useTranslate from '../../../../hooks/useTranslate';

const AssistanceCard: FC<AssistanceCardProps> = data => {
  const {thumbnail, title, id} = data;
  const {navigate} = useNavigation();
  const {t} = useTranslate();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('AssistanceDetails', {data})}>
      <CustomImage
        source={thumbnail as any}
        width={'100%'}
        height={widthPercentageToDP(30)}
        resizeMode="cover"
        style={styles.image}
        containerStyle={styles.imageContainer}
      />
      <View style={styles.footerContainer}>
        <CustomText text={title} textStyle={styles.title} />
        <View style={styles.footerCtaContainer}>
          <CustomText text={t('letsGo')} textStyle={styles.ctaText} />
          <CustomIcon
            type="AntDesign"
            icon="arrowright"
            size={RFValue(16)}
            color={COLORS.neutral400}
            style={styles.rightArrow}
            onPress={() => {}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssistanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(10),
    width: widthPercentageToDP(44),
    paddingBottom: widthPercentageToDP(3),
  },
  imageContainer: {
    borderTopStartRadius: RFValue(13),
    borderTopEndRadius: RFValue(13),
  },
  image: {
    alignSelf: 'flex-start',
  },
  footerContainer: {
    paddingHorizontal: widthPercentageToDP(2),
  },
  footerCtaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONT.poppins600,
    fontSize: RFValue(10),
    paddingVertical: widthPercentageToDP(2),
  },
  ctaText: {
    color: COLORS.neutral400,
    fontFamily: FONT.inter500,
    fontSize: RFValue(Platform.OS === 'android' ? 13 : 12),
  },
  rightArrow: {
    alignSelf: 'center',
  },
});
