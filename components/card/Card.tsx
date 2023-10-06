import styles from "./Card.module.css";
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
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/router";
import PopOver from "../PopOver";
import Button from "../Button/Button";
import BackIcon from "../Atoms/BackIcon/BackIcon";
import Image from "next/image";
import { usePopOver } from "../PopOver/PopOver";

type CardProps = {
  id: string;
  name: string;
  city: string;
  street: string;
  website: string;
  indReferentNumber: string;
  houseNumber: string;
  postCode: string;
  userEvent: any;
  category: string;
  display: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  city,
  street,
  indReferentNumber,
  houseNumber,
  postCode,
  website,
  userEvent,
  category,
}) => {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [selectRemove, setSelectRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successRemoval, setSuccessRemoval] = useState(false);
  const [latestUserEvent, setLatestUserEvent] = useState(userEvent);
  const [show, open, close] = usePopOver();

  const router = useRouter();

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

  function editCompanyHandler() {
    router.push(`/companies/edit/${id}`);
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
      <div className={styles.leftBlock}>
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
            {
              website
                .replace("http://", "")
                .replace("https://", "")
                .replace("www.", "")
                .split("/")[0]
            }
          </WebLink>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.threeDotsIcon} onClick={(e) => open(e)}>
          <PiDotsThreeOutlineFill />
          {
            <PopOver show={show} close={close}>
              <button className={styles.closePopOverMobile} onClick={close}>
                <Image
                  src="assets/close.svg"
                  height={20}
                  width={20}
                  alt="close"
                />
              </button>
              <Button
                variant="optionButton"
                onClick={editCompanyHandler}
                className={styles.popOverOption}
              >
                Edit
              </Button>
              <div className={styles.greyLineConfirmation}></div>
              <Button
                variant="optionButton"
                colorScheme="danger"
                onClick={() => setOpenModal(true)}
                className={styles.popOverOption}
              >
                Delete
              </Button>
            </PopOver>
          }
        </div>
        <div className={styles.categoryWrapperContainer}>
          <div className={styles.categoryInnerContainer}>{category}</div>
        </div>

        <div className={styles.lastVisitContainer}>{displayLastVisit}</div>
      </div>

      <Modal isOpen={openModal || error} onClose={() => setOpenModal(false)}>
        {!loading && !error && !successRemoval && !selectRemove && (
          <div className={styles.deleteCompanyMainContainer}>
            <h4 className={styles.removeCompanyHeader}>Remove company?</h4>
            <p className={styles.removeCompanySubtitle}>
              Are you sure you want to remove this company from the list?
            </p>
            <div className={styles.greyLineConfirmation}></div>
            <Button
              size="large"
              variant="optionButton"
              colorScheme="danger"
              onClick={() => handleDeleteClick(id)}
            >
              Remove
            </Button>
            <div className={styles.greyLineConfirmation}></div>
            <Button
              size="large"
              variant="optionButton"
              onClick={() => {
                setOpenModal(false);
                setSelectRemove(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {loading && !successRemoval && (
          <h4 className={styles.removeLoading}>
            Removing ... <LoaderSpinner />
          </h4>
        )}

        {successRemoval && (
          <div className={styles.removalMessage}>
            <h4 className={styles.messageText}>Company successfuly removed.</h4>
            <p
              className={styles.backButton}
              onClick={() => {
                setOpenModal(false);
                setSuccessRemoval(false);
                window.location.reload();
              }}
            >
              Back
            </p>
          </div>
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
    </div>
  );
};

export default Card;
