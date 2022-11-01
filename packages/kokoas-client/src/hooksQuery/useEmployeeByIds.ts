import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from '../api/kintone/employees/getActiveEmployees';

export const useEmployeeByIds = (empId: string | string[]) => {
  return useQuery(
    [APPIDS.employees],
    getActiveEmployees,
    {
      select: (data) => data.filter(({
        $id,
      }) => typeof empId === 'string'
        ?  $id.value === empId
        : empId.some(e => $id.value === e),
      ),
    },
  );
};