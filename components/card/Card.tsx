import styles from "./Card.module.css";
import Heading1 from "../typography/Heading1";
import Heading2 from "../typography/Heading2";
import React from "react";
import WebLink from "../typography/WebLink";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useState } from "react";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import Link from "next/link";

type CardProps = {
  id: string;
  name: string;
  city: string;
  website: string;
  lastVisit: string;
  category: string;
  display: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  city,
  website,
  lastVisit,
  category,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successRemoval, setSuccessRemoval] = useState(false);

  const handleDeleteClick = async (companyId: string) => {
    setLoading(true);
    try {
      console.log("Deleting company with Id:", companyId);
      await axios.put(`/api/companies/${companyId}`);
      console.log("Company removed successfully");
      // window.location.reload();
      setLoading(false);
      setSuccessRemoval(true);
    } catch (error) {
      console.log("Error deleting company:", error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.overviewContainer}>
        <Link href={`companies/${id}`}>{name}</Link>
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
      <button onClick={() => setOpenModal(!openModal)}>Remove</button>

      <Modal isOpen={openModal || error} onClose={() => setOpenModal(false)}>
        {!loading && !error && !successRemoval && (
          <div className={styles.deleteCompanyMainContainer}>
            <h4 className={styles.removeCompanyHeader}>Remove company?</h4>
            <p className={styles.removeCompanySubtitle}>
              Are you sure you want to remove this company from the list?
            </p>

            <div className={styles.removeCompanyButtons}>
              <button
                className={`${styles.removeButton} ${styles.confirm}`}
                onClick={() => handleDeleteClick(id)}
              >
                Remove
              </button>
              <button
                className={`${styles.removeButton} ${styles.danger}`}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
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
            {" "}
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

      <div className={styles.lastVisitContainer}>
        <Heading2>{lastVisit}</Heading2>
      </div>
    </div>
  );
};

export default Card;
