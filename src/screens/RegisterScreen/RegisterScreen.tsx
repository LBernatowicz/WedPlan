import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
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
import {
  handleGoogleSignIn,
  handlerFacebookSignIn,
  handleSignUp,
} from 'helpers/Authorization/AuthorizationHelpers';
import {
  EButtonType,
  ESdkButtonType,
  ESizeButton,
} from 'components/Buttons/type/EButtonType';
import LottieView from 'lottie-react-native';
import SdkLoginButton from 'components/Buttons/SdkLoginButton';
import { useTranslation } from 'react-i18next';
import { EToastMessageType, showToast } from '../../store/toastSlice';
import { EToastHeaderTitle } from '../../components/Toast/type/EToastHeaderTitle';
import { useAppDispatch } from '../../store/setupStore';
import { fetchUsers } from '../../store/userSlice';
import { TInitialUsersCollectionType } from '../HomeScreen/types/TInitialForm.type';
import { addLoggedUser } from '../../store/globalSlice';

const lottie = require('assets/lottie/WeddingRings2.json');
const lottieLoading = require('assets/lottie/loading.json');

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({});
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const screenHeight = useWindowDimensions().height;

  const formControl = useWatch({ control });

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const handleNavigationToMain = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.mainTabs, {
      screen: AppRouteScreensType.mapScreen,
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
      handleSignUp(formControl.email, formControl.password).then(
        handleNavigationToMain,
      );
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
      <KeyboardAvoidingView
        style={[
          styles.keyboardContainer,
          Platform.OS === 'android' && isKeyboardVisible && { top: 100 },
          screenHeight <= 700 && { bottom: 20 },
        ]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        behavior={'position'}>
        <View style={styles.inputsContainer}>
          <Text style={styles.headerText}>{t('RegisterScreen.title')}</Text>
          <Text style={styles.secondaryText}>{t('RegisterScreen.bio')}</Text>
          <InputWithForm
            control={control}
            name={'email'}
            placeholder={t('RegisterScreen.form.textInput.login')}
            rule={{ pattern: TValidationRules.emailValidation }}
          />
          <InputWithForm
            control={control}
            secured
            name={'password'}
            placeholder={t('RegisterScreen.form.textInput.password')}
            rule={{ pattern: TValidationRules.passwordValidation }}
          />
          <InputWithForm
            control={control}
            secured
            name={'repeatPassword'}
            placeholder={t('RegisterScreen.form.textInput.repeatPassword')}
            rule={{
              validate: (repeatPassword: string) =>
                repeatPassword === formControl.password ||
                t('RegisterScreen.form.textInput.repeatPasswordError'),
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('RegisterScreen.button.register')}
            action={handleSubmit(onSubmitSignUp)}
            buttonType={EButtonType.secondary}
            disabled={
              !(
                !!formControl.email &&
                !!formControl.password &&
                !!formControl.repeatPassword
              )
            }
          />
        </View>
      </KeyboardAvoidingView>
      <View
        style={[
          styles.bottomMenu,
          Platform.OS === 'android' && isKeyboardVisible && { bottom: '100%' },
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
          <Text>{t('RegisterScreen.goToRegister.info')}</Text>
          <Button
            title={t('RegisterScreen.goToRegister.register')}
            action={handleNavigationToLogin}
            buttonType={EButtonType.ghost}
          />
        </View>
      </View>
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
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
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
  keyboardContainer: {
    display: 'flex',
    width: '100%',
    flex: 3,
    justifyContent: 'flex-end',
  },
  bottomMenu: {
    marginTop: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    position: Platform.OS === 'ios' ? 'relative' : 'relative',
  },
  secondaryText: {
    fontSize: fontSize.normal,
    fontWeight: 'bold',
    color: colors.text.blue,
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

export default RegisterScreen;
