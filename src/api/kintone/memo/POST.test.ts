import 'regenerator-runtime/runtime';
import { getUserCodesByIds } from '../users/GET';

import { addMemo } from './POST';

describe('Memo', () => {
  test('is added', async () => {
    return addMemo(
      {
        recordId: { value: '130' },
        notifyTo: { value: await getUserCodesByIds(['44', '45']) },
      } as CustomerMemoTypes.SavedData,
    ).then((result) => {
      console.log(result);
      expect(result).toHaveProperty('id');
    });
  });

});


