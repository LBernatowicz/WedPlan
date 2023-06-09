import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { StyleProps } from 'react-native-reanimated';

type THomeHeaderProps = {
  externalStyle?: StyleProps;
};

const HomeHeader = ({ externalStyle }: THomeHeaderProps) => {
  const { t } = useTranslation();
  const background = require('assets/images/background2.jpeg');
  const screenHeight = useWindowDimensions().height;

  return (
    <View
      style={[
        styles.container,
        screenHeight <= 700 && { flex: 2 },
        externalStyle,
      ]}>
      <Image source={background} style={styles.backgroundImage} />
      <Text style={styles.headerText}>{t('HomeScreen.KnL')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    paddingTop: 30,
    fontFamily: 'CormorantGaramond-Light',
    textAlign: 'center',
    fontSize: 40,
  },
  backgroundImage: {
    opacity: 0.2,
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
export default HomeHeader;
