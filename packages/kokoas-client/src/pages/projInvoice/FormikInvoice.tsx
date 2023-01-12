import { Formik } from 'formik';
import { useSaveInvoice } from 'kokoas-client/src/hooksQuery';
import { useNavigate } from 'react-router-dom';
import { convertToKintone } from './api/convertToKintone';
import { initialValues } from './form';
import { FormInvoice } from './FormInvoice';
import { validationSchema } from './formValidation';
import { generateParams } from 'kokoas-client/src/helpers/url';


export const FormikInvoice = () => {

  const { mutateAsync } = useSaveInvoice();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { invoiceId } = values;

        const handleSave = async () => {
          const record = convertToKintone(values);

          const { id } = await mutateAsync({
            recordId: invoiceId,
            record,
          });
          navigate(`?${generateParams({ invoiceId: id })}`);
        };

        handleSave(); // 後々、保存処理と請求書発行処理(保存処理も実施)に分割する
      }}
    >
      <FormInvoice />
    </Formik>
  );
};