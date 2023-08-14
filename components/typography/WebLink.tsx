import styles from "./Link.module.css";
import { ReactNode } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // no additional types are needed
  website: string;
}

const WebLink = ({ children, className, website, ...props }: LinkProps) => {
  return (
    <a
      href={website}
      target="_blank"
      {...props}
      className={`${styles.link} ${className}`}
    >
      {children}
    </a>
  );
};

export default WebLink;
