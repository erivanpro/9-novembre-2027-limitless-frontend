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

const OrderForMyCar = () => {
  const screens = { first: Ongoing, second: Upcoming, third: Completed };
  const {t} = useTranslate();
  const isFocused = useIsFocused();
  return (
    <>
      <CustomWrapper padding backgroundColor={COLORS.white} bottomInsert={-1}>
        <CustomHeader title={t('ordersForMyCars')} />
        <CustomTabs sceneMap={screens} lazy />
      </CustomWrapper>
      <VehicleInspectionModal isVisible={isFocused} />
    </>
  );
};

export default OrderForMyCar;
