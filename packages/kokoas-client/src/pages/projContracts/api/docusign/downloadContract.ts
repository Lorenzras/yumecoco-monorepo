import { ReqDownloadParams, TEnvelopeStatus } from 'types';
import { KintoneClient } from '../../../../api/kintone';
import { baseUrl } from '../../../../config/settings';
import { TypeOfForm } from '../../form';

type DownloadResponse = {
  documents?: string[], // Base64
  envelopeStatus?: TEnvelopeStatus,
  error?: string,
};

const dlFromCocoServer = async ({
  form,
  fileType,
} :
{
  form: TypeOfForm,
  fileType: ReqDownloadParams['fileType'],
}) : Promise<string> => {
  try {

    const {
      projEstimateId,
    } = form;

    if (!projEstimateId) throw new Error('見積は存在していません。');
    const endpoint = `${baseUrl}/docusign/contract/download?`;

    const data : ReqDownloadParams = {
      userCode: kintone.getLoginUser().code,
      projEstimateId,
      fileType,
    };

    const u = new URLSearchParams({
      projEstimateId,
      userCode: kintone.getLoginUser().code,
      fileType,
    }).toString();

    const [body, status] =  await kintone.proxy(
      endpoint + u, // concatinate parameters to endpoint
      'GET',
      {},
      data,
    );

    if (status == 200 && body) {
      const dlresp = JSON.parse(body) as DownloadResponse;
      return dlresp.documents?.[0] ?? '' ;
    } else {
      const error: any =  JSON.parse(body);
      console.log(body);
      throw new Error(`${status} ${error.message}`);
    }

  } catch (err :any) {
    throw new Error(err.message);
  }
};

export const dlSingleFileFromKintone = async (fk: string) => {
  const arrayBuffer = await KintoneClient.file.downloadFile({
    fileKey: fk,
  });
  const base64String =  window.btoa(new Uint8Array(arrayBuffer).reduce(
    function (data, byte) {
      return data + String.fromCharCode(byte);
    },
    '',
  ));
  return base64String;
};

export const dlFilesFromKintone = async (
  form: TypeOfForm,
): Promise<DownloadResponse> => {
  const { envDocFileKeys, envelopeStatus } = form;

  try {

    const downloadPromises = envDocFileKeys.map((f)=>dlSingleFileFromKintone(f.fileKey));

    return {
      documents: await Promise.all(downloadPromises),
      envelopeStatus,
    };
  }  catch (err) {
    return {
      error: 'Download files from kintone failed. Please Contact administrator.' + err.message,
    };
  }
};


export const downloadContract = async (
  params :  {
    form: TypeOfForm,
    fileType: 'pdf' | 'xlsx',
  },
) : Promise<string> => {

  const { fileType, form  } = params;
  const { envDocFileKeys } = form;

  if ( fileType === 'xlsx' || !envDocFileKeys.length) {
    return dlFromCocoServer(params);
  } else if (fileType === 'pdf' && envDocFileKeys.length) {
    return dlSingleFileFromKintone(form.envSelectedDoc);
  } else {
    throw new Error('Uknown download action');
  }

};