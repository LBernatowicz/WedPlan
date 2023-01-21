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

import { AppRouteScreensType, AppRouteTabsType } from './types/AppRouteType';
import {
  AppRootNavigationParamList,
  AuthorizationRootParamList,
  MainTabParamList,
} from './types/Navigation';
import BottomTabBar from './components/BottomTabBar/BottomTabBar';
import MainScreen from '../screens/MainScreen/MainScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';

const Stack = createNativeStackNavigator<AppRootNavigationParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const Auth = createNativeStackNavigator<AuthorizationRootParamList>();

const TabAuthorization = () => {
  return (
    <Auth.Navigator initialRouteName={AppRouteScreensType.splashScreen}>
      <Auth.Screen
        name={AppRouteScreensType.splashScreen}
        component={SplashScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Auth.Screen
        name={AppRouteScreensType.loginScreen}
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Auth.Screen
        name={AppRouteScreensType.registerScreen}
        component={RegisterScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Auth.Screen
        name={AppRouteScreensType.resetPasswordScreen}
        component={ResetPasswordScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Auth.Navigator>
  );
};

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
        name={AppRouteScreensType.homeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={AppRouteScreensType.welcomeScreen}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={AppRouteScreensType.mainScreen}
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AppRootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={AppRouteTabsType.authTabs}>
      <Stack.Screen
        name={AppRouteTabsType.authTabs}
        component={TabAuthorization}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={AppRouteTabsType.mainTabs}
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
