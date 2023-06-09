import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonContainer from '../../components/RadioButtonContainer/RadioButtonContainer';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { RootState, useAppDispatch, useAppSelector } from 'store/setupStore';
import { ParseLanguageFromFirestore } from 'helpers/Parsers/Parsers';
import ButtonWithLabel from 'components/Buttons/ButtonWithLabel';
import Button from 'components/Buttons/Button';
import { colors } from 'assets/utils/colors';
import { showModal } from 'store/modalSlice';
import { EModalNames } from 'components/Modal/type/EModalNames';
import { handleLogOut } from '../../helpers/Authorization/AuthorizationHelpers';
import LottieView from 'lottie-react-native';
import {
  AppRouteScreensType,
  AppRouteTabsType,
} from '../../navigation/types/AppRouteType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AuthorizationRootParamList,
  MainTabParamList,
} from '../../navigation/types/Navigation';
import { EToastMessageType, showToast } from '../../store/toastSlice';
import { EToastHeaderTitle } from '../../components/Toast/type/EToastHeaderTitle';
import { EButtonType } from '../../components/Buttons/type/EButtonType';

const lottieLoading = require('assets/lottie/loading.json');
import HomeHeader from '../HomeScreen/components/HomeHeader/HomeHeader';

const SettingsScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const appVersion = useAppSelector((state: RootState) => state.global.version);
  const appLanguage = useAppSelector(
    (state: RootState) => state.global.language,
  );
  const isModalVisible = useAppSelector(
    (store: RootState) => store.modal.visible,
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const screenHeight = Dimensions.get('window').height;
  const background = require('assets/images/background1.jpeg');

  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );
  const { control } = useForm({
    defaultValues: ParseLanguageFromFirestore(appLanguage),
  });
  const { t } = useTranslation();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthorizationRootParamList | MainTabParamList>
    >();

  const watcher = useWatch({ control });
  console.log(watcher);

  const handleCallToCouple = (phoneNumber: number) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSurveyEdit = () => {
    dispatch(
      showModal({
        modalName: EModalNames.guestSurvey,
        inModal: false,
      }),
    );
  };

  const handleNavigationToLogin = () => {
    // @ts-ignore
    navigation.push(AppRouteTabsType.authTabs, {
      screen: AppRouteScreensType.loginScreen,
    });
  };

  const handleLogoutFormApp = () => {
    setIsLoading(true);
    handleLogOut()
      .then(() => {
        setIsLoading(false);
        handleNavigationToLogin();
        dispatch(
          showToast({
            toastMessageType: EToastMessageType.success,
            title: EToastHeaderTitle.LogOutHeader,
            body: t('Toasts.LogOutBody'),
            inModal: false,
            duration: 5000,
          }),
        );
      })
      .catch((error) => console.log('Error logout: ', error));
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        externalStyle={{
          flex: screenHeight <= 700 ? 0.25 : (1 / 11) * 4.12,
        }}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEnabled={screenHeight < 700}>
        <SafeAreaView style={styles.buttonsContainer}>
          <View style={styles.separatorContainer}>
            <RadioButtonContainer
              control={control}
              formData={['PL', 'EN']}
              recordName={'language'}
              label={t('SettingsScreen.changeLanguageHeader')}
              externalStyle={styles.radioButtonContainer}
            />
          </View>
        </SafeAreaView>
        <LinearGradient
          style={styles.buttonsContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 0 }}
          colors={[colors.main.deepBlue, colors.external.white]}>
          <ButtonWithLabel
            label={t('SettingsScreen.callToCoupleHeader')}
            title={t('SettingsScreen.kamila')}
            buttonType={EButtonType.secondary}
            action={() => handleCallToCouple(500293996)}
            externalStyle={styles.buttonContainer}>
            <Button
              title={t('SettingsScreen.lukasz')}
              externalStyle={styles.buttonContainer}
              buttonType={EButtonType.secondary}
              action={() => handleCallToCouple(667739988)}
            />
          </ButtonWithLabel>
        </LinearGradient>

        <View style={styles.buttonsContainer}>
          <View style={styles.separatorContainer}>
            <ButtonWithLabel
              label={t('SettingsScreen.editSurveyDataHeader')}
              title={t('SettingsScreen.editSurveyButton')}
              action={handleSurveyEdit}
              buttonType={EButtonType.secondary}
              externalStyle={styles.buttonContainer}
            />
          </View>
          <LinearGradient
            style={styles.buttonsContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.9, y: 0 }}
            colors={[colors.main.deepBlue, colors.external.white]}>
            <ButtonWithLabel
              label={t('SettingsScreen.logoutHeader')}
              title={t('SettingsScreen.logoutButton')}
              externalStyle={styles.buttonContainer}
              buttonType={EButtonType.secondary}
              action={handleLogoutFormApp}
            />
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>
                {t('SettingsScreen.version')}
                {appVersion}
              </Text>
            </View>
          </LinearGradient>
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
      {isModalVisible && (
        <Image
          source={background}
          style={styles.blurBackground}
          blurRadius={100}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.external.white,
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  scrollContainer: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonContainer: {
    width: '90%',
  },
  versionContainer: {
    marginBottom: 20,
    alignItems: 'flex-end',
    width: '95%',
  },
  versionText: {
    color: colors.text.blue,
    fontSize: 10,
  },
  loadingContainer: {
    backgroundColor: colors.external.smokeWhite,
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
  separatorContainer: {
    backgroundColor: colors.external.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: colors.external.white,
    opacity: 0.5,
  },
});

export const WelcomeScreenOptions = () => ({ headerShown: false });

export default SettingsScreen;
