import {
  LuLayoutDashboard,
  LuCar,
  LuMap,
  LuCalendarDays,
  LuUsers,
  LuCircleDollarSign,
  LuShieldAlert,
  LuClipboardList,
  LuWrench,
  LuBell,
  LuSettings,
} from 'react-icons/lu';

// Единственное место, где перечислены разделы меню.
// Добавишь пункт сюда — он появится и в сайдбаре, и получит маршрут в App.jsx.
// icon — компонент иконки из react-icons, badge — необязательный счётчик (число).
export const navItems = [
  { path: '/', label: 'Обзор', icon: LuLayoutDashboard },
  { path: '/cars', label: 'Автомобили', icon: LuCar },
  { path: '/map', label: 'Карта', icon: LuMap },
  { path: '/bookings', label: 'Бронирования', icon: LuCalendarDays },
  { path: '/clients', label: 'Клиенты', icon: LuUsers },
  { path: '/finance', label: 'Финансы', icon: LuCircleDollarSign },
  { path: '/fines', label: 'Штрафы и налоги', icon: LuShieldAlert },
  { path: '/maintenance', label: 'Обслуживание', icon: LuWrench },
  { path: '/reports', label: 'Отчеты', icon: LuClipboardList },
  { path: '/notifications', label: 'Уведомления', icon: LuBell },
  { path: '/settings', label: 'Настройки', icon: LuSettings },
];
