import { getLookUpFields } from './getLookUpFields';
import { AppIds } from 'config';

describe('getLookUpFields', () => {
  it('should get lookup fields of project', async () => {
    const lookUpFields = await getLookUpFields(AppIds.projects);
    
    expect(lookUpFields).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });
});