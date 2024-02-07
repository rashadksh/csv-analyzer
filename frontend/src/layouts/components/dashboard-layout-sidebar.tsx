import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DescriptionIcon from '@mui/icons-material/Description';

import { DASHBOARD_LAYOUT_DRAWER_WIDTH } from '../../constants';

export interface DashboardLayoutSidebarProps {
  window?: () => Window;
  isMobileOpen: boolean;
  onTransitionEnd: () => void;
  onClose: () => void;
}

export const DashboardLayoutSidebar: React.FC<DashboardLayoutSidebarProps> = ({
  window,
  isMobileOpen,
  onTransitionEnd,
  onClose,
}) => {
  const [isFilesListOpen, setFilesListOpen] = useState(false);

  const handleToggleFilesList = () => setFilesListOpen((current) => !current);

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar>CSVLyzer</Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TroubleshootIcon />
            </ListItemIcon>
            <ListItemText primary="Analyze CSV" />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={handleToggleFilesList}>
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="Your Files" />
          {isFilesListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isFilesListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: DASHBOARD_LAYOUT_DRAWER_WIDTH },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={isMobileOpen}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DASHBOARD_LAYOUT_DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DASHBOARD_LAYOUT_DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardLayoutSidebar;
