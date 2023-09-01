import styles from "./Heading1.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";

type Heading1Props = {
  children: ReactNode;
  variant?: string;
};

const Heading1: React.FC<Heading1Props> = ({ children, variant }) => {
  return (
    <h1
      className={`${styles.heading1} ${variant && styles[variant]} ${
        fontInter.className
      }`}
    >
      {children}
    </h1>
  );
};

export default Heading1;
