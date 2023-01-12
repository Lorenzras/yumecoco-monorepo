import { useQuery } from '@tanstack/react-query';
import { getAllInvoices } from 'api-kintone/src/invoice/getAllInvoices';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllInvoices>>;

/**
 * 見積レコードを全て取得する
 */
export const useInvoices = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.invoices],
    () => getAllInvoices(),
    {
      ...options,
    },
  );
};