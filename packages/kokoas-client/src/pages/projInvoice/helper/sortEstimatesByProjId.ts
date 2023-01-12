import { calculateEstimateRecord } from 'api-kintone';
import { TypeOfForm } from '../form';

/**
 * 工事番号ごとに配列を分割する処理
 * @param estimates 
 */
export const sortEstimatesByProjId = ({
  records,
  calculated,
}: {
  records: DBProjestimates.SavedData[]
  calculated: ReturnType<typeof calculateEstimateRecord>[];
}) => {


  /* データの再構成 */
  const convertedEstimates: TypeOfForm['estimates'] | undefined = records?.map((record, idx) => {

    return {
      estimateIndex: '',
      projId: record.projId.value,
      projTypeName: record.工事種別名.value,
      dataId: record.dataId.value || '',
      contractAmount: String(calculated?.[idx].summary.totalAmountAfterTax),
      billedAmount: '0',
      billingAmount: '0',
      amountType: '',
      isForPayment: !!(+record.isForPayment.value),
      estimateId: record.uuid.value,
    };

  });

  /* 見積もりを枝番号でソートする */
  return convertedEstimates.sort((a, b) => {
    return a.dataId < b.dataId ? -1 : 1;
  });
};