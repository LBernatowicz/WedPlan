import React from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import Button from '../../../Buttons/Button';
import { EButtonType } from '../../../Buttons/type/EButtonType';
import { toHoursAndMinutesParser } from '../../../../helpers/Parsers/Parsers';
import { colors } from '../../../../assets/utils/colors';
import { LatLng } from 'react-native-maps';

export type TNavigationDetailsProps = {
  buttonTitle: string | undefined;
  time: number | undefined;
  distance: number | undefined;
  subtitle: string | undefined;
  origin: LatLng | null | undefined;
  destination: LatLng | null | undefined;
};

const NavigationDetails = ({
  buttonTitle = '',
  time,
  distance,
  subtitle,
  destination,
  origin,
}: TNavigationDetailsProps) => {
  const timeParser = time && toHoursAndMinutesParser(Math.ceil(time));

  const externalMapsHandler = async () => {
    if (Platform.OS === 'android') {
      return Linking.openURL(
        `google.navigation:q=${destination?.latitude}+${destination?.longitude}`,
      );
    } else {
      return Linking.openURL(
        `maps://app?saddr=${origin?.latitude}+${origin?.longitude}&daddr=${destination?.latitude}+${destination?.longitude}`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.timeText}>{timeParser && timeParser}</Text>
        <Text style={styles.distanceText}>{`(${distance?.toFixed(1)}km)`}</Text>
      </View>
      <Text style={styles.subtitleText}>{subtitle && subtitle}</Text>
      <View style={styles.button}>
        <Button
          title={buttonTitle}
          buttonType={EButtonType.secondary}
          action={externalMapsHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  body: {
    justifyContent: 'flex-start',
    width: '90%',
    flexDirection: 'row',
  },
  timeText: {
    color: colors.main.secondary,
    fontWeight: '500',
    lineHeight: 35,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: 'transparent',
  },

  distanceText: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 35,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  subtitleText: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 16,
    fontSize: 12,
    width: '90%',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 15,
    flex: 1,
    width: '100%',
  },
});

export default NavigationDetails;
