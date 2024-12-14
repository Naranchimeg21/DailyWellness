import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../../components/header';

import {TRACKER_STACK, TrackerStackParamList} from '../screenTypes';
import TrackerPage from '../../screens/main/tracker/tracker.page';
import TrackerAddPage from '@/screens/main/tracker/trackerAdd.page';

const TrackerStack = createNativeStackNavigator<TrackerStackParamList>();

const TrackerNavigator: React.FC = () => {
  return (
    <TrackerStack.Navigator initialRouteName={TRACKER_STACK.LIST}>
      <TrackerStack.Screen
        name={TRACKER_STACK.LIST}
        component={TrackerPage}
        options={{
          header: () => <Header title="Habit tracker" noBack type="habit" />,
        }}
      />
      <TrackerStack.Screen
        name={TRACKER_STACK.ADD}
        component={TrackerAddPage}
        options={{
          header: () => <Header title="New habit" />,
        }}
      />
    </TrackerStack.Navigator>
  );
};

export default TrackerNavigator;
