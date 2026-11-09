import {useCallback, useEffect, useRef, useState} from 'react';
import socketIOClient, {Socket} from 'socket.io-client';

import {useNetInfo} from '@react-native-community/netinfo';
import useUserStore from '../service/store/user.store';
import {API_URL} from '../utils/constants';
import useChatStore from '../service/store/chat.store';
import {GiftedChat} from 'react-native-gifted-chat';
import {useChat} from './useChat';
import {useIsFocused} from '@react-navigation/native';

interface UseSocket {
  socketConnected: boolean;
  socket: Socket | null;
  disconnectSocket: () => void;
  socketEmit: (eventType: string, eventParams: any) => void;
  socketOn: (
    eventType: string,
    callBackFunction: (...args: any[]) => void,
  ) => void;
  roomId: any;
}

export const useSocket = (props): any => {
  const [messages, setMessages] = useState<
    {
      _id: any;
      text: any;
      createdAt: any;
      user: {_id: any; name: any; avatar?: string};
    }[]
  >([]);
  const socketRef = useRef<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState();
  const {accessToken, userDetails} = useUserStore();
  const {isConnected} = useNetInfo();
  const {chatId, setChatId, chatType, receiverId, senderId} = useChatStore();

  const {getChatMessages, getChatMessagesLoading} = useChat({chatId});
  const previousMessages = getChatMessages?.data?.pages[0]?.data?.messages;
  useEffect(() => {
    if (!getChatMessagesLoading && !!previousMessages?.length) {
      setMessages?.(
        previousMessages?.map(val => ({
          _id: val.id,
          text: val.message,
          createdAt: val.createdAt,
          user: {_id: val.sender?.id, avatar: val?.sender?.profile_picture},
        })),
      );
    }
    return () => setMessages([]);
  }, [getChatMessagesLoading, previousMessages, props?.isFocused]);


  useEffect(() => {
    const newSocket = socketIOClient(`${API_URL}chat`, {
      autoConnect: true,

      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    newSocket.connect();

    socketRef.current = newSocket;

    newSocket.on('error', (_: any) => {});

    newSocket.on('connect', () => {
      // setSocketConnected(true);
    });

    const joinRoomPayload = {
      chat_id: chatId || null,
      receiver_id: receiverId,
      chat_type: chatType,
    };
    socketEmit('joinRoom', joinRoomPayload);
    newSocket.on('joinedRoom', res => {
      setChatId(res.roomId);
    });

    newSocket.on('newMessage', res => {
      let newMsg = [
        {
          _id: String(res.id),
          createdAt: new Date(),
          text: res.message,
          user: {_id: res.sender?.id, avatar: res?.sender?.profile_picture},
        },
      ];

      setMessages?.((prevMessages: any) =>
        GiftedChat.append(prevMessages, newMsg),
      );
    });

    newSocket.on('disconnect', () => {});

    setSocketConnected(newSocket);

    return () => {
      socketRef?.current?.off('connect');
      socketRef?.current?.off('newMessage');
      socketRef?.current?.off('joinedRoom');
      socketRef?.current?.off('joinRoom');
      socketRef?.current?.off('connect_error');
      socketRef?.current?.disconnect();
    };
  }, [accessToken, setChatId, setMessages, isConnected]);

  const onSend = useCallback(
    (newMessage = []) => {
      let chatPayload = {
        chat_id: Number(chatId),
        message: newMessage[0]?.text,
        sender_id: userDetails?.id,
      };
      socketRef?.current?.emit('sendMessage', chatPayload);
    },
    [userDetails?.id, chatId],
  );

  const socketEmit = async (eventType: string, eventParams: any) => {
    socketRef?.current.emit(eventType, eventParams);
  };

  return {
    socketConnected,
    socketEmit,
    socket: socketRef,
    messages,
    onSend,
    getChatMessagesLoading,
    previousMessages,
  };
};
