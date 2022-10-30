
import { updateRelated } from '../common/updateRelated';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * projects 1-n projEstimates
 * 
 * @param projId 
 */
export const updateRelatedProjects = async (projId?: string | string[]) => {
  if (!projId) return;

  const updatedEstimates = await updateRelated({
    relatedAppId: APPIDS.projectEstimate,
    recIds: projId,
    lookUpFieldName: 'projId',
  });

  return {
    [APPIDS.projectEstimate]: updatedEstimates,
  };
};
