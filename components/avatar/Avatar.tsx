import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type AvatarProps = {
  imageSource: string;
  className?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ imageSource, className }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  return (
    <div className={`${styles.avatarContainer} ${styles[className]}`}>
      <Link href={`/dashboard/${userEmail}`}>
        <Image
          src={imageSource}
          alt="User Avatar"
          className={`${styles.avatarImage} ${styles[className]}`}
          fill
          sizes="(min-width: 768px) 100vw"
        />
      </Link>
    </div>
  );
};

export default Avatar;
