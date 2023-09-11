import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./LoginControls.module.css";
import Avatar from "../avatar/Avatar";

export default function LoginControls() {
  const { data: session } = useSession();
  console.log("LoginControls: session", session);
  if (session?.user && session?.user?.image) {
    return (
      <div className={styles.container}>
        <Avatar
          imageSource={session?.user?.image}
          alt="User avatar"
          // className={styles.userAvatar}
          className="detailsPage"
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
