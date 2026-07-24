import { useState } from 'react';
import { LuX } from 'react-icons/lu';
import CustomSelect from '../../CustomSelect/CustomSelect';
import styles from './AddCarModal.module.scss';

const FUEL_TYPE_OPTIONS = [
  { value: 'Бензин', label: 'Бензин' },
  { value: 'Дизель', label: 'Дизель' },
  { value: 'Гибрид', label: 'Гибрид' },
  { value: 'Электро', label: 'Электро' },
];

const STATUS_OPTIONS = [
  { value: 'available', label: 'Доступен' },
  { value: 'rented', label: 'В аренде' },
  { value: 'maintenance', label: 'На обслуживании' },
  { value: 'attention', label: 'Требует внимания' },
];

const EMPTY_FORM = {
  brand: '',
  model: '',
  plate: '',
  year: '',
  color: '',
  vin: '',
  type: 'Бензин',
  status: 'available',
  mileageTotal: '',
  fuelLevel: '',
  city: '',
  country: '',
  address: '',
  imagePreview: '',
  // attentionNote: '',
};

export default function AddCarModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function blockInvalidNumberChars(e) {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleNumberChange(field, value, min = 0, max = Infinity) {
    if (value === '') {
      handleChange(field, '');
      return;
    }

    const number = Number(value);

    // На случай вставки некорректного текста
    if (Number.isNaN(number)) {
      return;
    }

    handleChange(field, Math.min(max, Math.max(min, number)));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Собираем объект в форме, которую ожидает mockCars / CarDetailPanel.
    // Реальные телеметрические поля (speed, ignition, voltage, temperature)
    // сюда не входят — они придут с датчиков, а не заполняются вручную.
    const newCar = {
      brand: form.brand,
      model: form.model,
      plate: form.plate,
      year: form.year ? Number(form.year) : null,
      color: form.color,
      vin: form.vin,
      type: form.type,
      status: form.status,
      driver: null,
      bookingId: null,
      rentStart: null,
      rentEnd: null,
      mileageTotal: form.mileageTotal ? Number(form.mileageTotal) : 0,
      mileageToday: 0,
      fuelLevel: form.fuelLevel ? Number(form.fuelLevel) : null,
      location: {
        city: form.city,
        country: form.country,
        address: form.address,
      },
      speed: null,
      ignition: false,
      voltage: null,
      temperature: null,
      // attentionNote: form.attentionNote || null,
      notifications: [],
      imagePreview: form.imagePreview,
    };

    // Пока нет бэкенда — просто отдаём готовый объект наверх (или в консоль),
    // чтобы структура была видна и легко подключалась к реальному API.
    onSubmit?.(newCar);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Добавить автомобиль</h2>
          <button className={styles.closeButton} type='button' onClick={onClose}>
            <LuX className={styles.closeButtonIcon} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formBody}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Основная информация</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Марка</label>
                  <input
                    type='text'
                    placeholder='Tesla'
                    value={form.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Модель</label>
                  <input
                    type='text'
                    placeholder='Model 3 LR'
                    value={form.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Гос. номер</label>
                  <input
                    type='text'
                    placeholder='AA1234BC'
                    value={form.plate}
                    onChange={(e) => handleChange('plate', e.target.value.toUpperCase())}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Год выпуска</label>
                  <input
                    type='number'
                    placeholder='2024'
                    value={form.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Цвет</label>
                  <input
                    type='text'
                    placeholder='Чёрный'
                    value={form.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>VIN</label>
                  <input
                    type='text'
                    placeholder='WVWZZZ1KZ6W123456'
                    value={form.vin}
                    onChange={(e) => handleChange('vin', e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Технические характеристики</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Тип топлива</label>
                  <CustomSelect
                    options={FUEL_TYPE_OPTIONS}
                    value={form.type}
                    onChange={(value) => handleChange('type', value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Статус</label>
                  <CustomSelect
                    options={STATUS_OPTIONS}
                    value={form.status}
                    onChange={(value) => handleChange('status', value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Пробег, км</label>
                  <input
                    type='number'
                    placeholder='0'
                    value={form.mileageTotal}
                    onKeyDown={blockInvalidNumberChars}
                    onChange={(e) => handleNumberChange('mileageTotal', e.target.value, 0)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Уровень топлива / заряда, %</label>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    placeholder='100'
                    value={form.fuelLevel}
                    onKeyDown={blockInvalidNumberChars}
                    onChange={(e) => handleNumberChange('fuelLevel', e.target.value, 0, 100)}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Местоположение</h3>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Город</label>
                  <input
                    type='text'
                    placeholder='Madrid'
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Страна</label>
                  <input
                    type='text'
                    placeholder='Испания'
                    value={form.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label>Адрес</label>
                  <input
                    type='text'
                    placeholder='Calle de Alcalá, 123, 28009 Madrid, España'
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Фото</h3>
              <div className={styles.grid2}>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label>Ссылка на фото</label>
                  <input
                    type='text'
                    placeholder='https://...'
                    value={form.imagePreview}
                    onChange={(e) => handleChange('imagePreview', e.target.value)}
                  />
                </div>
                {/* <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label>Заметка (необязательно)</label>
                  <input
                    type='text'
                    placeholder='Например: техосмотр просрочен'
                    value={form.attentionNote}
                    onChange={(e) => handleChange('attentionNote', e.target.value)}
                  />
                </div> */}
              </div>
            </section>
          </div>

          <div className={styles.formFooter}>
            <button className={styles.cancelButton} type='button' onClick={onClose}>
              Отмена
            </button>
            <button className={styles.submitButton} type='submit'>
              Добавить автомобиль
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
