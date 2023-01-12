import { Item } from '../form';

export const calculateSummary = (items: Item[]) => {

  const sumOfFields = items.reduce((acc, cur) => {

    acc.totalCostPrice += +cur.rowCostPrice;
    acc.totalAmountAfterTax += +(cur.rowUnitPriceAfterTax ?? 0);
    acc.totalAmountBeforeTax += +(cur.rowUnitPriceBeforeTax ?? 0);
    return acc;
  }, {
    totalCostPrice: 0,
    totalAmountBeforeTax: 0,
    totalAmountAfterTax: 0,
  });

  return {
    ...sumOfFields,
  };

};