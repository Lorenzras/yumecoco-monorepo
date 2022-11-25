import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { useFieldFast } from 'kokoas-client/src/hooks/useFieldFast';
import { useEffect } from 'react';
import { getFieldName } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';

/**
 * 請求金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BillingAmount = ({
  projId,
}: {
  projId: string
}) => {
  const [, , helpers] = useFieldFast('billingAmount');
  const {
    setValue,
  } = helpers;

  const { billingBalance } = useContractAmount(projId);

  useEffect(() => {
    setValue(billingBalance);
  }, [billingBalance, setValue]);


  return (
    <FormikMoneyField
      label='請求額'
      name={getFieldName('billingAmount')}
    />
  );
};