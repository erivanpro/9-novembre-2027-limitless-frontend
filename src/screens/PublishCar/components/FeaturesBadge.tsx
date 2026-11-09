import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import {RoundedBadge} from '../../../components';
import {CarFeaturesBadges} from '../interface';
import {CAR_FEATURES} from '../../../utils/constants';
import useTranslate from '../../../hooks/useTranslate';

const CarFeatures: FC<CarFeaturesBadges> = ({
  activeBadges,
  setActiveBadges,
  data = CAR_FEATURES,
}) => {
  const {t} = useTranslate();

  return (
    <View>
      <View style={styles.popularBadgeContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.renderItemContainer}>
              <RoundedBadge
                isMultiSelect
                title={t(item.label)}
                activeBadges={activeBadges}
                setActiveBadges={setActiveBadges}
                translatedValue={item.value}
              />
            </View>
          )}
          ItemSeparatorComponent={() => ItemSeparatorComponent()}
        />
      </View>
    </View>
  );
};

export default CarFeatures;

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {width: widthPercentageToDP(2.5)},
  popularBadgeContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(6),
  },
  contentContainerStyle: {flexDirection: 'row', flexWrap: 'wrap'},
  renderItemContainer: {margin: RFValue(5)},
});
