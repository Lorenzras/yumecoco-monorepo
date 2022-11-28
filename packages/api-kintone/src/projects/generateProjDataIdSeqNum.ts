import { format } from 'date-fns';
import { zeroPad } from 'libs';
import { KProjects } from 'types';
import { getRecords } from '../common';
import { appId, dataIdpadding, dataIdPrefix, RecordType } from './config';


/**
 *
 * 連番を生成する
 *
 * @params Prefix of dataId. E.g. KKB
 * @returns partial dataId. E.g C22-00039
 */
export const generateProjDataIdSeqNum = async (prefix: string) => {

  let sequenceNumber = 1;

  const year = format(new Date(), 'yy');
  const partialDataId = `${dataIdPrefix}${year}`;
  const fields : KProjects[] = ['uuid', 'dataId', 'projName'];
  const dataIdField : KProjects = 'dataId';
  const query = `${dataIdField} like "${partialDataId}" order by 作成日時 desc limit 1`;

  const { records } = await getRecords<RecordType>({
    app: appId,
    fields,
    query,
    totalCount: false,
  });

  if (records.length) {
    sequenceNumber += +(records[0].dataId.value.slice(-dataIdpadding)) ;
  }

  return `${prefix}-${partialDataId}-${zeroPad(sequenceNumber, dataIdpadding)}` ;

};