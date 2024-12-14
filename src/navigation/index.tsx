import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from '../navigation/root.navigator';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
