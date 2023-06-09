import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState, useAppSelector } from '../../../../store/setupStore';
import { colors } from '../../../../assets/utils/colors';

import CountDown from '../../../../assets/utils/libraries/react-native-countdown-component';

const HomeBody = () => {
  const weddingDate = useAppSelector(
    (state: RootState) => state.global.weddingDate,
  );
  const guestNames = useAppSelector(
    (state: RootState) => state.global.loggedUser.guests,
  );

  const reloadCounter = useCallback(() => {
    return (
      <CountDown
        until={weddingDate - new Date().getTime() / 1000}
        size={22}
        labels={{
          d: 'Dni',
          h: 'Godziny',
          m: 'Minuty',
          s: 'Sekundy',
        }}
        //hideLabels
      />
    );
  }, [weddingDate]);

  const handleHeaderText = () => {
    const names =
      guestNames
        .map((guest, index) => {
          if (index === guestNames.length - 1) {
            return guest.name;
          } else {
            return guest.name + ', ';
          }
        })
        .join(' ') + ' !';
    return names;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>{handleHeaderText()}</Text>
        <Text style={styles.textBody}>
          Witamy Was w naszej ślubnej aplikacji!
        </Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.textFooter}>
          Do naszego ślubu pozostało już tylko ...
        </Text>
        {weddingDate && reloadCounter()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3.5,
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'CormorantGaramond-Light',
    color: colors.text.black,
  },
  textBody: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'CormorantGaramond-Light',
    color: colors.text.black,
  },
  textFooter: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 10,
    fontFamily: 'NanumMyeongjo',
    color: colors.text.black,
  },
  countContainer: {
    top: 0,
    flex: 2,
  },
});

export default HomeBody;
