import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "./db";
import LoginControls from "@/components/loginControls/LoginControls";

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
  userEvent: any;
};

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
});

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
      include: {
        userEvent: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          include: {
            user: true,
          },
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

function Home({
  companies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <Logo />
          <LoginControls />
        </header>
        <main className={styles.mainContainer}>
          <div className={styles.mainDropdownContainer}>
            <Dropdown />
          </div>

          <div className={styles.mainCardContainer}>
            {companies.slice(0, 84).map((company: Company, index) => {
              return (
                <Card
                  key={company.id}
                  companyId={company.id}
                  name={company.name}
                  city={company.city}
                  website={company.website}
                  category={company.category}
                  userEvent={company.userEvent[0] ?? null}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
