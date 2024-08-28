import React from 'react';
import styles from "./orange-button.module.css";

const OrangeButton = ({ title, onClick = null, width, height }) => {
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

export default OrangeButton;