import { useEffect, useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import styles from './CustomSelect.module.scss';

export default function CustomSelect({ options, value, onChange, placeholder = 'Выбрать...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Закрываем дропдаун при клике снаружи
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  function handleSelect(optionValue) {
    onChange(optionValue);
    setIsOpen(false);
  }

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button
        type='button'
        className={`${styles.select} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <LuChevronDown className={styles.selectArrow} />
      </button>

      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
