import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { useWatch } from 'react-hook-form';
import { estArrayFieldName, Item } from '../../form';
import { useRowValues } from '../../hooks/useRowValues';
import isEqual from 'lodash/isEqual';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useLazyEffect } from 'kokoas-client/src/hooks';



export const EstTableActions = ({
  rowsCount,
  handleAppendItem,
}: UseManipulateItemRows) => {

  const {
    getNewRow,
  } = useRowValues();


  const lastRowName = `${estArrayFieldName}.${rowsCount - 1}`;

  const lastRow: Item = useWatch({
    name: lastRowName as 'items.0.test',
  });

  /** 自動行追加 */
  useLazyEffect(() => {
    const { unitPrice: _unitPrice, ...otherLastRow } = lastRow;
    const { unitPrice: _unitPriceNew, ...otherNewRow } = getNewRow();

    // disabledの場合、値はundefinedになるので、比較せず行追加もしない
    // 参考：https://react-hook-form.com/api/useform/register
    if (_unitPrice === undefined) return;

    const equal = isEqual(otherLastRow, otherNewRow);
    if (!equal) {
      handleAppendItem();
    }
  }, [lastRow, getNewRow, handleAppendItem], 500);

  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <HotKeyTooltip title='insert'>
        <Button
          variant="contained"
          color="success"
          //disabled={!!envStatus}
          startIcon={<AddIcon />}
          onClick={handleAppendItem}
        >
          行追加
        </Button>
      </HotKeyTooltip>
    </Stack>
  );
};