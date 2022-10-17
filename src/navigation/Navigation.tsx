import React, { FC, ReactNode, useCallback } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import WelcomeScreen, {
  WelcomeScreenOptions,
} from '../screens/WelcomeScreen/WelcomeScreen';
import { AppRouteType } from './types/AppRouteType';
import HomeScreen, {
  HomeScreenOptions,
} from '../screens/HomeScreen/HomeScreen';
import {
  AppRootNavigationParamList,
  MainTabParamList,
} from './types/Navigation';
import BottomTabBar from './components/BottomTabBar/BottomTabBar';

const Stack = createNativeStackNavigator<AppRootNavigationParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigation = () => {
  const tabBar = useCallback(
    ({ state, descriptors, insets, navigation }: BottomTabBarProps) => (
      <BottomTabBar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        insets={insets}
      />
    ),
    [],
  );
  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name={AppRouteType.homeScreen}
        component={HomeScreen}
        options={HomeScreenOptions}
      />
    </Tab.Navigator>
  );
};

const AppRootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={AppRouteType.mainTabs}>
      <Stack.Screen
        name={AppRouteType.welcomeScreen}
        component={WelcomeScreen}
        options={WelcomeScreenOptions}
      />
      <Stack.Screen
        name={AppRouteType.mainTabs}
        component={TabNavigation}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

type Props = {
  children: ReactNode;
};

const Navigation: FC = ({ children }: Props) => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <AppRootNavigation />
      {children}
    </NavigationContainer>
  );
};

export default Navigation;
