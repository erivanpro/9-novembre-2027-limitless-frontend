import React, {ReactNode} from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  children: ReactNode;
  padding?: boolean;
  backgroundColor?: string;
  bottomInsert?: number;
};

const CustomWrapper = ({
  children,
  padding,
  backgroundColor,
  bottomInsert,
}: Props) => {
  const {bottom = bottomInsert, top} = useSafeAreaInsets();
  let padding1 = padding ? widthPercentageToDP(4) : 0;
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top,
        paddingBottom: bottomInsert ? bottomInsert : bottom,
        padding: padding1,
        backgroundColor: backgroundColor || COLORS.neutral50,
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral50,
  },
});
export default CustomWrapper;
