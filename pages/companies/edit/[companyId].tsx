import React from "react";
import EditCompanyForm from "@/components/EditCompanyForm/EditCompanyForm";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "@/prisma/client";

type Company = {
  openEditing: boolean;
  onCloseEditing: Function;
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
  tags: any;
};

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

function EditCompany({
  company,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("details page, tags", company.tags);
  return (
    <div>
      <EditCompanyForm company={company} />
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
      include: {
        tags: true,
      },
    });

    return {
      props: {
        company: serialize(company),
      },
    };
  } catch (error) {
    console.error("Pages /companies/:id - Error fetching company data:", error);

    return {
      props: {
        company: null,
      },
    };
  }
};

export default EditCompany;
