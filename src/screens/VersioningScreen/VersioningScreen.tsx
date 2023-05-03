import React, { useCallback } from 'react';
import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../assets/utils/colors';
import { fontSize } from '../../assets/utils/fonts';
import Button from '../../components/Buttons/Button';
import { EButtonType } from '../../components/Buttons/type/EButtonType';
import { useTranslation } from 'react-i18next';

const lottie = require('assets/lottie/updateApp.json');

const VersioningScreen = () => {
  const lottieRef = useCallback(
    (node: LottieView | null | undefined) => node?.play(),
    [],
  );
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} showHideTransition={'fade'} />
      <LottieView
        ref={lottieRef}
        source={lottie}
        loop
        style={{ width: '100%' }}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('VersioningScreen.title')}</Text>
        <Text style={styles.bodyText}>{t('VersioningScreen.bio')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t('VersioningScreen.updateButton')}
          buttonType={EButtonType.secondary}
          action={() => console.log('asd')}
          externalStyle={styles.button}
        />
        <Button
          title={t('VersioningScreen.closeAppButton')}
          buttonType={EButtonType.primary}
          action={() => BackHandler.exitApp()}
          externalStyle={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default VersioningScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  headerContainer: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: colors.text.blue,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  bodyText: {
    color: colors.text.blue,
    fontSize: fontSize.medium,
    fontWeight: 'normal',
  },
  buttonContainer: {
    paddingVertical: 20,
    width: '90%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});
