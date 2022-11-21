import { useQuery } from '@tanstack/react-query';
import { getEstimates } from 'api-kintone/src/estimates/getEstimates';
import { AppIds } from 'config';

export const useEstimates = <T = Awaited<ReturnType<typeof getEstimates>>>(
  query?: string,
  options?: {
    select: (data: Awaited<ReturnType<typeof getEstimates>>) => T
  },
) => {
  return  useQuery(
    [AppIds.projEstimates, { query }],
    () => getEstimates({ query }),
    {
      ...options,
    },
  );
};