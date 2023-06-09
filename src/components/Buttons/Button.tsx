import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { EButtonType } from './type/EButtonType';
import { colors } from 'assets/utils/colors';
import { StyleProps } from 'react-native-reanimated';

export type TButtonProps = {
  title: string;
  action?: () => any;
  buttonType?: EButtonType;
  externalStyle?: StyleProps;
  disabled?: boolean;
};

const Button = ({
  title,
  buttonType = EButtonType.primary,
  action = () => console.log('ok'),
  externalStyle,
  disabled = false,
}: TButtonProps) => {
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
      disabled={disabled}
      style={[
        disabled ? styles.disableButton : styles.enableButton,
        selectButtonType(buttonType),
        buttonType !== EButtonType.ghost && styles.enableShadow,
        externalStyle,
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
    height: 45,
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disableButton: {
    opacity: 0.5,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 45,
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 45,
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
    height: 45,
    backgroundColor: colors.main.primary,
  },
  secondaryButton: {
    height: 45,
    backgroundColor: colors.main.secondary,
    borderRadius: 10,
  },
  ghostButton: {
    borderRadius: 10,
    color: colors.text.blue,
  },
});

export default Button;
