import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import AppNavigation from './navigation';
import {colors} from './utils';
import {AppProvider} from './context/providers/app.provider';

const App = () => {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.neutral100}
          barStyle={'light-content'}
        />
        <AppNavigation />
      </View>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
