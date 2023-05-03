import React, { Ref } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../../assets/utils/colors';

type RadioButtonGroupProps = {
  orientation?: string;
  borderWidth?: number;
  borderColor?: string;
  disabledRadioButtonColor?: string;
  enableRadioButtonColor?: string;
  control: any;
  onChange: any;
  ref?: Ref<any>;
  value: number;
  formData: Array<string>;
};

const RadioButtonGroup = ({
  orientation = 'row',
  borderWidth = 1,
  borderColor = '#F7CE5B',
  disabledRadioButtonColor = 'white',
  enableRadioButtonColor = '#F7CE5B',
  onChange,
  ref,
  value,
  formData,
}: RadioButtonGroupProps) => {
  const externalBorderColor = () => {
    return {
      borderColor: borderColor,
    };
  };

  const flexOrientation = () => (orientation === 'column' ? 'column' : 'row');

  const columnOrientation = (itemIndex: number) => {
    switch (itemIndex) {
      case 0:
        return {
          borderWidth: borderWidth,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        };
      case formData.length - 1:
        return {
          borderWidth: borderWidth,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
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
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        };
      case formData.length - 1:
        return {
          borderWidth: borderWidth,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
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

  console.log('@@');

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
            ref={ref}
            onPress={() => {
              onChange(index + 1);
            }}
            style={[
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
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
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
    backgroundColor: 'yellow',
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
