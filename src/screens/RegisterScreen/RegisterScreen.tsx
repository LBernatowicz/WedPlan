import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from 'navigation/types/AppRouteType';
import InputWithForm from 'components/InputWithForm/InputWithForm';
import Button from 'components/Buttons/Button';
import { paddings } from 'assets/utils/paddings';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';

import { fontSize } from 'assets/utils/fonts';
import { colors } from 'assets/utils/colors';
import { Divider } from 'components/Divider/Divider';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  handleGoogleSignIn,
  HandleSignUp,
} from 'helpers/Authorization/AuthorizationHelpers';
import { EButtonType } from 'components/Buttons/type/EButtonType';
import LottieView from 'lottie-react-native';
import SdkLoginButton from 'components/Buttons/SdkLoginButton';

const lottie = require('assets/lottie/WeddingRings2.json');

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm({});
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

  const handleNavigationToLogin = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.loginScreen,
    });
  };

  const onSubmitSignUp = () => {
    formControl.email &&
      formControl.password &&
      HandleSignUp(formControl.email, formControl.password).then(
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
        <Text style={styles.headerText}>Sign Up!</Text>
        <Text style={styles.secondaryText}>Please sign up to continue</Text>
        <InputWithForm
          control={control}
          name={'email'}
          placeholder={'Email'}
          rule={{ pattern: TValidationRules.emailValidation }}
        />
        <InputWithForm
          control={control}
          secured
          name={'password'}
          placeholder={'Password'}
          rule={{ pattern: TValidationRules.passwordValidation }}
        />
        <InputWithForm
          control={control}
          secured
          name={'repeatPassword'}
          placeholder={'Repeat Password'}
          rule={{
            validate: (repeatPassword: string) =>
              repeatPassword === formControl.password ||
              'Password is not match',
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Register'}
          action={handleSubmit(onSubmitSignUp)}
          buttonType={EButtonType.secondary}
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
          title={'Login'}
          action={handleNavigationToLogin}
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
    flex: 3,
    width: '100%',
  },

  buttonContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    height: 100,
  },
  inputsContainer: {
    justifyContent: 'flex-end',
    padding: paddings.maxAroundPadding,
    width: '100%',
    flex: 5,
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

export default RegisterScreen;
