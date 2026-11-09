import React, {FC} from 'react';
import {
  Control,
  Controller,
  FieldValue,
  RegisterOptions,
} from 'react-hook-form';
import {View} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import {ICustomTextInput} from '../CustomTextInput/interface';
import {globalStyles} from '../../utils/theme';

interface CustomRHFTextInputProps extends ICustomTextInput {
  control: Control<FieldValue<any>, any>;
  name: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  defaultValue?: string;
  disabled?: boolean;
}

const CustomRHFTextInput: FC<CustomRHFTextInputProps> = ({
  control,
  name,
  rules,
  defaultValue,
  disabled,
  numberOfLines,
  changeBorderColorOnFocus = true,
  ...props
}) => {
  return (
    <View style={globalStyles.inputSpacing}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || null}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomTextInput
            value={value}
            onChangeText={onChange}
            error={error?.message}
            onBlur={onBlur}
            disabled={disabled}
            changeBorderColorOnFocus={changeBorderColorOnFocus}
            numberOfLines={numberOfLines}
            {...props}
          />
        )}
      />
    </View>
  );
};

export default CustomRHFTextInput;
