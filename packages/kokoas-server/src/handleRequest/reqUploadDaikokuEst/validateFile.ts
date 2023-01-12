import xlsx from 'xlsx';



/**
 *
 * Validate if file is valid 見積書 from daikoku
 *
 * Does not include existence of contents in database
 *
 * @param file
 */


export const validateFile = async (workbook: xlsx.WorkBook) => {
  try {
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    const documentTitle = (firstSheet?.W2?.v as string)?.replaceAll(/\s/g, '');
    const correctDocumentTitle = '御見積書';

    if (documentTitle !== correctDocumentTitle) {
      throw new Error(`大黒さんの見積ではありません。documentTitle = ${documentTitle}`);
    }

    return true;

  } catch (e) {
    throw new Error(`${e.message}`);
  }

};