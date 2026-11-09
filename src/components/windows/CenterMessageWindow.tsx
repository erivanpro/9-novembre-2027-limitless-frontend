import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ErrorIcon from './ErrorIcon';
import { COLORS, FONT } from '../../utils/theme';
import useCenterMessageWindowStore from '../../service/store/centerMessageWindow.store';
import CustomButton from '../CustomButton';
import { CustomText } from '../CustomText';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const CenterMessageWindow = () => {
  const accentColor = useAppAccentColor();

  const { isVisible, title, message, buttonText, hideWindow } =
    useCenterMessageWindowStore();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hideWindow}
      onBackButtonPress={hideWindow}
      backdropOpacity={0.35}
      useNativeDriver
      animationIn="zoomIn"
      animationOut="zoomOut"
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <ErrorIcon />
          </View>

          <CustomText
            text={title}
            center
            color={COLORS.error600}
            textStyle={styles.title}
          />

          <CustomText
            text={message}
            center
            color="#6B7280"
            textStyle={styles.description}
          />
        </View>

        <CustomButton
          title={buttonText}
          onPress={hideWindow}
          containerStyle={[
            styles.button,
            // eslint-disable-next-line react-native/no-inline-styles
            { backgroundColor: '#635BFF' },
          ]}
          textStyle={styles.buttonText}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: RFValue(24),

    paddingHorizontal: wp(6),
    paddingTop: wp(7),
    paddingBottom: wp(5),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 24,

    elevation: 10,
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: RFValue(6),
  },
  content: {
    gap: RFValue(10),
    marginBottom: RFValue(22),
  },

  title: {
    fontFamily: FONT.poppins600,
    fontSize: RFValue(18),
    lineHeight: RFValue(24),
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  description: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(13.5),
    lineHeight: RFValue(21),
    fontWeight: '400',
    paddingHorizontal: RFValue(6),
  },

  button: {
    width: '100%',
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: FONT.poppins600,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});

export default CenterMessageWindow;
