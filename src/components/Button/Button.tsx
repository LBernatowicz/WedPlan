import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
  action?: () => void;
  buttonType?: string;
};

const Button = ({
  title,
  buttonType = 'primary',
  action = () => console.log('ok'),
}: Props) => {
  const selectButtonType = (type: string) => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'ghost':
        return styles.ghostButton;
      default:
        break;
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
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enableButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    height: 50,
    flex: 1,
  },
  text: {
    fontWeight: '500',
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
    backgroundColor: 'white',
    borderRadius: 10,
  },
  secondaryButton: {
    backgroundColor: '#F7CE5B',
    borderRadius: 10,
  },
  ghostButton: {
    borderRadius: 10,
  },
});

export default Button;
