import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {ChatListItemProps} from './interface';
import {CustomImage, CustomPopupMenu, CustomText} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../../../utils/theme';
import {navigate} from '../../../../utils/navigation';
import useChatStore from '../../../../service/store/chat.store';
import useUserStore from '../../../../service/store/user.store';
import useTranslate from '../../../../hooks/useTranslate';

interface MenuType {
  name: string;
  onPress: () => void;
  icon?: React.ReactNode;
  chatType?: 'As Customer' | 'As Host';
}

const ChatListItem: FC<ChatListItemProps> = ({
  message,
  chat_id,
  otherUser,
  chatType,
  handleDelete,
}) => {
  const {userDetails} = useUserStore();
  const {t} = useTranslate();
  const menu: MenuType[] = [
    {
      name: t('deleteChat'),
      onPress: handleDelete,
    },
  ];

  const {setChatId, setChatType, setReceiverId, setSenderId} = useChatStore();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.child}
        onPress={() => {
          setChatId(chat_id);
          setChatType(chatType as any);
          setReceiverId(otherUser?.id as any);
          setSenderId(userDetails?.id as any);

          navigate('SingleChat', {
            receiver_name: otherUser?.full_name,
          });
        }}
      >
        <CustomImage
          source={{uri: otherUser?.profile_picture}}
          width={widthPercentageToDP(13)}
          height={widthPercentageToDP(13)}
          resizeMode="cover"
          containerStyle={styles.profilePic}
        />
        <View style={styles.textContainer}>
          <CustomText
            text={otherUser?.full_name}
            fontWeightPopins="600"
            fontSize="S14"
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <CustomText
            text={message}
            color={COLORS.neutral400}
            fontSize="S12"
            fontWeightInter="500"
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
      </TouchableOpacity>

      <CustomPopupMenu
        menu={menu}
        optionsContainerStyle={{padding: RFValue(5), width: RFValue(110)}}
        textStyle={{fontWeightInter: FONT.interRegular, fontSize: RFValue(12)}}
      />
    </View>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP(4),
  },
  child: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    borderRadius: RFValue(100),
    marginRight: widthPercentageToDP(4),
  },
  textContainer: {
    flex: 1,
  },
  threeDots: {
    alignSelf: 'center',
  },
});
