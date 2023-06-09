import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../../assets/utils/colors';

const HomeFooter = () => {
  const cathedralPic = require('assets/images/cathedral.png');
  const dancingCouplePic = require('assets/images/dancingCouple.png');
  const bedPic = require('assets/images/bed.png');
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Gdzie & Kiedy</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.pictogramContainer}>
          <Image source={cathedralPic} style={styles.cathedralPic} />
          <View style={styles.pictogramText}>
            <Text style={styles.textBody}>
              2 grudnia 2023 roku o godzinie 15:30 w Balzylice Narodzenia NMP w
              Gietrzwałdzie.
            </Text>
          </View>
        </View>
        <View style={styles.pictogramContainer}>
          <View style={styles.pictogramText}>
            <Text style={styles.textBody}>
              Przyjęcie weselne odbędzie w restauracji
            </Text>
            <Text style={styles.textBody}>,,Przystanek Zatoka" w Sile.</Text>
          </View>
          <Image source={dancingCouplePic} style={styles.dancingCouplePic} />
        </View>
        <View style={styles.pictogramContainer}>
          <Image source={bedPic} style={styles.bedPic} />
          <View style={styles.pictogramText}>
            <Text style={styles.textBody}>
              Zapewniamy Wam nocleg na terenie ośrodka.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
  },
  pictogramContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 1,
  },
  pictogramText: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 5,
    height: '100%',
  },
  textHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'CormorantGaramond-Light',
    color: colors.text.black,
  },
  textBody: {
    width: '90%',
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'CormorantGaramond-Light',
    color: colors.text.black,
  },
  cathedralPic: {
    flex: 1,
    resizeMode: 'contain',
  },
  dancingCouplePic: {
    flex: 1,
    resizeMode: 'contain',
  },

  bedPic: {
    flex: 1,
    resizeMode: 'contain',
  },
  bodyContainer: {
    flex: 5,
    width: '90%',
  },
});

export default HomeFooter;
