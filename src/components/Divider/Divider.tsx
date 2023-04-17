import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import hairlineWidth = StyleSheet.hairlineWidth;
import { colors } from 'assets/utils/colors';

interface dividerProps {
  text: string;
}

export const Divider = ({ text }: dividerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginVertical: '5%',
  },
  text: {
    marginHorizontal: 10,
    color: colors.text.black,
  },
  divider: {
    flex: 1,
    height: 1,
    borderWidth: hairlineWidth,
    borderColor: colors.external.black,
    paddingHorizontal: 5,
  },
});
