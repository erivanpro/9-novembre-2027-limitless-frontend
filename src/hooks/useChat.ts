import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteChatService,
  getChatListService,
  getChatMessagesService,
} from '../services/chatService';

export const useChat = (params?: any) => {
  const queryClient = useQueryClient();

  const getChatListQuery = useInfiniteQuery({
    queryKey: ['chat', params?.chat_type, params?.search],
    queryFn: ({pageParam = 0}) => {
      const payload = {
        skip: pageParam,
        take: 10,
        chat_type: params?.chat_type,
        search: params?.search?.trim(),
      };
      return getChatListService(payload);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length * 10 : undefined;
    },
    initialPageParam: 0,
  });

  const getChatMessagesQuery = useInfiniteQuery({
    queryKey: ['messages', params?.chatId],
    queryFn: ({pageParam = 0}) => {
      return getChatMessagesService({
        skip: pageParam,
        take: 10,
        id: params?.chatId,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length * 10 : undefined;
    },
    initialPageParam: 0,
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChatService,
    onSuccess: (_, chatId) => {
      // Invalidate messages for the deleted chat
      queryClient.invalidateQueries({
        queryKey: ['messages', chatId],
      });
      // Invalidate the chat list to reflect deletion
      queryClient.invalidateQueries({
        queryKey: ['chat'],
      });
      params?.successHandler?.();
    },
  });

  return {
    getChatList: getChatListQuery,
    getChatListLoading: getChatListQuery.isFetching,

    getChatMessages: getChatMessagesQuery,
    getChatMessagesLoading: getChatMessagesQuery.isPending,

    deleteChat: deleteChatMutation.mutate,
    deleteChatLoading: deleteChatMutation.isPending,
  };
};
