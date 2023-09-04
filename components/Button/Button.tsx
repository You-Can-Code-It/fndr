import styles from "./Button.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";
import Link from "next/link";

type Heading1Props = {
  children: ReactNode;
  variant?: string;
  onClick?: () => void;
  href?: string;
};

const Button: React.FC<Heading1Props> = ({
  children,
  variant,
  href,
  ...props
}) => {
  return (
    <>
      {" "}
      {href && (
        <Link href={href}>
          <button
            className={`${styles.mainContainer} ${variant && styles[variant]} ${
              fontInter.className
            }`}
            {...props}
          >
            {children}
          </button>
        </Link>
      )}
      {!href && (
        <button
          className={`${styles.mainContainer} ${variant && styles[variant]} ${
            fontInter.className
          }`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
