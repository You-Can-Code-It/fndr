import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React from "react";
import Link from "../typography/Link";

type CardProps = {
  title: string;
  location: string;
  website: string;
  lastVisit: string;
};

const Card: React.FC<CardProps> = ({ title, location, website, lastVisit }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.overviewContainer}>
        <Heading1>{title}</Heading1>
        <div className={styles.cardLocation}>
          <img src="./map-pin.svg" />
          <Heading2 className={styles.locationText}>{location}</Heading2>
        </div>
        <div className={styles.cardWebsite}>
          <img src="./external-link.svg" />
          <Link className={styles.websiteText}>{website}</Link>
        </div>
      </div>
      <div className={styles.categoriesContainer}></div>
      <div className={styles.lastVisitContainer}>
        <Heading2>{lastVisit}</Heading2>
      </div>
    </div>
  );
};

export default Card;
