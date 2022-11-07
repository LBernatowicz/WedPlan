import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Login screen</Text>
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

export default LoginScreen;
