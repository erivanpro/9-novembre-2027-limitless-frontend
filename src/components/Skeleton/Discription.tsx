import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const DiscriptionSkeleton = () => {
  return (
    <View style={{gap: heightPercentageToDP(2)}}>
      <View
        style={{
          height: heightPercentageToDP(30),
          width: '100%',
          backgroundColor: COLORS.neutral100,
        }}></View>
      <View
        style={{
          height: heightPercentageToDP(10),
          width: '60%',
          backgroundColor: COLORS.neutral100,
          borderRadius: 50,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          width: '100%',
        }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          return (
            <View
              style={{
                height: RFValue(90),
                width: RFValue(97),
                borderRadius: 10,
                backgroundColor: COLORS.neutral100,
              }}></View>
          );
        })}
      </View>
    </View>
  );
};

export default DiscriptionSkeleton;

const styles = StyleSheet.create({});
