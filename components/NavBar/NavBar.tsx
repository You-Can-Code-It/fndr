import styles from "./NavBar.module.css";
import { ReactNode } from "react";
import { fontInter } from "../../styles/fonts/index";
import Logo from "../logo/Logo";
import LoginControls from "../LoginControls/LoginControls";

type Heading1Props = {
  children?: ReactNode;
  variant?: string;
  onClick?: () => void;
};

const NavBar: React.FC<Heading1Props> = ({ children, variant, ...props }) => {
  return (
    <div {...props} className={styles.navBarContainer}>
      <Logo />
      <div className={styles.loginControls}>
        <LoginControls />
      </div>
    </div>
  );
};

export default NavBar;
