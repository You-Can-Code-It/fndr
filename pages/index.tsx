import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "@/components/logo/Logo";
import Dropdown from "@/components/dropdown/Dropdown";
import Card from "@/components/card/Card";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "./db";
import LoginControls from "@/components/LoginControls/LoginControls";
import { type } from "os";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
        // companies: serialize(companies),
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
        // companies: [],
      },
    };
  }
};

function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // this router is intended for adding and reading query parameters
  const router = useRouter();
  // retrieve query parameter with name cityFilter to set input value
  const { cityFilter } = router.query;
  // created state cityFilterQuery and initialized with query param cityFilter
  const [cityFilterQuery, setCityFilterQuery] = useState<string>(cityFilter);

  const clearAllFilters = () => {
    router.replace("");
    setCityFilterQuery("");
  };

  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <Logo />
        </header>
        <main className={styles.mainContainer}>
          {/* <LoginControls /> */}
          {/* <Link href="/account">To your account</Link> */}
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
            {/* <button onClick={clearAllFilters}>Clear</button> */}
          </div>

          <div className={styles.mainCardContainer}>
            {response.companies.slice(0, 84).map((company: Company, index) => {
              const { id, city } = company;
              return (
                <Card
                  key={company.id}
                  name={company.name}
                  city={company.city}
                  website={company.website}
                  category={company.category}
                  lastVisit="seen 2 days ago by"
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
