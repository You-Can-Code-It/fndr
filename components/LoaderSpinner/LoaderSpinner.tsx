import React from "react";
import styles from "./LoaderSpinner.module.css";
import LoaderImage from "../../public/assets/spinner.gif";

export default function LoaderSpinner() {
  return (
    <img
      className={styles.loaderSpinner}
      src={LoaderImage.src}
      alt="loader image"
    />
  );
}
