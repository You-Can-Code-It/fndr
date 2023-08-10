import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <Logo />
      </header>
      <main className={styles.mainContainer}>
        <Dropdown />
        
        <Card 
          title="Booking"
          location="Amsterdam"
          website="website"
          lastVisit="seen 2 days ago by"
        />
      </main>
    </div>
  );
}
