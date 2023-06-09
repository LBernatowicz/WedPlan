import React from 'react';
import RadioButtonGroup, {
  ERadioButtonOrientation,
} from '../RadioButtonGroup/RadioButtonGroup';
import { Control, Controller } from 'react-hook-form';

type TRadioButtonController = {
  control: Control<any>;
  name: string;
  orientation?: ERadioButtonOrientation;
  formData: any;
  disabled?: boolean;
};

const RadioButtonController = ({
  control,
  name,
  orientation = ERadioButtonOrientation.row,
  formData,
  disabled,
}: TRadioButtonController) => {
  console.log('render buttonu');
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <RadioButtonGroup
            disabled={disabled}
            key={name}
            control={control}
            orientation={orientation}
            onChange={onChange}
            externalRef={ref}
            value={value}
            formData={formData}
          />
        );
      }}
    />
  );
};

export default React.memo(RadioButtonController);
