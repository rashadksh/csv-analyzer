import {
  BrowserRouter,
  Routes as ReactRouterRoutes,
  Route,
} from 'react-router-dom';

import DashboardLayout from './layouts/dashboard-layout';
import ProcessFilePage from './pages/process-file-page';
import ExploreFilePage from './pages/explore-file-page';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<ProcessFilePage />} />
          <Route path="file/:id" element={<ExploreFilePage />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
