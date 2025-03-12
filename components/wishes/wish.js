import Link from "next/link";
import Image from "next/image";

import styles from "./wish.module.css";

export default function Wish({ title, slug, thumbnail, summary, creator }) {
  return (
    <article className={styles.wish}>
      <header>
        <div className={styles.image}>
          <Image src={thumbnail} alt={title} fill />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <Link href={`/wishes/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
