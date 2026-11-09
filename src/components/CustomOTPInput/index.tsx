import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {ICustomOTPInputProps} from './interface';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../CustomText';

const CELL_COUNT = 4;

const CustomOTPInput: React.FC<ICustomOTPInputProps> = props => {
  const {value, setValue, onCompleteForm} = props;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <View style={styles.container}>
        <CodeField
          autoFocus={true}
          onSubmitEditing={() => Alert.alert('sas')}
          ref={ref}
          {...propss}
          value={value}
          autoCapitalize="none"
          onChangeText={text => {
            setValue(text);
            if (text.length === 6) {
              onCompleteForm(text);
            }
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[
                styles.cell,
                !!symbol && styles.focusCell,
                isFocused && styles.focusCell,
              ]}>
              <CustomText text={symbol} />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default CustomOTPInput;

const styles = StyleSheet.create({
  container: {
    minHeight: hp(7),
    alignItems: 'center',
  },

  root: {flex: 1, padding: 20},

  codeFieldRoot: {
    gap: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: widthPercentageToDP(14),
    aspectRatio: 1,
    lineHeight: widthPercentageToDP(14),
    color: COLORS.primary,

    borderWidth: 1,

    justifyContent: 'center',
    backgroundColor: COLORS.neutral50,

    borderColor: COLORS.neutral50,
    borderRadius: RFValue(5),
    alignItems: 'center',
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
});
