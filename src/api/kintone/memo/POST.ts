import { KintoneRecord } from '../config';
import { RecordParam } from '../types/restapi';
import { APP_ID } from './config';




export const addMemo = (record:  Partial<CustomerMemoTypes.SavedData>  ) => {
  /* record is forced type, will fix this later 2022.02.21  */
  return KintoneRecord.addRecord({ app: APP_ID, record: record as unknown as RecordParam });
};