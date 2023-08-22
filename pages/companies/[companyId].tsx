import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { prisma } from "../db"; // Adjust the path accordingly
import CompanyDetailsCard from "@/components/CompanyDetailsCard/CompanyDetailsCard"; // Adjust the path accordingly
import { useEffect, useState } from "react";

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}
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

function CompanyDetailsPage({
  company,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("Is there something here? props?", company, "what is context?");
  return (
    <div>
      <CompanyDetailsCard company={company} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  company: Company;
}> = async (context) => {
  console.log("getServerSideProps running?");
  try {
    const companyId = context.params?.companyId as string;
    console.log("companyId?", companyId);
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
    console.log("company?", company);

    return {
      props: {
        company: serialize(company),
      },
    };
  } catch (error) {
    console.error("Error fetching company data:", error);
    console.log("something in catch statement?");
    return {
      props: {
        company: null,
      },
    };
  }
};

export default CompanyDetailsPage;
