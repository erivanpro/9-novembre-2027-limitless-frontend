import {FlatList, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {CompletedOrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';
import HostPayoutBottomSheet, {
  HostPayoutSheetHandle,
} from '../../components/HostPayoutBottomSheet';
import MMKVStorage from '../../utils/MMKVStorage';

const Completed = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Completed',
  });
  const data = getOrdersForMyCar?.data?.pages[0]?.data?.orders || [];
  const payoutSheetRef = useRef<HostPayoutSheetHandle>(null);
  const promptedBookingRef = useRef<string | null>(null);
  const latestCompletedBookingId = String(data[0]?.booking?.id || '');

  useEffect(() => {
    if (
      getOrdersForMyCarLoading ||
      !latestCompletedBookingId ||
      promptedBookingRef.current === latestCompletedBookingId
    ) {
      return;
    }

    promptedBookingRef.current = latestCompletedBookingId;
    let isActive = true;
    const storageKey = `hostPayoutSheetSeen:${latestCompletedBookingId}`;

    const showPayoutPrompt = async () => {
      const hasSeenPrompt = await MMKVStorage.getItem(storageKey);
      if (hasSeenPrompt || !isActive) {
        return;
      }

      await MMKVStorage.setItem(storageKey, 'true');
      if (isActive) {
        payoutSheetRef.current?.present();
      }
    };

    void showPayoutPrompt();
    return () => {
      isActive = false;
    };
  }, [getOrdersForMyCarLoading, latestCompletedBookingId]);

  const HandlePress = (booking: any) => {
    navigate('HostBookingDetails', {id: booking?.id});
    // if (isHost) {
    //   return
    // }

    // USAID SAID THAT

    // if (booking?.is_rating_pending) {
    //   navigate('Reviews', {id: booking?.id});
    //   return;
    // }
    // navigate('HostBookingDetails', {id: booking?.id});
  };
  const loadMore = () => getOrdersForMyCar.refetch();


  return (
    <>
      {getOrdersForMyCarLoading ? (
        <View style={{paddingVertical: widthPercentageToDP(2)}}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]?.map(i => {
            return (
              <View key={i} style={{paddingVertical: widthPercentageToDP(3)}}>
                <OrdersSkeleton />
              </View>
            );
          })}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={getOrderListKey}
          renderItem={({item}) => (
            <CompletedOrderCard
              {...item}
              handlePress={() => HandlePress(item?.booking)}
            />
          )}
          ListEmptyComponent={ListEmptyComponent}
          onRefresh={loadMore}
          refreshing={getOrdersForMyCarLoading}
        />
      )}
      <HostPayoutBottomSheet ref={payoutSheetRef} />
    </>
  );
};

const ListEmptyComponent = () => {
  const {t} = useTranslate();
  return <EmptyScreen image={IMAGES.carIcon} title={t('noCompletedOrders')} />;
};

export default Completed;
