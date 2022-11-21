import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getEstimates = async (
  params?: Omit<Parameters<typeof getRecords>[0], 'app'>,
) => getRecords<RecordType>({
  ...params,
  app: appId,
});
