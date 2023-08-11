// components/CompanyCard.tsx
import React from "react";

type CompanyCardProps = {
  name: string;
  activity: string;
  // Add other properties as needed
};

const CompanyCard: React.FC<CompanyCardProps> = ({ name, activity }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{activity}</p>
      {/* Add other card content */}
    </div>
  );
};

export default CompanyCard;
