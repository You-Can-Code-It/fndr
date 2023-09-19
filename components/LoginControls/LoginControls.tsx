import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./LoginControls.module.css";

export default function LoginControls() {
  const { data: session } = useSession();
  if (session?.user && session?.user?.image) {
    return (
      <div className={styles.container}>
        <img
          src={session?.user?.image}
          alt="User avatar"
          className={styles.userAvatar}
        />
        <button className={styles.buttonSignInOut} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* Not signed in <br /> */}
      <button className={styles.buttonSignInOut} onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
