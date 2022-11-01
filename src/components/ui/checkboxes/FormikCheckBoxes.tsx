import { Checkbox,  FormControlLabel, FormControl, FormGroup } from '@mui/material';

import { useField } from 'formik';
import { OutlinedDiv } from '../containers/OutlinedDiv';

interface FormikRadioProps {
  name: string,
  label: string,
  choices : Options,
  helperText?: string,
}

export const FormikCheckBoxes = (props: FormikRadioProps) => {
  const { choices, label, helperText, name } = props;

  const [field, meta, helpers] = useField<Array<any>>(name);

  const handleChange = (el: React.SyntheticEvent<HTMLInputElement>, isChecked: boolean) => {
    const chkValue = el.currentTarget.value;

    if (isChecked) {
      if (!field.value.includes(chkValue)) {
        helpers.setValue([...field.value ?? [], chkValue]);
      }
    } else {
      helpers.setValue(field.value?.filter(item => item !== chkValue) ?? []);
    }

  };

  return (

    <OutlinedDiv label={label} helperText={helperText} errorMessage={meta.error}>
      <FormControl fullWidth>
        <FormGroup
          sx={{ justifyContent: 'space-around' }}
          row
        >
          {choices.map(item => (
            <FormControlLabel
            checked={field.value.includes(item.value)}
            key={item.label}
            value={item.value}
            control={<Checkbox />}
            label={item.label}
            onChange={handleChange}
            />
          ))}
        </FormGroup>
      </FormControl>
    </OutlinedDiv>


  );
};