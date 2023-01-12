import { baseUrl } from 'kokoas-client/src/config/settings';
import { ApiNodes, KokoasApiNodes, ParsedDaikokuEst } from 'types';
import { externalApiUpload } from '../@proxy/externalApiUpload';

export const uploadDaikokuEst = async (
  {
    projId,
    fileBlob,
  } :{
    projId: string,
    fileBlob: Blob,
  }) => {
  const apiRoot : ApiNodes = 'kokoas';
  const kokoasApiNode: KokoasApiNodes = 'uploadDaikokuEst';

  const data = {
    format: 'RAW',
    value: fileBlob,
  };

  if (!baseUrl) {
    throw new Error('環境にBase_URLが設定していません。管理者にご連絡ください。');
  }
  const endpoint = [
    baseUrl,
    apiRoot,
    kokoasApiNode,
    projId,
  ].join('/');

  const headers = {
    // Define content type, required by kintone upload
    'Content-Type': 'multipart/form-data; boundary="boundary"; charset=UTF-8',
  };

  const result = await externalApiUpload(
    endpoint,
    'POST',
    headers,
    data,
  );

  return JSON.parse(result) as ParsedDaikokuEst;

};