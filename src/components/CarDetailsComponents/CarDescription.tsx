import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {FontSizeType} from '../CustomText/interface';
import useTranslate from '../../hooks/useTranslate';

const CarDescription = ({
  description,
  fontSize,
}: {
  description: string;
  fontSize?: FontSizeType;
}) => {
  const {t} = useTranslate();
  return (
    <View>
      <CustomText
        text={t('carDescription')}
        fontWeightPopins="600"
        fontSize={fontSize || 'S18'}
      />
      <CustomText
        text={description}
        fontWeightInter="500"
        fontSize="S12"
        color={COLORS.neutral400}
      />
    </View>
  );
};

export default CarDescription;
