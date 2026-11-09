import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  CustomButton,
  CustomImage,
  CustomRadioButtonGroup,
  CustomText,
  CustomWrapper,
  Row,
} from '../../components';
import {COLORS, IMAGES} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {BOOKING_CANCELLATION_REASONS} from '../../utils/constants';
import {navigateGoBack} from '../../utils/navigation';
import {useBooking} from '../../hooks/useBooking';
import Toast from 'react-native-toast-message';
import {useTranslate} from '../../hooks/useTranslate';
import useCenterMessageWindowStore from '../../service/store/centerMessageWindow.store';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const CancelBooking = () => {
  const {t} = useTranslate();
  const accentColor = useAppAccentColor();
  const showCenterMessageWindow = useCenterMessageWindowStore(
    state => state.showWindow,
  );
  const route = useRoute<any>();
  const {id, car_picture, car_name} = route.params || {};

  const [cancelReason, setCancelReason] = useState(null);

  const {cancelBooking, cancelBookingLoading} = useBooking();

  const HandleSubmit = () => {
    const payload = {
      reason: cancelReason,
      cancel_booking_id: id,
    };
    if (!cancelReason) {
      const title = t('error');
      const message = t('pleaseSelectaCancellationReason');
      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
      showCenterMessageWindow({
        title,
        message,
        buttonText: t('ok'),
      });
      return;
    }
    cancelBooking(payload);
  };
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.topContainer, {backgroundColor: accentColor}]}>
        <Row justifyContent="space-between">
          <CustomImage
            source={IMAGES.back}
            height={RFValue(34)}
            width={RFValue(34)}
            onPressImage={() => navigateGoBack()}
          />
          <CustomText
            text={t('cancelBooking')}
            color={COLORS.white}
            fontWeightPopins="600"
            fontSize="S16"
            textStyle={{right: RFValue(14)}}
          />
          <View />
        </Row>

        <CustomImage
          source={{uri: car_picture}}
          height={widthPercentageToDP(40)}
          width={widthPercentageToDP(40)}
          containerStyle={styles.carPicture}
          resizeMode="cover"
        />
        <CustomText
          text={car_name}
          color={COLORS.white}
          center
          textStyle={{marginTop: widthPercentageToDP(2)}}
          fontWeightPopins="600"
        />
      </View>

      <View style={[styles.bottomContainer, {backgroundColor: accentColor}]}>
        <View style={styles.bottomChild}>
          <CustomText text={t('whyDoYouWantToCancel')} />
          <CustomRadioButtonGroup
            options={BOOKING_CANCELLATION_REASONS}
            containerStyle={{flexDirection: 'column'}}
            selectedValue={cancelReason}
            setSelectedValue={setCancelReason}
          />
          <CustomButton
            title={t('submit')}
            onPress={HandleSubmit}
            loading={cancelBookingLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.5,
    paddingTop: widthPercentageToDP(20),
    paddingLeft: widthPercentageToDP(5),
  },
  bottomContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  bottomChild: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFValue(13),
    borderTopRightRadius: RFValue(13),
    flex: 1,
    paddingHorizontal: widthPercentageToDP(5),
    justifyContent: 'flex-start',
    paddingTop: widthPercentageToDP(5),
  },
  carPicture: {
    alignSelf: 'center',
    borderRadius: widthPercentageToDP(50),
    marginTop: widthPercentageToDP(10),
  },
});
