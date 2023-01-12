import axios from 'axios';
import { baseUrl } from '../../../../config/settings';

describe('sendContract', () => {
  it('should send contract', async () => {
    const endpoint = `${baseUrl}/docusign/contract/senderViewUrl`;

    const result = await axios.post(endpoint, {
      envelopeId: '136706d3-31d1-4f21-ab43-ccbc4f9fdeed',
      returnUrl: 'https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/contract/preview?projId=110',

    });

    expect(result).toMatchSnapshot();
  });
});