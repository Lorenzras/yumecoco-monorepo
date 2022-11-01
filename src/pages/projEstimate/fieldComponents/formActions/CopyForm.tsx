import { Button, Checkbox, FormControlLabel, Stack, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useBackdrop, useConfirmDialog, useSnackBar } from '../../../../hooks';
import { useFormikContext } from 'formik';
import { initialValues, TypeOfForm } from '../../form';
import { ComponentProps, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';



const CopyDialogContent = ({
  handleChangeIsSameProj,
}: {
  handleChangeIsSameProj: (checked: boolean) => void
}) => {
  /**
   * I had an issue where handling checked state at the parent component
   * doesn't not trigger re-render of this component.
   *
   * This was mainly due to the dialog state being memoized.
   *
   * Exposing dialog context state then using useEffect could solve it but
   * Locally handling checked state here
   * also limits the render depth making it a tad faster.. ~ras
   */
  const [checked, setChecked] = useState(false);

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (event) => {
    setChecked(event.target.checked);
    handleChangeIsSameProj(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="同じ工事" />
    </Stack>
  );
};

export const CopyForm = () => {
  const { resetForm, values } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const { setBackdropState } = useBackdrop();
  const navigate = useNavigate();
  const isSameProj = useRef(false);


  const handleCopy = async () => {
    try {
      handleClose();
      setBackdropState({ open: true });

      const dummyProcessTime = 2000;

      setTimeout(() => {

        setBackdropState({ open: false });
        setSnackState({
          open: true,
          autoHideDuration: dummyProcessTime,
          message: 'コピーしました。',
          severity: 'success',
          handleClose: () => {
            setBackdropState({ open: false });
          },
        });

        /**
         * if same project, use the current state but clear estimate id,
         * otherwise, use initialValue and only copy items.
         */
        const copiedState: TypeOfForm = isSameProj.current ? {
          ...values,
          estimateId: '',
        } : {
          ...initialValues,
          items: [ ...values.items ],
        };

        resetForm({ values: copiedState });
        navigate(`${pages.projEstimate}`);

      }, dummyProcessTime);


    } catch (err: any) {
      setSnackState({
        open: true,
        message: err.message,
        severity: 'error',
      });
    }

  };




  const handleClickCopy = () => {
    setDialogState({
      open: true,
      title: '見積もりのコピーを作成',
      content: (
        <CopyDialogContent
          handleChangeIsSameProj={(checked)=>{
            isSameProj.current = checked;
          }}
        />),
      handleYes: handleCopy,
      cancellable: true,
    });
  };



  return (
    <Tooltip title={'当レコードをコピーし、新なレコードを作成します'}>
      <Button
        variant="outlined"
        size="large"
        onClick={handleClickCopy}
      >
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  );
};