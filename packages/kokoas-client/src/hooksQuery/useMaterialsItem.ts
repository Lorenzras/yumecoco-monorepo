import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAllMaterialsItem } from 'api-kintone';

/**
 * 部材を取得する
 */
export const useMaterialsItem = <T>(
  options?: {
    select: (data: Awaited<ReturnType<typeof getAllMaterialsItem>>) => T
  }) => {
  return useQuery(
    [AppIds.materialsItem],
    getAllMaterialsItem,
    { ...options },
  );
};