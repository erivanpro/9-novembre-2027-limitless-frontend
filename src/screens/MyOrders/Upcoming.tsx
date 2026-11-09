import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';

const Upcoming = () => {
  const {getMyOrders, getMyOrdersLoading} = useOrders({status: 'Upcoming'});
  const data = getMyOrders?.data?.pages[0]?.data?.orders || [];

  const HandlePress = (id: string) => {
    navigate('UserBookingDetails', {id, showCancelBtn: true});
  };

  const handle = () => getMyOrders.refetch();
  return getMyOrdersLoading ? (
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
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={getOrderListKey}
        // scrollEnabled={!!data?.length}
        // contentContainerStyle={
        //   data?.length ? styles.contentContainer : {flex: 0.5}
        // }
        renderItem={({item}) => (
          <OrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking?.id)}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparator}
        onRefresh={handle}
        refreshing={getMyOrdersLoading}
      />
    </View>
  );
};

const ListEmptyComponent = () => {
  const {t} = useTranslate();
  return <EmptyScreen image={IMAGES.carIcon} title={t('noUpcomingOrders')} />;
};
const ItemSeparator = () => <View style={styles.itemSeparator} />;

export default Upcoming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {flexGrow: 1},
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
