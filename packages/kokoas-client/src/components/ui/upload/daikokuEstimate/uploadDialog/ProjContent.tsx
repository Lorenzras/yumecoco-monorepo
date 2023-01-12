import { Stack, Zoom } from '@mui/material';
import { formatDataId } from 'libs';
import { IProjects } from 'types';
import { LabeledInfo } from '../../../typographies';

export const ProjContent = (
  {
    data,
  }: {
    data?: IProjects
  }) => {

  const {
    dataId,
    store,

  } = data || {};


  return (
    <Zoom in={!!data}>
      <Stack minHeight={150} width={'100%'}>
        <LabeledInfo label='工事番号' info={formatDataId(dataId?.value)} direction={'row'} />
        <LabeledInfo label='店舗' info={store?.value} direction={'row'} />
      </Stack>
    </Zoom>

  );

};