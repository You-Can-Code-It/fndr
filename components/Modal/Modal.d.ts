import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  [key: string]: any;
}

declare function Modal(props: ModalProps): JSX.Element;

export default Modal;
