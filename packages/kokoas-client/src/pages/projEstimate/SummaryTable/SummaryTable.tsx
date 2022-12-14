import { TableBody, TableHead, TableRow } from '@mui/material';
import { summaryNameList } from '../constantDefinition';
import { useSummary } from '../hooks/useSummary';
import { SummaryTableContainer } from './SummaryTableContainer';
import { TabelCellNumber } from './TabelCellNumber';

export default function SummaryTable() {

  const {
    totalCostPrice,
    grossProfitVal,
    grossProfitRate,
    taxAmount,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  } = useSummary();

  return (
    <SummaryTableContainer >
      <TableHead>
        <TableRow sx={{
          '& th': {
            whiteSpace: 'nowrap',
          },
        }}
        >
          {summaryNameList.map((item) => {
            return (
              <TabelCellNumber key={item} >
                {item}
              </TabelCellNumber>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow sx={{
          '& td': {
            whiteSpace: 'nowrap',
          },
        }}
        >
          <TabelCellNumber>
            {Math.round(totalCostPrice).toLocaleString() + '円'}
          </TabelCellNumber>
          <TabelCellNumber>
            {Math.round(grossProfitVal).toLocaleString() + '円'}
          </TabelCellNumber>
          <TabelCellNumber>
            {Math.round(grossProfitRate).toLocaleString() + '%'}
          </TabelCellNumber>
          <TabelCellNumber>
            {Math.round(taxAmount).toLocaleString() + '円'}
          </TabelCellNumber>
          <TabelCellNumber>
            {Math.round(totalAmountBeforeTax).toLocaleString() + '円'}
          </TabelCellNumber>

          {/* 税込金額 */}
          <TabelCellNumber
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {Math.round(totalAmountAfterTax).toLocaleString() + '円'}
          </TabelCellNumber>
        </TableRow>
      </TableBody>
    </SummaryTableContainer>
  );
}