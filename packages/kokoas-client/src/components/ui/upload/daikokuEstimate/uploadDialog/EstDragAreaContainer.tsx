import { Stack } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { ReactNode, useState } from 'react';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';

export const EstDragAreaContainer = (props: useFileUploadHook & {
  children: ReactNode,
  handleFileAttached: (e: Event) => void
}) => {
  const { setSnackState } = useSnackBar();
  const [isDragging, setIsDragging] = useState(false);
  const {
    handleDragDropEvent,
    handleFileAttached,
    children,
  } = props;

  return (
    <Stack
      spacing={2}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      width={'100%'} // needed when using alignItems
      sx={{
        background: isDragging ? yellow[100] : undefined,
        border: 2,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderColor: grey[200],
        transition: 'all 0.5s ease',
        '& > div ' : {
          pointerEvents: isDragging ? 'none' : undefined, // stop propagating events to child elements
        },
      }}
      onDragEnter={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        handleDragDropEvent(e as unknown as Event);
      }}
      onDrop={(e) => {
        handleDragDropEvent(e as unknown as Event);
        const fileType = e.dataTransfer.files?.[0]?.type;
        if (
          [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // "xlsx"
            'application/vnd.ms-excel', // "xls"
          ]
            .includes(fileType)
        ) {
          handleFileAttached(e as unknown as Event);
        } else {
          setSnackState({
            open: true,
            severity: 'error',
            message: 'エクセルファイルをアップロードしてください。',

          });
          setIsDragging(false);
        }
        setIsDragging(false);
      }}
    >

      {children}

    </Stack>
  );
};