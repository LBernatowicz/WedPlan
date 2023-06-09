import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../store/setupStore';
import { showModal } from '../../store/modalSlice';
import { EModalNames } from '../../components/Modal/type/EModalNames';
import HomeHeader from './components/HomeHeader/HomeHeader';
import { colors } from '../../assets/utils/colors';
import HomeBody from './components/HomeBoddy/HomeBody';
import LinearGradient from 'react-native-linear-gradient';
import HomeFooter from './components/HomeFooter/HomeFooter';

const HomeScreen = () => {
  const users = useAppSelector((store: RootState) => store.global.loggedUser);
  const isModalVisible = useAppSelector(
    (store: RootState) => store.modal.visible,
  );
  const dispatch = useAppDispatch();

  const background = require('assets/images/background1.jpeg');

  useEffect(() => {
    users.isFilled &&
      dispatch(
        showModal({
          modalName: EModalNames.guestSurvey,
          inModal: false,
        }),
      );
  }, [dispatch, users]);

  return (
    <View style={{ backgroundColor: colors.external.white }}>
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <HomeHeader />
          <HomeBody />
          <LinearGradient
            style={{
              width: '100%',
              flex: 4.5,
              backgroundColor: colors.main.deepBlue,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.9, y: 0 }}
            colors={[colors.main.deepBlue, colors.external.white]}>
            <HomeFooter />
          </LinearGradient>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  blurBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: colors.external.white,
    opacity: 0.5,
  },
});

export const HomeScreenOptions = () => ({ headerShown: false });

export default HomeScreen;
