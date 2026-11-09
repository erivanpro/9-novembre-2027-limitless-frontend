import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomImage,
  CustomText,
  CustomWrapper,
} from '../../../components';
import { COLORS } from '../../../utils/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '../../../utils/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslate } from '../../../hooks/useTranslate';
import AuthConnectSkia from './AuthConnectSkia';

const UserAuthCarDetailsScreen = () => {
  const { t } = useTranslate();
  type PropParamsType = {
    UserAuthCarDetailsScreen: {
      id: string;
      name: string;
      image: string;
    };
  };
  const routeParams =
    useRoute<RouteProp<PropParamsType, 'UserAuthCarDetailsScreen'>>().params;

  const { id, name, image } = routeParams || {};

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title={t('carDetails')} />
      <View style={styles.container}>
        <CustomText text={name} center fontWeightPopins="600" fontSize="S22" />
        <CustomImage
          source={{ uri: image }}
          width={widthPercentageToDP(90)}
          height={widthPercentageToDP(35)}
          containerStyle={styles.selectedCarImage}
          resizeMode="cover"
        />
        <View style={styles.authIllustration}>
          <AuthConnectSkia />
        </View>
        <CustomText
          text={t('connectAccountToGetStarted')}
          fontWeightPopins="600"
          color={COLORS.black}
          textStyle={styles.description}
          center
        />

        <CustomButton
          title={t('signInButton')}
          onPress={() => navigate('Signin', { id })}
        />
        <CustomButton
          title={t('createAccountTitle')}
          onPress={() => navigate('Signup', { id, user_type: 'user' })}
          containerStyle={styles.signupBtnContainer}
          textStyle={styles.signupBtnText}
        />
      </View>
    </CustomWrapper>
  );
};

export default UserAuthCarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: widthPercentageToDP(2),
    justifyContent: 'flex-start',
  },
  signupBtnContainer: {
    backgroundColor: COLORS.neutral400,
    marginVertical: widthPercentageToDP(5),
  },
  signupBtnText: {
    color: COLORS.white,
  },
  selectedCarImage: {
    alignSelf: 'center',
    marginVertical: widthPercentageToDP(5),
    borderRadius: RFValue(10),
  },
  authIllustration: {
    alignSelf: 'center',
    marginVertical: widthPercentageToDP(1.5),
  },
  description: {
    fontSize: RFValue(14),
    marginVertical: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(5),
  },
});
