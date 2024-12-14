import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '@/utils';

import {MAIN_STACK, MainStackParamList} from './screenTypes';
import MainTabBarNavigator from './mainNavigators/mainTab.navigator';
import DashboardNavigator from './mainNavigators/dashboard.navigator';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <MainStack.Navigator initialRouteName={MAIN_STACK.MAIN_TABS}>
        <MainStack.Screen
          name={MAIN_STACK.MAIN_TABS}
          component={MainTabBarNavigator}
          options={{
            header: () => undefined,
          }}
        />
        <MainStack.Screen
          name={MAIN_STACK.DASHBOARD}
          component={DashboardNavigator}
          options={{
            header: () => undefined,
          }}
        />
      </MainStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
});

export default MainNavigator;
