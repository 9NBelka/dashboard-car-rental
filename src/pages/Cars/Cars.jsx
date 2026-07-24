import { useState, useEffect } from 'react';
import { mockCars } from './mockCars';
import CarDetailPanel from '../../components/CarsComponents/CarDetailPanel/CarDetailPanel';
import styles from './Cars.module.scss';
import CarFilters from '../../components/CarsComponents/CarFilters/CarFilters';
import CarStats from '../../components/CarsComponents/CarStats/CarStats';
import CarPagination from '../../components/CarsComponents/CarPagination/CarPagination';
import MoreButton from '../../components/CarsComponents/MoreButton/MoreButton';

const STATUS_META = {
  rented: { label: 'В аренде', className: 'statusPositive' },
  available: { label: 'Доступен', className: 'statusAvailable' },
  maintenance: { label: 'На обслуживании', className: 'statusWarning' },
  attention: { label: 'Требует внимания', className: 'statusDanger' },
};

const ITEMS_PER_PAGE = 10;

function fuelBarClass(level) {
  if (level == null) return '';
  if (level >= 60) return 'fuelBarGood';
  if (level >= 30) return 'fuelBarMedium';
  return 'fuelBarLow';
}

// Строит компактный список страниц с многоточиями: 1 … 4 5 6 … 12
function buildPageList(current, total) {
  const pages = [];
  const add = (p) => pages.push(p);

  add(1);
  if (current > 3) add('...');

  for (let p = current - 1; p <= current + 1; p++) {
    if (p > 1 && p < total) add(p);
  }

  if (current < total - 2) add('...');
  if (total > 1) add(total);

  return pages;
}

export default function Cars() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const total = mockCars.length;
  const availableCount = mockCars.filter((c) => c.status === 'available').length;
  const rentedCount = mockCars.filter((c) => c.status === 'rented').length;
  const maintenanceCount = mockCars.filter((c) => c.status === 'maintenance').length;

  const filteredCars = mockCars.filter((car) => {
    const matchesSearch = `${car.brand} ${car.model} ${car.plate}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / ITEMS_PER_PAGE));

  // Если после поиска/фильтра страниц стало меньше — не остаёмся на несуществующей странице
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const rangeStart = filteredCars.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + ITEMS_PER_PAGE, filteredCars.length);

  const selectedCar = mockCars.find((c) => c.id === selectedId) ?? null;
  const pageList = buildPageList(currentPage, totalPages);

  return (
    <div className={styles.carsPage}>
      <div className={styles.carsMain}>
        <header className={styles.carsHeader}>
          <h1 className={styles.carsTitle}>Автомобили</h1>
          <p className={styles.carsSubtitle}>
            Управляйте своим автопарком и отслеживайте статус каждого автомобиля.
          </p>
        </header>

        <CarStats
          total={total}
          availableCount={availableCount}
          rentedCount={rentedCount}
          maintenanceCount={maintenanceCount}
        />

        <CarFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Автомобиль</th>
                <th>Статус</th>
                <th>Аренда</th>
                <th>Пробег</th>
                <th>Топливо</th>
                <th>Местоположение</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paginatedCars.map((car) => {
                const status = STATUS_META[car.status];
                const isSelected = car.id === selectedId;

                return (
                  <tr
                    key={car.id}
                    className={isSelected ? styles.rowSelected : ''}
                    onClick={() => setSelectedId(car.id)}>
                    <td>
                      <div className={styles.carCell}>
                        <div className={styles.carThumb}>
                          <img src={car.imagePreview} alt={car.model} />
                        </div>
                        <div>
                          <div className={styles.carName}>
                            {car.brand} {car.model}
                          </div>
                          <div className={styles.carPlate}>{car.plate}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`${styles.statusBadge} ${styles[status.className]}`}>
                        {status.label}
                      </span>
                    </td>

                    <td>
                      {car.driver ? (
                        <div className={styles.rentCell}>
                          <p className={styles.rentDriverName}>{car.driver.name}</p>
                          <p className={styles.rentMeta}>до {car.rentEnd}</p>
                        </div>
                      ) : (
                        <span className={styles.dash}>—</span>
                      )}
                    </td>

                    <td>
                      <div className={styles.mileageCell}>
                        <div>{car.mileageTotal.toLocaleString('ru-RU')} км</div>
                        <div className={styles.rentMeta}>Сегодня {car.mileageToday} км</div>
                      </div>
                    </td>

                    <td>
                      {car.fuelLevel != null ? (
                        <div className={styles.fuelCell}>
                          <span>{car.fuelLevel}%</span>
                          <div className={styles.fuelBarTrack}>
                            <div
                              className={`${styles.fuelBarFill} ${styles[fuelBarClass(car.fuelLevel)]}`}
                              style={{ width: `${car.fuelLevel}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className={styles.dash}>—</span>
                      )}
                    </td>

                    <td>
                      <div className={styles.locationCell}>
                        <div>
                          {car.location.city}, {car.location.country}
                        </div>
                        <div className={car.speed != null ? styles.speedMeta : styles.rentMeta}>
                          {car.attentionNote
                            ? car.attentionNote
                            : car.speed != null
                              ? `${car.speed} км/ч`
                              : 'Стоит'}
                        </div>
                      </div>
                    </td>

                    <td>
                      <MoreButton openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} car={car} />
                    </td>
                  </tr>
                );
              })}

              {paginatedCars.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    Ничего не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CarPagination
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          filteredCars={filteredCars}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageList={pageList}
          totalPages={totalPages}
        />
      </div>

      {selectedCar && <CarDetailPanel car={selectedCar} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
