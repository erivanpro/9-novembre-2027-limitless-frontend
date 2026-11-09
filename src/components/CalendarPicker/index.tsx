import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

import {COLORS, FONT} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {CustomIcon} from '../CustomIcon';
import CustomButton from '../CustomButton';
import RangePicker from '../RangePicker';
import {formatDate} from '../../utils/dayjs';
import Row from '../Row';
import TimePicker from '../TimePicker';
import useTranslate from '../../hooks/useTranslate';

const CalendarPicker = ({
  calenderBottomSheetRef,
  handleContinue,
  date,
  setDate,
  requiredStar,
  title,
  isStartAndEndTimeNeeded,
  time,
  setTime,
}: {
  date?: any;
  calenderBottomSheetRef: any;
  handleContinue: () => void;
  setDate: (e: any) => void;
  requiredStar?: boolean;
  title?: string;
  isStartAndEndTimeNeeded?: boolean;
  time?: {
    start?: Date | null | string;
    end?: Date | null | string;
  };
  setTime?: (time: any) => void;
}) => {
  const {t} = useTranslate();
  const handleReset = () => {
    setDate({start: null, end: null});
    setTime?.({start: null, end: null});
  };
  const snapPoints = useMemo(() => ['95%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    calenderBottomSheetRef.current?.present();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(time)
  return (
    <View>
      {title && (
        <View style={styles.rowAndCenter}>
          <CustomText
            color={COLORS.black}
            fontWeightPopins="600"
            fontSize="S12"
            textStyle={[
              {
                marginBottom: heightPercentageToDP(1),
              },
            ]}
            text={title}
          />

          {requiredStar && <CustomText color={COLORS.error600} text={' *'} />}
        </View>
      )}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handlePresentModalPress}>
        <CustomIcon
          icon="calendar-alt"
          type="FontAwesome5"
          color={COLORS.neutral400}
          size={RFValue(15)}
          style={styles.calendar}
        />
        <CustomText
          text={
            date?.end
              ? `${formatDate(date?.start, 'DD MMM YYYY')} ${formatDate(
                  time?.start,
                  'hh:mm A',
                )}  - ${formatDate(date?.end, 'DD MMM YYYY')} ${formatDate(
                  time?.end,
                  'hh:mm A',
                )}`
              : t('bookingDates')
          }
          textStyle={styles.placeholder}
        />
      </TouchableOpacity>
      <BottomSheetModal
        ref={calenderBottomSheetRef}
        index={1}
        snapPoints={snapPoints}>
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

                {isStartAndEndTimeNeeded && time && setTime && (
                  <Row
                    justifyContent="space-between"
                    style={styles.timeContainer}>
                    <TimePicker
                      value={time.start ? String(time.start) : ''}
                      onPress={tim =>
                        setTime((prev: any) => ({...prev, start: tim}))
                      }
                      label={t('pickUpTime')}
                    />
                    <TimePicker
                      value={time.end ? String(time?.end) : null}
                      onPress={tim => {
                        console.log({ tim })
                        setTime((prev: any) => ({ ...prev, end: tim }))
                      }
                      }
                      label={t('returnTime')}
                    />
                  </Row>
                )}

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
                    title={t('continueButton')}
                    onPress={handleContinue}
                    containerStyle={{flex: 1 , 
              
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

export default CalendarPicker;

const styles = StyleSheet.create({
  inputContainer: {
    height: widthPercentageToDP(15),
    backgroundColor: COLORS.neutral50,
    marginBottom: RFValue(5),
    borderRadius: RFValue(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholder: {
    color: COLORS.neutral400,
    fontFamily: FONT.interRegular,
    fontSize: RFValue(10),
    paddingLeft: RFValue(5),
    paddingTop: RFValue(2),
  },
  calendar: {
    paddingLeft: RFValue(15),
  },
  childContainer: {
    padding: RFValue(20),
  },
  timeContainer: {
    gap: RFValue(12),
    marginVertical: RFValue(15),
  },
  screenHeading: {marginLeft: RFValue(-5), marginBottom: RFValue(10)},
  rowAndCenter: {
    flexDirection: 'row',
  },
});
