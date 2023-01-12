import { ButtonBaseProps } from '@mui/material';
import {  FC, Fragment, useState } from 'react';
import { EstUploadDialog } from './uploadDialog/EstUploadDialog';

/**
 * 見積をアップロードする
 */
export const UploadDaikokuEstimate = ({
  RenderButton,
  onClick,
}: {
  RenderButton: FC<ButtonBaseProps>,
  onClick?: ButtonBaseProps['onClick']
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Fragment>
      <RenderButton
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
      />
      <EstUploadDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fragment>

  );
};