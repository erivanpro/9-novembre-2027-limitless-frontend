// import {useState} from 'react';
// import {getChatListEndpoint} from '../utils/endpoints';
// import {useQuery} from '@tanstack/react-query';
// import axiosInstance from '../service/api';

// const useChatMessages = (
//   page: any,
//   setPage: any,
//   messages: Array<any>,
//   setMessages: any,
//   type: 'Drop' | 'Direct',
//   chatId: number,
//   queryKey: any,
// ) => {
//   const take = 30;
//   const [isLoadMore, setIsLoadMore] = useState(false);
//   const [isRefresh, setIsRefresh] = useState(false);
//   const [ishasMore, setIsHasMore] = useState(false);

//   const {data, refetch, isFetching, isError, isLoading} = useQuery(
//     [queryKey, type, page],
//     () => {
//       setIsRefresh(true);
//       return axiosInstance.get(
//         getChatListEndpoint + `/${chatId}&skip=${messages.length}&take=${take}`,
//       );
//     },
//     {
//       keepPreviousData: true,
//       onSuccess: data => {
//         console.log(
//           type,
//           '============>>>>>>>>>>',
//           data?.messages?.length,
//           data?.hasMore,
//         );
//         const newMessages = data?.messages?.map((item: any) => {
//           return {
//             text: item?.message,
//             user: {
//               _id: item?.sender?.id,
//               name: item?.sender?.full_name,
//               avatar:
//                 item?.sender?.deleted_at !== null
//                   ? IMAGES.emptyProfile
//                   : item?.sender?.profile_picture
//                   ? item?.sender?.profile_picture
//                   : IMAGES.emptyProfile,
//               deleted_at: item?.sender?.deleted_at,
//             },
//             createdAt: item?.created_at,
//             _id: item?.id,
//           };
//         });
//         setIsHasMore(data?.hasMore);
//         if (page === 0) {
//           setMessages(newMessages);
//         } else {
//           setMessages((prevMessages: any) => [...prevMessages, ...newMessages]);
//         }
//         setIsLoadMore(false);
//         setIsRefresh(false);
//       },
//       onError: error => {
//         console.log('Error: ', error);
//         setIsLoadMore(false);
//         setIsRefresh(false);
//       },
//       refetchOnMount: true,
//     },
//   );

//   const onRefresh = async () => {
//     setIsRefresh(true);
//     setMessages([]);
//     setPage(0);
//     await refetch();
//   };

//   const onReachEnd = () => {
//     console.log(page, 'data?.hasMore: ' + data?.hasMore);
//     if (!data?.hasMore || isLoadMore || isRefresh) return;
//     if (data?.hasMore) {
//       setIsLoadMore(true);
//       console.log('Load More');
//       setPage(page + 1);
//     }
//   };

//   return {
//     data,
//     refetch,
//     isFetching,
//     isLoading,
//     isError,
//     isLoadMore,
//     onRefresh,
//     onReachEnd,
//     ishasMore,
//   };
// };

// export default useChatMessages;
