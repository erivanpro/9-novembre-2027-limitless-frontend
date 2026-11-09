import React, {useRef, useState, useMemo} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CarInfo from './CarInfo';
import {CustomWrapper, CustomHeader} from '../../components';
import {COLORS} from '../../utils/theme';
import {navigateGoBack} from '../../utils/navigation';
import Specification from './Specification';
import FeaturesAndDetails from './FeaturesAndDetails';
import SummaryReview from './SummaryReview';
import {useRoute} from '@react-navigation/native';
import useTranslate from '../../hooks/useTranslate';

const PublishCar = () => {
  const route = useRoute<any>();
  const {data} = route.params || {};
  const scrollRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const {t} = useTranslate();
  const tabList = [
    {component: CarInfo},
    {component: Specification},
    {component: FeaturesAndDetails},
    {component: SummaryReview},
  ];

  const headings = [
    t('carInformation'),
    t('specification'),
    t('featuresAndDetails'),
    t('summaryReview'),
  ];

  const borderWidth = useMemo(
    () => (windowWidth / tabList.length) * (currentIndex + 1),
    [currentIndex, windowWidth, tabList.length],
  );

  const HandleBackPress = () => {
    if (currentIndex < 1) {
      navigateGoBack();
      return;
    }
    const targetIndex = currentIndex - 1;
    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({index: targetIndex, animated: true});
      setCurrentIndex(targetIndex);
    }
  };

  const renderTabItem = ({item}: any) => {
    const TabComponent = item.component;
    return (
      <TabComponent
        scrollRef={scrollRef}
        setCurrentIndex={setCurrentIndex}
        data={data}
      />
    );
  };

  return (
    <CustomWrapper backgroundColor={COLORS.white}>
      <CustomHeader
        title={headings[currentIndex]}
        containerStyle={styles.headerContainer}
        handleBackPress={HandleBackPress}
      />
      <View style={[styles.border, {width: borderWidth}]} />
      <FlatList
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}
        data={tabList}
        horizontal
        pagingEnabled
        renderItem={renderTabItem}
        scrollEnabled={false} // to disable swipable component change
        showsHorizontalScrollIndicator={false}
        style={styles.flatListStyle}
        keyExtractor={(_, index) => `tab-${index}`}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral50,
    paddingHorizontal: RFValue(15),
  },
  border: {
    height: 3,
    backgroundColor: COLORS.black,
  },
  flatListStyle: {
    width: widthPercentageToDP(100),
    flex: 1,
  },
});

export default PublishCar;
