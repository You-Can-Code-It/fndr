import React from "react";
import styles from "./BackIcon.module.css";
import Image from "next/image";

type BackIconProps = {
  variant?: string;
};

const BackIcon: React.FC<BackIconProps> = ({
  variant,
  ...props
}: BackIconProps) => {
  return (
    <div
      {...props}
      className={`${styles.backContainer} ${variant && styles[variant]}`}
    >
      <Image
        src={"/back.svg"}
        alt="Back arror"
        fill
        sizes="(min-width: 768px) 100vw"
      />
    </div>
  );
};

export default BackIcon;
