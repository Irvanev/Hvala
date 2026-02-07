import React from 'react';
import styles from './custom-sheet.module.css';

const CustomSheet = ({ isVisible, onClose }) => {
    return (
        <div className={`${styles.customSheet} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.customSheetContent}>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default CustomSheet;