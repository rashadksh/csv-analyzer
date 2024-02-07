import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { DASHBOARD_LAYOUT_DRAWER_WIDTH } from '../constants';
import DashboardLayoutSidebar from './components/dashboard-layout-sidebar';
import DashboardLayoutNavbar from './components/dashboard-layout-navbar';

export interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardLayoutNavbar onDrawerToggle={handleDrawerToggle} />
      <DashboardLayoutSidebar
        isMobileOpen={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DASHBOARD_LAYOUT_DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
