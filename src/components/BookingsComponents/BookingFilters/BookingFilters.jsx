import { LuBadgeInfo, LuPlus, LuSearch } from 'react-icons/lu';
import styles from './BookingFilters.module.scss';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import InfoTrigger from './InfoTrigger/InfoTrigger';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Статус: Все' },
  { value: 'confirmed', label: 'Подтверждена' },
  { value: 'active', label: 'Активная' },
  { value: 'completed', label: 'Завершена' },
  { value: 'cancelled', label: 'Отменена' },
];

const PERIOD_OPTIONS = [
  { value: 'today', label: 'За сегодня' },
  { value: 'week', label: 'Эта неделя' },
  { value: 'month', label: 'Этот месяц' },
  { value: 'quarter', label: 'Этот квартал' },
  { value: 'all', label: 'Всё время' },
];

export default function BookingFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  period,
  setPeriod,
  onNewBooking,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <LuSearch className={styles.searchIcon} />
        <input
          type='text'
          placeholder='Поиск по клиенту, email, телефону, номеру машины...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <InfoTrigger />

      <CustomSelect options={STATUS_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
      <CustomSelect options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />

      <button className={styles.addButton} type='button' onClick={onNewBooking}>
        <LuPlus className={styles.addButtonIcon} />
        Новое бронирование
      </button>
    </div>
  );
}
