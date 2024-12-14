import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAppContext} from '../context/providers/app.provider';
import {ROOT_STACK, RootStackParamList} from '../navigation/screenTypes';

import SplashPage from '../screens/splash/splash.page';
import AuthNavigator from './auth.navigator';
import MainNavigator from './main.navgator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RoutNavigator = () => {
  const {
    appState: {rootStack},
  } = useAppContext();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      {rootStack === ROOT_STACK.SPLASH && (
        <RootStack.Screen name={ROOT_STACK.SPLASH} component={SplashPage} />
      )}
      {rootStack === ROOT_STACK.AUTH && (
        <RootStack.Screen name={ROOT_STACK.AUTH} component={AuthNavigator} />
      )}
      {rootStack === ROOT_STACK.MAIN && (
        <RootStack.Screen name={ROOT_STACK.MAIN} component={MainNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RoutNavigator;
