import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { IconEyeSplash } from 'assets/svg/Index';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <IconEyeSplash width={150} height={150} fill={'red'} />
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

export default MainScreen;
