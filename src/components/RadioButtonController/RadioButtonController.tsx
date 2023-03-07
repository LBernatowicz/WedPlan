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
  console.log('render buttonu');
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <RadioButtonGroup
            key={name}
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

export default React.memo(RadioButtonController);
