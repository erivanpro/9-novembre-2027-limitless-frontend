import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {CustomText, Row} from '../../../components';
import {TransmissionTypeProps} from '../interface';
import {COLORS, FONT} from '../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTranslate} from '../../../hooks/useTranslate';

const TransmissionType: FC<TransmissionTypeProps> = ({
  selectedTransmission,
  setSelectedTransmission,
}) => {
  const {t} = useTranslate();

  return (
    <Row justifyContent="space-between" style={styles.row}>
      <CustomText
        text={t('automatic')}
        textStyle={
          selectedTransmission === 'Automatic'
            ? {...styles.btn, ...styles.btnActive}
            : {...styles.btn}
        }
        onPress={() => setSelectedTransmission('Automatic')}
      />
      <CustomText
        text={t('manual')}
        textStyle={
          selectedTransmission === 'Manual'
            ? {...styles.btn, ...styles.btnActive}
            : {...styles.btn}
        }
        onPress={() => setSelectedTransmission('Manual')}
      />
    </Row>
  );
};

export default TransmissionType;

const styles = StyleSheet.create({
  row: {
    marginTop: widthPercentageToDP(1.5),
    marginBottom: widthPercentageToDP(3),
  },
  btn: {
    borderWidth: 1,
    width: '48%',
    borderColor: COLORS.neutral100,
    borderStyle: 'solid',
    padding: widthPercentageToDP(2.5),
    textAlign: 'center',
    borderRadius: RFValue(5),
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(14),
    lineHeight: RFValue(21),
    textAlignVertical: 'center',
  },
  btnActive: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
});
