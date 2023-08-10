import styles from "./Heading1.module.css";
import { ReactNode } from "react";

type HeadingProps1 = { 
    children: ReactNode,
    className?: string, 
};
  
  const Heading1: React.FC<HeadingProps1> = ({ children, className }) => {
    return <h1 className={`${styles.heading1} ${className}`}>{children}</h1>   
  };
  
  export default Heading1;
