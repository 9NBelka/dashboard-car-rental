import { LuCar, LuCircleCheck, LuWrench } from 'react-icons/lu';
import styles from './CarStats.module.scss';

export default function CarStats({ total, availableCount, rentedCount, maintenanceCount }) {
  return (
    <div className={styles.statsRow}>
      <div className={`${styles.statCard} ${styles.statBlue}`}>
        <div>
          <div className={styles.statLabel}>Всего автомобилей</div>
          <div className={styles.statValue}>{total}</div>
          <div className={styles.statMeta}>+2 за месяц</div>
        </div>
        <LuCar className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statGreen}`}>
        <div>
          <div className={styles.statLabel}>Доступно</div>
          <div className={styles.statValue}>{availableCount}</div>
          <div className={styles.statMeta}>
            {Math.round((availableCount / total) * 100)}% автопарка
          </div>
        </div>
        <LuCircleCheck className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statOrange}`}>
        <div>
          <div className={styles.statLabel}>В аренде</div>
          <div className={styles.statValue}>{rentedCount}</div>
          <div className={styles.statMeta}>
            {Math.round((rentedCount / total) * 100)}% автопарка
          </div>
        </div>
        <LuCar className={styles.statIcon} />
      </div>

      <div className={`${styles.statCard} ${styles.statRed}`}>
        <div>
          <div className={styles.statLabel}>На обслуживании</div>
          <div className={styles.statValue}>{maintenanceCount}</div>
          <div className={styles.statMeta}>
            {Math.round((maintenanceCount / total) * 100)}% автопарка
          </div>
        </div>
        <LuWrench className={styles.statIcon} />
      </div>
    </div>
  );
}
