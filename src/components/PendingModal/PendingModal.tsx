import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InfoModal from '../InfoModal/index';
import {IMAGES} from '../../utils/theme';
import useTranslate from '../../hooks/useTranslate';
interface ProcessModalProps {
  processModal: {
    isRejected: boolean;
    isVerified: boolean;
  };
  setState: (state: {isRejected: boolean; isVerified: boolean}) => void;
}
const PendingModal = (props: ProcessModalProps) => {
  const {t} = useTranslate();
  return (
    <InfoModal
      btnOnPress={() => props.setState({isRejected: false, isVerified: false})}
      iconImage={IMAGES.right}
      title={
        props.processModal?.isRejected
          ? t('requestRejected')
          : t('verifyingInfo')
      }
      isVisible={true}
      description={
        props.processModal?.isRejected
          ? t('unableToVerify')
          : t('securityVerification')
      }
    />
  );
};

export default PendingModal;

const styles = StyleSheet.create({});
