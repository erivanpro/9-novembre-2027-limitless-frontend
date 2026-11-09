import React, {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import InfoModal from '../InfoModal';
import {COLORS, IMAGES} from '../../utils/theme';
import useTranslate from '../../hooks/useTranslate';

const INSPECTION_URL = 'https://erivan.fr/limitless/';

interface VehicleInspectionModalProps {
  isVisible: boolean;
}

const VehicleInspectionModal = ({isVisible}: VehicleInspectionModalProps) => {
  const {t} = useTranslate();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsDismissed(false);
    }
  }, [isVisible]);

  const handleStart = () => {
    void Linking.openURL(INSPECTION_URL).catch(() => {
      Alert.alert(t('inspectionModalLinkError'));
    });
  };

  return (
    <InfoModal
      isVisible={isVisible && !isDismissed}
      iconImage={IMAGES.vehicleInspectionMap}
      iconStyle={{
        width: widthPercentageToDP(32),
        height: widthPercentageToDP(32),
      }}
      title={t('inspectionModalTitle')}
      description={t('inspectionModalDescription')}
      btnText={t('inspectionModalAction')}
      btnOnPress={handleStart}
      btnBackgroundColor={COLORS.green}
      secondaryBtnText={t('inspectionModalDismiss')}
      secondaryBtnOnPress={() => setIsDismissed(true)}
    />
  );
};

export default VehicleInspectionModal;
