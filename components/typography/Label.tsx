import styles from "./Label.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";

type Heading1Props = {
  children: ReactNode;
  variant?: string;
  onClick?: () => void;
  htmlFor?: string;
};

const Label: React.FC<Heading1Props> = ({ children, variant, ...props }) => {
  return (
    // for a "label" tag we need this <div> to apply margin-bottom
    <div className={styles.labelContainer}>
      <label
        {...props}
        className={`${styles.standardLabel} ${variant && styles[variant]} ${
          fontInter.className
        }`}
      >
        {children}
      </label>
    </div>
  );
};

export default Label;
