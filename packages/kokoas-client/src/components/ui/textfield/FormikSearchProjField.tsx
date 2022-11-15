import { Autocomplete, TextField, Stack, CircularProgress } from '@mui/material';
import { useField } from 'formik';
import { useSearchProjects } from 'kokoas-client/src/hooksQuery/useSearchProjects';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Caption } from '../typographies';

type Opt = {
  id: string,
  projName: string
};


/* TODO: SearchProjectsのラッパーとして変える */
export const FormikSearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  disabled?: boolean,
  isLoading?: boolean
  handleChange?: () => void
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

  const debouncedInput = useDebounce(inputVal, 1000);

  const { data: newOptions } = useSearchProjects<Opt[]>(debouncedInput, {
    select: (d) => d.map((projRec)=>{
      const { $id, projName: recProjName } = projRec;
      return {
        id: $id.value,
        projName: recProjName.value,
      };
    }),
  });

  useEffect(() => {
    if (newOptions?.length) {
      setOptions(newOptions);
    }
  }, [newOptions]);
  

  const {
    projName,
    isLoading = false,
    disabled = false,
    label,
    handleChange,
  } = props;


  useEffect(()=>{
    if (!field.value) {
      setFieldVal(null);
    } else if (options.length === 0 && !!projName) {
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    } else if (options.length === 1) {
      setFieldVal(options[0]);
    }

    /* When projId is already available, make it the sole option  */
    if (options.length === 0 && projName) {
  
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, options, projName]);

  return (
    <Autocomplete
      disabled={disabled}
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
        if (!touched) helpers.setTouched(true);

      }}
      onBlur={()=>{
        if (!touched) helpers.setTouched(true);
      }}
      onChange={(_, val)=>{
        helpers.setValue(val?.id);
        setFieldVal(val);
        handleChange?.();
      }}
      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          name={field.name}
          label={label}
          error={Boolean(error && touched)}
          helperText={error && touched ? error : ''}
          InputProps={isLoading ?  { endAdornment: <CircularProgress size={20} /> } : params.InputProps}
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.id}`} />
            </Stack>
          </li>
        );
      }}

    />
  );
};