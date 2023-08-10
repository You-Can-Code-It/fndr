import styles from "./Heading1.module.css";
import { ReactNode } from "react";

type Heading1Props = { 
    children: ReactNode,
    className?: string, 
};
  
  const Heading1: React.FC<Heading1Props> = ({ children, className }) => {
    return <h1 className={`${styles.heading1} ${className}`}>{children}</h1>   
  };
  
  export default Heading1;
