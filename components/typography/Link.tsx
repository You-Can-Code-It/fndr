import styles from "./Link.module.css";
import { ReactNode } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // no additional types are needed
}

const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <a {...props} className={`${styles.link} ${className}`}>
      {children}
    </a>
  );
};

export default Link;
