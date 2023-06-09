import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from '../../components/Buttons/Button';
import { EButtonType } from '../../components/Buttons/type/EButtonType';
import { useTranslation } from 'react-i18next';
import { fontSize } from '../../assets/utils/fonts';
import { colors } from '../../assets/utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorizationRootParamList } from '../../navigation/types/Navigation';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from '../../navigation/types/AppRouteType';
import { NativeStackScreenProps } from '@react-navigation/native-stack/src/types';
import { handleSignIn } from '../../helpers/Authorization/AuthorizationHelpers';
import { EToastMessageType, showToast } from '../../store/toastSlice';
import { useAppDispatch } from '../../store/setupStore';
import { EToastHeaderTitle } from '../../components/Toast/type/EToastHeaderTitle';

const lottie = require('assets/lottie/qrcode.json');

enum ERouteProp {
  linkingLogin = 'linkingLogin',
  linkingPassword = 'linkingPassword',
}

type ParamsProp = {
  params: Record<ERouteProp, string>;
};

type LinkingScreenRouteProp = {
  params: ParamsProp;
};

const LinkingScreen =
  ({}: NativeStackScreenProps<AuthorizationRootParamList>) => {
    const { replace, navigate } =
      useNavigation<NativeStackNavigationProp<AuthorizationRootParamList>>();

    const route = useRoute<LinkingScreenRouteProp | any>();
    const { linkingLogin, linkingPassword } = route.params.params;
    console.log(linkingLogin, linkingPassword);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const lottieRef = useCallback(
      (node: LottieView | null | undefined) => node?.play(),
      [],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleNavigationToMain = () => {
      // @ts-ignore
      navigate(AppRouteTabsType.mainTabs, {
        screen: AppRouteScreensType.mapScreen,
      });
    };

    const errorLoginHandler = useCallback(
      (errorText: string) =>
        dispatch(
          showToast({
            toastMessageType: EToastMessageType.error,
            title: EToastHeaderTitle.EmailLoginFail,
            body: errorText.toString(),
            inModal: false,
            duration: 5000,
          }),
        ),
      [dispatch],
    );

    const onSubmitSignIn = useCallback(() => {
      linkingLogin &&
        linkingPassword &&
        handleSignIn(linkingLogin, linkingPassword).then(
          () => handleNavigationToMain,
        );
    }, [
      errorLoginHandler,
      handleNavigationToMain,
      linkingLogin,
      linkingPassword,
    ]);

    const navigateToLogin = useCallback(() => {
      replace(AppRouteScreensType.loginScreen);
    }, [replace]);

    useEffect(() => {
      onSubmitSignIn();
    }, [linkingLogin, linkingPassword, onSubmitSignIn]);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('LinkingScreen.header')}</Text>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            ref={lottieRef}
            source={lottie}
            loop
            style={styles.lottie}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.dividerText}>{t('LinkingScreen.or')}</Text>
          <Button
            title={'Go to Login'}
            buttonType={EButtonType.secondary}
            action={navigateToLogin}
            externalStyle={styles.buttonContainer}
          />
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottieContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    justifyContent: 'center',
    width: '80%',
  },
  headerText: {
    fontSize: fontSize.header,
    fontWeight: 'bold',
    color: colors.text.blue,
    textAlign: 'center',
  },
  dividerText: {
    fontSize: fontSize.large,
    color: colors.text.blue,
    textAlign: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    width: '90%',
    bottom: 0,
  },
});
export default LinkingScreen;
