import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomHeader, CustomText, RoundedBadge} from '../../../../components';
import {VEHICLE_TYPES} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
import useTranslate from '../../../../hooks/useTranslate';

interface VehicleTypeProps {
  onBack: () => void;
  setFilters: (e: Object) => void;
  filters: any;
}

const VehicleType: FC<VehicleTypeProps> = ({onBack, filters, setFilters}) => {
  const {t} = useTranslate();
  return (
    <View style={styles.container}>
      <CustomHeader title={t('applyFilter')} handleBackPress={onBack} />
      <CustomText text={t('vehicleType')} />
      <FlatList
        data={VEHICLE_TYPES}
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `feature-${item}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            title={t(item?.label)}
            backgroundColor={COLORS.white as keyof typeof COLORS}
            translatedValue={item?.value}
            activeBadge={filters?.vehicle_type}
            onPress={() =>
              setFilters((prev: Object) => ({
                ...prev,
                vehicle_type: item?.value,
              }))
            }
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default VehicleType;

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
