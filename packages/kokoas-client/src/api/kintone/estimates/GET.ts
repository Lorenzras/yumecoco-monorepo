import { APPIDS, KintoneRecord } from '../config';
import { getProjEstimateKeys } from './getType';

/** @deprecated ファイル構成ルール変更によります。./getEstimatesByProjId に変更してください */
export const fetchEstimatesByProjId =  async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const result = await KintoneRecord.getRecords({
    app: APPIDS.projectEstimate,
    query: `${getProjEstimateKeys('projId')} = "${projId}"`,
  });

  return result.records as unknown as Estimates.main.SavedData[];
};


/** @deprecated ファイル構成ルール変更によります。./getEstimatesById に変更してください */
export const fetchEstimatesById = async (projEstimateId: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
  });

  return result.record as unknown as Estimates.main.SavedData ;
};