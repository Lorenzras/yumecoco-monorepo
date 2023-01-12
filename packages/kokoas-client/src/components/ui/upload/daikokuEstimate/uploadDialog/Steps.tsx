import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { Step, StepLabel } from '@mui/material';

const steps = [
  '大黒さんの見積を添付',
  '工事を選択',
  '顧客情報の確認',
];

export const Steps = ({
  activeStep,
}: {
  activeStep: number,
}) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>


    </Box>
  );
};