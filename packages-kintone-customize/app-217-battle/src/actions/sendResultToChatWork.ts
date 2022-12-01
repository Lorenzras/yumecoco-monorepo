import sendMessageToChatWork from '../../../kintone-api/chatwork';
import { KintoneEvent } from '../eventHandlers/onEditOrCreateSubmitSuccessHandler';
import generateMessage from './generateMessage';
/* Room Ids
* 225800073 test
* 213232379 RPA
* 6732051  本番
*/

const cwToken = '';
const roomId = '6732051';

const sendResultToChatWork = (event: KintoneEvent) => {
  const message = generateMessage(event);
  sendMessageToChatWork(message, roomId, cwToken);
};

export default sendResultToChatWork;
