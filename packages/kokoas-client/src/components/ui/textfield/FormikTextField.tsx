import { InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';
import { useField } from 'formik';
import { FocusEvent, ChangeEvent, HTMLInputTypeAttribute } from 'react';


interface FormikTextFieldProps extends StandardTextFieldProps {
  name: string,
  label: string,
  id?: string,
  value?: string,
  onClick?: ()=>void,
  onFocus?: ()=>void,
  onBlur?: (e: FocusEvent<any, Element>)=>void,
  onChange?: (e: ChangeEvent<any>) => void,
  onInput?:(e: ChangeEvent<any>) => void,
  onCompositionStart?: ()=>void,
  onCompositionEnd?: ()=>void,
  placeholder?: string,
  helperText?: string,
  required?: boolean,
  inputComponent?: any,
  endAdornment?: JSX.Element | string,
  shrink?: boolean
  multiline?: boolean,
  rows?: number
  type?: HTMLInputTypeAttribute,
  disabled?: boolean,
  size?: 'small' | 'medium'
  align?: 'left' | 'right'
}

/**
 * @deprecated use FormikTextFieldV2 instead
 */
export const FormikTextField = (props: FormikTextFieldProps) => {
  const {
    helperText, label, placeholder, required,
    onClick, onFocus,
    onCompositionEnd,
    onCompositionStart,
    type = undefined,
    endAdornment,
    shrink = undefined,
    multiline = undefined,
    rows = undefined,
    id = undefined,
    onInput,
    value,
    disabled,
    size = 'medium',
    onKeyUp,
    name,
    onChange,
    align = 'left',
    onBlur,
    inputComponent,
  } = props;
  const [field, meta] = useField(name);

  const handleChange = ((e: any)=>{
    field.onChange(e);

    if (onChange) onChange(e);

  });

  return (
    <TextField {...field}
      size={size}
      label={label}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      type={type}
      onClick={onClick}
      onFocus={onFocus}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      onBlur={(e)=> {
      /* Call formiks default onBlur */
        field.onBlur(e);
        if (onBlur) onBlur(e);

      }}
      onChange={handleChange}
      onInput={onInput}
      onKeyUp={onKeyUp}
      value={value || field.value?.toString() || ''}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.error || helperText}
      InputProps={{
        inputComponent: inputComponent,
        inputProps: { style: { textAlign: align } },
        endAdornment: <InputAdornment position='end'>
          {endAdornment}
        </InputAdornment>,
      }}
      InputLabelProps={{
        shrink,
      }}
      fullWidth
      multiline={multiline}
      rows={rows}
    />
  );
};