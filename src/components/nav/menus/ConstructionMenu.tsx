import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom';
import CarpenterIcon from '@mui/icons-material/Carpenter';

import TableChartIcon from '@mui/icons-material/TableChart';
import { pages } from '../../../pages/Router';


export default function ConstructionMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <EngineeringIcon />
        </ListItemIcon>
        <ListItemText primary="工事情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={pages.projReg}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CarpenterIcon />
              </ListItemIcon>
              <ListItemText primary="新規登録" />
            </ListItemButton>
          </Link>
          <Link to={pages.projProspect}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="見込み登録" />
            </ListItemButton>
          </Link>
          <Link to={pages.projProspectSearch}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="見込み検索" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
}