import { isProd } from './isProd';

/* 本番はここで設定する */
export const prodAppIds = {
  customers: 207,
  custGroups: 208,
  projects: 209,
  projEstimates: 210,
  custMemos: 211,
} as const;


/* デフォールトは開発環境のアプリ番号 */
export const AppIds = {

  /** 顧客グループ */
  custGroups : 185,

  /** 顧客メモ */
  custMemos : 181,

  /** 顧客 */
  customers : 173,

  /** 社員名簿 */
  employees : 34,

  /** 請求書 */
  invoices : 204,

  /** 部材 */
  materialsItem: 69,

  /** 大項目 */
  materialsMajor: 67,

  /** 中項目 */
  materialsMid: 68,

  /** 工事種別 */
  projTypes : 190,

  /** 工事 */
  projects : 194,

  /** 見積 */
  projEstimates : 202,

  /** 店舗 */
  stores : 19,

  /** 郵便番号 */
  postalCode: 219,
  ...(isProd ? prodAppIds : false),
} as const;

export type VAppIds = typeof AppIds[keyof typeof AppIds];