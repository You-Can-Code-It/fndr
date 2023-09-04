import React, { useState } from "react";
import styles from "./CompanyDetailsCard.module.css";
import Logo from "../logo/Logo";
import Avatar from "../avatar/Avatar";
import userImage from "../../public/assets/User.png";
import Heading1 from "../typography/Heading1";
import Link from "next/link";
import LoginControls from "../LoginControls/LoginControls";

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
      <header className={styles.topBar}>
        <Logo />
        <div className={styles.loginControls}>
          <LoginControls />
        </div>
      </header>
      <main>
        <div className={styles.companyName}>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
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
          <Heading1 variant="detailsLabel">Location</Heading1>
          <Heading1 variant="detailsValue">{company?.city}</Heading1>
          <Heading1 variant="detailsLabel">Area</Heading1>
          <Heading1 variant="detailsValue"> {company?.category}</Heading1>
          <Heading1 variant="detailsLabel">Website</Heading1>
          <Heading1
            variant={displayWebsite ? "detailsIframe" : "detailsValueWebsite"}
            onClick={() => setDisplayWebsite(true)}
          >
            {extractDomain(company?.website)}
          </Heading1>
          {displayWebsite === true && (
            <button
              className={`${styles.button} ${styles.closeButton}`}
              onClick={() => setDisplayWebsite(false)}
            >
              Close
            </button>
          )}
          <div
            className={displayWebsite ? styles.iframeOutline : styles.hidden}
          >
            {company?.website && displayWebsite && (
              <iframe className={styles.iframeSection} src={company.website} />
            )}
          </div>
          <Heading1 variant="detailsLabel">Address</Heading1>
          <Heading1 variant="detailsValue">
            {`${company?.street}, ${company?.houseNumber}. ${company?.city}. ${company?.postCode}.`}
          </Heading1>
          <Heading1 variant="detailsLabel">IND number </Heading1>
          <Heading1 variant="detailsValue">
            {company?.indReferentNumber}
          </Heading1>
          <div className={styles.buttonsBar}>
            <Link href="/">
              <button className={styles.button}>Back</button>
            </Link>
            <button className={`${styles.button} ${styles.saveButton}`}>
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDetailsCard;
