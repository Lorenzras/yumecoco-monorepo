import { ErrorDetails } from 'docusign-esign';
import { ISendEnvelopeResponse, ReqSendContract } from 'types';
import { baseUrl } from '../../config/settings';

export const sendContract = async (
  reqData: ReqSendContract,
) : Promise<ISendEnvelopeResponse> => {


  const {
    projEstimateId,
  } = reqData;

  try {

    if (!projEstimateId) throw new Error('見積番号は設定されていません。');
    /**
     * TODO: Endpoints need stronger typing. (Endpointはより安全な型定義が必要)
     *
     * The number of endpoints in our server are expected to increase or change,
     * so we will need to make an SDK for easier maintenance.
     *  */
    const endpoint = `${baseUrl}/docusign/contract/send/direct`;

    const [body, status] = await kintone.proxy(
      endpoint,
      'POST',
      { 'Content-Type': 'application/json' },
      reqData,
    );

    if (status == 200 && body) {
      return JSON.parse(body);
    } else {
      const error: ErrorDetails =  JSON.parse(body);
      throw new Error(`${status} ${error.message}`);
    }


  } catch (err) {
    throw new Error(`${err.message}`);
  }


};
