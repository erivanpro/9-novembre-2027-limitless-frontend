import Onboarding from './Onboarding';

import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import SignupComplete from './Auth/Signup/SignupComplete';
import ForgotPassword from './Auth/ForgotPassword';
import VerifyOtp from './Auth/VerifyOtp';
import SetPassword from './Auth/SetPassword';

import Home from './Home';
import AssistanceDetails from './Home/components/AssistanceSection/AssistanceDetails';
import Search from './Search';
import Hosting from './Hosting';
import CarDetails from './Hosting/HostCarDetails';
import ChatList from './ChatList';
import Setting from './Setting';
import Notification from './Notification';
import SingleChat from './SingleChat';

import MyOrders from './MyOrders';
import OrderForMyCar from './OrderForMyCar';
import EditProfile from './EditProfile';
import DrivingDetails from './DrivingDetails';
import HelpCenter from './HelpCenter';
import PublishCar from './PublishCar';
import UserBookingDetails from './UserBookingDetails';
import HostBookingDetails from './HostBookingDetails';
import UserCarDetails from './UserCarDetails';
import PaymentScreen from './PaymentScreen';
import CancelBooking from './CancelBooking';
import UserAuthScreen from './Auth/UserAuthScreen'; // to be shown when user try to access any feature that needs login (i.e chat)
import UserAuthCarDetailsScreen from './Auth/UserAuthCarDetailsScreen'; // to be shown when user try to book car without login
import Reviews from './Reviews';


export {
  // Onboarding
  Onboarding,

  // Auth screens
  Signin,
  Signup,
  SignupComplete,
  ForgotPassword,
  VerifyOtp,
  SetPassword,

  // bottom tab screens
  Home,
  Search,
  Hosting,
  ChatList,
  Setting,
  Notification,

  // setting screens
  MyOrders,
  OrderForMyCar,
  EditProfile,
  DrivingDetails,
  HelpCenter,

  // linked screens
  SingleChat,
  PublishCar,
  CarDetails,
  AssistanceDetails,
  UserCarDetails,
  PaymentScreen,
  UserAuthScreen,
  UserAuthCarDetailsScreen,
  UserBookingDetails,
  HostBookingDetails,
  CancelBooking,Reviews
};
