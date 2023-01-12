import { FormControlLabel, Checkbox, FormControl, FormHelperText, CheckboxProps } from '@mui/material';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';


export const FormikLabeledCheckBox = (
  props: CheckboxProps &
  {
    label?: string,
    defaultVal?: boolean
    name: string
    helperText?: string,
    disabled?: boolean,
  },
) => {
  const {
    name,
    label = '',
    helperText = '',
    defaultVal = false,
    disabled = false,
    ...others
  } = props;

  const [field, meta, helpers] = useFieldFast(name);

  let dirtyVal: boolean = field.value ?? defaultVal;

  if (typeof field.value === 'string') {
    dirtyVal = Boolean(+field.value);
  }

  return (
    <FormControl >
      <FormControlLabel
        name={field.name}
        label={label}
        control={
          <Checkbox
            {...others}
            disabled={disabled}
            checked={dirtyVal}
            onClick={() => helpers.setValue(!meta.value)}
          />
        }
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  );

};