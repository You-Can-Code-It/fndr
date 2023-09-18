import React, { ReactNode, MouseEvent } from "react";
import styles from "./Modal.module.css";
import { fontInter } from "../../styles/fonts/index";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  function close(e: MouseEvent<HTMLDivElement>) {
    if (e.target && (e.target as HTMLDivElement).id === "overlay") {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      id="overlay"
      className={`${styles.overlay} ${fontInter.className}`}
      onClick={close}
    >
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
}
