import { Autocomplete, TextField, Stack } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { Caption } from '../../../components/ui/typographies';
import { searchProjects } from '../../../api/kintone/projects';

type Opt = {
  id: string,
  projName: string
};

export const SearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  disabled?: boolean,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

  const {
    projName,
    label,
  } = props;

  useLazyEffect(()=>{
    if (!inputVal) return;
    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map(({
          $id,
          projName: recProjName,
        })=>{
          return { id: $id.value, projName: recProjName.value };
        }));

      });

  }, [inputVal], 1000);

  useEffect(()=>{

    if (options.length === 0 && projName) {
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, projName]);

  return (
    <Autocomplete
      //disabled={disabled}
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      onChange={(_, val)=>{
        helpers.setValue(val?.id);
        setFieldVal(val);

      }}
      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      renderInput={(params) => (<TextField
        {...params}
        name={field.name}
        label={label}
        error={Boolean(error && touched)}
        helperText={error ? error : ''}
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