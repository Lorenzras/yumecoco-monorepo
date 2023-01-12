import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useFormikContext } from 'formik';
import { EmptyBox } from 'kokoas-client/src/components/ui/information/EmptyBox';
import { useContractsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { BillingEntryTableRow } from './BillingEntryTableRow';
import { BillingEntryTableHead } from './BillingEntryTableHead';
import { ExceedContractAmount } from './ExceedContractAmount';

export const BillingEntryTable = () => {

  const { values } = useFormikContext<TypeOfForm>();
  const { custGroupId, estimates } = values;

  const { data: contracts } = useContractsByCustGroupId(custGroupId);

  const filterTable = estimates.filter((estimate) => estimate.isForPayment);

  const exceeded = estimates.some(({ contractAmount, billedAmount, billingAmount, isForPayment }) => {
    return isForPayment && (+contractAmount < (+billedAmount + +billingAmount));
  });

  return (
    <>
      {!filterTable.length &&
        <EmptyBox>
          請求に使用する契約を選択してください
        </EmptyBox>}
      {!!filterTable.length &&
        <TableContainer component={Paper}>
          <Table size="small">
            <BillingEntryTableHead />
            <TableBody>
              {estimates.map((row, idx) => {
                if (!row.isForPayment) return;
                return (
                  <BillingEntryTableRow
                    estimate={row}
                    idx={idx}
                    paymentList={contracts?.paymentList}
                    key={`${row.dataId}_row`}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>}
      {exceeded &&
        <>
          <br />
          <ExceedContractAmount />
        </>}
    </>
  );
};