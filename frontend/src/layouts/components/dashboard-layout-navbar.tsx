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
        width: { md: `calc(100% - ${DASHBOARD_LAYOUT_DRAWER_WIDTH}px)` },
        ml: { md: `${DASHBOARD_LAYOUT_DRAWER_WIDTH}px` },
        backgroundColor: (theme) => theme.palette.common.white,
        boxShadow: 'none',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          color="default"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ mr: 2, display: { md: 'none' } }}>
          CSVLyzer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardLayoutNavbar;
