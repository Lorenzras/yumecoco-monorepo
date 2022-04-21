import { Formik } from 'formik';

import { validationSchema, initialValues } from './form';
import {
  saveConstructionData,
  //getFlatConstDetails,
} from '../../api/kintone/construction/';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConstructionForm } from './ConstructionForm';
import FormSnack, { SnackState } from '../../components/ui/snacks/FormSnack';


export const FormikConstruction  = () => {
  const [snackState, setSnackState] = useState<SnackState>({ open:false });
  //const [initialState, setInitialState] = useState(initialValues);
  const recordId  = useParams().recordId;
  const navigate = useNavigate();

  useEffect(()=>{
    /** If edit mode */
    if (recordId){
      /*  getFlatConstDetails(constructionId)
        .then((flatRecord) => {
          setInitialState(flatRecord);
        }); */
    }
  }, [recordId]);

  return (
    <>
      <Formik
      validateOnMount
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveConstructionData({ ...values, custGroupId: recordId })
          .then((resp)=>{
            setSnackState({ open: true, message: '保存出来ました。' });
            setSubmitting(false);
            navigate(`/construction/edit/${resp.id}`);
          });
      }}
    >
        <ConstructionForm handleSnack={(snackParam) => setSnackState(snackParam)}/>

      </Formik>
      <FormSnack snackState={snackState} handleClose={()=> setSnackState(prev => ({ ...prev, open: false }))}/>
    </>
  );
};