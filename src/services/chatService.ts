import axiosInstance from '../service/api';
import {getChatListEndpoint} from '../utils/endpoints';

export const getChatListService = async ({
  skip,
  take,
  chat_type,
  search,
}: {
  skip: number;
  take: number;
  chat_type: 'As Customer' | 'As Host';
  search?: string;
}) => {
  return await axiosInstance.get(
    `${getChatListEndpoint}?skip=${skip}&take=${take}`,
    {
      params: {
        chat_type,
        search,
      },
    },
  );
};

export const getChatMessagesService = async ({
  skip,
  take,
  id,
}: {
  skip: number;
  take: number;
  id?: string;
}) => {
  return await axiosInstance.get(
    `${getChatListEndpoint}/${id}/messages?skip=${skip}&take=${take}`,
  );
};

export const deleteChatService = async (id: string) => {
  return await axiosInstance.delete(`${getChatListEndpoint}/${id}`);
};
