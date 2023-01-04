/* Update values based on edited fields */

import { calculateEstimateRow } from 'api-kintone';
import { roundTo } from 'libs';
import debounce from 'lodash/debounce';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { calculateSummary } from '../api/calculateSummary';
import { getItemsFieldName, TypeOfForm } from '../form';

export type UseSmartHandlers =  ReturnType<typeof useSmartHandlers>;

export const useSmartHandlers = () => {
  const { setValue, getValues } = useFormContext<TypeOfForm>();

  /******************
  * 合計欄の更新 */
  const handleUpdateSummary = useMemo(
    () =>debounce(()=>{
      const items = getValues('items');
      const {
        totalCostPrice,
        totalAmountAfterTax,
        totalAmountBeforeTax,
      } = calculateSummary(items);

      setValue('totalCostPrice', totalCostPrice);
      setValue('totalAmountBeforeTax', totalAmountBeforeTax);
      setValue('totalAmountAfterTax', totalAmountAfterTax);

    }, 500),
    [getValues, setValue],
  );

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
      rowUnitPriceBeforeTax,
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
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

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
      rowUnitPriceBeforeTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

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
      rowUnitPriceBeforeTax,
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
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

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
      rowUnitPriceBeforeTax,
    } = calculateEstimateRow({
      rowUnitPriceAfterTax,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

  return {
    handleUpdateSummary,
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeTaxType,
    handleChangeUnitPrice,
    handleChangeRowUnitPriceAfterTax,
  };
};