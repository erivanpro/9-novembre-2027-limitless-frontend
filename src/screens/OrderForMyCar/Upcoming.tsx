import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';

const Upcoming = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Upcoming',
  });
  const data = getOrdersForMyCar?.data?.pages[0]?.data?.orders || [];

  const HandlePress = (id: string) => {
    navigate('HostBookingDetails', {id});
  };

  const loadMore = () => getOrdersForMyCar.refetch();

  return getOrdersForMyCarLoading ? (
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
        data={data}
        keyExtractor={getOrderListKey}
        renderItem={({item}) => (
          <OrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking?.id)}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparator}
        onRefresh={loadMore}
        refreshing={getOrdersForMyCarLoading}
      />

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
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
