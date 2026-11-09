import React, {FC} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import Row from '../Row';
import {HostModeSwitchProps} from './interface';
import {useTranslate} from '../../hooks/useTranslate';

const HostModeSwitch: FC<HostModeSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const {t} = useTranslate();

  return (
    <View style={styles.container}>
      <CustomText text={t('hostMode')} fontWeightPopins="600" fontSize="S12" />
      <Row>
        <CustomText
          text={value ? t('hostModeEnabled') : t('hostModeDisabled')}
          fontWeightPopins="400"
          fontSize="S12"
          color={COLORS.neutral600}
        />
        <Switch
          disabled={disabled}
          trackColor={{false: COLORS.neutral100, true: COLORS.primary}}
          ios_backgroundColor={COLORS.white}
          thumbColor={COLORS.white}
          onValueChange={onValueChange}
          value={value}
        />
      </Row>
    </View>
  );
};

export default HostModeSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP(2),
  },
});
