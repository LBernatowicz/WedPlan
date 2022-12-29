import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from '../../navigation/types/AppRouteType';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../../components/Button/Button';
import InputWithForm from '../../components/InputWithForm/InputWithForm';
import { paddings } from '../../assets/utils/paddings';

const LoginScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const navigation = useNavigation();

  const data = useWatch({ control });

  const handleNavigationToMain = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.mainTabs, {
      screen: AppRouteScreensType.welcomeScreen,
    });
  };

  const handleNavigationToRegister = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.registerScreen,
    });
  };
  const onSubmit = () => {
    console.log('!', data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputsContainer}>
        <InputWithForm control={control} name={'login'} placeholder={'Login'} />
        <InputWithForm
          control={control}
          name={'password'}
          placeholder={'Password'}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'register'} action={handleSubmit(onSubmit)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'Login'} action={handleNavigationToMain} />
        <Button title={'Register'} action={handleNavigationToRegister} />
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
  buttonContainer: {
    flexDirection: 'row',
  },
  inputsContainer: {
    padding: paddings.maxAroundPadding,
    width: '100%',
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default LoginScreen;
