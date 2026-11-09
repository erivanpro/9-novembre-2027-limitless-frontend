import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { CustomText } from '../CustomText';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CustomIcon } from '../CustomIcon';
import Row from '../Row';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { dayjs, formatDate } from '../../utils/dayjs';
import { getCeil30MinInterval } from '../../utils/helper';
import useTranslate from '../../hooks/useTranslate';

const TimePicker = ({
  label,
  value,
  onPress,
  containerStyle,
}: //   showTime,
//   setShowTime,
{
  //   showTime: boolean;
  //   setShowTime: (e: boolean) => void;
  label: string;
  value: string | null;
  onPress: (e: Date | string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const [showTime, setShowTime] = useState(false);
  const { t } = useTranslate();

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText text={label} />
      {/* <RNDateTimePicker mode="time" value={new Date()} /> */}
      <DateTimePickerModal
        minuteInterval={30}
        isVisible={showTime}
        display={Platform.OS !== 'ios' ? 'inline' : undefined}
        // date={new Date('2025-02-05T22:30:00.000Z')}
        // timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
        // timeZoneOffsetInMinutes={value ? 0 : Math.abs(new Date().getTimezoneOffset())}
        timeZoneOffsetInMinutes={Platform.OS === 'ios' ? 0 : undefined}
        date={
          value ? dayjs.utc(value).toDate() : getCeil30MinInterval(new Date())
        }
        mode="time"
        // is24Hour
        // timeZoneName={'Africa/Abidjan'}
        // locale="en_GB"
        onConfirm={e => {
          onPress(getCeil30MinInterval(e));
          setShowTime(false);
        }}
        onCancel={() => setShowTime(false)}
      />
      <TouchableOpacity style={styles.child} onPress={() => setShowTime(true)}>
        <Row justifyContent="space-between">
          <CustomText
            text={
              value ? String(formatDate(value, 'hh:mm:A')) : t('selectTime')
            }
            color={value ? COLORS.black : COLORS.neutral300}
            fontSize={'S15'}
          />
          <CustomIcon
            icon="clockcircleo"
            type="AntDesign"
            color={COLORS.neutral400}
            size={RFValue(17)}
          />
        </Row>
      </TouchableOpacity>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  child: {
    borderColor: COLORS.neutral300,
    borderWidth: 1,
    borderRadius: RFValue(5),
    padding: widthPercentageToDP(3),
    marginVertical: widthPercentageToDP(2),
  },
});
