import React, { HTMLAttributes, LabelHTMLAttributes } from "react";
import { ReactNode } from "react";
import styles from "./Label.module.css";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {}

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  );
};

export default Label;
