import { useEffect } from 'react';
import { LuEllipsis } from 'react-icons/lu';
import styles from './BookingMoreButton.module.scss';

export default function BookingMoreButton({ openMenuId, setOpenMenuId, booking }) {
  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-booking-menu]')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);
  const handleEdit = (b) => {
    setOpenMenuId(null);
    // TODO: логика редактирования бронирования
    console.log('edit booking', b.id);
  };

  const handleCancel = (b) => {
    setOpenMenuId(null);
    // TODO: логика отмены бронирования
    console.log('cancel booking', b.id);
  };

  return (
    <div className={styles.actionsCell} data-booking-menu>
      <button
        className={styles.moreButton}
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(openMenuId === booking.id ? null : booking.id);
        }}>
        <LuEllipsis className={styles.iconThreeDots} />
      </button>

      {openMenuId === booking.id && (
        <div className={styles.actionsMenu} data-booking-menu onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            className={styles.actionsMenuItem}
            onClick={() => handleEdit(booking)}>
            Изменить
          </button>
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <button
              type='button'
              className={`${styles.actionsMenuItem} ${styles.actionsMenuItemDanger}`}
              onClick={() => handleCancel(booking)}>
              Отменить
            </button>
          )}
        </div>
      )}
    </div>
  );
}
