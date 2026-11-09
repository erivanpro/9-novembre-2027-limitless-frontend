import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import { COLORS } from '../../utils/theme';
import { CustomIcon } from '../CustomIcon';
import useTranslate from '../../hooks/useTranslate';
import * as Animatable from 'react-native-animatable';
import useAppAccentColor from '../../hooks/useAppAccentColor';

type Props = {
  inputRef?: React.RefObject<any>;
  setAddress?: (txt: string) => void;
  placeholder?: string;
  isPinLocation?: boolean;
  predefinedPlaces?: any[];
  apiKey?: string;
};

const GooglePlacesInput: React.FC<Props> = ({
  inputRef,
  setAddress,
  placeholder,
  isPinLocation = false,
  predefinedPlaces = [],
  apiKey,
}) => {
  const { t } = useTranslate();
  const accentColor = useAppAccentColor();

  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setAddress?.('');
    inputRef?.current?.setAddressText?.('');
  };

  return (
        <Animatable.View
          animation="bounceInUp" // bounce from bottom
          duration={500} // adjust speed
          delay={0} // optional delay
          useNativeDriver // better performance
        >
      <GooglePlacesAutocomplete
        ref={inputRef}
        fetchDetails
        minLength={2}
        debounce={400}
        disableScroll
        timeout={10000}
        enablePoweredByContainer
        keyboardShouldPersistTaps="always"
        placeholder={placeholder || t('search')}
        query={{
          key: 'YOUR_GOOGLE_PLACES_API_KEY',
          language: 'fr',
        }}
        predefinedPlaces={predefinedPlaces}
        predefinedPlacesAlwaysVisible={predefinedPlaces.length > 0}
        onPress={(data, details) => {
          const desc = data?.description ?? '';
          setAddress?.(desc);
          inputRef?.current?.setAddressText?.(desc);
        }}
        onFail={err => {
          console.log('Google Places error:', JSON.stringify(err, null, 2));
        }}
        styles={{ description: { color: '#000' } }}
        textInputProps={{
          placeholder: placeholder || t('pickupLocation'),
          placeholderTextColor: COLORS.neutral400,
          clearButtonMode: 'never',
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          style: [
            styles.textInput,
            isFocused && { borderWidth: 0.75, borderColor: accentColor },
          ],
        }}
        renderLeftButton={() => (
          <View style={styles.searchIcon}>
            <CustomIcon
              icon={isPinLocation ? 'map-pin' : 'map-pin'}
              type="Feather"
              color={COLORS.neutral400}
              size={rf(17)}
            />
          </View>
        )}
        renderRightButton={() => {
          const inputText = inputRef?.current?.getAddressText?.() || '';
          return inputText?.trim()?.length > 0 ? (
            <TouchableOpacity
              style={styles.clearButton}
              accessibilityLabel="Clear input"
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CustomIcon icon="circle-with-cross" type="Entypo" />
            </TouchableOpacity>
          ) : (
            <View />
          );
        }}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: wp(15),
    borderRadius: rf(12),
    paddingRight: rf(40),
    paddingLeft: rf(40),
    width: '100%',
    backgroundColor: COLORS.neutral50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E7E3',
    position: 'relative',
    fontSize: rf(12),
    color: '#000',
  },
  clearButton: {
    padding: wp(2),
    position: 'absolute',
    right: rf(5),
    top: rf(8),
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
    borderRadius: rf(999),
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: rf(15),
    top: wp(Platform.OS === 'ios' ? 4.5 : 5),
  },
});

export default GooglePlacesInput;
