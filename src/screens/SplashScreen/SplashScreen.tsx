import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { AppRouteScreensType } from '../../navigation/types/AppRouteType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorizationRootParamList } from '../../navigation/types/Navigation';

const SplashScreen = () => {
  const { replace } =
    useNavigation<NativeStackNavigationProp<AuthorizationRootParamList>>();

  useEffect(() => {
    setTimeout(() => {
      replace(AppRouteScreensType.loginScreen);
    }, 1000);
  }, [replace]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Splash Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default SplashScreen;
