import { Box, Stack } from '@mui/material';
import { OtherMenu } from './otherMenu/OtherMenu';
import { SystemUpdate } from './sections/systemUpdate/SystemUpdate';

export const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack
          spacing={2}
        >
          <SystemUpdate />
        </Stack>
      </Box>

      <OtherMenu />
    </Box>

  );
};