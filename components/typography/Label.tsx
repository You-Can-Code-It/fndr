import styles from "./Label.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";

type Heading1Props = {
  children: ReactNode;
  variant?: string;
  onClick?: () => void;
};

const Label: React.FC<Heading1Props> = ({
  children,
  variant = "standardLabel",
  ...props
}) => {
  return (
    <p
      className={`${styles.heading1} ${variant && styles[variant]} ${
        fontInter.className
      }`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Label;
