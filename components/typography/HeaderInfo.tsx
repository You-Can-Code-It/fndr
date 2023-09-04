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
    // for a "label" tag we need this <div> to apply margin-bottom

    <h4
      className={`${styles.mainHeader} ${variant && styles[variant]} ${
        fontInter.className
      }`}
      {...props}
    >
      {children}
    </h4>
  );
};

export default HeaderInfo;
