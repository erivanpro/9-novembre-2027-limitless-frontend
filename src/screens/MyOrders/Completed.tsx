import {FlatList, View} from 'react-native';
import React from 'react';
import {CompletedOrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useUserStore from '../../service/store/user.store';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';

const Completed = () => {
  const {getMyOrders, getMyOrdersLoading} = useOrders({status: 'Completed'});
  const data = getMyOrders?.data?.pages[0]?.data?.orders || [];
  const {isHost, userDetails} = useUserStore();

  const HandlePress = (booking: any) => {
    if (
      booking?.is_rating_pending &&
      userDetails?.user_type?.includes('user')
    ) {
      return navigate('Reviews', {id: booking?.id});
    }
    if (isHost) {
      return navigate('HostBookingDetails', {id: booking?.id});
    }

    navigate('UserBookingDetails', {id: booking?.id});
  };
  const handle = () => {
    getMyOrders.refetch();
  };
  return getMyOrdersLoading ? (
    <View style={{paddingVertical: widthPercentageToDP(2)}}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]?.map(i => {
        return (
          <View key={i} style={{ paddingVertical: widthPercentageToDP(3) }}>
            <OrdersSkeleton />
          </View>
        );
      })}
    </View>
  ) : (

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={getOrderListKey}
        renderItem={({item}) => (
          <CompletedOrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking)}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        onRefresh={handle}
        refreshing={getMyOrdersLoading}
      />

  );
};

const ListEmptyComponent = () => {
  const {t} = useTranslate();
  return <EmptyScreen image={IMAGES.carIcon} title={t('noCompletedOrders')} />;
};

export default Completed;
