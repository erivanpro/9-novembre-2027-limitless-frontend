import React, {FC} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {CustomText} from '../CustomText';
import {CustomToggleRowProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Row from '../Row';
import {COLORS} from '../../utils/theme';

const CustomToggleRow: FC<CustomToggleRowProps> = ({
  label,
  activeText,
  inActiveText,
  isActive,
  toggleSwitch,
}) => {
  return (
    <View style={styles.container}>
      <CustomText text={label} fontWeightPopins="600" fontSize="S12" />
      <Row>
        <CustomText
          text={isActive ? `${activeText} ` : `${inActiveText} `}
          fontWeightPopins="400"
          fontSize="S12"
          color={COLORS.neutral600}
        />
        <Switch
          trackColor={{false: COLORS.neutral100, true: COLORS.primary}}
          ios_backgroundColor={COLORS.white}
          thumbColor={COLORS.white}
          onValueChange={toggleSwitch}
          value={isActive}
        />
      </Row>
    </View>
  );
};

export default CustomToggleRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP(2),
  },
});
