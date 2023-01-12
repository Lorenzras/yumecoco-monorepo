import { Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { FormikLabeledCheckBox } from '../../../components/ui/checkboxes';
import { FormikJADatePicker } from '../../../components/ui/datetimepickers';
import { getFieldName } from '../form';

/**
 * 支払い予定日コンポーネント
 * @returns 
 */
export const PlannedPaymentDate = () => {
  const [pendingChk, setPendingChk] = useState(false);

  const chkHandler = () => {
    setPendingChk((prev) => !prev);
  };

  return (
    <Stack direction={'row'} spacing={2} alignItems={'end'}>
      <Grid item xs={12} md={7}>
        <FormikJADatePicker
          label='入金予定日'
          name={getFieldName('plannedPaymentDate')}
          disabled={pendingChk}
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <FormikLabeledCheckBox
          name={getFieldName('undecidedPaymentDate')}
          label='未定'
          checked={pendingChk}
          onClick={chkHandler}
        />
      </Grid>
    </Stack>
  );
};