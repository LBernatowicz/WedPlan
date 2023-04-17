import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

// @ts-ignore
import background from '/assets/images/homeScreenBackground.jpg';
// @ts-ignore
import invitation from '/assets/images/invitation.jpg';

// @ts-ignore
import CountDown from 'react-native-countdown-component';
import GuestsSurvey from './components/GuestsSurvey';

const HomeScreen = () => {
  const scrollRef = useRef();
  return (
    <View style={styles.container}>
      <Image
        source={background}
        style={styles.backgroundImage}
        blurRadius={3}
      />
      <ScrollView
        ref={scrollRef.current}
        style={styles.bodyWrapperContainer}
        contentContainerStyle={styles.bodyScrollContainerStyle}>
        <View style={styles.bodyContainer}>
          <Image source={invitation} style={styles.invitationImage} />
          <View style={styles.countDownContainer}>
            <CountDown
              until={8640000 * 4}
              size={22}
              timeToShow={['D', 'H', 'M', 'S']}
            />
          </View>
          <GuestsSurvey />
        </View>
      </ScrollView>
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
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    opacity: 0.1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  invitationImage: {
    marginTop: 150,
    width: '100%',
    height: 600,
    resizeMode: 'cover',
    flex: 1,
  },
  bodyWrapperContainer: {
    width: '100%',
    flex: 1,
  },
  bodyScrollContainerStyle: {
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'GreatVibes-Regular',
    fontSize: 100,
  },
  countDownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    height: 70,
  },
  informationTextContainer: {
    margin: 15,
  },
  informationTextTitle: {
    fontSize: 21,
    fontWeight: '600',
  },
  informationTextBody: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonsContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const HomeScreenOptions = () => ({ headerShown: false });

export default HomeScreen;
