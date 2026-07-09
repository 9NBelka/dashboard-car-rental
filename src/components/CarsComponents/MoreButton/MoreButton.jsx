import { useEffect } from 'react';
import styles from './MoreButton.module.scss';
import { LuEllipsis } from 'react-icons/lu';

export default function MoreButton({ openMenuId, setOpenMenuId, car }) {
  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-car-menu]')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const handleEdit = (car) => {
    setOpenMenuId(null);
    // TODO: логика редактирования
    console.log('edit', car.id);
  };

  const handleDelete = (car) => {
    setOpenMenuId(null);
    // TODO: логика удаления
    console.log('delete', car.id);
  };

  return (
    <div className={styles.actionsCell} data-car-menu>
      <button
        className={styles.moreButton}
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(openMenuId === car.id ? null : car.id);
        }}>
        <LuEllipsis className={styles.iconThreeDots} />
      </button>

      {openMenuId === car.id && (
        <div className={styles.actionsMenu} data-car-menu onClick={(e) => e.stopPropagation()}>
          <button type='button' className={styles.actionsMenuItem} onClick={() => handleEdit(car)}>
            Изменить
          </button>
          <button
            type='button'
            className={`${styles.actionsMenuItem} ${styles.actionsMenuItemDanger}`}
            onClick={() => handleDelete(car)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
