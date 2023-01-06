import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from 'navigation/types/AppRouteType';
import { useForm, useWatch } from 'react-hook-form';
import Button from 'components/Button/Button';
import InputWithForm from 'components/InputWithForm/InputWithForm';
import { paddings } from 'assets/utils/paddings';
import { firebase } from '@react-native-firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Divider } from 'components/Divider/Divider';
import { EButtonType } from 'components/Button/type/EButtonType';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';

const LoginScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();

  const formControl = useWatch({ control });

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
    {
      formControl.email &&
        formControl.password &&
        firebase
          .auth()
          .signInWithEmailAndPassword(formControl.email, formControl.password)
          .then(handleNavigationToMain)
          .catch((error) => console.log(error));
    }
  };

  const _signIn = async () => {
    await GoogleSignin.configure({
      iosClientId:
        '970877023178-5f01tuu62g78fbpgk37oh0l9d0hq1tuf.apps.googleusercontent.com',
      offlineAccess: false,
    });
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
      });
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      // login with credential
      await firebase.auth().signInWithCredential(credential);
      console.log('User Info --> ', userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>dasdas</Text>
      </View>
      <View style={styles.inputsContainer}>
        <InputWithForm
          control={control}
          name={'email'}
          placeholder={'Login'}
          rule={{ pattern: TValidationRules.emailValidation }}
        />
        <InputWithForm
          control={control}
          name={'password'}
          placeholder={'Password'}
          rule={{ pattern: TValidationRules.passwordValidation }}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Login'}
          action={handleSubmit(onSubmit)}
          buttonType={EButtonType.secondary}
        />
        <Button
          title={'Forgot password'}
          action={handleSubmit(onSubmit)}
          buttonType={EButtonType.primary}
        />
      </View>
      <Divider text={'or'} />
      <View style={styles.externalLoginContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
          onPress={_signIn}
        />
      </View>
      <View style={styles.registerContainer}>
        <Text>You can create account here!</Text>
        <Button
          title={'Register'}
          action={handleNavigationToRegister}
          buttonType={EButtonType.ghost}
        />
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
  logoContainer: {
    flex: 1,
    height: 20,
  },

  buttonContainer: {
    width: '100%',
    flex: 1,
  },
  inputsContainer: {
    justifyContent: 'center',
    padding: paddings.maxAroundPadding,
    width: '100%',
    flex: 1,
  },
  externalLoginContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default LoginScreen;
