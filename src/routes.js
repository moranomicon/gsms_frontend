import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import MaterialChangeHistoryList from './pages/MaterialChangeHistoryList';
import MaterialListView from './pages/MaterialList';
import PackingListView from './pages/PackingList';
import PackingListChangeHistory from './pages/PackingListChangeHistoryList';
import TransferLocations from './pages/TransferLocations';
import Users from './pages/Users';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'materials', element: <MaterialListView /> },
      { path: 'packing-list', element: <PackingListView /> },
      { path: 'material-change-history', element: <MaterialChangeHistoryList /> },
      { path: 'packing-list-change-history', element: <PackingListChangeHistory /> },
      { path: 'users', element: <Users /> },
      { path: 'locations', element: <TransferLocations /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
