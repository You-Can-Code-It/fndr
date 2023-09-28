import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./LoginControls.module.css";
import Button from "../Button/Button";
import Avatar from "../avatar/Avatar";

export default function LoginControls() {
  const { data: session } = useSession();
  if (session?.user && session?.user?.image) {
    return (
      <div className={styles.container}>
        <Avatar
          imageSource={session?.user?.image}
          alt="User avatar"
          variant="userAvatar"
        />
        <Button variant="saveButton" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* Not signed in <br /> */}
      <Button variant="saveButton" onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  );
}
