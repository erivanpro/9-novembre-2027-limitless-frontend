import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomHeader, CustomText, RoundedBadge} from '../../../../components';
import {BRANDS} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
import {useTranslate} from '../../../../hooks/useTranslate';

interface BrandFilterProps {
  onBack: () => void;
  setFilters: () => void;
  filters: any;
}

const FeaturesFilter: FC<BrandFilterProps> = ({
  onBack,
  filters,
  setFilters,
}) => {
  const {t} = useTranslate();

  const HandlePress = (value: string) => {
    let brand = filters?.brand?.length ? [...filters?.brand] : [];
    if (brand?.includes(value)) {
      brand = brand?.filter((item: string) => item !== value);
    } else {
      brand.push(value);
    }
    setFilters({...filters, brand});
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={t('applyFilter')} handleBackPress={onBack} />

      <CustomText text={t('brands')} />

      <FlatList
        data={BRANDS}
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `brand-${item}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            isMultiSelect
            title={item?.value}
            translatedValue={item?.value}
            activeBadges={filters?.brand}
            backgroundColor={COLORS.white as keyof typeof COLORS}
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
