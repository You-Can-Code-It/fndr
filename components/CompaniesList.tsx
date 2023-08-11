// components/CompaniesList.tsx
import React from "react";
import CompanyCard from "./CompanyCard/CompanyCard";

type Company = {
  id: number;
  name: string;
  activity: string;
  // Add other properties from your data model
};

type CompaniesListProps = {
  companies: Company[];
};

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  return (
    <div className="cards-list">
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
};

export default CompaniesList;
