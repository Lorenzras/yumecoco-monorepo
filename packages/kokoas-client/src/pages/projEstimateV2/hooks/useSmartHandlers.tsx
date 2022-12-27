/* Update values based on edited fields */

import { calculateEstimateRow } from 'api-kintone';
import { roundTo } from 'libs';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../form';

export type UseSmartHandlers =  ReturnType<typeof useSmartHandlers>;
export const useSmartHandlers = () => {
  const { setValue, getValues } = useFormContext<TypeOfForm>();

  /***************
   * 原価の変更 */
  const handleChangeCostPrice = useCallback((rowIdx: number ) => {
    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));
    const costPrice = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'costPrice'));

    const {
      rowCostPrice,
      unitPrice,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.rowCostPrice'>(rowIdx, 'rowCostPrice'), rowCostPrice);
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  }, [getValues, setValue]);

  /***************
   * 数量の変更 */
  const handleChangeQuantity = useCallback(handleChangeCostPrice, [handleChangeCostPrice]);

  /*****************
   * 利益率の変更 */
  const handleChangeProfitRate = useCallback((rowIdx: number) => {
    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      unitPrice,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  }, [getValues, setValue]);

  /************************
   * 非課税・課税の変更 */
  const handleChangeTaxType = useCallback(handleChangeProfitRate, [handleChangeProfitRate]);

  /****************
   * 単価の変更 */
  const handleChangeUnitPrice = useCallback((rowIdx: number) => {
    const unitPrice = getValues(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'));
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));
    const {
      rowUnitPriceAfterTax,
      profitRate,
    } = calculateEstimateRow({
      unitPrice,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

  }, [getValues, setValue]);

  /************************
   * 金額（税込み）の変更 */
  const handleChangeRowUnitPriceAfterTax = useCallback((rowIdx: number)=>{
    const rowUnitPriceAfterTax = getValues(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'));
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      unitPrice,
      profitRate,
    } = calculateEstimateRow({
      rowUnitPriceAfterTax,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);

  }, [getValues, setValue]);

  return {
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeTaxType,
    handleChangeUnitPrice,
    handleChangeRowUnitPriceAfterTax,
  };
};