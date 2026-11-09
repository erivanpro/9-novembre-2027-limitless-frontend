import React, {FC} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {COLORS} from '../../../utils/theme';
import {CustomText, Row} from '../../../components';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTranslate} from '../../../hooks/useTranslate';

interface RecentCarsOnlyProps {
  active: boolean;
  setActive: (e: boolean) => void;
}

const RecentCarsOnly: FC<RecentCarsOnlyProps> = ({active, setActive}) => {
  const {t} = useTranslate();

  return (
    <View style={styles.container}>
      <Row justifyContent="space-between">
        <View>
          <CustomText text={t('recentCarsOnly')} fontWeightPopins="600" />
          <CustomText
            text={t('lessThanFiveYears')}
            color={COLORS.neutral400}
            fontWeightPopins="600"
            fontSize="S12"
          />
        </View>

        <ToggleSwitch
          isOn={active}
          onColor={COLORS.white}
          offColor={COLORS.white}
          trackOnStyle={{backgroundColor: COLORS.primary}}
          trackOffStyle={{backgroundColor: COLORS.neutral100}}
          size="medium"
          onToggle={setActive}
        />
        {/* <Switch
          trackColor={{false: COLORS.neutral100, true: COLORS.primary}}
          ios_backgroundColor={COLORS.white}
          thumbColor={COLORS.white}
          onValueChange={setActive}
          value={active}
        /> */}
      </Row>
    </View>
  );
};

export default React.memo(RecentCarsOnly);

const styles = StyleSheet.create({
  container: {
    padding: widthPercentageToDP(5),
    borderColor: COLORS.neutral100,
    borderWidth: 1,
    borderRadius: widthPercentageToDP(2),
    marginTop: widthPercentageToDP(5),
  },
});
