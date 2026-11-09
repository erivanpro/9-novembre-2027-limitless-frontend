import React, { useEffect } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CustomHeader, CustomText, CustomWrapper } from '../../components';
import ChatListSkeleton from '../../components/Skeleton/ChatListSkeleton';
import { useNotifications } from '../../hooks/useNotification';
import useTranslate from '../../hooks/useTranslate';
import { transformNotificationData } from '../../utils/helper';
import { COLORS, FONT } from '../../utils/theme';
import NotificationItem from './components/NotificationItem';

const NotificationScreen = () => {
  const { t } = useTranslate();
  const { getNotifications, getNotificationsLoading, notifications } =
    useNotifications();
  useEffect(() => {
    getNotifications.refetch();
  }, []);
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title={t('notificationsTitle')} />

      {getNotificationsLoading ? (
        [1, 2, 3, 4, 5, 6, 7]?.map(i => {
          return <ChatListSkeleton />;
        })
      ) : (
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={transformNotificationData(notifications)}
          scrollEnabled={transformNotificationData(notifications)?.length > 0}
          renderItem={({ item }) => <NotificationItem {...item} />}
          renderSectionHeader={({ section: { date } }) => (
            <CustomText text={date} textStyle={styles.date} />
          )}
          ItemSeparatorComponent={() => ItemSeparator()}
          SectionSeparatorComponent={() => SectionSeparator()}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ListEmptyComponent}
          onEndReached={() => {
            if (
              getNotifications.hasNextPage &&
              !getNotifications.isFetchingNextPage
            ) {
              getNotifications.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            getNotifications.isFetchingNextPage ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : null
          }
        />
      )}
    </CustomWrapper>
  );
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const SectionSeparator = () => <View style={styles.sectionSeparator} />;

const ListEmptyComponent = () => {
  const { t } = useTranslate();
  return (
    <CustomText
      textStyle={{ paddingTop: RFValue(20) }}
      center
      text={t('noNotificationsRightNow') as any}
      color={COLORS.neutral400}
    />
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  date: {
    fontFamily: FONT.poppins500,
    fontSize: RFValue(14),
    paddingVertical: widthPercentageToDP(2),
  },
  itemSeparator: {
    paddingVertical: widthPercentageToDP(1.5),
  },
  sectionSeparator: {
    paddingVertical: widthPercentageToDP(1),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
});
