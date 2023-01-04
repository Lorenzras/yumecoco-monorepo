import { TextField } from 'kokoas-client/src/components/reactHookForm';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../form';

import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { UseSmartHandlers } from '../../hooks/useSmartHandlers';
import { CostPrice } from '../estimate/rowFields/CostPrice';
import { ProfitRate } from '../estimate/rowFields/ProfitRate';
import { QuantityField } from '../estimate/rowFields/QuantityField';
import { RowUnitPriceAfterTax } from '../estimate/rowFields/RowUnitPriceAfterTax';
import { TaxType } from '../estimate/rowFields/TaxType';
import { UnitPrice } from '../estimate/rowFields/UnitPrice';
import Grid from '@mui/material/Unstable_Grid2'; 
import { Stack } from '@mui/material';

export const EstRow = ({
  rowIdx,
  smartHandlers,
}: {
  rowIdx: number,
  id: string,
  isAtBottom: boolean,
  isVisible: boolean,
  smartHandlers: UseSmartHandlers
}) => {

  const { control } = useFormContext<TypeOfForm>();
  const {
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeTaxType,
    handleChangeUnitPrice,
    handleChangeRowUnitPriceAfterTax,
  } = smartHandlers;

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  } = useMaterialsOptions({ rowIdx, control });

  return (
    <Grid container columns={24}>
      <Grid xs={4}>
        <Stack spacing={1}>
          <Autocomplete
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'majorItem'),
              control,
            }}
            autoCompleteProps={{
              options : majorItemOpts,
              freeSolo: false,

            }}
          />
          <Autocomplete
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'middleItem'),
              control,
            }}
            autoCompleteProps={{
              options : middleItemOpts,
              freeSolo: false,
            }}
          />
        </Stack>
      </Grid>
      <Grid xs={3}>
        <Stack spacing={1}>

          <Autocomplete
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'material'),
              control,
            }}
            autoCompleteProps={{
              options : materialOpts,
              freeSolo: true,
            }}
          />
          <TextField
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'materialDetails'),
              control,
            }}
            textFieldProps={{
              size: 'small',
              multiline: true,
              rows: 1,
            }}
          />
        </Stack>
      </Grid>
      <Grid xs={3}>
        <CostPrice rowIdx={rowIdx} handleChange={handleChangeCostPrice}  />
      </Grid>
      <Grid xs={3}>
        <QuantityField rowIdx={rowIdx} handleChange={handleChangeQuantity} />
      </Grid>
      <Grid xs={2}>
        <ProfitRate rowIdx={rowIdx} handleChange={handleChangeProfitRate} />
      </Grid>
      <Grid xs={3}>
        <TaxType rowIdx={rowIdx} handleChange={handleChangeTaxType} />
      </Grid>
      <Grid xs={3}>
        <UnitPrice rowIdx={rowIdx} handleChange={handleChangeUnitPrice} />
      </Grid>
      <Grid xs={3}>
        <RowUnitPriceAfterTax rowIdx={rowIdx} handleChange={handleChangeRowUnitPriceAfterTax} />
      </Grid>
    </Grid>
  );

};