export type SingleChat = {
  id: string;
  name: string;
  profile_pic: string;
  lastMsg: string;
  time: string;
};

// single chat object for gifted chat
export type SingleGiftedChat = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
};

export type ChatListResponse = {
  id: number;
  participants: {
    id: number;
    profilePicture: string;
    fullname: string;
    email: string;
  }[];
  messages: {
    _id: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    isRead: boolean;
    user: {
      id: number;
      avatar: string;
      fullname: string;
      email: string;
    };
  }[];
};

type MessageUser = {
  email?: string;
  fullname?: string;
  id: number;
  profilePicture?: string;
};

export type MessageListResponse = {
  id: number;
  createdAt: string; // ISO date string
  isRead: boolean;
  text: string;
  user: MessageUser;
};
