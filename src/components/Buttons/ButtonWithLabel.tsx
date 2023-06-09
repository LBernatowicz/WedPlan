import React, { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button, { TButtonProps } from './Button';
import { StyleProps } from 'react-native-reanimated';
import { colors } from '../../assets/utils/colors';

type TButtonWithLabel = {
  label: string;
  externalContainerStyle?: StyleProps;
  children?: ReactElement;
} & TButtonProps;

const ButtonWithLabel = ({
  label,
  externalContainerStyle,
  children,
  ...rest
}: TButtonWithLabel) => {
  return (
    <View style={[styles.container, externalContainerStyle]}>
      {label && <Text style={styles.informationTextBody}>{label}</Text>}
      <Button {...rest} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
  },
  informationTextBody: {
    textAlign: 'left',
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 15,
    color: colors.text.black,
  },
});

export default ButtonWithLabel;
