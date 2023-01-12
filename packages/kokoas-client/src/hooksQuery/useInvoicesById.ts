import { useCallback } from 'react';
import { useInvoices } from './useInvoices';


export const useInvoicesById = (
  invoiceId = '',
) => {

  return useInvoices(({
    enabled: !!invoiceId,
    select: useCallback((data) => {
      const foundData = data.find(({ uuid }) => uuid.value === invoiceId);
      if (foundData) {
        return {
          record: foundData,
        };
      }
    }, [
      invoiceId,
    ]),
  }));
};