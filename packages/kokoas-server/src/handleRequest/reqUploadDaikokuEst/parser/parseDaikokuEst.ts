
import { ParsedDaikokuEst } from 'types';
import xlsx from 'xlsx';
import { parseItems } from './parseItems';
import { parseMajorItems } from './parseMajorItems';


/**
 * Parses the file into JSON.
 *
 * 大黒さんは旧型xlsで、パッケージの制限でスタイルが無くなります。
 * 仕組みとして、そのまま大黒さんのファイルから情報を吸い上げ、
 * xlsx型のテンプレートに移行させます。
 *
 * ブラウザー上、重い処理なので、こちらサーバで処理を行います。
 *
 * よりいいパッケージがあれば、PRをお願いします。
 */
export const parseDaikokuEst = async (
  wb: xlsx.WorkBook,
): Promise<ParsedDaikokuEst> => {

  const {
    W2: { v: documentTitle },
    B5 : { v: custName },
    H23 : { v: projName },
    H24 : { v: projAddress },
    W13: { v: amountAfterTax },
    W16: { v: amountBeforeTax },
    W17: { v: taxRate },
    AA17: { v: taxAmount },
    H22: { v: projDataId },
    AS3: { v: estDataId },
  } = wb.Sheets['見積書見出'];

  const {
    G3: { v: amountBeforeDiscount },
    G6: { v: discountAmount },
  } = wb.Sheets['見積書明細'];



  return {
    documentTitle,
    custName: (custName as string)?.replace(' 様', ''),
    projName,
    projAddress,
    amountAfterTax: +amountAfterTax,
    amountBeforeTax: +amountBeforeTax,
    taxRate: +(taxRate as string)?.replace(/\D/g, ''),
    taxAmount: +taxAmount,
    projDataId,
    estDataId: (estDataId as string)?.split(':')[1],
    discountAmount: +discountAmount,
    amountBeforeDiscount: +amountBeforeDiscount,
    majorItems: parseMajorItems(wb),
    items: parseItems(wb),
  };
};