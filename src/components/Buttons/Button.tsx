import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
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
        styles.enableShadow,
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
    maxHeight: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.black,
    fontWeight: '500',
    lineHeight: 50,
    fontSize: 14,
  },
  enableShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  primaryButton: {
    backgroundColor: colors.main.primary,
    borderRadius: 10,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 10,
    flex: 1,
  },
  ghostButton: {
    borderRadius: 10,
    color: colors.text.blue,
  },
});

export default Button;
