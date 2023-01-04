import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const EstHeaderCell = (props: TypographyProps) => {
  return (
    <Typography 
      {...props} 
      fontWeight={900}
      color={grey[700]}
    />
  );
};