import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

type AvatarProps = {
  imageSource: string;
  variant?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ imageSource, variant }) => {
  return (
    <div className={`${styles.avatarContainer} ${variant && styles[variant]}`}>
      <Image
        src={imageSource}
        alt="User Avatar"
        className={`${styles.avatarImage} ${variant && styles[variant]}`}
        fill
        sizes="(min-width: 768px) 100vw"
      />
    </div>
  );
};

export default Avatar;
