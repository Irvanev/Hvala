import React from 'react';
import styles from "./orange-button.module.css";

const OrangeButton = ({
  title,
  onClick = null,
  width,
  height,
  padding,
  margin,
  className = '',
  style = {},
  children,
  ...restProps
}) => {
  const buttonStyles = {
    width,
    height,
    padding,
    margin,
    ...style
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      style={buttonStyles}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default OrangeButton;