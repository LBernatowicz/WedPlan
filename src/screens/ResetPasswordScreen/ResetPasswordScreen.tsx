import React, { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from 'navigation/types/AppRouteType';
import { handleResetPassword } from 'helpers/Authorization/AuthorizationHelpers';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import InputWithForm from 'components/InputWithForm/InputWithForm';
import { TValidationRules } from 'components/InputWithForm/ValidationRules/TValidationRules';
import Button from 'components/Buttons/Button';
import { EButtonType } from 'components/Buttons/type/EButtonType';
import { paddings } from 'assets/utils/paddings';
import { fontSize } from 'assets/utils/fonts';
import { colors } from 'assets/utils/colors';
import { useAppDispatch } from '../../store/setupStore';
import { EToastMessageType, showToast } from '../../store/toastSlice';
import { EToastHeaderTitle } from '../../components/Toast/type/EToastHeaderTitle';
import { useTranslation } from 'react-i18next';

const lottie = require('assets/lottie/Couple.json');

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { control } = useForm({});

  const formControl = useWatch({ control });

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );

  const handleNavigationToLogin = () => {
    // @ts-ignore
    navigation.navigate(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.loginScreen,
    });
  };

  const onResetPassword = () => {
    formControl.email &&
      handleResetPassword(formControl.email)
        .then(() => {
          console.log(formControl.email);
          dispatch(
            showToast({
              toastMessageType: EToastMessageType.success,
              title: EToastHeaderTitle.ForgetPasswordHeader,
              body: t('Toasts.ForgetPasswordBody'),
              inModal: false,
              duration: 5000,
            }),
          );
          handleNavigationToLogin();
        })
        .catch(() => {
          dispatch(
            showToast({
              toastMessageType: EToastMessageType.error,
              title: EToastHeaderTitle.EmailIsFailHeader,
              body: t('Toasts.EmailIsFailBody'),
              inModal: false,
              duration: 5000,
            }),
          );
        });
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
        <Text style={styles.headerText}>{t('ResetPassword.header')}</Text>
        <Text style={styles.secondaryText}>{t('ResetPassword.subTitle')}</Text>
        <InputWithForm
          control={control}
          name={'email'}
          placeholder={'Email'}
          rule={{ pattern: TValidationRules.emailValidation }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t('ResetPassword.resetButton')}
          action={onResetPassword}
          buttonType={EButtonType.secondary}
        />
      </View>
      <View style={styles.registerContainer}>
        <Text>{t('ResetPassword.loginSubtitle')}</Text>
        <Button
          title={t('ResetPassword.loginButton')}
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
    flex: 6,
    width: '100%',
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 100,
    flex: 6,
  },
  inputsContainer: {
    justifyContent: 'flex-end',
    padding: paddings.maxAroundPadding,
    width: '100%',
    flex: 6,
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

export default ResetPasswordScreen;
