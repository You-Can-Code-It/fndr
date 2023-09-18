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
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";

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
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [selectRemove, setSelectRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successRemoval, setSuccessRemoval] = useState(false);
  const [latestUserEvent, setLatestUserEvent] = useState(userEvent);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

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
            {website
              .replace("http://", "")
              .replace("https://", "")
              .replace("www.", "")}
          </WebLink>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.threeDotsIcon}>
          <PiDotsThreeOutlineFill onClick={() => setOpenModal(!openModal)} />
        </div>
        <div className={styles.likeDislikeIcons}>
          {like === false && (
            <AiOutlineLike
              onClick={() => {
                setLike(!like);
                setDislike(false);
              }}
            />
          )}
          {like === true && (
            <AiTwotoneLike
              onClick={() => {
                setLike(!like);
                setDislike(false);
              }}
            />
          )}
          {dislike === false && (
            <AiOutlineDislike
              onClick={() => {
                setDislike(!dislike);
                setLike(false);
              }}
            />
          )}
          {dislike === true && (
            <AiTwotoneDislike onClick={() => setDislike(!dislike)} />
          )}
        </div>
        <div className={styles.categoryWrapperContainer}>
          <div className={styles.categoryInnerContainer}>{category}</div>
        </div>

        <div className={styles.lastVisitContainer}>{displayLastVisit}</div>
      </div>

      <Modal isOpen={openModal || error} onClose={() => setOpenModal(false)}>
        {!loading && !error && !successRemoval && !selectRemove && (
          <div className={styles.deleteCompanyMainContainer}>
            <div className={styles.editButton}>
              <FiEdit3 />
              <p>Edit</p>
            </div>
            <div className={styles.greyLine}></div>
            <div className={styles.removeButton}>
              <AiOutlineDelete />
              <p onClick={() => setSelectRemove(true)}>Remove</p>
            </div>
          </div>
        )}
        {!loading && !error && !successRemoval && selectRemove && (
          <div className={styles.removalConfirmation}>
            <div className={styles.removeModal}>
              <p className={styles.removeMessage}>Remove company?</p>
              <p className={styles.confirmationMessage}>
                Are you sure you want to remove this company?
              </p>
            </div>
            <div className={styles.greyLineConfirmation}></div>
            <div className={styles.confirmRemoval}>
              <p
                onClick={() => {
                  setSelectRemove(true);
                  handleDeleteClick(id);
                }}
              >
                Remove
              </p>
            </div>
            <div className={styles.greyLineConfirmation}></div>
            <div
              className={styles.cancelButton}
              onClick={() => {
                setOpenModal(false);
                setSelectRemove(false);
              }}
            >
              Cancel
            </div>
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
