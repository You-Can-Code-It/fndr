import React, { forwardRef } from "react";
import styles from "./Input.module.css";

export type Ref = HTMLInputElement;

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = forwardRef<Ref, InputProps>(function Input(
  { children, className, ...props },
  ref
) {
  return (
    <input ref={ref} {...props} className={styles.input}>
      {children}
    </input>
  );
});

export default Input;
