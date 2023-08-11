import React from "react";
import styles from "./CompanyCard.module.css";
import Link from "next/link";

type CompanyCardProps = {
  id: String;
  name: string;
  activity: string;
  indReferentNumber: String;
  website: String;
  category: String;
  city: String;
  street: String;
  houseNumber: String;
  postCode: String;
};

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  city,
  category,
  website,
}) => {
  return (
    <div className={styles.cardContainer}>
      <h2>{name}</h2>
      <h3>{city}</h3>
      <h3>{category}</h3>
      {/* <h4>{website}</h4> */}
      <Link href={website}>{website}</Link>
    </div>
  );
};

export default CompanyCard;
