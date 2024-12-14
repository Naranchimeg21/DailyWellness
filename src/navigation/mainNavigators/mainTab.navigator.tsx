import React from 'react';
import {TouchableOpacity, View, StyleSheet, SafeAreaView} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

/// Navigators
import HomeNavigator from './home.navigator';
import ChatNavigator from './tracker.navigator';
import ReportNavigator from './health.navigator';
import {colors, sizes} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '@/components/typography/GradientText';
import MaskedView from '@react-native-masked-view/masked-view';
import HomeIcon from '../../utils/icons/homeIcon';
import ChatIcon from '../../utils/icons/chatIcon';
import ReportIcon from '../../utils/icons/reportIcon';

const Tab = createBottomTabNavigator();

const MainTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <SafeAreaView>
      <View style={styles.tabs}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options?.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options?.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state?.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route?.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented && route?.name) {
              navigation.navigate(route.name);
            }
          };

          const icon = (
            <MaskedView
              style={styles.maskedView}
              maskElement={
                route.name === 'Home' ? (
                  <HomeIcon size={24} />
                ) : route.name === 'Chat' ? (
                  <ChatIcon size={24} />
                ) : (
                  <ReportIcon size={24} />
                )
              }>
              <LinearGradient
                colors={
                  isFocused
                    ? [colors.primary, colors.primary700]
                    : [colors.dark, colors.dark]
                }
                style={styles.gradientWrapper}
              />
            </MaskedView>
          );

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route?.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBar}
              activeOpacity={0.8}>
              <View style={styles.tab}>
                <LinearGradient
                  colors={
                    isFocused
                      ? [colors.primary, colors.primary700]
                      : [colors.transparent, colors.transparent]
                  }
                  style={{
                    height: 5,
                    zIndex: 10,
                  }}
                />
                <View
                  style={[
                    styles.tabContent,
                    isFocused && styles.selectedTabContent,
                  ]}>
                  {icon || null}
                  <GradientText
                    gradient={isFocused ? 'gradient-2' : 'gradient-none'}
                    style={[styles.tabText]}>
                    {label || ''}
                  </GradientText>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

function MainTabBarNavigator() {
  return (
    <View style={styles.container}>
      <Tab.Navigator tabBar={props => <MainTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={() => ({
            title: 'Home',
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Chat"
          component={ChatNavigator}
          options={() => ({
            title: 'Tracker',
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Report"
          component={ReportNavigator}
          options={() => ({
            title: 'Health',
            headerShown: false,
          })}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabText: {
    flexDirection: 'column',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabTextSelected: {
    color: colors.primary,
  },
  tabs: {
    flexDirection: 'row',
    height: 60,
  },
  tab: {
    width: 72,
    height: 70,
  },
  tabContent: {
    gap: 1,
    backgroundColor: colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.sizeSm,
    paddingBottom: 0,
  },
  selectedTabContent: {
    backgroundColor: colors.primary100,
    borderBottomEndRadius: sizes.radiusSm,
    borderBottomStartRadius: sizes.radiusSm,
  },
  maskedView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
  },
  gradientWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainTabBarNavigator;
