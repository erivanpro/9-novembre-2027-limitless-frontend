import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import {COLORS} from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomButton from '../CustomButton';
import {useTranslate} from '../../hooks/useTranslate';
export interface CarSpecificationErrors {
  color: string | undefined;
  pickup_address: string | undefined;
  dropoff_address: string | undefined;
  booking_dates: string | undefined;
}

interface CustomColorPicker {
  setErrors: React.Dispatch<React.SetStateAction<CarSpecificationErrors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors: CarSpecificationErrors;
  hidePicker: boolean;
  setHidePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomColorPicker = ({
  setErrors,
  setSelectedColor,
  errors,
  hidePicker,
  setHidePicker,
}: CustomColorPicker) => {
  const {t} = useTranslate();

  return (
    <Modal style={{flex: 1}} isVisible={hidePicker}>
      <View style={styles.container}>
        <ColorPicker
          style={{width: '70%'}}
          value="red"
          onComplete={i => {
            setErrors({...errors, color: undefined});
            setSelectedColor(i?.hex);
            // console.log(i?.hex);
          }}>
          <Panel1 />
          <HueSlider />
          <Preview
            colorFormat="hex"
            hideText
            hideInitialColor
            style={{top: 10}}
          />
        </ColorPicker>
        <View style={{width: '40%', top: heightPercentageToDP(2)}}>
          <CustomButton
            title={t('select')}
            onPress={() => {
              setHidePicker(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomColorPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: heightPercentageToDP(4),
    borderRadius: widthPercentageToDP(6),
  },
});
