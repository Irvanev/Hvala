import React from 'react';
import styles from "./blue-button.module.css";

const BlueButton = ({ title, onClick = null, width, height, children }) => {
    return (
        <button
            style={{ width, height }}
            className={styles.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default BlueButton;