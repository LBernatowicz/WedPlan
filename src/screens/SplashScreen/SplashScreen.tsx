import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from '../../navigation/types/AppRouteType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorizationRootParamList } from '../../navigation/types/Navigation';
import { colors } from '../../assets/utils/colors';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/src/types';
import { getVersion } from 'react-native-device-info';
import { useAppDispatch } from '../../store/setupStore';
import { addLoggedUser, fetchAppInfo } from '../../store/globalSlice';
import { handleAutoLogin } from '../../helpers/Authorization/AuthorizationHelpers';
import { fetchUsers } from '../../store/userSlice';
import { TInitialUsersCollectionType } from '../HomeScreen/types/TInitialForm.type';

const lottie = require('assets/lottie/weddingRings.json');

const SplashScreen = ({
  route,
}: NativeStackScreenProps<AuthorizationRootParamList>) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthorizationRootParamList>>();

  const dispatch = useAppDispatch();

  const { params } = route;

  const loginViaQrCode = params !== undefined && params;

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const handleNavigateToHome = () => {
    // @ts-ignore
    navigation.replace(AppRouteTabsType.mainTabs, {
      screen: AppRouteScreensType.homeScreen,
    });
  };

  const handleNavigateToLogin = () => {
    // @ts-ignore
    navigation.replace(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.loginScreen,
    });
  };

  const handleAccountData = (data: any) => {
    try {
      dispatch(fetchUsers())
        .then((usersData: any) => {
          const currentlyLoggedUser = usersData.payload.find(
            (loggedUser: TInitialUsersCollectionType) => loggedUser.id === data,
          );

          if (currentlyLoggedUser) {
            dispatch(addLoggedUser(currentlyLoggedUser));
          } else {
            console.log('Nie było takiego Usera do tej proy');
          }
        })
        .catch((error) => console.log(error));
      //console.log('User Email: ', data);
    } catch (error) {
      console.log(`[Error] error login ${error}`);
    }
  };

  const handleAutoLoginWithToken = () => {
    handleAutoLogin()
      .then(async (user: any) => {
        await handleAccountData(user);
        user !== 'no' ? handleNavigateToHome() : handleNavigateToLogin();
      })
      .catch((data) => {
        console.log('autologin: ', data);
        navigation.replace(AppRouteScreensType.loginScreen);
      });
  };

  const navigateToLogin = useCallback(() => {
    dispatch(fetchAppInfo()).then((response: any) => {
      if (response.payload[0].version === getVersion()) {
        !loginViaQrCode
          ? handleAutoLoginWithToken()
          : navigation.replace(AppRouteScreensType.linkingScreen, { params });
      } else {
        navigation.replace(AppRouteScreensType.versioningScreen);
      }
    });
  }, [dispatch, loginViaQrCode, navigation, params]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigateToLogin}>
        <LottieView
          ref={lottieRef}
          source={lottie}
          loop={false}
          style={{ width: '100%' }}
          onAnimationFinish={navigateToLogin}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main.secondary,
    flex: 1,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default SplashScreen;
