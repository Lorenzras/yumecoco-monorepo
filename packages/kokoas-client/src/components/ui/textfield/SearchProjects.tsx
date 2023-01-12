import { Autocomplete, CircularProgress, Stack, TextField, TextFieldProps } from '@mui/material';
import { useSearchProjects } from 'kokoas-client/src/hooksQuery';
import { formatDataId } from 'libs';
import { ComponentProps, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { Caption } from '../typographies';


type Opt = {
  id: string,
  dataId?: string,
  projName: string
};



export const SearchProjects = (props: Omit<ComponentProps<typeof Autocomplete<Opt>>, 'renderInput' | 'options'> & {
  label: string,
  name?: string
  inputProps?: TextFieldProps,

}) => {

  const {
    label,
    name,
    value,
    inputProps,
    fullWidth = true,
    onChange,
    onInputChange,
    ...autoCompleteProps
  } = props;

  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<typeof value>(value);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const debouncedInput = useDebounce(inputVal, 1000);

  const {
    data: recProjects = [],
    isFetching,
  } = useSearchProjects(debouncedInput);

  useEffect(() => {

    if (recProjects?.length) {
      const newOptions = recProjects
        ?.map<Opt>((rec) => ({
        id: rec.uuid.value,
        dataId: formatDataId(rec.dataId.value),
        projName: rec.projName.value,
      }));
      setOptions(newOptions);
    }
  }, [recProjects]);

  return (
    <Autocomplete
      {...autoCompleteProps}
      fullWidth={fullWidth}
      value={value ?? fieldVal ?? null}
      options={options}
      onInputChange={onInputChange ? onInputChange : (_, val) => {
        setInputVal(val);
      }}
      onChange={(e, val, reason)=>{
        setFieldVal(val);
        onChange?.(e, val, reason);
      }}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, v) => opt.id === v.id}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          label={label}
          name={name}
          fullWidth
          InputProps={isFetching ?  { endAdornment: <CircularProgress size={20} /> } : params.InputProps}
          placeholder="山田　タロウ"
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.dataId}`} />
            </Stack>
          </li>
        );
      }}

    />
  );

};