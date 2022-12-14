

import { IconButton, SxProps, TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { getItemFieldName, TypeOfForm } from '../form';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { QtRowAddDelete, QtRowMove } from './rowActions';
import { CostPriceField } from './rowFields/CostPriceField';
import { QuantityField } from './rowFields/QuantityField';
import { ProfitRateField } from './rowFields/ProfitRateField';
import { TaxTypeField } from './rowFields/TaxTypeField';
import { UnitPriceField } from './rowFields/UnitPriceField';
import { RowUnitPriceAfterTax } from './rowFields/RowUnitPriceAfterTax';
import { FormikTextFieldV2 } from 'kokoas-client/src/components';
import { MouseEvent, useMemo } from 'react';
import { isEven } from 'libs';
import { grey } from '@mui/material/colors';
import { useAdvancedTableRow } from '../hooks/useAdvancedTableRow';
import { TblCellStack } from '../fieldComponents/TblCellStack';
import { useQuoteTRowHotKeys } from '../hooks/useQuoteTRowHotKeys';
import { headers } from './QuoteTableHead';

export const QuoteTableRow = (
  {
    rowIdx,
    arrayHelpers,
    envStatus,
    handleOpenUnitMenu,
  }: {
    rowIdx: number,
    arrayHelpers: FieldArrayRenderProps,
    envStatus: string,
    handleOpenUnitMenu: (e: MouseEvent<HTMLButtonElement>) => void
  }) => {

  const { values: { items } } = useFormikContext<TypeOfForm>();
  const { costPrice, unit, key } = items[rowIdx];

  const { focused, handleFocus } = useAdvancedTableRow(rowIdx);

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx);


  const rowMainRef = useQuoteTRowHotKeys(rowIdx);
  const rowSubRef = useQuoteTRowHotKeys(rowIdx);

  const isLastRow = rowIdx === items.length - 1;
  const isDisabled = !!envStatus;
  const isAlternateRow = isEven(rowIdx);

  const rowSx: SxProps = useMemo(() => ({
    background:  isAlternateRow ? grey[100] : 'white',
    opacity: isLastRow && !focused ? 0.5 : 1,
  }), [isAlternateRow, isLastRow, focused]);

  return (
    <>
      <TableRow
        id={key}
        ref={rowMainRef}
        component={'tr'}
        onFocus={handleFocus}
        onBlur={handleFocus}
        sx={rowSx}
      >

        <TableCell
          rowSpan={2}
          width={headers[0].width}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          {!isDisabled && !isLastRow && (
            <QtRowMove rowIdx={rowIdx} arrayHelpers={arrayHelpers} />
          )}
        </TableCell>

        <TblCellStack
          rowSpan={2}
          width={headers[1].width}
        >
          <FormikAutocomplete
            tabIndex={1}
            name={getItemFieldName(rowIdx, 'majorItem')}
            handleChange={handleMajorItemChange}
            freeSolo={false}
            options={majorItemOpts}
            disabled={isDisabled}
          />
          <FormikAutocomplete
            name={getItemFieldName(rowIdx, 'middleItem')}
            handleChange={handleMiddleItemChange}
            freeSolo={false}
            options={middleItemOpts}
            disabled={isDisabled}
          />
        </TblCellStack>

        <TblCellStack
          rowSpan={2}
          width={headers[2].width}
        >
          <FormikAutocomplete
            name={getItemFieldName(rowIdx, 'material')}
            handleChange={handleMaterialChange}
            options={materialOpts}
            disabled={isDisabled}
          />
          <FormikTextFieldV2
            disabled={isDisabled}
            name={getItemFieldName(rowIdx, 'materialDetails')}
            size={'small'}
            multiline
            placeholder='????????????'
          />
        </TblCellStack>

        <TableCell
          width={headers[3].width}
          align='right'
        >
          {/* ?????? */}
          <CostPriceField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell
          width={headers[4].width}
          align='right'
        >
          {/* ?????? */}
          <QuantityField
            rowIdx={rowIdx}
            isDisabled={isDisabled}
            unitMenuButton={(
              <IconButton
                size='small'
                name={getItemFieldName(rowIdx, 'unit')}
                onClick={handleOpenUnitMenu}
                sx={{ fontSize: '12px' }}
              >
                {unit}
              </IconButton>
            )}
          />
        </TableCell>

        <TableCell
          width={headers[5].width}
          align='right'
        >
          {/* ????????? */}
          <ProfitRateField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell
          width={headers[6].width}
        >
          {/* ??? */}
          <TaxTypeField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell
          width={headers[7].width}
        >
          {/* ?????? */}
          <UnitPriceField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell
          width={headers[8].width}
        >
          {/* ?????? */}
          <RowUnitPriceAfterTax rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={headers[9].width}>
          {!isDisabled && !isLastRow &&
          <QtRowAddDelete
            rowIdx={rowIdx}
            arrayHelpers={arrayHelpers}
          />}
        </TableCell>

      </TableRow>
      <TableRow
        ref={rowSubRef}
        onFocus={handleFocus}
        onBlur={handleFocus}
        sx={rowSx}
      >
        <TableCell colSpan={2} />
        <TableCell colSpan={4}>
          <FormikTextFieldV2
            disabled={isDisabled}
            name={getItemFieldName(rowIdx, 'rowDetails')}
            size={'small'}
            multiline
            placeholder='??????'
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};