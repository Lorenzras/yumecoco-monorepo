import path from 'path';
import fs from 'fs';

type FileName =
| '見積書'
| '請負契約書'
| '工事請負契約約款';


export const getFilePath = ({
  fileName,
  fileType = 'pdf',
} : {
  fileName: FileName,
  fileType?: 'pdf' | 'xls' | 'xlsx',
}) => {

  let assetFolder = '';

  switch (fileType) {
    case 'xls':
    case 'xlsx':
      assetFolder = 'excel';
      break;
    default:
      assetFolder = fileType;
      break;
  }

  const filePath = path.join(__dirname, assetFolder, `${fileName}.${fileType}`);

  if (fs.existsSync(filePath)) {
    return filePath;
  } else {
    throw new Error(`${fileName} does not exist.`);
  }
};

