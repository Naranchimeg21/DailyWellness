import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../../components/header';

import {HOME_STACK, HomeStackParamList} from '../screenTypes';
import HomePage from '../../screens/main/home/home.page';
import QuotePage from '@/screens/main/home/quotes.page';
import WeatherPage from '@/screens/main/home/weather.page';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName={HOME_STACK.LIST}>
      <HomeStack.Screen
        name={HOME_STACK.LIST}
        component={HomePage}
        options={{
          header: () => <Header title="Today" noBack />,
        }}
      />
      <HomeStack.Screen
        name={HOME_STACK.QUOTE}
        component={QuotePage}
        options={{
          header: () => <Header title="Positive Quoto" />,
        }}
      />
      <HomeStack.Screen
        name={HOME_STACK.WEATHER}
        component={WeatherPage}
        options={{
          header: () => <Header title="Weather" />,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
