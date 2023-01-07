import React, { useCallback } from 'react';
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
import LottieView from 'lottie-react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Divider } from 'components/Divider/Divider';
import { EButtonType } from 'components/Button/type/EButtonType';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';
import { handleGoogleSignIn } from '../../helpers/Authorization/AuthorizationHelpers';

const lottie = require('../../assets/lottie/weddingRings.json');

const LoginScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();

  const formControl = useWatch({ control });

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          ref={lottieRef}
          source={lottie}
          loop={false}
          style={{ transform: [{ scale: 1.2 }] }}
        />
      </View>
      <View style={styles.inputsContainer}>
        <Text>Log to your account!</Text>
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
          onPress={handleGoogleSignIn}
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
    width: '100%',
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
