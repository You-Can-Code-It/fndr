import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <header className={styles.headerContainer}>
        <Logo />
      </header>
      <main>
        <Dropdown />
        <Card />
      </main>
    </>
  );
}
