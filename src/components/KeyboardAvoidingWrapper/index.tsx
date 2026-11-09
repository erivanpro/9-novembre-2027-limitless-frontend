import React, {ReactElement} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
interface Props {
  children: ReactElement | ReactElement[];
  doNotAvoid?: boolean;
}
const KeyboardAvoidingWrapper = ({doNotAvoid, children}: Props) => {
  if (doNotAvoid) {
    return children;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp(1) : 0}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
