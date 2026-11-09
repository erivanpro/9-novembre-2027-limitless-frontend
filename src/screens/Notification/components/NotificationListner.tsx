import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  EventType,
  AuthorizationStatus,
  AndroidVisibility,
} from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import MMKVStorage from '../../../utils/MMKVStorage';

export async function GetFCMToken() {
  let fcmtoken = await MMKVStorage.getItem('fcmtoken');

  if (fcmtoken) {
    return fcmtoken;
  } else if (!fcmtoken) {
    try {
      const newToken = await messaging().getToken();
      if (newToken) {
        await MMKVStorage.setItem('fcmtoken', newToken);
      }
      return newToken;
    } catch (error) {}
  }
}

export const requestUserPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    await GetFCMToken();
  } else {
  }
};

export async function onDisplayNotification(message: any) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  // Display a notification
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    data: message.data,
    android: {
      channelId: channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      // actions: [
      //   {
      //     title: 'Action 1',
      //     pressAction: {
      //       id: 'action_1',
      //     },
      //   },
      //   {
      //     title: 'Action 2',
      //     pressAction: {
      //       id: 'action_2',
      //     },
      //   },
      // ],
    },
  });
}

const NotificationListener = () => {
  const navigation: any = useNavigation();
  requestUserPermission();

  //   const dispatch = useDispatch();

  const handleNavigation = useCallback(
    (
      navigateTo: any,
      adType: string | undefined = '',
      biddedId: string | undefined = '',
      adId: number | null = null,
    ) => {
      if (navigateTo) {
        navigation.navigate(navigateTo, {
          index: adId,
          biddedId: biddedId,
          type: adType,
        });
      } else {
        navigation.navigate('Notification');
      }
    },
    [navigation],
  );

  useEffect(() => {
    const unsubForegroundListener = messaging().onMessage(remoteMessage => {
      console.log(remoteMessage, 'remoteMessage');
      onDisplayNotification(remoteMessage);
    });

    const unsubForegroundEvent = notifee.onForegroundEvent(
      async ({ type, detail }: any) => {
        const { notification } = detail;
        // When app open
        console.log('foreground');
        if (type === EventType.PRESS) {
          handleNavigation(
            notification?.data?.navigateTo,
            notification?.data?.ad_type,
            notification?.data?.biddedId,
            notification?.data?.id,
          );

          await notifee.cancelNotification(notification?.id);
        }
      },
    );

    // Handle background notifications
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('background');
      handleNavigation(
        remoteMessage?.data?.navigateTo,
        remoteMessage?.data?.ad_type,
        remoteMessage?.data?.biddedId,
        remoteMessage?.data?.id,
      );
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("remoteMessage");
    });

    // Handle initial notification when the app is launched from a terminated state
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          handleNavigation(
            remoteMessage?.data?.navigateTo,
            remoteMessage?.data?.ad_type,
            remoteMessage?.data?.biddedId,
            remoteMessage?.data?.id,
          );
        }
      });

    notifee.onBackgroundEvent(async ({ type }) => {
      //   const {notification, pressAction} = detail;

      if (type === EventType.PRESS) {
        // navigation.navigate('Notification');
      }
    });

    return () => {
      unsubForegroundListener();
      unsubForegroundEvent();
    };
  }, [handleNavigation]);

  return <View />;
};

export default NotificationListener;
