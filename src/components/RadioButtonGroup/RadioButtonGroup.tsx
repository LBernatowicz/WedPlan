import React, { Ref } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'assets/utils/colors';

export enum ERadioButtonOrientation {
  row = 'row',
  column = 'column',
}

type RadioButtonGroupProps = {
  orientation?: string;
  borderWidth?: number;
  borderColor?: string;
  disabledRadioButtonColor?: string;
  enableRadioButtonColor?: string;
  control: any;
  onChange: any;
  externalRef: Ref<any>;
  value: number;
  formData: Array<string>;
  disabled?: boolean;
};

const RadioButtonGroup = ({
  orientation = ERadioButtonOrientation.row,
  borderWidth = 1,
  borderColor = colors.main.secondary,
  disabledRadioButtonColor = colors.external.white,
  enableRadioButtonColor = colors.main.secondary,
  onChange,
  externalRef,
  value,
  formData,
  disabled = false,
}: RadioButtonGroupProps) => {
  const externalBorderColor = () => {
    return {
      borderColor: borderColor,
    };
  };

  const flexOrientation = () =>
    orientation === 'column'
      ? ERadioButtonOrientation.column
      : ERadioButtonOrientation.row;

  const columnOrientation = (itemIndex: number) => {
    switch (itemIndex) {
      case 0:
        return {
          borderWidth: borderWidth,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        };
      case formData.length - 1:
        return {
          borderWidth: borderWidth,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopWidth: 0,
        };
      default:
        return {
          borderWidth: borderWidth,
          borderTopWidth: 0,
        };
    }
  };

  const rowOrientation = (itemIndex: number) => {
    switch (itemIndex) {
      case 0:
        return {
          borderWidth: borderWidth,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        };
      case formData.length - 1:
        return {
          borderWidth: borderWidth,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderLeftWidth: 0,
        };
      default:
        return {
          borderWidth: borderWidth,
          borderLeftWidth: 0,
        };
    }
  };

  const isActive = (itemIndex: number) =>
    value === itemIndex + 1
      ? {
          backgroundColor: enableRadioButtonColor,
        }
      : {
          backgroundColor: disabledRadioButtonColor,
        };

  const radioButtonsOrientation = (
    flexDirection: string,
    itemIndex: number,
  ) => {
    switch (flexDirection) {
      case 'column':
        return columnOrientation(itemIndex);
      case 'row':
        return rowOrientation(itemIndex);
      default:
        return rowOrientation(itemIndex);
    }
  };

  return (
    <View
      style={[
        styles.radioButtonGroupContainer,
        styles.enableShadow,
        { flexDirection: flexOrientation() },
      ]}>
      {formData.map((item, index) => {
        return (
          <TouchableOpacity
            disabled={disabled}
            key={index.toString()}
            ref={externalRef}
            onPress={() => {
              onChange(index + 1);
            }}
            style={[
              disabled && styles.disableRadioButtons,
              styles.radioButtonContainer,
              radioButtonsOrientation(orientation, index),
              isActive(index),
              externalBorderColor(),
            ]}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonGroupContainer: {
    width: 'auto',
    backgroundColor: colors.external.white,
    borderRadius: 10,
  },
  disableRadioButtons: {
    opacity: 0.4,
  },
  enableShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  radioButtonContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.black,
    fontWeight: '400',
    lineHeight: 35,
    fontSize: 14,
    width: Platform.OS === 'android' ? '100%' : 'auto',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export default RadioButtonGroup;
