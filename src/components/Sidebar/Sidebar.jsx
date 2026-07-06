import { NavLink } from 'react-router-dom';
import { LuCar } from 'react-icons/lu';
import { navItems } from './navItems';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.sidebarBrandIcon}>
          <LuCar className={styles.icon} />
        </div>
        <div>
          <div className={styles.sidebarBrandTitle}>RentCar</div>
          <div className={styles.sidebarBrandSubtitle}>Панель управления</div>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
            }>
            <Icon className={styles.sidebarLinkIcon} />
            <span className={styles.sidebarLinkLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
