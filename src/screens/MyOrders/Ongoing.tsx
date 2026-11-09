import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTranslate} from '../../hooks/useTranslate';
import {getOrderListKey} from '../../utils/orderKeys';

const Ongoing = () => {
  const {getMyOrders, getMyOrdersLoading} = useOrders({status: 'Ongoing'});
  const data = getMyOrders?.data?.pages[0]?.data?.orders || [];
  const HandlePress = (id: string) => {
    navigate('UserBookingDetails', {id});
  };

  const handle = () => {
    getMyOrders.refetch();
  };

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
        showsVerticalScrollIndicator={false}
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
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl onRefresh={handle} refreshing={getMyOrdersLoading} />
        }
      />
    </View>
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
  contentContainer: {flexGrow: 1},
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
