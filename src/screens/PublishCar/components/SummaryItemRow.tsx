import {Platform, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {SummaryItemRowProps} from '../interface';
import {CustomText} from '../../../components';
import {COLORS} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const SummaryItemRow: FC<SummaryItemRowProps> = ({title, value, isColor=false}) => {
  return (
    <View>
      <CustomText text={title} fontWeightPopins="600" fontSize="S12" />

      {isColor ? (
        <View
          style={{
            height: 20,
            width: 40,
            borderRadius: 10,
            top:3,
            backgroundColor:value,
          }}></View>
      ) : (
        <CustomText
          text={value}
          fontWeightInter="500"
          color={COLORS.neutral400}
          fontSize="S12"
          textStyle={styles.valueText}
        />
      )}
      <View style={styles.borderBottom} />
    </View>
  );
};

export default SummaryItemRow;

const styles = StyleSheet.create({
  borderBottom: {
    height: widthPercentageToDP(0.5),
    width: widthPercentageToDP(100),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral100,
    marginVertical: widthPercentageToDP(2),
  },
  valueText: {
    marginVertical: widthPercentageToDP(Platform.OS === 'ios' ? 2 : 0),
  },
});
