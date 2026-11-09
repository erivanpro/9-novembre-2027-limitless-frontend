import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  renderBubble,
  renderComposer,
  renderInputToolbar,
  renderSend,
  renderTime,
} from './components/ChatComponents';
import {CustomHeader, CustomWrapper} from '../../components';
import {useSocket} from '../../hooks/useSocket';

import useUserStore from '../../service/store/user.store';
import {COLORS} from '../../utils/theme';

type SingleChatRoute = {
  params: {
    id: string;
    receiver_name: string;
    profile_pic?: string;
    chatType?: 'As Customer' | 'As Host';
  };
};

export type SingleGiftedChat = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
};

const SingleChat = () => {
  const {params} = useRoute<RouteProp<SingleChatRoute>>();
  const {receiver_name} = params || {};

  const {userDetails} = useUserStore();
  const isFocused = useIsFocused();
  const {onSend, messages, getChatMessagesLoading, previousMessages} =
    useSocket({isFocused});

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, [isFocused]);
  return (
    <CustomWrapper backgroundColor={COLORS.white}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.container}>
        {getChatMessagesLoading || loader ? (
          <View
            style={{
              minHeight: heightPercentageToDP(85),
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <>
            <CustomHeader title={receiver_name} />
            <GiftedChat
              listViewProps={{
                showsVerticalScrollIndicator: true,
              }}
              maxInputLength={500}
              keyExtractor={item => item?.text}
              shouldUpdateMessage={(props, nextProps) =>
                props.currentMessage !== nextProps.currentMessage
              }
              // key={Math.random() * 2}
              messages={messages}
              onSend={(newMessages: SingleGiftedChat[]) => onSend(newMessages)}
              user={{
                _id: userDetails?.id || 0,
              }}
              // renderAvatar={()}
              renderTime={renderTime}
              renderBubble={renderBubble}
              renderSend={renderSend}
              renderComposer={renderComposer}
              renderInputToolbar={renderInputToolbar}
            />
          </>
        )}
      </View>
    </CustomWrapper>
  );
};
export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(5),
    justifyContent: 'center',
  },
});
