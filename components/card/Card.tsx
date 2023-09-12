import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React, { useState, useEffect } from "react";
import WebLink from "../typography/WebLink";
import axios from "axios";
import Modal from "../Modal/Modal";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import Link from "next/link";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import { BsThreeDots } from "react-icons/bs";

type CardProps = {
  id: string;
  name: string;
  city: string;
  website: string;
  userEvent: any;
  category: string;
  display: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  city,
  website,
  userEvent,
  category,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successRemoval, setSuccessRemoval] = useState(false);
  const { data: session } = useSession();
  const [latestUserEvent, setLatestUserEvent] = useState(userEvent);

  const handleDeleteClick = async (companyId: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/companies/${companyId}`);
      setLoading(false);
      setSuccessRemoval(true);
    } catch (error) {
      console.log("Error deleting company:", error);
      setError(true);
      setLoading(false);
    }
  };

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
      id={id}
    >
      <div className={styles.threeDotsIcon}>
        <BsThreeDots onClick={() => setOpenModal(!openModal)} />
      </div>
      <div className={styles.companyName}>
        <Link href={`companies/${id}`}>{name}</Link>
      </div>

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

      <div className={styles.categoriesContainer}>{category}</div>

      <Modal isOpen={openModal || error} onClose={() => setOpenModal(false)}>
        {!loading && !error && !successRemoval && (
          <div className={styles.deleteCompanyMainContainer}>
            <div className={styles.modalHeading}>
              <Heading1>Remove company?</Heading1>
            </div>
            <div className={styles.confirm}>
              <Heading2>
                Are you sure you want to remove this company from the list?
              </Heading2>
            </div>
            <div className={`${styles.removeCompanyButtons}`}>
              <div className={`${styles.remove} `}>
                <Heading1>
                  <button
                    className={`${styles.removeButton} `}
                    onClick={() => handleDeleteClick(id)}
                  >
                    Remove
                  </button>
                </Heading1>
              </div>
              <Heading1>
                <button
                  className={`${styles.cancelButton} ${styles.danger}`}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </Heading1>
            </div>
          </div>
        )}
        {loading && !successRemoval && (
          <h4 className={styles.removeLoading}>
            Removing company... <LoaderSpinner />
          </h4>
        )}

        {successRemoval && (
          <>
            <h4 className={styles.removeCompanyConfirmation}>
              Company successfuly removed.
            </h4>
            <button
              className={styles.removeButtonBack}
              onClick={() => {
                setOpenModal(false);
                setSuccessRemoval(false);
                window.location.reload();
              }}
            >
              Back
            </button>
          </>
        )}
        {error && (
          <>
            <h5 style={{ color: "white" }}>
              An error occured when removing the company. Please try later or
              contact admin.
            </h5>
            <button
              onClick={() => {
                setOpenModal(false);
                setError(false);
              }}
            >
              Back
            </button>
          </>
        )}
      </Modal>

      <div className={styles.lastVisitContainer}>{displayLastVisit}</div>
    </div>
  );
};

export default Card;
