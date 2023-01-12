import { ParsedDaikokuEst } from 'types';
import xlsx from 'xlsx';

export const parseItems = (
  wb: xlsx.WorkBook,
) =>  {

  let majorItem = '';
  let prevRow : ParsedDaikokuEst['items'][number];

  return Object
    .values(wb.Sheets)
    .reduce(
      (acc, sheet) => {
        const {
          C1,
        } = sheet;

        if (C1?.v !== '明細') return acc;

        /** Parse rows 3 ~ 21 */
        for (let i = 3; i <= 21; i++) {
          const name: string = sheet[`A${i}`]?.v;
          let material: string = sheet[`C${i}`]?.v;

          let middleItem = '';

          if (!name || name.includes('小 計')) continue;
          if (name.includes('■')) {
            majorItem = name.split('■')[1];
            continue;
          }

          const trimmedName = name.trim();
          middleItem = trimmedName;

          if (middleItem.includes('〃')) {
            middleItem = [
              prevRow.middleItem,
              trimmedName.replace('〃', '').trim(),
            ].filter(Boolean).join('　');
          }

          if (material.includes('〃')) {
            material = [
              prevRow.material,
              material.replace('〃', '').trim(),
            ].filter(Boolean).join('　');
          }

          const currRow : ParsedDaikokuEst['items'][number] = {
            majorItem,
            middleItem,
            material,
            unit: sheet[`D${i}`]?.v,
            quantity: +sheet[`E${i}`]?.v,
            unitPrice: +sheet[`F${i}`]?.v,
            amount: +sheet[`G${i}`]?.v,
            rowDetails: sheet[`H${i}`]?.v ?? '',
          };

          prevRow = currRow;
          acc.push(currRow);
        }

        return acc;
      },
      [] as ParsedDaikokuEst['items'],
    );
};
