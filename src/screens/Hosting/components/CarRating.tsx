import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import {CustomIcon, CustomText, Row} from '../../../components';
import {COLORS} from '../../../utils/theme';
import {formatStars} from '../../../utils/helper';
import {useTranslate} from '../../../hooks/useTranslate';

const CarRating = ({data}: any) => {
  const {t} = useTranslate();

  const totalRating = Object.values(data).reduce((acc, curr) => {
    return Number(acc) + Number(curr);
  }, 0);
  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" style={styles.headingRow}>
        <CustomText text={t('ratings')} fontWeightPopins="600" fontSize="S18" />
        <Row>
          <CustomIcon type="AntDesign" icon="staro" color={COLORS.warning500} />
          <CustomText
            text={` ${Number(totalRating) / 5}`}
            fontWeightInter="400"
            fontSize="S12"
            color={COLORS.neutral600}
          />
        </Row>
      </Row>
      <FlatList
        scrollEnabled={false}
        data={Object.entries(data).sort((a, b) => Number(b[0]) - Number(a[0]))}
        renderItem={({item}) => {
          return (
            <Row justifyContent="space-between" style={styles.row}>
              <CustomText
                text={`${item[0]}.0`}
                fontWeightInter="400"
                fontSize="S12"
                color={COLORS.neutral600}
              />
              <View style={styles.emptyBar}>
                <View
                  style={[
                    styles.coloredBar,
                    {
                      maxWidth: widthPercentageToDP(
                        (Number(totalRating) / 5) * Number(item[1]),
                      ),
                    },
                  ]}></View>
              </View>
              <CustomText
                text={formatStars(item[1] as number)}
                fontWeightInter="400"
                fontSize="S12"
                color={COLORS.neutral600}
              />
            </Row>
          );
        }}
      />
    </View>
  );
};

export default CarRating;

const styles = StyleSheet.create({
  container: {
    marginVertical: widthPercentageToDP(5),
    borderColor: COLORS.neutral100,
    borderWidth: 2,
    padding: widthPercentageToDP(3),
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
  headingRow: {
    paddingBottom: widthPercentageToDP(2),
  },
  row: {position: 'relative', zIndex: 2},
  emptyBar: {
    flex: 0.9,
    width: widthPercentageToDP(50),
    height: widthPercentageToDP(3),
    backgroundColor: COLORS.neutral100,
    borderRadius: widthPercentageToDP(10),
    marginVertical: widthPercentageToDP(2),
    overflow: 'hidden',
  },
  coloredBar: {
    zIndex: 3,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.warning500,
    height: widthPercentageToDP(3),
    borderRadius: widthPercentageToDP(10),
  },
});
