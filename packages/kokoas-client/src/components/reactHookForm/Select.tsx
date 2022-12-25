import { FormControl, FormHelperText, InputLabel, Select as MuiSelect } from '@mui/material';
import { ComponentProps, ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';


export const Select = <T extends FieldValues>(  {
  controllerProps,
  selectProps,
  children,
}: {
  controllerProps: UseControllerProps<T>,
  selectProps: ComponentProps<typeof MuiSelect> & {
    label?: string,
  },
  children: ReactNode,
}) => {

  const {
    label,
  } = selectProps;
  
  return (
    <Controller 
      {...controllerProps}
      render={({ field, fieldState }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched;

        return (
          <FormControl fullWidth error={isShowError}>
            <InputLabel>
              {label}
            </InputLabel>
            <MuiSelect 
              {...field}
              {...selectProps}
            >
              {children}
            </MuiSelect>
            <FormHelperText>
              {isShowError ? error.message : ''}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};