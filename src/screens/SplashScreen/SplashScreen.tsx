import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppRouteScreensType } from '../../navigation/types/AppRouteType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorizationRootParamList } from '../../navigation/types/Navigation';
import { colors } from '../../assets/utils/colors';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/src/types';

const lottie = require('assets/lottie/WeddingRings2.json');

const SplashScreen = ({
  route,
}: NativeStackScreenProps<AuthorizationRootParamList>) => {
  const { replace } =
    useNavigation<NativeStackNavigationProp<AuthorizationRootParamList>>();

  const { params } = route;

  const loginViaQrCode = params !== undefined && params;

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const navigateToLogin = useCallback(() => {
    replace(
      !loginViaQrCode
        ? AppRouteScreensType.loginScreen
        : AppRouteScreensType.linkingScreen,
      { params },
    );
  }, [replace, loginViaQrCode, params]);

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
