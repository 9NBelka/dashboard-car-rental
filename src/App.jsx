import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

import Overview from './pages/Overview/Overview';
import Cars from './pages/Cars/Cars';
import MapPage from './pages/MapPage/MapPage';
import Bookings from './pages/Bookings/Bookings';
import Clients from './pages/Clients/Clients';
import Finance from './pages/Finance/Finance';
import Fines from './pages/Fines/Fines';
import Maintenance from './pages/Maintenance/Maintenance';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';

// Пути здесь должны совпадать с path в src/components/Sidebar/navItems.js
export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Overview />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/finance' element={<Finance />} />
        <Route path='/fines' element={<Fines />} />
        <Route path='/maintenance' element={<Maintenance />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}
