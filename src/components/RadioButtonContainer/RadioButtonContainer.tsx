import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RadioButtonController from '../RadioButtonController/RadioButtonController';
import { ERadioButtonOrientation } from '../RadioButtonGroup/RadioButtonGroup';
import { Control } from 'react-hook-form';
import { StyleProps } from 'react-native-reanimated';
import { colors } from '../../assets/utils/colors';

type TRadioButtonContainer = {
  control: Control<any>;
  recordName: any;
  formData: string[];
  label: string;
  disabled?: boolean;
  externalStyle?: StyleProps;
};

const RadioButtonContainer = ({
  control,
  recordName,
  formData,
  label,
  disabled,
  externalStyle,
}: TRadioButtonContainer) => {
  return (
    <View style={[styles.radioButtonContainer, externalStyle]}>
      {label && <Text style={styles.informationTextBody}>{label}</Text>}
      <RadioButtonController
        disabled={disabled}
        control={control}
        name={recordName}
        orientation={ERadioButtonOrientation.row}
        formData={formData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%',
  },
  informationTextBody: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 15,
    color: colors.text.black,
  },
});

export default RadioButtonContainer;
