import { calculateEstimate } from './calculateEstimate';
import { RecordType } from './config';


export const calculateEstimateRecord = (estimateRecord: RecordType) => {
  const {
    内訳: { value: estimateTable },
    税: { value: tax },
    uuid: { value: uuid },
  } = estimateRecord;

  const result = calculateEstimate({
    tax: +tax,
    uuid: uuid,
    materials: estimateTable.map(({ value: {
      原価: { value: costPrice },
      数量: { value: quantity },
      taxType: { value: taxType },
      部材利益率: { value: materialProfit },
    } }) => {
      return {
        costPrice: +costPrice,
        quantity: +quantity,
        isTaxable: taxType === '課税',
        materialProfit: +materialProfit,
      };
    }),
  });

  return result;

};