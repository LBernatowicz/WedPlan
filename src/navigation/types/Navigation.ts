import { AppRouteScreensType, AppRouteTabsType } from './AppRouteType';
import { ParamListBase } from '@react-navigation/native';

type MainTabParamList = {
  [AppRouteScreensType.homeScreen]: ParamListBase | undefined;
  [AppRouteScreensType.mapScreen]: ParamListBase | undefined;
  [AppRouteScreensType.mainScreen]: ParamListBase | undefined;
};

type AppRootNavigationParamList = {
  [AppRouteTabsType.authTabs]: ParamListBase | undefined;
  [AppRouteTabsType.mainTabs]: ParamListBase | undefined;
};

type AuthorizationRootParamList = {
  [AppRouteScreensType.splashScreen]: ParamListBase | undefined;
  [AppRouteScreensType.loginScreen]: ParamListBase | undefined;
  [AppRouteScreensType.registerScreen]: ParamListBase | undefined;
  [AppRouteScreensType.resetPasswordScreen]: ParamListBase | undefined;
  [AppRouteScreensType.linkingScreen]: ParamListBase | undefined | any;
  [AppRouteScreensType.versioningScreen]: ParamListBase | undefined;
};

export {
  AuthorizationRootParamList,
  AppRootNavigationParamList,
  MainTabParamList,
};
