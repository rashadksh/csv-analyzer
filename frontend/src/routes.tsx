import {
  BrowserRouter,
  Routes as ReactRouterRoutes,
  Route,
} from 'react-router-dom';

import DashboardLayout from './layouts/dashboard-layout';
import ProcessFilePage from './pages/process-file-page';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<ProcessFilePage />} />
        </Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
