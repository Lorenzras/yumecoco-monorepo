import { TAgents } from 'types';
import { APPIDS, KintoneRecord } from '../../../../../../../api/kintone';
import { getUserCodesByIds } from '../../../../../../../api/kintone/users/GET';
import { MemoFormType } from '../form';

const getAgentIds = async (recordId: string, agentTypes: TAgents[] = [] ) => {
  console.log('agentTypes', agentTypes);

  return KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: recordId,
  })
    .then(resp => {
      const { agents } = resp.record as unknown as ProjectDetails.SavedData;
      console.log(agents);
      return agents.value
        .filter(item => agentTypes.includes(item.value.agentType.value as TAgents || agentTypes.length === 0))
        .map(item => item.value.agentId.value);
    });
};

const formDataToKintone = async (params: MemoFormType) : Promise<Partial<CustomerMemoTypes.SavedData>> => {
  const {  memoType, contents, recordId, isNotify, notifyTo } = params;

  const commonFields = {
    memoType: { value: memoType },
    contents: { value: contents },
    recordId: { value: recordId },
  };

  if (isNotify) {
    const agentIds = await getAgentIds(recordId, notifyTo);
    const agentUserCodes = await getUserCodesByIds(agentIds);
    return { ...commonFields, notifyTo: { value: agentUserCodes } };
  }



  return commonFields;
};

export const saveMemo = async (params: MemoFormType) => {

  if (params.memoId) {
    /* Update Record */
    return KintoneRecord.updateRecord({
      app: APPIDS.custMemo,
      id: params.memoId,
      record: await formDataToKintone(params),
    });
  }

  /* Add record */
  return KintoneRecord.addRecord({
    app: APPIDS.custMemo,
    record: await formDataToKintone(params),
  });
};