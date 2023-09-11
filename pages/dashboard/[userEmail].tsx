import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Label from "@/components/typography/Label";
import Link from "next/link";
import Heading1 from "@/components/typography/Heading1";
import HeaderInfo from "@/components/typography/HeaderInfo";
import Button from "@/components/Button/Button";

import styles from "./DetailsPage.module.css";
function extractDomain(url: string) {
  const parts = url?.split("www.");
  if (parts?.length >= 2) {
    const domain = parts[1];
    return domain.replace(/\/$/, ""); // Remove trailing "/"
  } else {
    return null; // "www." not found in the URL
  }
}
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
  const [displayWebsite, setDisplayWebsite] = useState(false);
  return (
    <div>
      <h1>Test</h1>
      {/* <div className={styles.detailsCardMainContainer}>
        <NavBar />
        <main>
          <div className={styles.companyName}>
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className={styles.chevron}
              >
                <g opacity="0.5">
                  <path
                    d="M17.5 21L10.5 14L17.5 7"
                    stroke="#1E213F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </Link>

            <Heading1 variant="detailsPage">{company?.name}</Heading1>
          </div>
          <div className={styles.infos}>
            <Label>Location</Label>
            <HeaderInfo>{company?.city}</HeaderInfo>
            <Label>Area</Label>
            <HeaderInfo> {company?.category}</HeaderInfo>
            <Label>Website</Label>
            <HeaderInfo
              variant={displayWebsite ? "detailsIframe" : "detailsValueWebsite"}
              onClick={() => setDisplayWebsite(true)}
            >
              {extractDomain(company?.website)}
            </HeaderInfo>
            <div className={styles.closeIframeButton}>
              {displayWebsite === true && (
                <Button
                  variant="closeButton"
                  onClick={() => setDisplayWebsite(false)}
                >
                  Close
                </Button>
              )}
            </div>

            <div
              className={displayWebsite ? styles.iframeOutline : styles.hidden}
            >
              {company?.website && displayWebsite && (
                <iframe
                  className={styles.iframeSection}
                  src={company.website}
                />
              )}
            </div>
            <Label>Address</Label>
            <HeaderInfo variant="detailsValue">
              {`${company?.street}, ${company?.houseNumber}. ${company?.city}. ${company?.postCode}.`}
            </HeaderInfo>
            <Label>IND number </Label>
            <HeaderInfo variant="detailsValue">
              {company?.indReferentNumber}
            </HeaderInfo>
            <div className={styles.buttonsBar}>
              <Button href="/">Back</Button>
              <Button variant="saveButton">Save</Button>
            </div>
          </div>
        </main>
      </div> */}
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
    console.error("Pages /companies/:id - Error fetching company data:", error);

    return {
      props: {
        company: null,
      },
    };
  }
};

export default CompanyDetailsPage;
