export interface ChatListItemProps {
  chat_id: string;
  name: string;
  message: string;
  profilePic: string;
  activeChat?: boolean;
  setActiveChat?: () => void;
  handleDelete: () => void;

  chatType?: 'As Customer' | 'As Host';
  otherUser: {
    full_name: string;
    profile_picture: string;
    id?: string;
  };
}
