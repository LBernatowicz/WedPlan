import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from 'navigation/types/AppRouteType';
import { useForm, useWatch } from 'react-hook-form';
import Button from 'components/Buttons/Button';
import InputWithForm from 'components/InputWithForm/InputWithForm';
import { paddings } from 'assets/utils/paddings';
import LottieView from 'lottie-react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Divider } from 'components/Divider/Divider';
import { EButtonType } from 'components/Buttons/type/EButtonType';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';
import {
  handleGoogleSignIn,
  HandleSingIn,
} from 'helpers/Authorization/AuthorizationHelpers';
import { fontSize } from 'assets/utils/fonts';
import { colors } from 'assets/utils/colors';
import SdkLoginButton from 'components/Buttons/SdkLoginButton';

const lottie = require('assets/lottie/weddingRings.json');

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

  const handleNavigationToResetPassword = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.resetPasswordScreen,
    });
  };

  const handleNavigationToRegister = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.registerScreen,
    });
  };
  const onSubmitSignIn = () => {
    formControl.email &&
      formControl.password &&
      HandleSingIn(formControl.email, formControl.password).then(
        handleNavigationToMain,
      );
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
        <Text style={styles.headerText}>Login!</Text>
        <Text style={styles.secondaryText}>Please log in to continue</Text>
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
          secured
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Login'}
          action={handleSubmit(onSubmitSignIn)}
          buttonType={EButtonType.secondary}
        />
        <Button
          title={'Forgot password'}
          action={handleNavigationToResetPassword}
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
        <SdkLoginButton
          size={'small'}
          icon={'facebook'}
          action={() => console.log('ds')}
        />
        <SdkLoginButton
          size={'small'}
          icon={'twitter'}
          action={() => console.log('ds')}
        />
        <SdkLoginButton
          size={'small'}
          icon={'github'}
          action={() => console.log('ds')}
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
    marginVertical: 20,
    height: 150,
  },

  inputsContainer: {
    justifyContent: 'center',
    padding: paddings.maxAroundPadding,
    width: '100%',
    flex: 1,
  },
  externalLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: fontSize.header,
    fontWeight: 'bold',
    color: colors.text.blue,
    marginVertical: 10,
  },
  secondaryText: {
    fontSize: fontSize.normal,
    fontWeight: 'bold',
    color: colors.text.blue,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default LoginScreen;
