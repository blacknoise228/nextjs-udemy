import Link from "next/link";
import Image from "next/image";

import styles from "./wish.module.css";

export default function Wish({
  id,
  title,
  thumbnail,
  summary,
  price,
  user_id,
}) {
  return (
    <article className={styles.wrapper}>
      <div className={styles.wish}>
        <div className={styles.image}>
          <Image src={thumbnail} alt={title} fill />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>Price {price}</p>
        </div>
        <div className={styles.content}>
          <p className={styles.summary}>{summary}</p>
          <div className={styles.actions}>
            <Link href={`/users/${user_id}/wishes/${id}`}>View Details</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
