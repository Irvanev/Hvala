import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './custom-dropdown.module.css';

const CustomDropdown = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {t('category')}
      </button>
      {isOpen && (
        <>
          <div onClick={toggleDropdown}></div>
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => handleCategorySelect('')}
            >
              {t('all')}
            </div>
            {categories.map((category, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleCategorySelect(category)}
              >
                {t(category)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDropdown;