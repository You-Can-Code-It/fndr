import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { prisma } from "@/prisma/client";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";
import AddCompanyForm from "@/components/AddCompanyForm/AddCompanyForm";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import NavBar from "@/components/NavBar/NavBar";

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

type IndexResponse = {
  companies: Company[];
  removeCitiesDuplicates: string[];
};

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const getServerSideProps: GetServerSideProps<{
  // companies: Company[];
  response: IndexResponse;
}> = async (context) => {
  try {
    // Recieve cityFilter query parameter which was sent from frontend. Context.query contains all parameters of request
    const { cityFilter } = context.query;
    // Fetch companies whose activities field contains the word "software"
    const companies = await prisma.company.findMany({
      where: {
        category: {
          contains: "software",
          mode: "insensitive",
        },
        display: true,
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
    // Map the list of companies and return cities
    const cities = companies.map((company) => {
      return company.city;
    });
    // Remove the duplicates and sort them from A to Z
    const removeCitiesDuplicates = cities
      .filter((city, index) => cities.indexOf(city) === index)
      .sort();

    // Filter companies by cityFilter.
    const companiesFilteredByCity = () => {
      // If cityFilter is empty or underfind then it's not apllied, otherwise return filtered value
      if (cityFilter != undefined && cityFilter != "") {
        return companies.filter((company) => {
          return company.city === cityFilter;
        });
      }
      return companies;
    };

    return {
      props: {
        response: {
          companies: serialize(companiesFilteredByCity()),
          removeCitiesDuplicates: serialize(removeCitiesDuplicates),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      props: {
        response: {
          companies: [],
          removeCitiesDuplicates: [],
        },
      },
    };
  }
};

function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // this router is intended for adding and reading query parameters
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  // retrieve query parameter with name cityFilter to set input value
  const { cityFilter } = router.query;
  // created state cityFilterQuery and initialized with query param cityFilter
  const [cityFilterQuery, setCityFilterQuery] = useState<string>(() => {
    if (cityFilter === typeof "string") {
      return cityFilter;
    } else {
      return "";
    }
  });

  const clearAllFilters = () => {
    setCityFilterQuery("");
    router.replace("");
  };

  return (
    <div className={inter.className}>
      <NavBar />
      <div className={styles.counterAndAddButton}>
        <p className={styles.companyCounter}>
          Total Companies: {response.companies.length}
        </p>
        <Link href="/companies/newCompany" className={styles.newCompanyLink}>
          + New Company
        </Link>
      </div>

      <div className={styles.mainPageContainer}>
        <div className={styles.mainDropdownContainer}>
          <Dropdown
            dropdownData={response.removeCitiesDuplicates}
            // function setDropdownValue recieve name of the city
            setDropdownValue={(cityName: string) => {
              // update cityFilter query param by new value cityName
              setCityFilterQuery(cityName);

              if (cityName != "" && cityName != undefined) {
                //assign cityFilter to query parameter and perform redirect to send chosen city to the backend
                router.replace(`?cityFilter=` + cityName);
              }
            }}
            // Passed state cityFilterQuery to dropdown component
            dropdownValue={cityFilterQuery}
            clearAllFilters={clearAllFilters}
          />
        </div>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <AddCompanyForm />
          <button onClick={() => setOpenModal(!openModal)}>Cancel</button>
        </Modal>

        <div className={styles.companiesCards}>
          {response.companies.map((company: Company) => {
            return (
              <Card
                key={company.id}
                id={company.id}
                name={company.name}
                city={company.city}
                website={company.website}
                display={company.display}
                category={company.category}
                userEvent={company.userEvent[0] ?? null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
