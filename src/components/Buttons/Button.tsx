import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { EButtonType } from './type/EButtonType';
import { colors } from '../../assets/utils/colors';

type Props = {
  title: string;
  action?: () => void;
  buttonType?: EButtonType;
};

const Button = ({
  title,
  buttonType = EButtonType.primary,
  action = () => console.log('ok'),
}: Props) => {
  const selectButtonType = (type: string) => {
    switch (type) {
      case EButtonType.primary:
        return styles.primaryButton;
      case EButtonType.secondary:
        return styles.secondaryButton;
      case EButtonType.ghost:
        return styles.ghostButton;
      default:
        return styles.primaryButton;
    }
  };

  useEffect(() => {
    selectButtonType(buttonType);
  }, [buttonType]);

  return (
    <TouchableOpacity
      style={[
        styles.enableButton,
        selectButtonType(buttonType),
        buttonType !== EButtonType.ghost && styles.enableShadow,
      ]}
      onPress={action}>
      <Text style={[styles.text, selectButtonType(buttonType)]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enableButton: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: 50,
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 40,
    fontSize: 14,
    borderRadius: 10,
    width: Platform.OS === 'android' ? '100%' : 'auto',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  enableShadow: {
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  primaryButton: {
    backgroundColor: colors.main.primary,
  },
  secondaryButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 10,
  },
  ghostButton: {
    borderRadius: 10,
    color: colors.text.blue,
  },
});

export default Button;
