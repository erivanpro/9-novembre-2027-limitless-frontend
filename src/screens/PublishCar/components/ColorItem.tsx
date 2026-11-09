import React, {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ColorItemType} from '../interface';

const ColorItem: FC<ColorItemType> = ({
  color,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <Pressable onPress={() => setSelectedColor(color)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color,
            borderWidth: selectedColor ? 4 : 1,
            borderColor: 'black',
            borderStyle: selectedColor ? 'solid' : 'dotted',
          },
        ]}
      />
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: color,
            borderWidth: selectedColor ? 2 : 0,
            borderColor: 'white',
            borderStyle: selectedColor ? 'solid' : 'dotted',
          },
        ]}
      />
    </Pressable>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  container: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    borderColor: 'black',
    marginHorizontal: RFValue(5),
    borderWidth: 1,
    marginBottom: RFValue(10),
    marginTop: RFValue(5),
  },
  innerContainer: {
    width: RFValue(25),
    height: RFValue(25),
    marginTop: RFValue(7),
    marginHorizontal: RFValue(8),
    borderRadius: RFValue(15),
    position: 'absolute',
  },
});
