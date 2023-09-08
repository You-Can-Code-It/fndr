import React, { useState } from "react";
import styles from "./CompanyDetailsCard.module.css";
import Heading1 from "../typography/Heading1";
import Link from "next/link";
import Label from "../typography/Label";
import HeaderInfo from "../typography/HeaderInfo";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";

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

type CompanyDetailsCardProps = {
  company: Company;
};

function extractDomain(url: string) {
  const parts = url?.split("www.");
  if (parts?.length >= 2) {
    const domain = parts[1];
    return domain.replace(/\/$/, ""); // Remove trailing "/"
  } else {
    return null; // "www." not found in the URL
  }
}

const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({ company }) => {
  const [displayWebsite, setDisplayWebsite] = useState(false);
  return (
    <div className={styles.detailsCardMainContainer}>
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
              <iframe className={styles.iframeSection} src={company.website} />
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
    </div>
  );
};

export default CompanyDetailsCard;
