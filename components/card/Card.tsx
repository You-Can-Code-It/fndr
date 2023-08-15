import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React from "react";
import WebLink from "../typography/WebLink";

type CardProps = {
  id: string;
  name: string;
  city: string;
  website: string;
  lastVisit: string;
  category: string;
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  city,
  website,
  lastVisit,
  category,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.overviewContainer}>
        <Heading1>{name}</Heading1>
        <div className={styles.cardLocation}>
          <img src="./map-pin.svg" />
          <Heading2 className={styles.locationText}>{city}</Heading2>
        </div>
        <div className={styles.cardWebsite}>
          <img src="./external-link.svg" />
          <WebLink website={website} className={styles.websiteText}>
            {website
              .replace("http://", "")
              .replace("https://", "")
              .replace("www.", "")}
          </WebLink>
        </div>
      </div>
      <div className={styles.categoriesContainer}>{category}</div>
      <button onClick={() => console.log(`company id: ${id}`)}>Delete</button>
      <div className={styles.lastVisitContainer}>
        <Heading2>{lastVisit}</Heading2>
      </div>
    </div>
  );
};

export default Card;
