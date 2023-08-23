import React from "react";
import styles from "./CompanyDetailsCard.module.css";

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

type CompanyDetailsCardProps = {
  company: Company;
};

const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({ company }) => {
  return (
    <div className={styles.detailsCardMainContainer}>
      <h2>{company?.name}</h2>
      <h4>City: {company?.city}</h4> <h4>Activity: {company?.category}</h4>
      <h4> {company?.website}</h4>
      <h5>IND number: {company?.indReferentNumber}</h5>
      <h5>
        Address:{" "}
        {`${company?.street}, ${company?.houseNumber}. ${company?.city}. ${company?.postCode}`}
      </h5>
    </div>
  );
};

export default CompanyDetailsCard;
