import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

const Row = ({
  children,
  justifyContent,
  alignItems,
  style,
}: {
  children: ReactNode;
  justifyContent?:
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end'
    | 'center';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  style?: ViewStyle;
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: justifyContent || 'flex-start',
          alignItems: alignItems || 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
