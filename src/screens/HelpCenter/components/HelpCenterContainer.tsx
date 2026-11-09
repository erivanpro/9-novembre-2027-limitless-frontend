import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '../../../components';
import {HelpCenterContainerProps} from './interface';
import HelpCenterContainerItem from './HelpCenterContainerItem';
import {SHADOWS} from '../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const HelpCenterContainer: FC<HelpCenterContainerProps> = ({title, data}) => {
  console.log({data});
  return (
    <View style={styles.container}>
      <CustomText text={title} />
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          renderItem={({item}) => <HelpCenterContainerItem {...item} />}
        />
      </View>
    </View>
  );
};

export default HelpCenterContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    ...SHADOWS.medium,
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    flex: 1,
  },
});
