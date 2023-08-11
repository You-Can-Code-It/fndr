import React from "react";

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

const CompanyCard: React.FC<CompanyCardProps> = ({ name, category }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{category}</p>
    </div>
  );
};

export default CompanyCard;
