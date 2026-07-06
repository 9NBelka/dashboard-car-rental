import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.dashboardLayoutContent}>
        {/* Сюда рендерится текущая страница в зависимости от URL */}
        <Outlet />
      </main>
    </div>
  );
}
