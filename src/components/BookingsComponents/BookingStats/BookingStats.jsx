import { LuCalendarCheck, LuCircleCheck, LuClock, LuFlag, LuCircleX } from 'react-icons/lu';
import styles from './BookingStats.module.scss';

export default function BookingStats({
  total,
  confirmedCount,
  activeCount,
  completedCount,
  cancelledCount,
}) {
  const pct = (count) => (total > 0 ? Math.round((count / total) * 100) : 0);

  return (
    <div className={styles.statsRow}>
      <div className={`${styles.statCard} ${styles.statCyan}`}>
        <div>
          <div className={styles.statLabel}>Всего бронирований</div>
          <div className={styles.statValue}>{total}</div>
          <div className={styles.statMeta}>+12 за неделю</div>
        </div>
        <LuCalendarCheck className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statBlue}`}>
        <div>
          <div className={styles.statLabel}>Подтвержденные</div>
          <div className={styles.statValue}>{confirmedCount}</div>
          <div className={styles.statMeta}>{pct(confirmedCount)}% от всех</div>
        </div>
        <LuCircleCheck className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statGreen}`}>
        <div>
          <div className={styles.statLabel}>Активные аренды</div>
          <div className={styles.statValue}>{activeCount}</div>
          <div className={styles.statMeta}>{pct(activeCount)}% от всех</div>
        </div>
        <LuClock className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statOrange}`}>
        <div>
          <div className={styles.statLabel}>Завершенные</div>
          <div className={styles.statValue}>{completedCount}</div>
          <div className={styles.statMeta}>+8 за неделю</div>
        </div>
        <LuFlag className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statRed}`}>
        <div>
          <div className={styles.statLabel}>Отмененные</div>
          <div className={styles.statValue}>{cancelledCount}</div>
          <div className={styles.statMeta}>{pct(cancelledCount)}% от всех</div>
        </div>
        <LuCircleX className={styles.statIcon} />
      </div>
    </div>
  );
}
