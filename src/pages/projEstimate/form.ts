
import * as Yup from 'yup';

export const taxChoices = ['課税', '非課税'] as const;
export const unitChoices = [
  '', '式', '㎡(平米)', '㎥(立米)', 'm(メートル)', 'ヶ所', '個', 'セット', '本', '枚',
  'ケース', '台', '組', '袋', '箱', 'kg', 't',
] as const;

export type TMaterials = TypeOfForm['items'][0];
export type TKMaterials = keyof TMaterials;

export const initialValues = {
  projId: '',
  projName: '',
  customerName: '',
  constructionType: '', /* 工事種別(ルックアップ) */
  profitRate: 0.5, /* 利益率(自動計算) */
  taxRate: 10, /* 税率 */

  /* 見積もり用配列要素 */
  items: [
    {
      number: 1,
      majorItem: '',  /* 大項目 */
      middleItem: '', /* 中項目 */
      element: '',    /* 部材 */
      costPrice: 0,  /* 原価 */
      quantity: 0,   /* 数量 */
      elemProfRate: 0, /* 利益率(部材) */
      unit: '式' as typeof unitChoices[number], /* 単位 */
      taxType: '課税' as typeof taxChoices[number],  /* 税(課税/非課税) */
    },
  ],
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/*
 フィールド名取得、ヘルパー
 */

export const getFieldName = (s: KeyOfForm) => s;

const itemsName = getFieldName('items');
export const getItemFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;


/*
バリデーション
*/
export const validationSchema = Yup.object(
  {
    'projId': Yup
      .string()
      .required('必須です。'),
    'profitRate': Yup
      .number(),
    'taxRate': Yup
      .number()
      .required('必須です。'),
    'items': Yup.array()
      .of(
        Yup.object().shape({
          'number': Yup.number(),
          'majorItem': Yup.string().required('必須です'),
          'middleItem': Yup.string(), /* 中項目 */
          'element': Yup.string(),    /* 部材 */
          'costPrice': Yup.number().typeError('数値で入力してください').required('必須です'), /* 原価 */
          'quantity': Yup.number()
            .typeError('数値で入力してください')
            .min(0, '0以上の数字を入力してください')
            .required('必須です'), /* 数量 */
          'elemProfRate': Yup.number()
            .typeError('数値で入力してください')
            .min(0, '0以上の数字を入力してください'), /* 利益率(部材) */
          'unit': Yup.string(), /* 単位 */
          'taxType': Yup.string(),  /* 税(課税/非課税) */
        }),
      )
      .required('Must have items')
      .min(1, 'Minimum of 1 items'),
  } as Partial<Record<KeyOfForm, any>>,
);