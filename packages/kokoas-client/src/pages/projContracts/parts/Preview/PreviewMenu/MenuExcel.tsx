import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { useFormikContext } from 'formik';
import { baseUrl } from 'kokoas-client/src/config/settings';
import { generateParams } from '../../../../../helpers/url';
import { TypeOfForm } from '../../../form';


export const MenuExcel = () => {

  const { values: { projEstimateId } } = useFormikContext<TypeOfForm>();

  const basicParams = generateParams({
    projEstimateId,
  });

  const endpoint = `${baseUrl}/docusign/contract/download?${basicParams}&fileType=xlsx`;


  return (
    <MenuItem
      onClick={() => {
        window.open(endpoint, '_blank');
      }}
    >
      <ListItemIcon>
        <RiFileExcel2Fill color='green' size={24} />
      </ListItemIcon>
      <ListItemText>
        ダウンロード
      </ListItemText>

    </MenuItem>
  );
};