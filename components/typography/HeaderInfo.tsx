import styles from "./HeaderInfo.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";

type Heading1Props = {
  children: ReactNode;
  variant?: string;
  onClick?: () => void;
};

const HeaderInfo: React.FC<Heading1Props> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <p
      className={`${styles.mainHeader} ${variant && styles[variant]} ${
        fontInter.className
      }`}
      {...props}
    >
      {children}
    </p>
  );
};

export default HeaderInfo;
