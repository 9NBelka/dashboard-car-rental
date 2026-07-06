import styles from './PageStub.module.scss';

// Общий каркас страницы: заголовок + место под будущий контент.
// Когда появятся реальные данные, содержимое карточки просто заменяется
// на нужные компоненты вместо пустого блока.
export default function PageStub({ title, subtitle, children }) {
  return (
    <div className={styles.pageStub}>
      <header className={styles.pageStubHeader}>
        <h1 className={styles.pageStubTitle}>{title}</h1>
        {subtitle && <p className={styles.pageStubSubtitle}>{subtitle}</p>}
      </header>

      <div className={styles.pageStubBody}>
        {children ?? (
          <div className={styles.pageStubEmpty}>
            Раздел готов к подключению данных
          </div>
        )}
      </div>
    </div>
  );
}
