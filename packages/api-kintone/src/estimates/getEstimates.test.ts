import { getEstimates } from './getEstimates';

describe('getEstimates', () => {
  it('should get estimates based on limit', async () => {
    const limit = 10;

    const {
      records,
      totalCount,
    } = await getEstimates({
      query: `limit ${limit}`,
    });

    console.log(totalCount);

    expect(records.length).toBeLessThanOrEqual(limit);
  });
});