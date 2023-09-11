import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

type AvatarProps = {
  imageSource: string;
  className: string;
};

const Avatar: React.FC<AvatarProps> = ({ imageSource, className }) => {
  return (
    <div className={`${styles.avatarContainer} ${styles[className]}`}>
      <Image
        src={imageSource}
        alt="User Avatar"
        className={`${styles.avatarImage} ${styles[className]}`}
        fill
        sizes="(min-width: 768px) 100vw"
      />
    </div>
  );
};

export default Avatar;
