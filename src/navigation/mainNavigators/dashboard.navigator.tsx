import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../../components/header';

import {DashboardStackParamList, DASHBOARD_STACK} from '../screenTypes';
import DashboardPage from '../../screens/main/dashboard/dashboard.page';

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardNavigator: React.FC = () => {
  return (
    <DashboardStack.Navigator initialRouteName={DASHBOARD_STACK.LIST}>
      <DashboardStack.Screen
        name={DASHBOARD_STACK.LIST}
        component={DashboardPage}
        options={{
          header: () => <Header title="Profile" type="report" />,
        }}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigator;
