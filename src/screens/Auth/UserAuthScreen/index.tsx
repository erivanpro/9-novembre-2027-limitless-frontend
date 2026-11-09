import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomImage,
  CustomText,
  CustomWrapper,
} from '../../../components';
import { COLORS, IMAGES } from '../../../utils/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '../../../utils/navigation';
import useTranslate from '../../../hooks/useTranslate';
import useAppAccentColor from '../../../hooks/useAppAccentColor';

const UserAuthScreen = () => {
  const { t } = useTranslate();
  const accentColor = useAppAccentColor();

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader />
      <View style={styles.container}>
        <CustomImage
          source={IMAGES.logoBlack}
          width={widthPercentageToDP(20)}
          height={widthPercentageToDP(20)}
          containerStyle={styles.authIcon}
        />
        <CustomText
          text={t('welcomeToLimitless')}
          center
          fontWeightPopins="600"
          fontSize="S22"
        />
        <CustomText
          text={t('userAuthDescription')}
          fontWeightInter="400"
          color={COLORS.neutral500}
          textStyle={styles.description}
          center
        />
        <CustomButton
          containerStyle={[styles.siginBtnContainer, {backgroundColor: accentColor}]}
          title={t('signIn')}
          onPress={() => navigate('Signin', { user_type: 'user' })}
        />
        <CustomButton
          title={t('createAnAccount')}
          onPress={() => navigate('Signup', { user_type: 'user' })}
          containerStyle={styles.signupBtnContainer}
          textStyle={styles.signupBtnText}
        />
      </View>
    </CustomWrapper>
  );
};

export default UserAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: widthPercentageToDP(10),
  },
  signupBtnContainer: {
    backgroundColor: '#F5F5F5',
    marginVertical: widthPercentageToDP(5),
  },
  siginBtnContainer: {
    backgroundColor: 'transparent',
  },
  signupBtnText: {
    color: COLORS.black,
    fontWeight: '500',
  },
  authIcon: {
    alignSelf: 'center',
    marginBottom: widthPercentageToDP(5),
  },
  description: {
    fontSize: RFValue(12),
    marginVertical: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(5),
  },
});
