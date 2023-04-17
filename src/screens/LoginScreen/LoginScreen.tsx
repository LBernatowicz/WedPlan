import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { useTranslation } from 'react-i18next';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const lottie = require('assets/lottie/weddingRings.json');

const LoginScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();

  const formControl = useWatch({ control });

  const lottieSize = useSharedValue(2);
  const lottieTranslateY = useSharedValue(0);

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const lottieResizerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: lottieTranslateY.value },
        { scale: lottieSize.value },
      ],
    };
  });

  const handleNavigationToMain = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.mainTabs, {
      screen: AppRouteScreensType.mapScreen,
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
      handleSignIn(
        formControl.email,
        formControl.password,
        handleNavigationToMain,
      );
  };

  const onFacebookSignIn = () => {
    handlerFacebookSignIn(handleNavigationToMain);
  };

  const onGoogleSignIn = () => {
    handleGoogleSignIn(handleNavigationToMain);
  };

  useEffect(() => {
    const isKeyboardIsOpen = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const isKeyboardIsClose = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      isKeyboardIsOpen.remove();
      isKeyboardIsClose.remove();
    };
  }, []);
  useEffect(() => {
    console.log('keyboard', isKeyboardVisible, lottieSize.value);
    if (isKeyboardVisible) {
      lottieSize.value = withTiming(Platform.OS === 'ios' ? 1.5 : 1.9, {
        easing: Easing.bounce,
      });
      lottieTranslateY.value = withTiming(Platform.OS === 'ios' ? -40 : 0);
    } else {
      lottieSize.value = withTiming(2, {
        easing: Easing.bounce,
      });
      lottieTranslateY.value = withTiming(0);
    }
  }, [isKeyboardVisible, lottieSize, lottieTranslateY]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentStyle}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={false}>
        <StatusBar animated={true} hidden={true} />
        <Animated.View style={[styles.logoContainer, lottieResizerStyle]}>
          <LottieView
            ref={lottieRef}
            source={lottie}
            loop={false}
            style={styles.lottie}
          />
        </Animated.View>
        <KeyboardAvoidingView
          style={[
            styles.keyboardContainer,
            Platform.OS === 'android' && isKeyboardVisible && { top: 100 },
          ]}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          behavior={'position'}>
          <View style={styles.inputsContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{t('LoginScreen.title')}</Text>
              <Text style={styles.secondaryText}>{t('LoginScreen.bio')}</Text>
            </View>
            <InputWithForm
              control={control}
              name={'email'}
              placeholder={t('LoginScreen.form.textInput.login')}
              rule={{ pattern: TValidationRules.emailValidation }}
            />
            <InputWithForm
              control={control}
              name={'password'}
              placeholder={t('LoginScreen.form.textInput.password')}
              rule={{ pattern: TValidationRules.passwordValidation }}
              secured
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={t('LoginScreen.button.login')}
              action={handleSubmit(onSubmitSignIn)}
              buttonType={EButtonType.secondary}
            />
            <Button
              title={t('LoginScreen.button.forgotPassword')}
              action={handleNavigationToResetPassword}
              buttonType={EButtonType.primary}
            />
          </View>
        </KeyboardAvoidingView>
        <View
          style={[
            styles.bottomMenu,
            Platform.OS === 'android' &&
              isKeyboardVisible && { bottom: '100%' },
          ]}>
          <Divider text={t('LoginScreen.divider')} />
          <View style={styles.externalLoginContainer}>
            <SdkLoginButton
              size={ESizeButton.small}
              icon={ESdkButtonType.google}
              action={onGoogleSignIn}
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
            <Text style={styles.textStyle}>
              {t('LoginScreen.goToRegister.info')}
            </Text>
            <Button
              title={t('LoginScreen.goToRegister.register')}
              action={handleNavigationToRegister}
              buttonType={EButtonType.ghost}
            />
          </View>
        </View>
      </ScrollView>
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
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  headerContainer: {
    marginTop: 20,
  },
  keyboardContainer: {
    display: 'flex',
    width: '100%',
    flex: 3,
    justifyContent: 'flex-start',
  },
  contentStyle: {
    width: '100%',
  },
  contentContainerStyle: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  inputsContainer: {
    justifyContent: 'center',
    padding: paddings.maxAroundPadding,
    width: '100%',
  },
  externalLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
  bottomMenu: {
    flex: 1,
    justifyContent: 'flex-end',
    position: Platform.OS === 'ios' ? 'relative' : 'relative',
  },
  textStyle: {
    color: colors.text.black,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default LoginScreen;
