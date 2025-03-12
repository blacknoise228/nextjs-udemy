import ImageSlideshow from "@/components/wishes/random-wishes";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <header className={styles.header}>
      <div className={styles["random-wishes"]}>
        <ImageSlideshow />
      </div>
      <div>
        <div className={styles.hero}>
          <h1>Emerald Wish App for your wishes</h1>
          <p>Maybe the genie will see them and make them come true</p>
        </div>
        <div className={styles.cta}>
          <Link className={styles.primary} href="/sign">
            Join Us
          </Link>
          <Link className={styles.secondary} href="/users">
            Find your friends
          </Link>
        </div>
      </div>
    </header>
  );
}
