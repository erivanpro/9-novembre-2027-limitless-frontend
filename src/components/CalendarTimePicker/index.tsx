import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

import {COLORS, FONT, IMAGES} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {CustomIcon} from '../CustomIcon';
import CustomButton from '../CustomButton';
import RangePicker from '../RangePicker';
import TimePicker from '../TimePicker';
import {formatDate} from '../../utils/dayjs';
import Row from '../Row';
import useTranslate from '../../hooks/useTranslate';
import useAppAccentColor from '../../hooks/useAppAccentColor';

const CalendarTimePicker = ({
  calenderBottomSheetRef,
  handleContinue,
  date,
  time,
  setDate,
  setTime,
}: {
  date?: any;
  time: any;
  calenderBottomSheetRef: any;
  handleContinue: () => void;
  setDate: (e: any) => void;
  setTime: (e: any) => void;
}) => {
  const {t} = useTranslate();
  const accentColor = useAppAccentColor();
  const handleReset = () => {
    setDate({start: null, end: null});
    setTime({start: null, end: null});
  };
  const snapPoints = useMemo(() => ['95%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    calenderBottomSheetRef.current?.present();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(date);
  return (
    <View>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handlePresentModalPress}>
        {/* <CustomIcon
          icon="calendar-alt"
          type="FontAwesome5"
          color={COLORS.neutral400}
          size={RFValue(17)}
          style={styles.calendar}
        /> */}

        <Image source={IMAGES.calendarIcon} style={styles.calendar} />

        <CustomText
          text={
            date.end
              ? `${formatDate(date?.start, 'DD MMM YY')},  ${
                  time.start ? formatDate(time.start, 'hh:mm A') : ''
                } - ${formatDate(date?.end, 'DD MMM YY')},  ${
                  time?.end ? formatDate(time.end, 'hh:mm A') : ''
                } `
              : t('pickupDate')
          }
          textStyle={styles.placeholder}
        />
      </TouchableOpacity>
      <BottomSheetModal
        ref={calenderBottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        // handleIndicatorStyle={styles.iconBTSheetIndicatorStyle}
        // containerStyle={styles.iconBTSheetContainer}
        // handleStyle={styles.iconBTSheetHandle}
      >
        <BottomSheetView
          children={
            <View>
              <View style={styles.childContainer}>
                <CustomText
                  text={t('selectYourDate')}
                  fontWeightPopins="600"
                  fontSize="S22"
                  textStyle={styles.screenHeading}
                />
                <RangePicker
                  date={date}
                  setEndDate={e => setDate((prev: any) => ({...prev, end: e}))}
                  setStartDate={e =>
                    setDate((prev: any) => ({...prev, start: e}))
                  }
                />

                <Row
                  justifyContent="space-between"
                  style={styles.timeContainer}>
                  <TimePicker
                    value={time.start ? String(time.start) : null}
                    onPress={time =>
                      setTime((prev: any) => ({...prev, start: time}))
                    }
                    label={t('pickUpTime')}
                  />
                  <TimePicker
                    value={time.end ? String(time.end) : null}
                    onPress={time =>
                    {
                      console.log({ time })
                      setTime((prev: any) => ({ ...prev, end: time }))
                    }
                    }
                    label={t('returnTime')}
                  />
                </Row>
                <Row justifyContent="space-between" style={{gap: RFValue(10)}}>
                  <CustomButton
                    title={t('resetButton')}
                    onPress={handleReset}
                    containerStyle={{
                      flex: 1,
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                    }}
                    textStyle={{color: COLORS.primary}}
                  />
                  <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    containerStyle={{flex: 1 , 
                        backgroundColor: accentColor
                    }}
                  />
                </Row>
              </View>
            </View>
          }
        />
      </BottomSheetModal>
    </View>
  );
};

export default CalendarTimePicker;

const styles = StyleSheet.create({
  inputContainer: {
    height: widthPercentageToDP(15),
    backgroundColor: COLORS.neutral50,
    marginVertical: RFValue(15),
    borderRadius: RFValue(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholder: {
    color: COLORS.neutral400,
    fontFamily: FONT.interRegular,
    fontSize: RFValue(12),
    paddingLeft: RFValue(5),
    paddingTop: RFValue(2),
  },
  calendar: {
    marginLeft: RFValue(15),
    height: RFValue(20),
    width: RFValue(20),
  },
  childContainer: {
    padding: RFValue(20),
  },
  timeContainer: {
    gap: RFValue(12),
    marginVertical: RFValue(15),
  },
  screenHeading: {marginLeft: RFValue(-5), marginBottom: RFValue(10)},
});
