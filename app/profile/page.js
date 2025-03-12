import Link from "next/link";
import styles from "./page.module.css";
import WishGrid from "@/components/wishes/wish-grid";
export default function Profile() {
  return (
    <>
      <header className={styles.header}>
        <h1>Your profile</h1>
        <p>Is you profile with your wishes</p>
        <p className={styles.cta}>
          <Link href="/profile/wishes">Wishes</Link>
        </p>
      </header>
      <main className={styles.main}>
        <WishGrid wishes={[]} />
      </main>
    </>
  );
}
