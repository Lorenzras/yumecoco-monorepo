import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useCallback } from 'react';
import { TypeOfForm } from '../form';
import { useInitialRow } from './useInitialRow';
import { v4 as uuidV4 } from 'uuid';

export const useManipulateItems = (rowIdx: number) => {
  const { setValues } = useFormikContext<TypeOfForm>();

  const {
    getNewRow,
  } = useInitialRow();

  const handleInsertItemBelow = useCallback(() => {
    setValues((prev) => produce(prev, ({ items }) => {
      items.splice(rowIdx + 1, 0, getNewRow());
    }));
  }, [setValues, getNewRow, rowIdx]);

  const handleCopyItemBelow = useCallback(() => {
    setValues((prev) => produce(prev, ({ items }) => {
      const newRow = items[rowIdx];

      items.splice(
        rowIdx + 1, 0,
        {
          ...newRow,
          key: uuidV4(),
        },
      );
    }));
  }, [setValues, rowIdx]);

  const handleRemoveItem = useCallback(() => {
    setValues((prev) => produce(prev, ({ items }) => {
      items.splice(rowIdx, 1);
    }));
  }, [setValues, rowIdx]);

  return {
    handleInsertItemBelow,
    handleCopyItemBelow,
    handleRemoveItem,
  };
};