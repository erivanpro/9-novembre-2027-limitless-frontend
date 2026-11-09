import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomIcon} from '../CustomIcon/index';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomCheckbox: FC<{
  label?: string;
  isChecked?: boolean;
  setChecked: (arg0: boolean) => void;
}> = ({label, isChecked, setChecked}) => {
  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
        {isChecked ? (
          <CustomIcon
            icon="check-box"
            type="MaterialIcons"
            size={24}
            color={COLORS.black}
          />
        ) : (
          <CustomIcon
            icon="check-box-outline-blank"
            type="MaterialIcons"
            size={24}
            color={COLORS.black}
            style={styles.checkboxDefaultStyle}
          />
        )}
      </TouchableOpacity>
      {label && (
        <CustomText fontWeightInter="500" fontSize="S12" text={label} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    paddingVertical: RFValue(8),
  },
  checkbox: {
    padding: widthPercentageToDP(2),
    paddingLeft: 0,
    paddingTop: 0,
    // marginTop: RFValue(-2), // To align the checkbox with the text
  },
  label: {
    marginLeft: widthPercentageToDP(2),
  },
  checkboxDefaultStyle: {
    borderRadius: 50,
  },
});

export default CustomCheckbox;
