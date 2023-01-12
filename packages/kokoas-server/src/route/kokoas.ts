import express, { Router as router } from 'express';
import { reqUploadDaikokuEst } from '../handleRequest/reqUploadDaikokuEst';
import { KokoasApiNodes } from 'types';


const route = router();

const uploadDaikokuNode : KokoasApiNodes = 'uploadDaikokuEst';

route.post(`/${uploadDaikokuNode}/:projId?`, express.raw({ type: '*/*', limit: '50mb' }), reqUploadDaikokuEst);

// "テスト"
route.get('/',  (req, res)=>{
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;