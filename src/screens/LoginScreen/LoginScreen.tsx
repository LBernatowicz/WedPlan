import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
import {
  EButtonType,
  ESdkButtonType,
  ESizeButton,
} from 'components/Buttons/type/EButtonType';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';
import {
  handleGoogleSignIn,
  handlerFacebookSignIn,
  handleSignIn,
} from 'helpers/Authorization/AuthorizationHelpers';
import { fontSize } from 'assets/utils/fonts';
import { colors } from 'assets/utils/colors';
import SdkLoginButton from 'components/Buttons/SdkLoginButton';
import { EToastMessageType, showToast } from 'store/toastSlice';
import { useAppDispatch } from 'store/setupStore';

const lottie = require('assets/lottie/weddingRings.json');

const LoginScreen = () => {
  const dispatch = useAppDispatch();
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
      handleSignIn(formControl.email, formControl.password).then(
        handleNavigationToMain,
      );
  };

  const onFacebookSignIn = () => {
    handlerFacebookSignIn(handleNavigationToMain);
  };

  const onGoogleSignIn = () => {
    handleGoogleSignIn(handleNavigationToMain);
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
          onPress={onGoogleSignIn}
        />
        <SdkLoginButton
          size={ESizeButton.small}
          icon={ESdkButtonType.facebook}
          action={onFacebookSignIn}
        />
        <SdkLoginButton
          size={ESizeButton.small}
          icon={ESdkButtonType.twitter}
          action={() => console.log('ds')}
        />
        <SdkLoginButton
          size={ESizeButton.small}
          icon={ESdkButtonType.github}
          action={() =>
            dispatch(
              showToast({
                toastMessageType: EToastMessageType.default,
                title: '1',
                body: '2',
                inModal: false,
              }),
            )
          }
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
