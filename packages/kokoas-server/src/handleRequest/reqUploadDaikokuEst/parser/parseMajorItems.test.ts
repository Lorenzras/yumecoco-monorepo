import xlsx from 'xlsx';
import path from 'path';
import { parseMajorItems } from './parseMajorItems';

describe('parseMajorItem', () => {
  it('it should parse majorItems', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '../__TEST__', '見積書.xls'));
    const result = parseMajorItems(workbook);
    console.log(result);
    expect(result.length).toBeTruthy();
  });
});