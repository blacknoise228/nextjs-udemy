import Link from "next/link";
import Modal from "@/components/modal/modal";
import { SignUpButton, SignInButton } from "@/components/buttons/sign-button";
import styles from "./sign.module.css";

export default function Sign() {
  return (
    <Modal className={styles.sign}>
      <h1 className={styles.title}>Welcome</h1>
      <div className={styles.buttons}>
        <Link href="/sign/up">
          <SignUpButton />
        </Link>
        <Link href="/sign/in">
          <SignInButton />
        </Link>
      </div>
    </Modal>
  );
}
