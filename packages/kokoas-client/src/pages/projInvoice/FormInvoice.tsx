import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName, TypeOfForm } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { PlannedPaymentDate } from './fieldComponents/PlannedPaymentDate';
import { useResolveParams } from './hooks/useResolveParams';
import { SearchCustGroup } from 'kokoas-client/src/components/ui/textfield';
import { useNavigate } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from '../Router';
import { useEffect, useRef } from 'react';
import { useSnackBar } from 'kokoas-client/src/hooks';
import isEmpty from 'lodash/isEmpty';
import { EstimatesTable } from './fieldComponents/EstimatesTable';
import { BillingEntryTable } from './fieldComponents/BillingEntryTable';
import { EmptyBox } from 'kokoas-client/src/components/ui/information/EmptyBox';



export const FormInvoice = () => {
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  const { values, submitForm, setValues, errors, submitCount } = useFormikContext<TypeOfForm>();
  const submitCountRef = useRef(0);

  const {
    custGroupId,
    custName,
    estimates,
  } = values;

  useResolveParams();

  /* useEffect(() => {
    setValues((prev) => ({
      ...prev,
      billingAmount: String(+contractAmount - +billedAmount),
    }));
  }, [contractAmount, billedAmount, setValues]); */

  useEffect(() => {
    const newContractAmount = estimates.reduce((acc, cur) => {
      if (cur.isForPayment) return acc;

      return acc + +cur.contractAmount;
    }, 0);

    setValues((prev) => ({
      ...prev,
      contractAmount: String(newContractAmount),
    }));
  }, [estimates, setValues]);

  useEffect(() => {
    if (!isEmpty(errors) && submitCount !== submitCountRef.current) {
      setSnackState({
        open: true,
        severity: 'error',
        message: '?????????????????????',
      });
    }
    submitCountRef.current = submitCount;
  }, [errors, setSnackState, submitCount, submitCountRef]);



  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='????????????/????????????' />

        {/* ??????????????? */}
        <Grid item xs={12} md={6}>
          <SearchCustGroup
            fullWidth
            value={custGroupId ? {
              id: custGroupId,
              name: custName,
            } : undefined}
            onChange={(_, val) => navigate(`${pages.projInvoice}?${generateParams({ custGroupId: val?.id })}`)}
            inputProps={{
              label: '????????????',
              name: getFieldName('custGroupId'),
            }}
          />
        </Grid>
        <Grid item md={6} />


        {custGroupId &&
          <>
            {/* ???????????????????????????????????? */}
            <Grid item xs={12} md={12}>
              <Typography>
                {'????????????'}
              </Typography>
              <EstimatesTable />
            </Grid>


            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>


            {/* ???????????????(????????????) */}
            <Grid item xs={12} md={12}>
              <Typography>
                {'???????????????'}
              </Typography>
              <BillingEntryTable />
            </Grid>


            {/* ???????????? */}
            <Grid item xs={12} md={12}>
              {/* <BillingAmount
            open={+billingAmount > (+contractAmount - +billedAmount)}
            billingBalance={+contractAmount - +billedAmount - +billingAmount}
          /> */}
            </Grid>


            {/* ??????????????? */}
            <Grid item xs={12} md={6}>
              <PlannedPaymentDate />
            </Grid>
            <Grid item md={6} />


            {/* ???????????????????????? */}
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                onClick={submitForm}
              >
                ???????????????
              </Button>
            </Grid>
            <Grid item md={6} />
          </>}

        {!custGroupId &&
          <Grid item xs={12} md={6}>
            <EmptyBox>
              ?????????????????????????????????
            </EmptyBox>
          </Grid>}

      </MainContainer>
    </Form>
  );
};