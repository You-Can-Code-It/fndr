import React from "react";
import Link from "next/link";
import styles from "./CompanyCard.module.css";

type CardProps = {
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

const CompanyCard: React.FC<CardProps> = ({
  id,
  name,
  indReferentNumber,
  website,
  category,
  city,
  street,
  houseNumber,
  postCode,
}) => {
  return (
    <div className={styles.cardContainer}>
      <h2>{name}</h2>
      <h4>{category}</h4>
      <h4>{website}</h4>
      <h5>{city}</h5>
      <p>{`${street}, ${houseNumber}. ${postCode}. ${city}`}</p>
    </div>
  );
};

export default CompanyCard;
