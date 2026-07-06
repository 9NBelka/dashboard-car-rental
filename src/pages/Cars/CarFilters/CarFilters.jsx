import { LuPlus, LuSearch } from 'react-icons/lu';

import styles from './CarFilters.module.scss';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Статус: Все' },
  { value: 'available', label: 'Доступен' },
  { value: 'rented', label: 'В аренде' },
  { value: 'maintenance', label: 'На обслуживании' },
  { value: 'attention', label: 'Требует внимания' },
];

export default function CarFilters({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <LuSearch className={styles.searchIcon} />
        <input
          type='text'
          placeholder='Поиск автомобиля...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CustomSelect options={STATUS_OPTIONS} value={statusFilter} onChange={setStatusFilter} />

      <button className={styles.addButton} type='button'>
        <LuPlus className={styles.addButtonIcon} />
        Добавить автомобиль
      </button>
    </div>
  );
}
