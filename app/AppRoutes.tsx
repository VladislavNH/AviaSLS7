import LoginPage from '@/pages/Auth/LoginPage';
import AdminPassengerPage from '@/pages/admin/passengers';
// import PassengersTable from '@entities/PassengersTable';
import HomePage from '@pages/home/HomePage';
import Layout from '@widgets/layout/Layout';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/passengers-table" element={<AdminPassengerPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
