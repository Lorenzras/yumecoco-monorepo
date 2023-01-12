import xlsx from 'xlsx';
import path from 'path';
import { parseDaikokuEst } from './parseDaikokuEst';

describe('parse daikoku xls', () => {
  it('should convert it to designated object type', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '../__TEST__', '見積書.xls'));

    const result = await parseDaikokuEst(workbook);

    console.log(result);

    expect(result).toHaveProperty('documentTitle');
  });
});