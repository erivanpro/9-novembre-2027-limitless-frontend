import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {HelpCenterContainerItemProps} from './interface';
import {CustomIcon, CustomText} from '../../../components';
import {COLORS, FONT} from '../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const HelpCenterContainerItem: FC<HelpCenterContainerItemProps> = ({
  title,
  description,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  console.log(title, description);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setCollapsed(prev => !prev)}>
        <CustomText text={title} textStyle={styles.textStyle} />
        <CustomIcon
          type="AntDesign"
          icon={collapsed ? 'down' : 'right'}
          color={COLORS.neutral400}
          size={RFValue(15)}
        />
      </TouchableOpacity>
      {collapsed && (
        <CustomText text={description} textStyle={styles.description} />
      )}
    </View>
  );
};




export default HelpCenterContainerItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: RFValue(5),
    borderBottomColor: COLORS.neutral200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.neutral600,
    fontSize: RFValue(13),
    fontFamily: FONT.interRegular,
  },
  description: {
    color: COLORS.neutral600,
    fontSize: RFValue(13),
    fontFamily: FONT.interRegular,
    marginTop: RFValue(10),
  },
});
