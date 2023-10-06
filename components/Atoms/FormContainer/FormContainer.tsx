import React, { forwardRef } from "react";
import styles from "./FormContainer.module.css";

export type Ref = HTMLDivElement;

export interface FormContainerProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const FormContainer = forwardRef<Ref, FormContainerProps>(
  function FormContainer({ children, className, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={styles.formContainer}>
        {children}
      </div>
    );
  }
);

export default FormContainer;
