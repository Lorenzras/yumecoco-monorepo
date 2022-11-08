import { PageSubTitle } from '../../../../components/ui/labels/PageSubTitle';
import { Grid, debounce, FormHelperText } from '@mui/material';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { BuildingType } from './BuildingType';
import { FormikTextField } from '../../../../components/ui/textfield';

import { getFieldName, initialValues } from '../../form';
import { useFormikContext } from 'formik';
import { getAddressByPostal } from '../../../../api/others/postal';
import { useCallback } from 'react';
import { SelectProjectInCustGroup } from 'kokoas-client/src/components/ui/dialogs/SelectProjectInCustGroup';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export const ConstructionLocation = () => {

  const {
    status,
    values : {
      custGroupId,
      address1,
      isChkAddressKari,
    },
    setFieldValue,
    setValues,
  } = useFormikContext<typeof initialValues>();

  const isReadOnly = (status as TFormStatus ) === 'disabled';


  const handleGenerateAddress = useCallback(debounce((e: React.FocusEvent<any, Element>) => {
    const postal = e.target.value;

    if (postal && !address1) {
      getAddressByPostal(postal)
        .then(resp => {
          setFieldValue('address1', resp);
        });
    }

  }, 500), [address1]);


  return (
    <>
      <PageSubTitle label="工事場所情報" />
      <Grid item >
        <SelectProjectInCustGroup
          dialogTitle={'過去プロジェクトの工事場所をコピーします'}
          buttonChildren={'検索'}
          buttonIcon={<TravelExploreIcon />}
          custGroupId={custGroupId}
          onChange={useCallback((copy) => {
            setValues(prev => ({
              ...prev,
              postal: copy.postal.value,
              address1: copy.address1.value,
              address2: copy.address2.value,
            }));
          }, [setValues])}
        />
        <FormHelperText id="my-helper-text">
          過去の工事情報から参照する
        </FormHelperText>
      </Grid>

      {/* Offset. Remove when migrated to Grid2 */}
      <Grid item xs={12} />

      <Grid item xs={12} md={3}>
        <FormikTextField
          name="postal"
          label="郵便番号"
          placeholder='4420888'
          disabled={isReadOnly}
          onChange={handleGenerateAddress}
          shrink={true}
          required
        />
      </Grid>

      <Grid item md={9} />

      <Grid item xs={12} md={8}>
        <FormikTextField name="address1" label="住所" disabled={isReadOnly}
          required
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <FormikTextField name="address2" label="住所（番地以降）" disabled={isReadOnly}
          required
        />
      </Grid>


      <Grid item xs={12} md={4}>
        <FormikLabeledCheckBox label="仮換地地番を入力する" name={getFieldName('isChkAddressKari')} disabled={isReadOnly} />
      </Grid>

      {
        isChkAddressKari &&
        <Grid item xs={12} md={8}>
          <FormikTextField name="addressKari" label="仮換地住所" disabled={isReadOnly} />
        </Grid>
      }


      <Grid item xs={12} md={8}>
        <BuildingType disabled={isReadOnly} />
      </Grid>



    </>
  );
};