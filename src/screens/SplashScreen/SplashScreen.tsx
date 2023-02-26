import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { AppRouteScreensType } from '../../navigation/types/AppRouteType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorizationRootParamList } from '../../navigation/types/Navigation';
import { colors } from '../../assets/utils/colors';
import LottieView from 'lottie-react-native';

const lottie = require('assets/lottie/WeddingRings2.json');

const SplashScreen = () => {
  const { replace } =
    useNavigation<NativeStackNavigationProp<AuthorizationRootParamList>>();

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      replace(AppRouteScreensType.loginScreen);
    }, 3000);
  }, [replace]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LottieView
          ref={lottieRef}
          source={lottie}
          loop={false}
          style={{ width: '100%' }}
        />
      </View>
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
