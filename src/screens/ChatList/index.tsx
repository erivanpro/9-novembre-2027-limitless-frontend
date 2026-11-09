import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {
  CustomButton,
  CustomSearchInput,
  CustomText,
  CustomWrapper,
} from '../../components';
import {COLORS} from '../../utils/theme';
import {ChatListItem} from './components';
import ChatTypeRow from './components/ChatTypeRow';
import useUserStore from '../../service/store/user.store';
import {useChat} from '../../hooks/useChat';
import {useIsFocused} from '@react-navigation/native';
import ChatListSkeleton from '../../components/Skeleton/ChatListSkeleton';
import useLanguageStore from '../../service/store/language.store';
import useTranslate from '../../hooks/useTranslate';
import {navigate} from '../../utils/navigation';

const ChatList = () => {
  const [search, setSearch] = useState('');
  const {userDetails} = useUserStore();
  const [activeChat, setActiveChat] = useState('As Customer');
  const {language} = useLanguageStore();
  const {t} = useTranslate();
  const shouldShowChatTypeRow =
    userDetails?.user_type && userDetails?.user_type?.length > 1;

  // chat type is passed from props and not used the redux type so as to not call the api when userType is changed on different screen
  const { getChatList, getChatListLoading, deleteChat } = useChat({
    chat_type: activeChat,
    search,
  });

  const data = getChatList.data?.pages[0]?.data?.chats;
  const handleDelete = async (id: string) => {
    deleteChat(id);
    await getChatList.refetch();
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getChatList.refetch();
    }
  }, [isFocused]);

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <View style={styles.screenTitle}>
        <HeaderTitle />
        <CustomButton
          title={t('myOrders')}
          onPress={() => navigate('MyOrders')}
          containerStyle={styles.ordersButton}
          textStyle={styles.ordersButtonText}
        />
      </View>
      <CustomSearchInput onChangeText={value => setSearch(value)} />

      {shouldShowChatTypeRow && (
        <ChatTypeRow activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
      {getChatListLoading ? (
        [1, 2, 3, 4, 5, 6, 7]?.map(i => {
          return <ChatListSkeleton />;
        })
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={getChatListLoading}
              onRefresh={() => getChatList.refetch()}
            />
          }
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => (
            <ChatListItem
              {...item}
              chatType={activeChat}
              handleDelete={() => handleDelete(item?.chat_id)}
            />
          )}
          ItemSeparatorComponent={() => ItemSeparator()}
          ListEmptyComponent={() => <ListEmptyComponent />}
        />
      )}
    </CustomWrapper>
  );
};

const ListEmptyComponent = () => {
  const { t } = useTranslate();
  return (
    <View>
      <CustomText
        center
        text={t('noChatsAvailable')}
        fontSize="S12"
        color={COLORS.neutral400}
      />
    </View>
  );
};

const HeaderTitle = () => {
  const { t } = useTranslate();
  return (
    <CustomText text={t('messages')} fontWeightPopins="600" fontSize="S22" />
  );
};
const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  screenTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP(5),
  },
  ordersButton: {
    backgroundColor: COLORS.green,
    borderWidth: 0,
    borderRadius: 200,
    minHeight: widthPercentageToDP(10),
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(2),
  },
  ordersButtonText: {
    color: COLORS.white,
    fontSize: widthPercentageToDP(3),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.neutral100,
    width: '85%',
    alignSelf: 'flex-end',
  },
  contentContainer: {
    paddingBottom: widthPercentageToDP(22),
  },
});

export default ChatList;
