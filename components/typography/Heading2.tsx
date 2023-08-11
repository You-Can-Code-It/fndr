import styles from "./Heading2.module.css";
import { ReactNode } from "react";

type Heading2Props = {
  children: ReactNode;
  className?: string;
};

const Heading2: React.FC<Heading2Props> = ({ children, className }) => {
  return <h2 className={`${styles.heading2} ${className}`}>{children}</h2>;
};

export default Heading2;
