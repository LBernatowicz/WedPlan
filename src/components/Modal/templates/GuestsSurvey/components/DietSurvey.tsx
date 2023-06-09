import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TInitialUsersCollectionType } from '../../../../../screens/HomeScreen/types/TInitialForm.type';
import { colors } from '../../../../../assets/utils/colors';

type TDietSurvey = {
  subtitle?: string;
  children?: ReactNode;
  item: TInitialUsersCollectionType;
};

const DietSurvey = ({ item, subtitle, children }: TDietSurvey) => {
  return (
    <View style={styles.container}>
      <View style={styles.informationTextContainer}>
        {item && <Text style={styles.informationTextTitle}>{item.name}!</Text>}
        <Text style={styles.informationTextBody}>{subtitle}</Text>
      </View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  informationTextContainer: {
    width: '100%',
  },
  informationTextTitle: {
    color: colors.text.black,
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '600',
  },
  informationTextBody: {
    color: colors.text.black,
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
  },
  childrenContainer: {
    justifyContent: 'center',
    width: '100%',
  },
});

export default DietSurvey;
