import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React from "react";
import WebLink from "../typography/WebLink";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";

type CardProps = {
  companyId: string;
  name: string;
  city: string;
  website: string;
  userEvent: any;
  category: string;
};

const Card: React.FC<CardProps> = ({
  companyId,
  name,
  city,
  website,
  userEvent,
  category,
}) => {
  const { data: session } = useSession();
  async function handleOpenCompanyCard(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    console.log("User: ", session?.user?.email);
    try {
      const date = DateTime.utc().toISO();
      console.log("Date: ", date);

      const companyId = event.currentTarget.getAttribute("id");
      console.log("Company: ", companyId);

      const response = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdAt: date,
          companyId: companyId,
          userEmail: session?.user?.email,
        }),
      });

      if (response.ok) {
        console.log("Account Page. Succesful API request.");
      } else {
        console.log("API request failed:");
      }
    } catch (error) {
      console.log("Account page error:", error);
    }
  }

  return (
    <div
      className={styles.cardContainer}
      onClick={handleOpenCompanyCard}
      id={companyId}
    >
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
      <div className={styles.lastVisitContainer}>
        <Heading2>Seen {userEvent?.createdAt}</Heading2>
        <p>{userEvent?.user.name}</p>
      </div>
    </div>
  );
};

export default Card;
