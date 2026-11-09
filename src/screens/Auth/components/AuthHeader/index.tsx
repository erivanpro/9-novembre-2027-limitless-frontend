import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {CustomHeader, CustomImage, CustomText} from '../../../../components';
import {COLORS, FONT, IMAGES} from '../../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthHeaderProps} from './interface';
import * as Animatable from 'react-native-animatable';

const AuthHeader: FC<AuthHeaderProps> = ({
  heading,
  description,
  handleBackPress,
}) => {
  return (
    <Animatable.View animation="fadeIn" duration={1000}>
      <CustomHeader handleBackPress={(handleBackPress as () => void) ?? null} />
      <CustomImage
        source={IMAGES.logo}
        width={widthPercentageToDP(15)}
        height={widthPercentageToDP(15)}
        containerStyle={styles.logo}
      />
      {!!heading && <CustomText text={heading} style={styles.heading} />}
      {!!description && (
        <CustomText text={description} style={styles.description} />
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(4),
    fontSize: RFValue(24),
    fontFamily: FONT.poppins600,
    textAlign: 'center',
    color: COLORS.black,
  },
  description: {
    fontSize: RFValue(15),
    fontFamily: FONT.inter500,
    textAlign: 'center',
    color: COLORS.neutral400,
    marginTop: widthPercentageToDP(-3),
    paddingBottom: widthPercentageToDP(5),
  },
});
export default AuthHeader;
