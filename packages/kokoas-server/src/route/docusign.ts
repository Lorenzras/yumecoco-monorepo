
import { Router as router } from 'express';
import bodyParser from 'body-parser';
import {
  reqSendContractDirect } from '../handleRequest/reqSendContractDirect';
import { reqDownloadContract } from '../handleRequest/reqDownloadContract';
import { handleTriggers } from '../handleRequest/webhookDocusign/handleTriggers';
import { reqVoidEnvelope } from '../handleRequest/reqVoidEnvelope';
import { reqGetSenderView } from '../handleRequest/reqGetSenderView';
import { reqResendContract } from '../handleRequest/reqResendContract';


const route = router();
route.use(bodyParser.json({ limit: '50mb' }));
// body parser error catcher
route.use((err: any, _: any, res: any, next: any) => {
  if (err) {
    res.status(400).send('error parsing data');
  } else {
    next();
  }
});
route.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));



route.post('/webhook', handleTriggers );

route.post('/contract/void', reqVoidEnvelope);

route.post('/contract/send/direct', reqSendContractDirect);

route.post('/contract/resend', reqResendContract);

route.post('/contract/senderViewUrl', reqGetSenderView);

route.get('/contract/download', reqDownloadContract);

route.get('/test', (req, res)=>{
  console.log('Connection test is success');
  res.send('SUCCESS');
});


export default route;
