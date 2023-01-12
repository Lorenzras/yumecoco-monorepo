import xlsx from 'xlsx';
import path from 'path';
import { parseItems } from './parseItems';

describe('parseItems', () => {
  it('it should parse items', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '../__TEST__', '見積書.xls'));
    const result = parseItems(workbook);
    console.log(result);
    expect(result.length).toBeTruthy();
  });
});