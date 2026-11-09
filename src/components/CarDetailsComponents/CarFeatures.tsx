import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import RoundedBadge from '../RoundedBadge';
import {useTranslate} from '../../hooks/useTranslate';

const CarFeatures = ({data}: {data: string[]}) => {
  const {t} = useTranslate();
  return (
    <View style={styles.container}>
      <CustomText
        text={t('features')}
        fontWeightPopins="600"
        fontSize="S18"
        textStyle={styles.featureHeading}
      />
      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `feature-${item}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            title={t(item)}
            backgroundColor={COLORS.neutral100 as keyof typeof COLORS}
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default CarFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureHeading: {
    paddingTop: widthPercentageToDP(1),
    paddingBottom: widthPercentageToDP(3),
  },
});
