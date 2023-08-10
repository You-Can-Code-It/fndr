import styles from "./Link.module.css";
import { ReactNode } from "react";

type LinkProps = { 
    children: ReactNode,
    className?: string, 
};
  
  const Link: React.FC<LinkProps> = ({ children, className }) => {
    return <a className={`${styles.link} ${className}`}>{children}</a>   
  };
  
  export default Link;