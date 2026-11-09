import React, {FC} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT, SHADOWS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import CustomButton from '../CustomButton';
import {InfoModalProps} from './interface';
import CustomImage from '../CustomImage';
import useTranslate from '../../hooks/useTranslate';

const InfoModal: FC<InfoModalProps> = ({
  isVisible,
  iconImage,
  title,
  description,
  btnText,
  btnOnPress,
  btnLoading,
  btnBackgroundColor,
  maxHeight,
  iconStyle,
  secondaryBtnText,
  secondaryBtnOnPress,
}) => {
  const {t} = useTranslate();
  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container]}>
        {iconImage && (
          <CustomImage
            source={iconImage}
            height={RFValue(80)}
            width={RFValue(80)}
            containerStyle={iconStyle}
          />
        )}
        <CustomText
          text={title || ''}
          fontWeightPopins="600"
          fontSize="S14"
          center
        />
        {description && (
          <CustomText
            text={description || ''}
            center
            color={COLORS.neutral600}
            textStyle={styles.description}
          />
        )}
        <CustomButton
          title={btnText || t('ok')}
          onPress={() => btnOnPress?.()}
          containerStyle={[
            {width: '100%'},
            btnBackgroundColor ? {backgroundColor: btnBackgroundColor} : null,
          ]}
          loading={btnLoading}
          disabled={btnLoading}
        />
        {secondaryBtnText && (
          <CustomButton
            title={secondaryBtnText || 'Cancel'}
            onPress={() => secondaryBtnOnPress?.()}
            containerStyle={styles.secondaryBtnContainer}
            textStyle={styles.secondaryBtnText}
            disabled={btnLoading}
          />
        )}
      </View>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(10),
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: widthPercentageToDP(4),
    gap: 5,
  },

  description: {
    fontSize: RFValue(Platform.OS === 'android' ? 12 : 11),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    color: COLORS.neutral600,
    textAlign: 'center',
    paddingBottom: RFValue(8),
  },
  secondaryBtnContainer: {
    width: '100%',
    backgroundColor: COLORS.white,

    ...SHADOWS.light,
  },
  secondaryBtnText: {
    color: COLORS.primary,
    backgroundColor: COLORS.white,
  },
});
