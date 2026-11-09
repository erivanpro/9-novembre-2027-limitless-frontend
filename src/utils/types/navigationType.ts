export type AuthStackNavigationType = {
  Signin: {id?: string; user_type?: string} | undefined;
  Signup: {id?: string; user_type?: 'host' | 'user'} | undefined;
  Onboarding: undefined | any;
  RootStack: undefined;
  ForgotPassword: undefined;
  VerifyOtp: {email?: string};
  SetPassword: undefined;
  Notification: undefined;
  MyOrders: undefined;
  OrderForMyCar: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  DrivingDetails: undefined;
  SignupComplete: {recent_signup?: boolean} | undefined;
  HelpCenter: undefined;
  PublishCar: {id?: string};
  CarDetails: undefined;
  UserAuthScreen: undefined;

  SingleChat: {receiver_name?: string};
  UserBookingDetails: {id: string; showCancelBtn?: boolean};
  HostBookingDetails: {id: string};
  CancelBooking: {id: string; car_picture: string; car_name: string};
};
export type RootStackNavigationType = {
  BottomTabNavigator: undefined;
  Home: undefined;
  RootStack: undefined;
  Signin: {id?: string; user_type?: string} | undefined | any;
  Signup: {id?: string; user_type?: 'host' | 'user'} | undefined;
  ForgotPassword: undefined;
  VerifyOtp: {email?: string};
  SetPassword: undefined;

  // setting
  MyOrders: undefined;
  OrderForMyCar: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  DrivingDetails: undefined;
  HelpCenter: undefined;
  Notification: undefined;
  SignupComplete:
    | {recent_signup?: boolean; user_type?: 'user' | 'host'}
    | undefined;
  PublishCar: {data?: any};
  CarDetails: {id: string};
  SingleChat: {receiver_name?: string};
  Hosting: undefined;
  UserCarDetails: {id: string};
  PaymentScreen: undefined;
  UserAuthScreen: undefined;
  Search: {data: {}};
  UserAuthCarDetailsScreen: {id: string; name: string; image: string};
  UserBookingDetails: {id: string; showCancelBtn?: boolean};
  HostBookingDetails: {id: string};
  CancelBooking: {id: string; car_picture: string; car_name: string};
  Reviews: {id: string};
};
