import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';

const Column = ({
  children,
  justifyContent,
}: {
  children: ReactNode;
  justifyContent:
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end'
    | 'center';
}) => {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: justifyContent || 'flex-start'},
      ]}>
      {children}
    </View>
  );
};

export default Column;

const styles = StyleSheet.create({
  container: {},
});
