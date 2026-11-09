import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomHeader, CustomWrapper} from '../../../components';
import {COLORS} from '../../../utils/theme';
import ProfileDetails from './ProfileDetails';
import DrivingDetails from './DrivingDetails';
import {RouteProp, useRoute} from '@react-navigation/native';
import useUserStore from '../../../service/store/user.store';
import useTranslate from '../../../hooks/useTranslate';

const SignupComplete = () => {
  type SignupProps = {
    SignupProps: {
      id?: string;
      user_type?: string;
      recent_signup?: boolean;
    };
  };
  const {userDetails} = useUserStore();

  const scrollRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const routeParams = useRoute<RouteProp<SignupProps, 'SignupProps'>>().params;
  const [webViewUrl, setWebViewUrl] = useState<string | undefined>();
  const routedUserType =
    Array.isArray(routeParams)
      ? routeParams[0]?.user_type
      : routeParams?.user_type; 
  const tabList = [{component: ProfileDetails}, {component: DrivingDetails}];

const {t} = useTranslate();

  const headings = [
    t('completeProfile'),
    webViewUrl ? t('paymentDetails') : t('completeProfile'),
  ];

  const borderWidth = useMemo(
    () => (windowWidth / tabList.length) * (currentIndex + 1),
    [currentIndex, windowWidth, tabList.length],
  );
  const showBackButton = currentIndex !== 0;

  const HandleBackPress = () => {
    setWebViewUrl(undefined);
    const targetIndex = currentIndex - 1;
    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({index: 0, animated: true});
      setCurrentIndex(targetIndex);
    }
  };

  const renderTabItem = ({item}: any) => {
    const TabComponent = item.component;
    return (
      <TabComponent
        scrollRef={scrollRef}
        setCurrentIndex={setCurrentIndex}
        user_type={routedUserType}
        webViewUrl={webViewUrl}
        setWebViewUrl={setWebViewUrl}
      />
    );
  };

  // const HandleNext = () => {
  //   setWebViewUrl(undefined);
  //   const targetIndex = currentIndex  1;
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollToIndex({index: 1, animated: true});
  //     setCurrentIndex(targetIndex);
  //   }
  //   // scrollRef.current.scrollToIndex({index: 1, animated: true});
  // };

  // useEffect(() => {
  //     if (
  //       userDetails?.user_type.includes('host') &&
  //       userDetails?.host_onboarding_status == 'Driving_Details_Pending'
  //     ) {
  //       // setCurrentIndex(1);
  //       HandleNext()
  //       // scrollRef.current.scrollToIndex({index: 1, animated: true});
  //     }
  //   }, []);

  // const renderTabItem = useCallback(({ item }: any) => {
  //   const TabComponent = item.component;
  //   return (
  //     <TabComponent
  //       scrollRef={scrollRef}
  //       setCurrentIndex={setCurrentIndex}
  //       user_type={routedUserType}
  //       webViewUrl={webViewUrl}
  //       setWebViewUrl={setWebViewUrl}
  //     />
  //   );
  // }, [scrollRef, setCurrentIndex, routedUserType, webViewUrl, setWebViewUrl]);

  return (
    <CustomWrapper backgroundColor={COLORS.white}>
      <CustomHeader
        title={headings[currentIndex]}
        hideBackBtn={!showBackButton}
        containerStyle={styles.headerContainer}
        handleBackPress={HandleBackPress}
      />
      <View style={[styles.border, {width: borderWidth}]} />
      <FlatList
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
    height: 2,
    backgroundColor: COLORS.black,
  },
  flatListStyle: {
    width: widthPercentageToDP(100),
    flex: 1,
  },
});

export default SignupComplete;
