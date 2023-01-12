
import useFileUpload from 'react-use-file-upload';
import { Stack } from '@mui/material';
import { StepAAttach } from './StepAAttach';
import { StepBSelectProject } from './StepBSelectProject';
import { EstDragAreaContainer } from './EstDragAreaContainer';
import { useUploadDaikokuEst } from 'kokoas-client/src/hooksQuery';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { Steps } from './Steps';
import { useCallback, useState } from 'react';
import { StepCUpload } from './StepCUpload';

export const EstUploadDialogContent = () => {
  const { projId } = useURLParams();
  const [activeStep, setActiveStep] = useState(1);
  const fileUploadReturn = useFileUpload();
  const {
    files,
    setFiles,
    clearAllFiles,
  } = fileUploadReturn;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    clearAllFiles();
    setActiveStep(0);
  };

  const handleFileAttached = useCallback((e: Event) => {
    setActiveStep(1);
    setFiles(e);
  }, [setFiles]);



  const {
    mutate,
  } = useUploadDaikokuEst();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    mutate({
      projId: projId ?? '',
      fileBlob: files[0],
    });
  };

  return (
    <Stack
      spacing={2}
      height={'100%'}
      alignItems={'center'} // center children, but bypassed default behavior of flex where children take full width.
    >
      <Steps activeStep={activeStep} />
      <EstDragAreaContainer {...fileUploadReturn} handleFileAttached={handleFileAttached} >
        {activeStep === 0 && (
          <StepAAttach handleFileAttached={handleFileAttached} />)}
        {activeStep === 1 && (
          <StepBSelectProject
            {...fileUploadReturn}
            handleNext={handleNext}
            handleReset={handleReset}
            projId={projId}
          />)}
        {activeStep === 2 && (
          <StepCUpload />
        )}
      </EstDragAreaContainer>

    </Stack>
  );
};