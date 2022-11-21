import { getContracts } from './getContracts';

describe('getContracts', () => {
  it('should only get contracts from estimates', async () => {
    const results = await getContracts();

    console.log(results);

    expect(results.records.every(({ envStatus }) => {
      return !!envStatus.value;
    })).toEqual(true);
  });
});