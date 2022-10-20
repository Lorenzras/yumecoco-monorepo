import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { useCustGroupById } from './useCustGroupById';
import { useProjById } from './useProjById';


/**
 * 工事番号で、顧客グループと工事データを取得する。
 * @param projId 工事番号
 * @returns 工事と顧客グループデータ
 */
export const useCustGroupByProjId = (projId: string) => {
  const { data: projData } = useProjById(projId);
  const custGroupId = projData?.custGroupId?.value;

  const { data: custGroupData } = useCustGroupById(custGroupId || '');

  return useQuery(
    [APPIDS.constructionDetails, APPIDS.custGroup, projId],
    () => {
      return {
        custGroupData,
        projData,
      };
    },
    {
      enabled: !!custGroupData && !!projData,
    },
  );
};