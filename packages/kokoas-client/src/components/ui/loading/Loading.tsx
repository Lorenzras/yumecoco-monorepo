import { Stack, Typography } from '@mui/material';
import { externalAssets } from 'kokoas-client/src/assets/externalLinks';


export const Loading = () => {
  return  (
    <Stack
      justifyContent={'center'}
      spacing={2}
      alignItems={'center'}
    >
      <div>
        <img
          src={externalAssets.loadingConstruction} width={'auto'} height={'300px'}
        />
      </div>
      <Typography>
        読み込み中...
      </Typography>

    </Stack>


  );
};