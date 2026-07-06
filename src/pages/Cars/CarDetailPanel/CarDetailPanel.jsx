import { useState } from 'react';
import {
  LuX,
  LuGauge,
  LuRoute,
  LuFuel,
  LuPower,
  LuZap,
  LuThermometer,
  LuMapPin,
  LuPhone,
  LuTriangleAlert,
  LuCar,
} from 'react-icons/lu';
import styles from './CarDetailPanel.module.scss';

const TABS = ['Обзор', 'История', 'Документы', 'Обслуживание'];

export default function CarDetailPanel({ car, onClose }) {
  const [activeTab, setActiveTab] = useState('Обзор');

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <div className={styles.panelTitleRow}>
            <h2 className={styles.panelTitle}>
              {car.brand} {car.model}
            </h2>
            {car.status === 'rented' && <span className={styles.rentedTag}>В аренде</span>}
          </div>
          <div className={styles.panelPlate}>{car.plate}</div>
        </div>
        <button className={styles.closeButton} type='button' onClick={onClose}>
          <LuX className={styles.closeButtonIcon} />
        </button>
      </div>

      {/* Заглушка под реальное фото автомобиля */}
      <div className={styles.carPhoto}>
        <img src={car.imagePreview} alt={car.model} />
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type='button'
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== 'Обзор' ? (
        <div className={styles.tabPlaceholder}>Раздел в разработке</div>
      ) : (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>Местоположение</span>
              <span className={styles.liveTag}>В реальном времени</span>
            </div>
            <div className={styles.address}>
              <LuMapPin className={styles.addressIcon} />
              {car.location.address}
            </div>

            {/* Заглушка под реальную карту (интеграция позже) */}
            <div className={styles.mapPreview}>Карта</div>
          </section>

          <section className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuGauge className={styles.statIcon} /> Скорость
              </div>
              <div className={styles.statBoxValue}>
                {car.speed != null ? `${car.speed} км/ч` : '—'}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuRoute className={styles.statIcon} /> Пробег сегодня
              </div>
              <div className={styles.statBoxValue}>{car.mileageToday} км</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuFuel className={styles.statIcon} /> Уровень топлива
              </div>
              <div className={styles.statBoxValue}>
                {car.fuelLevel != null ? `${car.fuelLevel}%` : '—'}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuPower className={styles.statIcon} /> Зажигание
              </div>
              <div className={styles.statBoxValue}>
                <span className={car.ignition ? styles.dotOn : styles.dotOff} />
                {car.ignition ? 'Включено' : 'Выключено'}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuZap className={styles.statIcon} /> Напряжение
              </div>
              <div className={styles.statBoxValue}>{car.voltage} В</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statBoxLabel}>
                <LuThermometer className={styles.statIcon} /> Температура
              </div>
              <div className={styles.statBoxValue}>{car.temperature} °C</div>
            </div>
          </section>

          {car.driver && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span>Текущая аренда</span>
                {/* <a href='#' className={styles.linkAction}>
                  Посмотреть все
                </a> */}
              </div>
              <div className={styles.driverRow}>
                <div className={styles.driverInfo}>
                  <p className={styles.driverName}>{car.driver.name}</p>
                  <div className={styles.driverContact}>
                    <LuPhone className={styles.driverIcon} /> {car.driver.phone}
                  </div>
                </div>
                <div className={styles.rentDates}>
                  <p>Начало аренды</p>
                  <p className={styles.rentDatesValue}>{car.rentStart}</p>
                  <p>Конец аренды</p>
                  <p className={styles.rentDatesValue}>{car.rentEnd}</p>
                </div>
              </div>
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>Уведомления по автомобилю</span>
              <a href='/notifications' className={styles.linkAction}>
                Посмотреть все
              </a>
            </div>
            {car.notifications.length === 0 ? (
              <div className={styles.noNotifications}>Уведомлений нет</div>
            ) : (
              car.notifications.map((n) => (
                <div key={n.id} className={styles.notificationRow}>
                  <LuTriangleAlert className={styles.notificationIcon} />
                  <div>
                    <div className={styles.notificationTitle}>{n.title}</div>
                    <div className={styles.notificationDetail}>{n.detail}</div>
                  </div>
                  <div className={styles.notificationTime}>{n.time}</div>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </aside>
  );
}
