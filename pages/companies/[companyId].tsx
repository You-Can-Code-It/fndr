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
  return (
    <div>
      <CompanyDetailsCard company={company} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  company: Company;
}> = async (context) => {
  try {
    const companyId = context.params?.companyId as string;

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    return {
      props: {
        company: serialize(company),
      },
    };
  } catch (error) {
    console.error("Error fetching company data:", error);

    return {
      props: {
        company: null,
      },
    };
  }
};

export default CompanyDetailsPage;
