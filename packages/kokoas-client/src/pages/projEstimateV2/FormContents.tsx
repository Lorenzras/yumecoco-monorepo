import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import { 
  TextField, 
  PercentField, 
} from 'kokoas-client/src/components/reactHookForm';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { MismatchedProfit } from './fields/MismatchedProfit';
import { StatusSelect } from './fields/StatusSelect';
import { TypeOfForm } from './form';
import { EstimateTableLabel } from './staticComponents/EstimateTableLabel';
import { EstTable } from './tables/estimate/EstTable';
import { EstTBody } from './tables/estimate/EstTBody';



export const FormContents = (formReturn : UseFormReturn<TypeOfForm>) => {

  const {
    control,
  } = formReturn;


  const [
    projId, 
    projTypeProfit, 
    projTypeProfitLatest,
    envStatus,
    
  ] = useWatch({
    control,
    name: [
      'projId', 
      'projTypeProfit', 
      'projTypeProfitLatest', 
      'envStatus',
    ],
  });

  const disabled = !!envStatus;

  if (projId) {
    return (
      <>
        <Grid item xs={12} md={3}>
          <TextField 
            controllerProps={{
              name: 'projTypeName',
              control,
            }}
            textFieldProps={{
              label: '工事種別名',
              disabled: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>

          <PercentField
            controllerProps={{
              name: 'projTypeProfit',
              control: control,
            }}
            textFieldProps={{
              label: '利益率',
              disabled: projTypeProfitLatest !== 0 || disabled,
            }}
          />

          {!!projTypeProfitLatest 
          && projTypeProfitLatest !== 0 
          && +(projTypeProfit ?? 0) !== +projTypeProfitLatest 
          && !disabled && <MismatchedProfit {...formReturn} />}

        </Grid>
        <Grid item xs={12} md={3}>
          <PercentField
            controllerProps={{
              name: 'taxRate',
              control: control,
            }}
            textFieldProps={{
              label: '利益率',
              disabled,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatusSelect control={control} disabled={disabled} />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label={<EstimateTableLabel />} />
        </Grid>

        <Grid item xs={12} md={12}>
          {/* 見積もり内訳のテーブル */}
          <EstTable 
            tableBody={(
              <EstTBody 
                control={control}
                isDisabled={disabled}
              />)}
          />
        </Grid>

      </>
    
    );
  } else {
    return (<div />);
  }

  
};