import React from 'react';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { Control, Controller } from 'react-hook-form';

type TRadioButtonController = {
  control: Control<any>;
  name: string;
  orientation?: 'row' | 'column';
  formData: any;
};

const RadioButtonController = ({
  control,
  name,
  orientation = 'row',
  formData,
}: TRadioButtonController) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <RadioButtonGroup
            control={control}
            orientation={orientation}
            onChange={onChange}
            ref={ref}
            value={value}
            formData={formData}
          />
        );
      }}
    />
  );
};

export default RadioButtonController;
