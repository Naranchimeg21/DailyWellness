import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../../components/header';

import {HEALTH_STACK, HealthStackParamList} from '../screenTypes';
import HealthPage from '../../screens/main/health/health.page';

const HealthStack = createNativeStackNavigator<HealthStackParamList>();

const HealthNavigator: React.FC = () => {
  return (
    <HealthStack.Navigator initialRouteName={HEALTH_STACK.LIST}>
      <HealthStack.Screen
        name={HEALTH_STACK.LIST}
        component={HealthPage}
        options={{
          header: () => <Header title="Mood Tracker" noBack />,
        }}
      />
    </HealthStack.Navigator>
  );
};

export default HealthNavigator;
