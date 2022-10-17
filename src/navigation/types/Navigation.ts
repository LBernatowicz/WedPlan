import { AppRouteType } from './AppRouteType';
import { ParamListBase } from '@react-navigation/native';

type MainTabParamList = {
  [AppRouteType.homeScreen]: ParamListBase | undefined;
};

type AppRootNavigationParamList = {
  [AppRouteType.welcomeScreen]: ParamListBase | undefined;
  [AppRouteType.mainTabs]: {
    screen: object;
  };
};

export { AppRootNavigationParamList, MainTabParamList };
