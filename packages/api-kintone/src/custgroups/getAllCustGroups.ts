import { KCustgroups } from 'types';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getAllCustGroups = async ({
  query,
  orderBy,
} :{
  query?: string,
  orderBy: [KCustgroups, 'desc' | 'asc']
}) => {
  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: query,
    orderBy: orderBy.join(' '),
    withCursor: false,
  }).then(rec => rec as unknown as RecordType[]);
};