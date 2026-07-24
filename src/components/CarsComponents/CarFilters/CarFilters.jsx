import { useState } from 'react';
import { LuPlus, LuSearch } from 'react-icons/lu';

import styles from './CarFilters.module.scss';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import AddCarModal from '../../../components/CarsComponents/AddCarModal/AddCarModal';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Статус: Все' },
  { value: 'available', label: 'Доступен' },
  { value: 'rented', label: 'В аренде' },
  { value: 'maintenance', label: 'На обслуживании' },
  { value: 'attention', label: 'Требует внимания' },
];

export default function CarFilters({ search, setSearch, statusFilter, setStatusFilter }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddCar(newCar) {
    // TODO: когда будет бэкенд — отправить newCar на сервер (POST /cars)
    // и обновить список машин по ответу API.
    console.log('Новый автомобиль (заглушка):', newCar);
    setIsModalOpen(false);
  }

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

      <button className={styles.addButton} type='button' onClick={() => setIsModalOpen(true)}>
        <LuPlus className={styles.addButtonIcon} />
        Добавить автомобиль
      </button>

      {isModalOpen && <AddCarModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddCar} />}
    </div>
  );
}
