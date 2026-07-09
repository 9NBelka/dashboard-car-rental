import { LuX, LuPhone, LuMail, LuCalendar, LuArrowRight } from 'react-icons/lu';
import styles from './BookingDetailPanel.module.scss';

const STATUS_META = {
  active: { label: 'Активная', className: 'statusActive' },
  confirmed: { label: 'Подтверждена', className: 'statusConfirmed' },
  completed: { label: 'Завершена', className: 'statusCompleted' },
  cancelled: { label: 'Отменена', className: 'statusCancelled' },
};

const HISTORY_DOT = {
  created: 'dotBlue',
  confirmed: 'dotGreen',
  payment: 'dotTeal',
  started: 'dotPurple',
  completed: 'dotGray',
  cancelled: 'dotRed',
};

export default function BookingDetailPanel({ booking, onClose }) {
  const status = STATUS_META[booking.status];
  const { client, car } = booking;

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <div className={styles.panelTitleRow}>
            <h2 className={styles.panelTitle}>Бронирование </h2>
            <span className={`${styles.panelTag} ${styles[status.className]}`}>{status.label}</span>
          </div>
        </div>
        <button className={styles.closeButton} type='button' onClick={onClose}>
          <LuX className={styles.closeButtonIcon} />
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Клиент: {client.name}</span>
        </div>
        <div className={styles.clientRow}>
          <div className={styles.clientPhone}>
            <div className={styles.clientIconAndPhoneText}>
              <LuPhone className={styles.clientIcon} />
              <p className={styles.clientPhoneText}>{client.phone}</p>
            </div>
            <div className={styles.clientIconAndPhoneText}>
              <LuMail className={styles.clientIcon} />
              <p className={styles.clientEmail}>{client.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Автомобиль</span>
        </div>
        <div className={styles.carRow}>
          <img className={styles.carThumb} src={car.imagePreview} alt={car.model} />
          <div className={styles.carInfo}>
            <p className={styles.carName}>
              {car.brand} {car.model}
            </p>
            <p className={styles.carMeta}>
              {car.year} · {car.plate}
            </p>
          </div>
          <a href={`/cars?carId=${car.id}`} className={styles.linkAction}>
            Подробнее
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Период аренды</span>
        </div>
        <div className={styles.periodRow}>
          <div className={styles.periodCard}>
            <div className={styles.periodLabel}>
              <LuCalendar className={styles.periodIcon} /> Начало
            </div>
            <div className={styles.periodValue}>{booking.rentStart}</div>
          </div>
          <LuArrowRight className={styles.periodArrow} />
          <div className={styles.periodCard}>
            <div className={styles.periodLabel}>
              <LuCalendar className={styles.periodIcon} /> Окончание
            </div>
            <div className={styles.periodValue}>{booking.rentEnd}</div>
          </div>
        </div>
        <div className={styles.periodFooter}>
          <span>
            {booking.days} {booking.days === 1 ? 'день' : 'дня'}
          </span>
          {booking.returnNote && <span className={styles.returnNote}>{booking.returnNote}</span>}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Финансы</span>
        </div>
        <div className={styles.financeGrid}>
          <div className={styles.financeBox}>
            <div className={styles.financeLabel}>Стоимость аренды</div>
            <div className={styles.financeValue}>€{booking.rentalCost.toFixed(2)}</div>
          </div>
          <div className={styles.financeBox}>
            <div className={styles.financeLabel}>Доп. услуги</div>
            <div className={styles.financeValue}>€{booking.extras.toFixed(2)}</div>
          </div>
          <div className={styles.financeBox}>
            <div className={styles.financeLabel}>Депозит</div>
            <div className={styles.financeValue}>€{booking.deposit.toFixed(2)}</div>
          </div>
          <div className={styles.financeBox}>
            <div className={styles.financeLabel}>Итого оплачено</div>
            <div className={styles.financeValue}>€{booking.totalPaid.toFixed(2)}</div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>История</span>
        </div>
        {booking.history.map((h) => (
          <div key={h.id} className={styles.historyRow}>
            <span className={`${styles.historyDot} ${styles[HISTORY_DOT[h.type]]}`} />
            <div className={styles.historyTitle}>{h.title}</div>
            <div className={styles.historyTime}>{h.time}</div>
          </div>
        ))}
      </section>

      <div className={styles.actions}>
        {/* <button
          type='button'
          className={styles.primaryButton}
          disabled={booking.status === 'cancelled'}>
          Открыть аренду
        </button>
        <button type='button' className={styles.secondaryButton}>
          Изменить бронирование
        </button> */}
        <button
          type='button'
          className={styles.dangerButton}
          disabled={booking.status === 'cancelled' || booking.status === 'completed'}>
          Отменить бронирование
        </button>
      </div>
    </aside>
  );
}
