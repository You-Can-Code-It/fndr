import React from "react";

interface CompaniesData {
  name: string;
  referentNumber: number;
  nameSection: string;
  webpageUrl: string;
  adressSection: string;
  type: string;
  address: string;
  city: string;
  category: string;
  street: string;
  houseNumber: string;
  postCode: string;
}

declare module "*.json" {
  const value: CompaniesData[];
  export default value;
}
