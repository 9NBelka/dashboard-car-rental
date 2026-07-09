import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import styles from './BookingPagination.module.scss';

export default function BookingPagination({
  rangeStart,
  rangeEnd,
  filteredBookings,
  currentPage,
  setCurrentPage,
  pageList,
  totalPages,
}) {
  return (
    <div className={styles.pagination}>
      <span>
        Показано {rangeStart}–{rangeEnd} из {filteredBookings.length} бронирований
      </span>
      <div className={styles.pageControls}>
        <button
          type='button'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          <LuChevronLeft className={styles.icon} />
        </button>

        {pageList.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
              …
            </span>
          ) : (
            <button
              key={page}
              type='button'
              className={page === currentPage ? styles.pageActive : ''}
              onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ),
        )}

        <button
          type='button'
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
          <LuChevronRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
