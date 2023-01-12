import { ParsedDaikokuEst } from 'types';
import xlsx from 'xlsx';

export const parseMajorItems = (
  wb: xlsx.WorkBook,
) =>  Object
  .values(wb.Sheets)
  .reduce(
    (acc, sheet) => {
      const {
        C1,
      } = sheet;

      if (C1?.v !== '内訳明細') return acc;

      /** Parse rows 3 ~ 21 */
      for (let i = 3; i <= 21; i++) {
        const name: string = sheet[`A${i}`]?.v;

        if (name.includes('合 計')) return acc;

        acc.push({
          name: name.split('.')[1],
          unit: sheet[`D${i}`]?.v,
          quantity: +sheet[`E${i}`]?.v,
          amount: +sheet[`G${i}`]?.v,
        });
      }

      return acc;
    },
    [] as ParsedDaikokuEst['majorItems'],
  );
