import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { MenuContainer } from './PreviewMenu/MenuContainer';
import { SendContract } from './SendContract';


export const PreviewToolBar = ({
  projId, envelopeStatus, loading,
}: {
  projId: string,
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
}) => {

  return (
    <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
      {!!projId && <DownloadContract projId={projId}/>}

      {envelopeStatus == '' && !loading &&
        <SendContract
          projId={projId}
          isBusy={loading}
        />
      }

      {envelopeStatus != '' && !loading &&
        <MenuContainer/>
      }
    </Stack>
  );
};