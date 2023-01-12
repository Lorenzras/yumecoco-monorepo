import { Button, ButtonProps } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { forwardRef } from 'react';


export const NextButton = forwardRef<'button', ButtonProps>((props: ButtonProps, ref) => {
  return (
    <Button
      ref={ref}

      size={'large'}
      variant={'text'}
      endIcon={<NavigateNextIcon />}
      {...props}
    />
  );
});

NextButton.displayName = 'NextButton';