import React from "react";
import CompanyCard from "./CompanyCard/CompanyCard";

type Company = {
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

type CompaniesListProps = {
  companies: Company[];
};

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  //console.log("CompaniesList, companies", companies);
  return (
    <div className="cards-list">
      {companies.map((company, index) => (
        <CompanyCard key={index} {...company} />
      ))}
    </div>
  );
};

export default CompaniesList;
