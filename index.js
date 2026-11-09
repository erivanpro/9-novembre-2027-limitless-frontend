import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AppRegistry, Linking, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-devsettings';
import 'react-native-get-random-values'; // required for react native auto complete input and gifted chat
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';

import App from './App';
import { name as appName } from './app.json';
import {navigationRef} from './src/utils/navigation';
import Geolocation from '@react-native-community/geolocation';

export const queryClient = new QueryClient();

const Root = () => {
  Geolocation?.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    locationProvider: 'playServices',
  });

  const linking = {
    prefixes: ['https://limitlessapp.surge.sh'],
    config: {
      screens: {
        Hosting: {
          path: 'home',
        },
      },
    },
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
      }
    };

    getInitialURL();

    const linkingSubscription = Linking.addEventListener('url', event => {});

    return () => {
      linkingSubscription.remove();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef} linking={linking}>
              <MenuProvider>
                <App />
              </MenuProvider>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => Root);
