import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./input-search.module.css";

const InputSearch = ({ placeholder, width, height, value, onChange }) => {
    const { t } = useTranslation();
    return (
        <div className='d-flex w-100'>
            <input
                className={styles.input}
                style={{ width, height }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button className={styles.button}>{t('search')}</button>
        </div>
    );
};

export default InputSearch;