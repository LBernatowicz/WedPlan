import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { paddings } from 'assets/utils/paddings';
import { margins } from 'assets/utils/margins';
import { colors } from 'assets/utils/colors';
import ButtonWithIcon from 'components/Buttons/ButtonWithIcon';
import { IconEyeSplash, IconEye } from 'assets/svg/Index';

type TInputWithForm = {
  control: Control<any>;
  name: string;
  secured?: boolean;
  rule?: Object;
};

const InputWithForm = ({
  // @ts-ignore
  control,
  // @ts-ignore
  name,
  // @ts-ignore
  secured = false,
  // @ts-ignore
  rule = {},
  ...rest
}: TInputWithForm | TextInputProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  useEffect(() => {
    if (hidePassword) {
      setTimeout(() => setHidePassword(false), 1000);
    }
  }, [hidePassword]);
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
          <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
            <TextInput
              onChangeText={onChange}
              value={value}
              secureTextEntry={secured && !hidePassword}
              onBlur={onBlur}
              placeholderTextColor={colors.text.blue}
              style={styles.container}
              ref={ref}
              {...rest}
            />
            {secured && (
              <ButtonWithIcon
                iconName={
                  hidePassword ? (
                    <IconEyeSplash width={20} height={20} />
                  ) : (
                    <IconEye width={20} height={20} />
                  )
                }
                onPress={() => setHidePassword(!hidePassword)}
                width={20}
                height={20}
                style={styles.iconContainer}
              />
            )}
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
    backgroundColor: colors.external.white,
    height: 50,
    marginVertical: margins.minVerticalMargin,
    paddingHorizontal: paddings.minHorizontalPadding,
    borderRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    color: colors.text.black,
  },
  errorText: {
    color: colors.text.red,
    fontWeight: '500',
    lineHeight: 20,
  },
  emptyError: {
    height: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 25,
    right: 10,
    opacity: 0.5,
  },
});

export default InputWithForm;
