import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "./db";
import LoginControls from "@/components/LoginControls/LoginControls";
import Link from "next/link";
import AddCompanyForm from "@/components/AddCompanyForm/AddCompanyForm";
import { useState } from "react";

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

type Company = {
  id: string;
  name: string;
  activity: string;
  indReferentNumber: string;
  website: string;
  category: string;
  city: string;
  street: string;
  houseNumber: string;
  postCode: string;
  display: boolean;
};

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
});

function Home({
  companies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const displayedCompaniesArray = companies.filter(
    (company) => company.display === true
  );
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <Logo />
        </header>
        <p>Total Companies: {displayedCompaniesArray.length}</p>
        <main className={styles.mainContainer}>
          {/* <LoginControls /> */}
          {/* <Link href="/account">To your account</Link> */}
          <div className={styles.mainDropdownContainer}>
            <Dropdown />
          </div>
          {displayForm && <AddCompanyForm />}
          <div className={styles.mainCardContainer}>
            <button onClick={() => setDisplayForm(!displayForm)}>
              {displayForm ? "Hide" : "Add"}
            </button>
            {displayedCompaniesArray
              .slice(0, 84)
              .map((company: Company, index) => {
                return (
                  <Card
                    key={company.id}
                    id={company.id}
                    name={company.name}
                    city={company.city}
                    website={company.website}
                    category={company.category}
                    lastVisit="seen 2 days ago by"
                    display={company.display}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  companies: Company[];
}> = async () => {
  try {
    // Fetch companies whose activities field contains the word "software"
    const companies = await prisma.company.findMany({
      where: {
        category: {
          contains: "software",
          mode: "insensitive",
        },
      },
    });
    return {
      props: {
        companies: serialize(companies),
      },
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      props: {
        companies: [],
      },
    };
  }
};

export default Home;
