import React from "react";

type Company = {
  id: string;
  name: string;
  city: string;
  website: string;
};

type CompanyDetailsCardProps = {
  company: Company;
};

const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({ company }) => {
  console.log("company details card company?", company);
  return (
    <div>
      <h1>{company?.name}</h1>
      <p>City: {company?.city}</p>
      <p>Website: {company?.website}</p>
      {/* Render other details */}
    </div>
  );
};

export default CompanyDetailsCard;
