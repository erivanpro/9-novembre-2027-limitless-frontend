import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackNavigationType} from '../utils/types/navigationType';

import BottomTabNavigator from './BottomTabNavigation';

const Stack = createStackNavigator<RootStackNavigationType>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabNavigator'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;
