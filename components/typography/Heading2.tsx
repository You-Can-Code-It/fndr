import styles from "./Heading2.module.css"
import { ReactNode } from "react";

type HeadingProps2 = { 
    children: ReactNode,
    className?: string, 
};
  
  const Heading2: React.FC<HeadingProps2> = ({ children, className }) => {
    return <h2 className={`${styles.heading2} ${className}`}>{children}</h2>   
  };
  
  export default Heading2;
