import React from 'react';
import {CustomHeader, CustomWrapper} from '../../components';
import CustomTabs from '../../components/CustomTabs';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Completed from './Completed';
import {COLORS} from '../../utils/theme';
import useTranslate from '../../hooks/useTranslate';
import {useIsFocused} from '@react-navigation/native';
import {VehicleInspectionModal} from '../../components';

const MyOrders = () => {
  const screens = {first: Ongoing, second: Upcoming, third: Completed};
  const {t} = useTranslate();
  const isFocused = useIsFocused();
  return (
    <>
      <CustomWrapper padding backgroundColor={COLORS.white}>
        <CustomHeader title={t('myOrders')} />
        <CustomTabs sceneMap={screens} />
      </CustomWrapper>
      <VehicleInspectionModal isVisible={isFocused} />
    </>
  );
};

export default MyOrders;
