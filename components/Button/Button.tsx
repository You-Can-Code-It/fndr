import styles from "./Button.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";
import Link from "next/link";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: string | "optionButton";
  colorScheme?: "danger";
  size?: "large";
  fullWidth?: boolean;
  href?: string;
}

const Button = ({
  children,
  variant,
  href,
  size,
  fullWidth = false,
  colorScheme,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      {href && (
        <Link href={href}>
          <button
            className={`${styles.mainContainer} ${variant && styles[variant]} ${
              colorScheme && styles[colorScheme]
            } ${fullWidth && styles.fullWidth} ${size && styles[size]} ${
              fontInter.className
            } ${className}`}
            {...props}
          >
            {children}
          </button>
        </Link>
      )}
      {!href && (
        <button
          className={`${styles.mainContainer} ${variant && styles[variant]} ${
            colorScheme && styles[colorScheme]
          } ${fullWidth && styles.fullWidth} ${size && styles[size]} ${
            fontInter.className
          } ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
