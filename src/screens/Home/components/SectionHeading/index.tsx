import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomText} from '../../../../components';
import {SectionHeadingProps} from './interface';

const SectionHeading: FC<SectionHeadingProps> = ({heading, fontSize}) => {
  return (
    <View style={styles.container}>
      <CustomText
        text={heading}
        fontWeightPopins="600"
        fontSize={fontSize || 'S18'}
      />
    </View>
  );
};

export default SectionHeading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: widthPercentageToDP(2),
  },
});
