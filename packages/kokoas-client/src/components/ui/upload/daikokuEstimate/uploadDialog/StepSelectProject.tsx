import { Chip, Stack, Typography, Zoom } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { green } from '@mui/material/colors';
import { SearchProjects } from '../../../textfield';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { ProjContent } from './ProjContent';
import { NextButton } from './NextButton';

export const StepSelectProject = (
  props: useFileUploadHook & {
    projId?: string,
    handleReset: () => void,
    handleSubmit: (e: Event) => void
  },
) => {
  const navigate = useStableNavigate();
  const {
    fileNames,
    projId,
    handleReset,
    handleSubmit,
  } = props;

  const { data } = useProjById(projId ?? '');

  return (
    <Stack
      spacing={2}
      width={'80%'}
      maxWidth={600}
      alignItems={'center'}
    >
      <Chip
        avatar={<RiFileExcel2Fill color={green[700]} />}
        label={fileNames[0]}
        onDelete={handleReset}
        sx={{
          maxWidth: 200,
        }}
      />
      <Typography>
        添付した見積はどの工事にアップロードしますか？
      </Typography>
      <SearchProjects
        label='工事検索'
        fullWidth
        value={data ? {
          id: data.uuid.value,
          projName: data.projName.value,
          dataId: data.dataId.value,
        } : null}
        onChange={(_, value) => {
          navigate(`?${generateParams({ projId: value?.id })}`);
        }}
      />
      <ProjContent data={data} />
      <Zoom in={!!data}>
        <NextButton
          onClick={(e) => {
            handleSubmit(e as unknown as Event);
          }}
        >
          アップロード
        </NextButton>
      </Zoom>

    </Stack>
  );
};