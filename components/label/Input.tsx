import React from "react";
import { ReactNode } from "react";
import styles from "./Input.module.css";

type InputProps = {
  children: ReactNode;
  className?: string;
};

const Input: React.FC<InputProps> = ({ children, className, ...props }) => {
  return (
    <input {...props} className={styles.label}>
      {children}
    </input>
  );
};

export default Input;
