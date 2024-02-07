import {
  BrowserRouter,
  Routes as ReactRouterRoutes,
  Route,
} from 'react-router-dom';

import DashboardLayout from './layouts/dashboard-layout';
import { Typography } from '@mui/material';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={<Typography variant="h4">Hello world</Typography>}
          />
        </Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
