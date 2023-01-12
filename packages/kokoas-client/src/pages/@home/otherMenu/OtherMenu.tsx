import { Divider, Drawer, ExtendButtonBase, List, ListItemButton, ListItemButtonTypeMap, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { UploadDaikokuEstimate } from 'kokoas-client/src/components';

const drawerWidth = 180;

export const OtherMenu = () => {
  return (
    <Drawer
      anchor={'right'}
      open
      variant='permanent'
      sx={({ zIndex }) => ({
        width: drawerWidth,
        flexShrink: 0,
        zIndex: zIndex.appBar - 1,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth },
      })}
      //onClose={toggleDrawer(anchor, false)}
    >
      <Toolbar />
      <Divider />
      <List>
        <UploadDaikokuEstimate
          RenderButton={(props) => (
            <ListItemButton
              {...props as ExtendButtonBase<ListItemButtonTypeMap>}
            >
              <ListItemIcon>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText>
                見積アップ
              </ListItemText>
            </ListItemButton>
          )}
        />
      </List>
    </Drawer>
  );
};