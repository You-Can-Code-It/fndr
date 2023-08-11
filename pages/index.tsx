import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <Logo />
        </header>
        <main className={styles.mainContainer}>
          <div className={styles.mainDropdownContainer}>
            <Dropdown />
          </div>

          <div className={styles.mainCardContainer}>
            <Card
              title="Booking"
              location="Amsterdam"
              website="website"
              lastVisit="seen 2 days ago by"
            />
            <Card
              title="Booking"
              location="Amsterdam"
              website="website"
              lastVisit="seen 2 days ago by"
            />
            <Card
              title="Booking"
              location="Amsterdam"
              website="website"
              lastVisit="seen 2 days ago by"
            />
            <Card
              title="Booking"
              location="Amsterdam"
              website="website"
              lastVisit="seen 2 days ago by"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
