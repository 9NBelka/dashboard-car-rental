import { useState, useEffect } from 'react';
import { mockBookings } from './mockBookings';
import BookingDetailPanel from '../../components/BookingsComponents/BookingDetailPanel/BookingDetailPanel';
import BookingStats from '../../components/BookingsComponents/BookingStats/BookingStats';
import BookingFilters from '../../components/BookingsComponents/BookingFilters/BookingFilters';
import BookingPagination from '../../components/BookingsComponents/BookingPagination/BookingPagination';
import BookingMoreButton from '../../components/BookingsComponents/BookingMoreButton/BookingMoreButton';
import styles from './Bookings.module.scss';

const STATUS_META = {
  active: { label: 'Активная', className: 'statusActive' },
  confirmed: { label: 'Подтверждена', className: 'statusConfirmed' },
  completed: { label: 'Завершена', className: 'statusCompleted' },
  cancelled: { label: 'Отменена', className: 'statusCancelled' },
};

const PAYMENT_META = {
  paid: { label: 'Оплачено', className: 'paymentPaid' },
  pending: { label: 'Ожидает оплату', className: 'paymentPending' },
  refunded: { label: 'Отменено', className: 'paymentCancelled' },
};

const ITEMS_PER_PAGE = 8;

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

export default function Bookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [period, setPeriod] = useState('month');
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const total = mockBookings.length;
  const confirmedCount = mockBookings.filter((b) => b.status === 'confirmed').length;
  const activeCount = mockBookings.filter((b) => b.status === 'active').length;
  const completedCount = mockBookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = mockBookings.filter((b) => b.status === 'cancelled').length;

  const RU_MONTHS = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11,
  };

  // "25 мая 2024, 10:00" -> Date
  function parseRuDate(str) {
    const match = str.match(/(\d+)\s+(\S+)\s+(\d+),\s*(\d+):(\d+)/);
    if (!match) return null;
    const [, day, monthName, year, hours, minutes] = match;
    const month = RU_MONTHS[monthName.toLowerCase()];
    if (month == null) return null;
    return new Date(Number(year), month, Number(day), Number(hours), Number(minutes));
  }

  // Точка отсчёта "сегодня" для мок-данных — самая свежая дата начала аренды.
  // На реальных данных с бэкенда просто замени на new Date().
  const REFERENCE_DATE = mockBookings.reduce((latest, b) => {
    const d = parseRuDate(b.rentStart);
    return d && d > latest ? d : latest;
  }, new Date(0));

  function isWithinPeriod(dateStr, period, referenceDate) {
    if (period === 'all') return true;
    const date = parseRuDate(dateStr);
    if (!date) return true;

    if (period === 'today') {
      return (
        date.getFullYear() === referenceDate.getFullYear() &&
        date.getMonth() === referenceDate.getMonth() &&
        date.getDate() === referenceDate.getDate()
      );
    }

    if (period === 'week') {
      const startOfWeek = new Date(referenceDate);
      const day = startOfWeek.getDay(); // 0 = вс, 1 = пн...
      const diffToMonday = day === 0 ? 6 : day - 1;
      startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      return date >= startOfWeek && date <= referenceDate;
    }

    if (period === 'month') {
      return (
        date.getFullYear() === referenceDate.getFullYear() &&
        date.getMonth() === referenceDate.getMonth()
      );
    }

    if (period === 'quarter') {
      const refQuarter = Math.floor(referenceDate.getMonth() / 3);
      const dateQuarter = Math.floor(date.getMonth() / 3);
      return date.getFullYear() === referenceDate.getFullYear() && dateQuarter === refQuarter;
    }

    return true;
  }

  const filteredBookings = mockBookings.filter((booking) => {
    const haystack =
      `${booking.id} ${booking.client.name} ${booking.client.email} ${booking.client.phone} ${booking.car.plate}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesPeriod = isWithinPeriod(booking.createdAt, period, REFERENCE_DATE);
    return haystack && matchesStatus && matchesPeriod;
  });

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, period]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const rangeStart = filteredBookings.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length);

  const selectedBooking = mockBookings.find((b) => b.id === selectedId) ?? null;
  const pageList = buildPageList(currentPage, totalPages);

  return (
    <div className={styles.bookingsPage}>
      <div className={styles.bookingsMain}>
        <header className={styles.bookingsHeader}>
          <h1 className={styles.bookingsTitle}>Бронирования</h1>
          <p className={styles.bookingsSubtitle}>Управляйте всеми бронированиями и арендами.</p>
        </header>

        <BookingStats
          total={total}
          confirmedCount={confirmedCount}
          activeCount={activeCount}
          completedCount={completedCount}
          cancelledCount={cancelledCount}
        />

        <BookingFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          period={period}
          setPeriod={setPeriod}
        />

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '15%' }} />
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
                <th>Клиент</th>
                <th>Бронирование</th>
                <th>Период аренды</th>
                <th>Статус</th>
                <th>Сумма</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => {
                const status = STATUS_META[booking.status];
                const payment = PAYMENT_META[booking.paymentStatus];
                const isSelected = booking.id === selectedId;

                return (
                  <tr
                    key={booking.id}
                    className={isSelected ? styles.rowSelected : ''}
                    onClick={() => setSelectedId(booking.id)}>
                    <td>
                      <div className={styles.carCell}>
                        <div className={styles.carThumb}>
                          <img src={booking.car.imagePreview} alt={booking.car.model} />
                        </div>
                        <div>
                          <div className={styles.carName}>
                            {booking.car.brand} {booking.car.model}
                          </div>
                          <div className={styles.carPlate}>{booking.car.plate}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className={styles.clientCell}>
                        <p className={styles.clientName}>{booking.client.name}</p>
                        <p className={styles.clientPhone}>{booking.client.phone}</p>
                      </div>
                    </td>

                    <td>
                      <div className={styles.bookingCell}>
                        {/* <div className={styles.bookingId}>#{booking.id}</div> */}
                        <div className={styles.bookingMeta}>Создано {booking.createdAt}</div>
                      </div>
                    </td>

                    <td>
                      <div className={styles.periodCell}>
                        <div className={styles.rentStart}>{booking.rentStart}</div>
                        <div className={styles.periodMeta}>
                          {booking.rentEnd} · {booking.days} {booking.days === 1 ? 'день' : 'дня'}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`${styles.statusBadge} ${styles[status.className]}`}>
                        {status.label}
                      </span>
                    </td>

                    <td>
                      <div className={styles.amountCell}>
                        <div className={styles.amountValue}>€{booking.totalPaid.toFixed(2)}</div>
                        <div className={`${styles.paymentMeta} ${styles[payment.className]}`}>
                          {payment.label}
                        </div>
                      </div>
                    </td>

                    <td>
                      <BookingMoreButton
                        openMenuId={openMenuId}
                        setOpenMenuId={setOpenMenuId}
                        booking={booking}
                      />
                    </td>
                  </tr>
                );
              })}

              {paginatedBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    Ничего не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <BookingPagination
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          filteredBookings={filteredBookings}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageList={pageList}
          totalPages={totalPages}
        />
      </div>

      {selectedBooking && (
        <BookingDetailPanel booking={selectedBooking} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
