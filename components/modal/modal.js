"use client";

import styles from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const router = useRouter();

  const closeHandler = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeHandler} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </>
  );
}
