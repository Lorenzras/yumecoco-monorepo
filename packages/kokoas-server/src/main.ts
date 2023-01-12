import { loadEnv } from 'libs';
import express from 'express';
import docusignSend from './route/docusign';
import kokoas from './route/kokoas';
import { ApiNodes } from 'types';


loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res )=>{
  res.send('YEHEY');
});

const docusignApiRoot : ApiNodes = 'docusign';
const kokoasApiRoot : ApiNodes = 'kokoas';

app.use(`/${docusignApiRoot}`, docusignSend);
app.use(`/${kokoasApiRoot}`, kokoas);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
