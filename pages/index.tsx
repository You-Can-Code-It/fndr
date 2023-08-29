import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "@/prisma/client";
import AddCompanyForm from "@/components/AddCompanyForm/AddCompanyForm";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { useForm } from "react-hook-form";
import LoginControls from "@/components/LoginControls/LoginControls";

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
  userEvent: any;
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
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <Logo />
          <LoginControls />
        </header>
        <p>Total Companies: {displayedCompaniesArray.length}</p>
        <main className={styles.mainContainer}>
          <div className={styles.mainDropdownContainer}>
            <Dropdown />
          </div>
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <AddCompanyForm />
            <button onClick={() => setOpenModal(!openModal)}>Cancel</button>
          </Modal>
          {displayForm && <AddCompanyForm />}
          <div className={styles.mainCardContainer}>

            <Link href="/companies/newCompany">+ New Company</Link>
            {/* Needs fix: For design issues, displaying only the first 84 results. */}
            {displayedCompaniesArray.slice(0, 84).map((company: Company) => {
              return (
                <Card
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  city={company.city}
                  website={company.website}
                  category={company.category}
                  display={company.display}
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

export default Home;
