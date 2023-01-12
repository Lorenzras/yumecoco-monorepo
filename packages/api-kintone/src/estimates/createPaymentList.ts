import { RecordType } from './config';

export const createPaymentList = (estimateRecord: RecordType) => {
  const {
    支払い: { value: paymentObj },
    uuid: { value: uuid },
  } = estimateRecord;

  const paymentData = paymentObj.reduce((acc, cur)=> {
    if (cur.value.isPayEnabled.value === '0') return acc;
    
    acc.paymentTypeList.push(cur.value.paymentType.value);
    acc.paymentAmtPerType.push(cur.value.paymentAmt.value);

    return acc;
    
  }, {
    paymentTypeList: [] as string[],
    paymentAmtPerType: [] as string[],
  });

  return {
    ...paymentData,
    uuid: uuid,
  };
};