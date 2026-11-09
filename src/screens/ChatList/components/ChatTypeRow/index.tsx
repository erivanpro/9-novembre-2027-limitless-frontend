import React, {FC, useTransition} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../../../utils/theme';
import {ChatTypeRowProps} from './interface';
import useChatStore from '../../../../service/store/chat.store';
import useTranslate from '../../../../hooks/useTranslate';

const ChatTypeRow: FC<ChatTypeRowProps> = ({activeChat, setActiveChat}) => {
  const CHAT_TYPES = [
    {label: 'as_Host', value: 'As Host'},
    {label: 'as_Customer', value: 'As Customer'},
  ];
  console.log({activeChat});
  const {setChatType} = useChatStore();
  const {t} = useTranslate();
  const RenderItem = ({item, index}: any) => {
    console.log(item.value);
    const selected = activeChat === item?.value;
    return (
      <TouchableOpacity
        style={selected ? styles.itemContainerActive : styles.itemContainer}
        onPress={() => {
          setActiveChat(item.value);
          setChatType(item?.value);
        }}>
        <CustomText
          text={t(item.label)}
          color={selected ? COLORS.black : COLORS.neutral500}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={CHAT_TYPES}
        renderItem={RenderItem}
        ItemSeparatorComponent={() => ItemSeparator()}
        // keyExtractor={item => item}
      />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};
export default ChatTypeRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: widthPercentageToDP(5),
  },
  itemSeparator: {
    width: widthPercentageToDP(5),
  },
  itemContainer: {},
  itemContainerActive: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
  },
});
