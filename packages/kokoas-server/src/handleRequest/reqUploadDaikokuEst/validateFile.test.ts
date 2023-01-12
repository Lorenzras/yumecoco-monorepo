import path from 'path';
import xlsx from 'xlsx';
import { validateFile } from './validateFile';

describe('file', () => {
  it('should validate file', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '__TEST__', '見積書.xls'));
    const result = await validateFile(workbook);

    expect(result).toBeTruthy();
  });
});