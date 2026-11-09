import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';

import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';

const Ongoing = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Ongoing',
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
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={getOrderListKey}
        renderItem={({item}) => (
          <OrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking?.id)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            onRefresh={loadMore}
            refreshing={getOrdersForMyCarLoading}
          />
        }
      />

  );
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const ListEmptyComponent = () => {
  const {t} = useTranslate();
  return <EmptyScreen image={IMAGES.carIcon} title={t('noOngoingOrders')} />;
};

export default Ongoing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
