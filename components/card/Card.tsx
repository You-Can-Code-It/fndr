import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React, { useState, useEffect } from "react";
import WebLink from "../typography/WebLink";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";

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
  const [latestUserEvent, setLatestUserEvent] = useState(userEvent);

  async function handleOpenCompanyCard(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    try {
      const date = DateTime.utc().toISO();
      const companyId = event.currentTarget.getAttribute("id");

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
        const newUserEvent = await response.json();
        setLatestUserEvent(newUserEvent);
      } else {
        console.log("API request failed:");
      }
    } catch (error) {
      console.log("Account page error:", error);
    }
  }

  function calculateDate(date: any) {
    const previousDate = DateTime.fromISO(date);
    const currentDate = DateTime.utc();

    const diff = Math.floor(currentDate.diff(previousDate, ["days"]).days);
    if (diff === 0) {
      return "today";
    } else if (diff === 1) {
      return diff + " day ago";
    } else if (diff > 1) {
      return diff + " days ago";
    }
  }

  let displayLastVisit;
  if (latestUserEvent) {
    displayLastVisit = (
      <div className={styles.lastVisitContainer}>
        <Heading2>
          Seen {calculateDate(latestUserEvent?.createdAt)} by{" "}
        </Heading2>
        <Avatar imageSource={latestUserEvent?.user?.image} />
      </div>
    );
  }

  useEffect(() => {
    setLatestUserEvent(userEvent);
  }, [userEvent]);

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
      {displayLastVisit}
    </div>
  );
};

export default Card;
