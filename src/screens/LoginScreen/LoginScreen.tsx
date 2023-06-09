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
  useWindowDimensions,
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
import { useTranslation } from 'react-i18next';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppDispatch } from '../../store/setupStore';
import { fetchUsers } from '../../store/userSlice';
import { addLoggedUser } from '../../store/globalSlice';
import { TInitialUsersCollectionType } from '../HomeScreen/types/TInitialForm.type';
import { EToastMessageType, showToast } from '../../store/toastSlice';
import { EToastHeaderTitle } from '../../components/Toast/type/EToastHeaderTitle';

const lottie = require('assets/lottie/Couple.json');

const lottieLoading = require('assets/lottie/loading.json');

const LoginScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const screenHeight = useWindowDimensions().height;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const formControl = useWatch({ control });

  const lottieSize = useSharedValue(1);
  const lottieTranslateY = useSharedValue(0);

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const handleNavigationToMain = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.mainTabs, {
      screen: AppRouteScreensType.homeScreen,
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

  const handleAccountData = (data: any) => {
    try {
      dispatch(fetchUsers())
        .then((usersData: any) => {
          const currentlyLoggedUser = usersData.payload.find(
            (loggedUser: TInitialUsersCollectionType) => loggedUser.id === data,
          );

          if (currentlyLoggedUser) {
            dispatch(addLoggedUser(currentlyLoggedUser));
          } else {
            console.log('Nie było takiego Usera do tej proy');
          }
        })
        .catch((error) => console.log(error));
      //console.log('User Email: ', data);

      handleNavigationToMain();
    } catch (error) {
      console.log(`[Error] error login ${error}`);
    }
    setIsLoading(false);
  };

  const onSubmitSignIn = () => {
    formControl.email &&
      formControl.password &&
      handleSignIn(formControl.email, formControl.password)
        .then(async (data: any) => {
          setIsLoading(true);
          await handleAccountData(data?.user.email);
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(
            showToast({
              toastMessageType: EToastMessageType.error,
              title: EToastHeaderTitle.EmailIsFailHeader,
              body: t('Toasts.WrongEmailOrPassword'),
              inModal: false,
              duration: 5000,
            }),
          );
        });
  };

  const onFacebookSignIn = () => {
    handlerFacebookSignIn()
      .then(async (currentLoggedEmail) => {
        setIsLoading(true);
        await handleAccountData(currentLoggedEmail);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Error: ', error);
      });
  };

  const onGoogleSignIn = () => {
    handleGoogleSignIn()
      .then(() => setIsLoading(true))
      .then(async (currentLoggedEmail) => {
        setIsLoading(true);
        await handleAccountData(currentLoggedEmail);
      })
      .catch(() => {
        setIsLoading(false);
        dispatch(
          showToast({
            toastMessageType: EToastMessageType.error,
            title: EToastHeaderTitle.EmailIsFailHeader,
            body: t('Toasts.WrongEmailOrPassword'),
            inModal: false,
            duration: 5000,
          }),
        );
      });
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
    if (isKeyboardVisible) {
      lottieSize.value = withTiming(Platform.OS === 'ios' ? 1 : 1.9, {
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
        <Animated.View style={[styles.logoContainer]}>
          <LottieView
            ref={lottieRef}
            source={lottie}
            loop={false}
            style={[
              styles.lottie,
              { width: screenHeight <= 700 ? '75%' : '95%' },
              isKeyboardVisible && { opacity: 0 },
            ]}
          />
        </Animated.View>
        <KeyboardAvoidingView
          style={[
            styles.keyboardContainer,
            Platform.OS === 'android' && isKeyboardVisible && { top: 100 },
            screenHeight <= 700 && { bottom: 20 },
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
              disabled={!(!!formControl.email && !!formControl.password)}
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
          {screenHeight >= 700 && <Divider text={t('LoginScreen.divider')} />}
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
              icon={ESdkButtonType.apple}
              action={onFacebookSignIn}
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
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LottieView
            source={lottieLoading}
            autoPlay={true}
            style={styles.lottieLoading}
            ref={lottieRef}
          />
        </View>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //marginBottom: 10,
  },
  lottie: {
    justifyContent: 'center',
    width: '75%',
    alignItems: 'center',
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
  loadingContainer: {
    backgroundColor: colors.external.white,
    opacity: 0.3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  lottieLoading: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
    width: 150,
    flex: 1,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default LoginScreen;
