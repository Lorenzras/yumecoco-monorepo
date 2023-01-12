import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { EstUploadDialogContent } from './EstUploadDialogContent';

export const EstUploadDialog = (props: DialogProps,
) => {
  return (
    <Dialog
      fullWidth
      maxWidth={'lg'}
      PaperProps={{
        sx: {
          height: '80vh',
        },
      }}
      {...props}
    >
      <DialogTitle>
        大黒から見積をアップロードします
      </DialogTitle>
      <DialogContent>
        <EstUploadDialogContent />
      </DialogContent>

    </Dialog>
  );
};