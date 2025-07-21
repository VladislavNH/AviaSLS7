import { AdminPassengerPage } from '../pages/admin/passengers';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>App</h1>
        <Link to={'/passengers-table'}>Passenger Table</Link>
      </div>
    ),
  },
  {
    path: '/passengers-table',
    element: <AdminPassengerPage />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
