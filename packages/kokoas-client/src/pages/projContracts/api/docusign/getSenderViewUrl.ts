import { baseUrl } from '../../../../config/settings';

/**
 * 送信者のビューのURLを生成
 * Docusignの画面上で契約が編集出来ます。
 *
 * @param params
 * @returns {string} 送信者のプレビューurl
 *
 * @deprecated 要件変更で、必要なくなったんですが、
 * Edge Cases「例外ケース」が出てくると思うので、残しておきます。~ ras 2022.10.20
 *
 */
export const getSenderViewUrl = async (
  params :
  {
    envelopeId: string,
    returnUrl: string,
  },
) : Promise<{
  url: string,
}> => {

  if (!params.envelopeId) throw new Error('Invalid Project Id.');
  const endpoint = `${baseUrl}/docusign/contract/senderViewUrl`;

  const data = params;

  return kintone.proxy(
    endpoint,
    'POST',
    { 'Content-Type': 'application/json' },
    data,
  )
    .then(([body, status]: any[]) => {
      console.log(body);
      console.log(status);
      if (status == 200 && body) {
        return JSON.parse(body) as { url: string };
      }
    });
};
