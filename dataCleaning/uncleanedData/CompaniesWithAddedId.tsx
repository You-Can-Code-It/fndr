import React from "react";
import companiesData from "../../dataCleaning/initialData.json";

const CompaniesWithAddedId: React.FC = () => {
  const data = companiesData.splice(0, 10);
  console.log("data:", data);
  return (
    <div>
      {companiesData.map((company, index) => (
        <div key={index}>
          <p>Name: {company.name}</p>
          <p>Referent Number: {company.referentNumber}</p>
          <p>Name Section: {company.nameSection}</p>
        </div>
      ))}
    </div>
  );
};

export default CompaniesWithAddedId;
