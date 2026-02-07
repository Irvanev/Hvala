import React from 'react';
import styles from "./blue-button.module.css";

const BlueButton = ({ title, onClick = null, width, height }) => {
    return (
        <button
            style={{ width, height }}
            className={styles.button}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default BlueButton;