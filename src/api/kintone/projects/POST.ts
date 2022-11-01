import { ProjectDetailsValues } from '../../../pages/projRegister/form';
import { APPIDS, KintoneRecord } from '../config';

export const convertToKintone = (rawValues: ProjectDetailsValues) => {
  return Object.entries(rawValues)
    .reduce((acc, [key, rawVal])=>{
      /*
        To simulate boolean, I set field type in kintone to number.
        This requires it to be converted to number when saving.
      */
      const resolveVal = typeof rawVal === 'boolean' ? +rawVal : rawVal;
      return { ...acc, [key]: { value: resolveVal } };
    }, {});

};

/**
 * Upserts records
 *
 * @param rawValues
 * @returns
 */
export const saveConstructionData = async (rawValues: ProjectDetailsValues) : Promise<{
  id: string,
  revision: string,
}> =>{
  const { custGroupId } = rawValues;
  const record = convertToKintone(rawValues);

  if (custGroupId) {
    return KintoneRecord.updateRecord({
      app: APPIDS.constructionDetails,
      id: custGroupId as string,
      record,
    })
      .then((result) => ({
        id: custGroupId.toString(),
        revision: result.revision,
      }));
  } else {
    return KintoneRecord.addRecord({ app: APPIDS.constructionDetails, record })
      .catch(err => {
        console.log(err.errors);
        throw new Error('err');
      });
  }

};