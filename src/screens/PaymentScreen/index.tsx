import React, {useRef, useState, useMemo} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomWrapper, CustomHeader} from '../../components';
import {COLORS} from '../../utils/theme';
import {navigateGoBack} from '../../utils/navigation';
import SelectDate from './SelectDate';
import Payment from './Payment';
import ConfirmPayment from './ConfirmPayment';
import PaymentSummary from './PaymentSummary';
import {useRoute} from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native';
import useTranslate from '../../hooks/useTranslate';

const PaymentScreen = () => {
  const scrollRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const params = useRoute().params;
  const {t} = useTranslate();
  const tabList = [
    {component: SelectDate},
    {component: Payment},
    {component: ConfirmPayment},
    {component: PaymentSummary},
  ];

  const headings = [
    t('selectDate'),
    t('addPaymentDetails'),
    t('confirmPayment'),
    t('paymentSummary'),
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
        car_id={params?.car_id}
      />
    );
  };
  return (
    <StripeProvider
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      publishableKey={
        'pk_live_51QZuAAISay562RG8tSG9uVkPITGjNnjPjIEfBuZ5KjXs1YWDmLvhkq2QeVtmUKv6k3rbA32qjP9oQ9A0kpteppBI00TDfBDQda'
      }>
      <CustomWrapper backgroundColor={COLORS.white}>
        <CustomHeader
          title={headings[currentIndex]}
          containerStyle={styles.headerContainer}
          handleBackPress={HandleBackPress}
          hideBackBtn={currentIndex == 3 ? true : false}
        />
        <View style={[styles.border, {width: borderWidth}]} />
        {/* <PaymentSummary scrollRef={null} setCurrentIndex={() => {}} /> */}
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
    </StripeProvider>
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
  },
});

export default PaymentScreen;
