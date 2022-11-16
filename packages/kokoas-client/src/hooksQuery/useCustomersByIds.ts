import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getCustomersByIds } from 'api-kintone';

/**
 * 顧客番号の配列で、顧客のデータの配列を取得する。
 *
 * データ関連：
 * custGroup n-n customer
 */
export const useCustomersByIds = (custIds : string[]) => {
  return useQuery(
    [AppIds.customers, { custIds }],
    () => getCustomersByIds(custIds),
    {
      enabled: !!custIds.length,
    },
  );
};