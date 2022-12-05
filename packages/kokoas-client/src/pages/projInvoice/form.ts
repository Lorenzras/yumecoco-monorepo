

const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {


  /** 請求書番号 */
  invoiceId: '',

  /* 顧客情報 */
  custGroupId: '',
  custName: '',

  /* 見積もり情報 */
  estimates:[
    {
      projId: '',
      projTypeName: '',
      dataId: '',
      amountType: '',
      amountPerContract: '',
      isForPayment: false,
    },
  ],


  /** 契約金額の総額 */
  contractAmount: '',

  /** 請求済み金額 */
  billedAmount: '',

  /** 請求金額 */
  billingAmount: '',

  /* 入金予定日 */
  plannedPaymentDate: '',

  /* 契約超過チェック */
  exceedChecked: false,
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;

export type TMaterials = TypeOfForm['estimates'][0];
export type TKMaterials = keyof TMaterials;

/**
 * 
 フィールド名取得、ヘルパー
 */
const itemsName = getFieldName('estimates');
export const getEstimatesFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;
