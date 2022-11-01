
import { Grid, Typography } from '@mui/material';

interface PageTitleProps {
  color?: string,
  textColor?: string,
  label: string
}

export const PageTitle = (props: PageTitleProps) => {
  const {
    color = '#9CDAF9',
    textColor = '#000',
    label,
  } =  props;

  return (
    <Grid item xs={12} p={2} sx={{ backgroundColor: color }}>
      <Typography color={textColor} variant="h4">{label}</Typography>
    </Grid>
  );
};

export default PageTitle;