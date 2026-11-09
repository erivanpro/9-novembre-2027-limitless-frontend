import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import {
  CarDetails,
  DrivingDetails,
  EditProfile,
  ForgotPassword,
  HelpCenter,
  Hosting,
  MyOrders,
  Notification,
  Onboarding,
  OrderForMyCar,
  PublishCar,
  SetPassword,
  Signin,
  Signup,
  SignupComplete,
  SingleChat,
  VerifyOtp,
  AssistanceDetails,
  UserCarDetails,
  PaymentScreen,
  UserAuthScreen,
  UserAuthCarDetailsScreen,
  UserBookingDetails,
  HostBookingDetails,
  CancelBooking,
} from '../screens';

import RootStack from './RootStack';
import ChangePassword from '../screens/ChangePassword';
import useUserStore from '../service/store/user.store';
import Reviews from '../screens/Reviews';
import { useTranslate } from '../hooks/useTranslate';

const Stack = createStackNavigator();

const AuthStack = () => {
  const { hasSeenOnboarding } = useUserStore();
  const { language, stateLanguage, changeLanguage } = useTranslate();

  const user: any = null;
  let loading = false;

  const isValidUser = user?.access_token && user?.auth_status === 'verified';

  useEffect(() => {
    if (stateLanguage && language !== stateLanguage) {
      changeLanguage(stateLanguage);
    }
  }, [stateLanguage, language]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);
  if (isValidUser) {
    return <RootStack />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      <Stack.Screen name="RootStack" component={RootStack} />
      <Stack.Screen name={'VerifyOtp'} component={VerifyOtp} />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'Signin'} component={Signin} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'SetPassword'} component={SetPassword} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={'SingleChat'} component={SingleChat} />
      <Stack.Screen name={'MyOrders'} component={MyOrders} />
      <Stack.Screen name={'OrderForMyCar'} component={OrderForMyCar} />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
      <Stack.Screen name={'DrivingDetails'} component={DrivingDetails} />
      <Stack.Screen name={'HelpCenter'} component={HelpCenter} />
      <Stack.Screen name={'SignupComplete'} component={SignupComplete} />
      <Stack.Screen name={'PublishCar'} component={PublishCar} />
      <Stack.Screen name={'CarDetails'} component={CarDetails} />
      <Stack.Screen name={'Hosting'} component={Hosting} />
      <Stack.Screen name={'AssistanceDetails'} component={AssistanceDetails} />
      <Stack.Screen name={'UserCarDetails'} component={UserCarDetails} />
      <Stack.Screen name={'PaymentScreen'} component={PaymentScreen} />
      <Stack.Screen name={'UserAuthScreen'} component={UserAuthScreen} />
      <Stack.Screen name={'Reviews'} component={Reviews} />

      <Stack.Screen
        name={'UserBookingDetails'}
        component={UserBookingDetails}
      />
      <Stack.Screen
        name={'HostBookingDetails'}
        component={HostBookingDetails}
      />
      <Stack.Screen
        name={'UserAuthCarDetailsScreen'}
        component={UserAuthCarDetailsScreen}
      />

      <Stack.Screen name={'CancelBooking'} component={CancelBooking} />
    </Stack.Navigator>
  );
};

export default AuthStack;
