import React from "react";
import CompanyCard from "./CompanyCard/CompanyCard";
import companiesData from "../dataCleaning/companiesCuid.json";
import styles from "./CompaniesList.module.css";

type CardData = {
  //Using the definition of the Prisma model
  id: string;
  //Skipping createdAt and updatedAt for now (DateTime type is not found)
  name: string;
  indReferentNumber: string;
  website: string;
  category: string;
  city: string;
  street: string;
  houseNumber: string;
  postCode: string;
};

type CardListProps = {
  data: CardData[];
};

const CompaniesList: React.FC = () => {
  return (
    <div className={styles.cardList}>
      {companiesData.map((item, index) => (
        <CompanyCard
          key={index}
          id={item.id}
          indReferentNumber={item.referentNumber}
          name={item.name}
          category={item.category}
          website={item.webpageUrl}
          city={item.city}
          street={item.street}
          houseNumber={item.houseNumber}
          postCode={item.postCode}
        />
      ))}
    </div>
  );
};

export default CompaniesList;
