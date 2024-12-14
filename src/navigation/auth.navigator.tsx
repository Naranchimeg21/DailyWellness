import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList, AUTH_STACK} from './screenTypes';
import CreateAccountPage from '../screens/auth/createAccount.page';

//import Pages

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName={AUTH_STACK.CREATE_ACCOUNT}>
      <AuthStack.Screen
        name={AUTH_STACK.CREATE_ACCOUNT}
        component={CreateAccountPage}
        options={{
          header: () => undefined,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
