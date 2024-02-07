import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DASHBOARD_LAYOUT_DRAWER_WIDTH } from '../../constants';

export interface DashboardLayoutNavbarProps {
  onDrawerToggle: () => void;
}

export const DashboardLayoutNavbar: React.FC<DashboardLayoutNavbarProps> = ({
  onDrawerToggle,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${DASHBOARD_LAYOUT_DRAWER_WIDTH}px)` },
        ml: { sm: `${DASHBOARD_LAYOUT_DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ mr: 2, display: { sm: 'none' } }}>
          CSVLyzer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardLayoutNavbar;
