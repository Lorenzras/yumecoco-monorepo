import { TableCell, TableRow } from '@mui/material';
import { TextField } from 'kokoas-client/src/components/reactHookForm';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { TblCellStack } from 'kokoas-client/src/pages/projEstimate/fieldComponents/TblCellStack';
import {  useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../form';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { headers } from './EstTHead';
import { EstRowManipulate } from './rowActions/EstRowManipulate';
import { EstRowMove } from './rowActions/EstRowMove';
import { CostPrice } from './rowFields/CostPrice';
import { QuantityField } from './rowFields/QuantityField';
import { TaxType } from './rowFields/TaxType';
import { ProfitRate } from './rowFields/ProfitRate';
import { UnitPrice } from './rowFields/UnitPrice';
import { RowUnitPriceAfterTax } from './rowFields/RowUnitPriceAfterTax';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';
import { useEstTRowHotKeys } from '../../hooks/useEstTRowHotKeys';


export const EstTRow = ({
  rowIdx,
  id,
  isVisible,
  isAtBottom,
  rowsLength,
  ...rowMethods
}: UseManipulateItemRows & {
  rowIdx: number,
  id: string,
  isAtBottom: boolean,
  isVisible: boolean,
  rowsLength: number,
}) => {

  const { control } = useFormContext<TypeOfForm>();
  const {
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeTaxType,
    handleChangeUnitPrice,
    handleChangeRowUnitPriceAfterTax,
  } = useSmartHandlers();

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  } = useMaterialsOptions({ rowIdx, control });

  const rowMainRef = useEstTRowHotKeys({
    rowIdx,
    isLastRow: isAtBottom,
    ...rowMethods,
  });
  const rowSubRef = useEstTRowHotKeys({
    rowIdx,
    isLastRow: isAtBottom,
    ...rowMethods,
  });

  return (
    <>
      <TableRow id={id} ref={rowMainRef}>
        <TableCell
          className={'action'}
          rowSpan={2}
          width={headers[0].width}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          <EstRowMove
            {...rowMethods}
            isAtBottom={isAtBottom}
            isVisible={isVisible}
            rowIdx={rowIdx}
            rowLength={rowsLength}

          />
        </TableCell>
        <TblCellStack
          rowSpan={2}
          width={headers[1].width}
        >
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
        </TblCellStack>
        <TblCellStack
          rowSpan={2}
          width={headers[2].width}
        >
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
            }}
          />
        </TblCellStack>
        <TableCell
          width={headers[3].width}
          align='right'
        >
          {/* 原価 */}
          <CostPrice rowIdx={rowIdx} handleChange={handleChangeCostPrice}  />
        </TableCell>
        <TableCell
          width={headers[4].width}
          align='right'
        >
          {/* 数量 */}
          <QuantityField rowIdx={rowIdx} handleChange={handleChangeQuantity} />
        </TableCell>
        <TableCell
          width={headers[5].width}
          align='right'
        >
          {/* 利益率 */}
          <ProfitRate rowIdx={rowIdx} handleChange={handleChangeProfitRate} />
        </TableCell>

        <TableCell
          width={headers[6].width}
        >
          {/* 税 */}
          <TaxType rowIdx={rowIdx} handleChange={handleChangeTaxType} />
        </TableCell>

        <TableCell
          width={headers[7].width}
        >
          {/* 単価 */}
          <UnitPrice rowIdx={rowIdx} handleChange={handleChangeUnitPrice} />
        </TableCell>
        <TableCell
          width={headers[8].width}
        >
          {/* 金額 */}
          <RowUnitPriceAfterTax rowIdx={rowIdx} handleChange={handleChangeRowUnitPriceAfterTax} />
        </TableCell>

        <TableCell width={headers[9].width} className={'action'}>
          <EstRowManipulate rowIdx={rowIdx} {...rowMethods} />
        </TableCell>

      </TableRow>
      <TableRow ref={rowSubRef}>
        <TableCell colSpan={2} />
        <TableCell colSpan={4}>
          <TextField
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'rowDetails'),
              control,
            }}
            textFieldProps={{
              size: 'small',
            }}
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};