import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
} from 'react-native';
import { paddings } from '../../assets/utils/paddings';
import { margins } from '../../assets/utils/margins';
import { colors } from '../../assets/utils/colors';

type TInputWithForm = {
  control: Control<any>;
  name: string;
  rule?: Object;
};

const InputWithForm = ({
  // @ts-ignore
  control,
  // @ts-ignore
  name,
  // @ts-ignore
  rule = {},
  ...rest
}: TInputWithForm | TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rule}
      render={({
        field: { onChange, ref, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <View>
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={styles.container}
              ref={ref}
              {...rest}
            />
            {error ? (
              <Text style={styles.errorText}>{error.message || 'Error'}</Text>
            ) : (
              <View style={styles.emptyError} />
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    marginVertical: margins.minVerticalMargin,
    paddingHorizontal: paddings.minHorizontalPadding,
    borderRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  errorText: {
    color: colors.text.red,
    fontWeight: '500',
    lineHeight: 20,
  },
  emptyError: {
    height: 20,
  },
});

export default InputWithForm;
