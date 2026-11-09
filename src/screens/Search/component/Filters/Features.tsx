import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomHeader, CustomText, RoundedBadge} from '../../../../components';
import {CAR_FEATURES} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
import {useTranslate} from '../../../../hooks/useTranslate';

interface FeaturesFilterProps {
  onBack: () => void;
  setFilters: () => void;
  filters: any;
}

const FeaturesFilter: FC<FeaturesFilterProps> = ({
  onBack,
  filters,
  setFilters,
}) => {
  const {t} = useTranslate();

  const HandlePress = (value: string) => {
    let features = filters?.features?.length ? [...filters?.features] : [];
    if (features.includes(value)) {
      features = features.filter((item: string) => item !== value);
    } else {
      features.push(value);
    }
    setFilters({...filters, features});
  };




console.log({CAR_FEATURES}, '=================CAR_FEATURES');
return (
  <View style={styles.container}>
    <CustomHeader title={t('applyFilter')} handleBackPress={onBack} />

    <CustomText text={t('features')} />

    <FlatList
      data={CAR_FEATURES}
      scrollEnabled={false}
      numColumns={1}
      keyExtractor={(item, index) => `feature-${item}-${index}`}
      renderItem={({item}) => (
        <RoundedBadge
          isMultiSelect
          title={t(item?.label)}
          translatedValue={item?.value}
          backgroundColor={COLORS.white as keyof typeof COLORS}
          activeBadges={filters?.features}
          onPress={HandlePress}
        />
      )}
      contentContainerStyle={styles.badgesContainer}
    />
  </View>
);
};

export default FeaturesFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: widthPercentageToDP(2),
  },
});
