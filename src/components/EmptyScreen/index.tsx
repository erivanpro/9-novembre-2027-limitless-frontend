import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {EmptyScreenProps} from './interface';
import {CustomText} from '../CustomText';
import CustomButton from '../CustomButton';
import CustomImage from '../CustomImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import { COLORS } from '../../utils/theme';

const EmptyScreen: FC<EmptyScreenProps> = ({
  image,
  title,
  btnText,
  btnOnPress,
  flex = 1,
  imageContainerStyle,
}) => {
  return (
    <View style={[styles.container, {flex: flex}]}>
      <View style={styles.child}>
        {!!image && (
          <CustomImage
            source={image}
            containerStyle={[styles.imageContainer, imageContainerStyle]}
          />
        )}
        <CustomText text={title}   style={styles.title} />
        {btnText && (
          <CustomButton
            title={btnText}
            onPress={() => btnOnPress?.()}
            containerStyle={styles.btn}
          />
        )}
      </View>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: widthPercentageToDP(95),
  },
  child: {
    justifyContent: 'center',
  },
  flex1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginVertical: widthPercentageToDP(3),
    color:COLORS.neutral200
  },
  imageContainer: {
    alignSelf: 'center',
    height: heightPercentageToDP(13),
    width: widthPercentageToDP(30),
  },
  btn: {
    borderRadius: RFValue(20),
    marginVertical: widthPercentageToDP(5),
  },
});
