import React, { useEffect, useId, useState } from "react";
import styles from "./PopOver.module.css";

export interface PopOverProps extends React.ComponentPropsWithoutRef<"div"> {
  show: boolean;
  close: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Conditional(props: PopOverProps) {
  if (!props.show) return null;

  return <PopOver {...props} />;
}

export function usePopOver() {
  const [show, setShow] = useState(false);

  function open(e: React.MouseEvent<HTMLElement>): void {
    setShow(true);
    e.stopPropagation();
  }

  function close(e: React.MouseEvent<HTMLElement> | undefined): void {
    setShow(false);
    e?.stopPropagation();
  }

  return [show, open, close] as const;
}

function PopOver({ children, show, close, ...props }: PopOverProps) {
  const id = useId().replaceAll(":", "");

  useEffect(() => {
    function detectClickOutside(e: any) {
      const isClickOutside = e?.target?.closest(`#${id}`) === null;

      if (isClickOutside) {
        close();
      }
    }

    window.addEventListener("click", detectClickOutside);

    return () => {
      window.removeEventListener("click", detectClickOutside);
    };
  }, [id, close]);

  return (
    <div className={styles.popoverContainer}>
      <div {...props} className={styles.popover} id={id}>
        {children}
      </div>
    </div>
  );
}
