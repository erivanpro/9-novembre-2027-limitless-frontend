import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {ChatStoreType} from '../../utils/types/ZustandStoreType';

export const defaultChatState = {};
const useChatStore = create(
  persist<ChatStoreType>(
    (set, _) => ({
      chatId: null,
      chatType: null,
      receiverId: null,
      senderId: null,
      setChatId: (id: string) =>
        set({
          chatId: id,
        }),
      setChatType: (type: string) =>
        set({
          chatType: type,
        }),
      setReceiverId: (receiverId: string) =>
        set({
          receiverId: receiverId,
        }),
      setSenderId: (senderId: string) =>
        set({
          senderId: senderId,
        }),
    }),

    {
      name: 'chat', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useChatStore;
