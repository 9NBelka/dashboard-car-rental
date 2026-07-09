import { LuBadgeInfo } from 'react-icons/lu';
import styles from './InfoTrigger.module.scss';

export default function InfoTrigger() {
  return (
    <div className={styles.infoTrigger}>
      <LuBadgeInfo className={styles.iconInfo} />
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>Статусы бронирования</div>

        <div className={styles.tooltipRow}>
          <span className={`${styles.tooltipBadge} ${styles.badgeConfirmed}`}>Подтверждена</span>
          <p className={styles.tooltipText}>
            Бронь создана и подтверждена, но аренда физически ещё не началась.
          </p>
        </div>

        <div className={styles.tooltipRow}>
          <span className={`${styles.tooltipBadge} ${styles.badgeActive}`}>Активная</span>
          <p className={styles.tooltipText}>Аренда идёт прямо сейчас, клиент уже забрал машину.</p>
        </div>

        <div className={styles.tooltipRow}>
          <span className={`${styles.tooltipBadge} ${styles.badgeCompleted}`}>Завершена</span>
          <p className={styles.tooltipText}>Аренда закончилась, машина возвращена.</p>
        </div>

        <div className={styles.tooltipRow}>
          <span className={`${styles.tooltipBadge} ${styles.badgeCancelled}`}>Отменена</span>
          <p className={styles.tooltipText}>
            Бронь отменена клиентом или арендодателем, аренды не будет.
          </p>
        </div>
      </div>
    </div>
  );
}
