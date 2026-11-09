import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CustomText} from '../CustomText';
import {COLORS} from '../../utils/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Row from '../Row';

const InputLabelRow = ({
  text,
  requiredStarik,
  rightText,
}: {
  text: string;
  requiredStarik?: boolean;
  rightText?: string;
}) => {
  return (
    <View style={styles.rowAndCenter}>
      <Row>
        <CustomText
          color={COLORS.black}
          fontWeightPopins="600"
          fontSize="S12"
          text={text}
        />
        {!!requiredStarik && <CustomText color={COLORS.error600} text={' *'} />}
      </Row>
      {!!rightText && (
        <CustomText
          color={COLORS.neutral500}
          fontWeightPopins="500"
          fontSize="S10"
          text={rightText}
        />
      )}
    </View>
  );
};

export default InputLabelRow;

const styles = StyleSheet.create({
  rowAndCenter: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(1),
    justifyContent: 'space-between',
  },
});
