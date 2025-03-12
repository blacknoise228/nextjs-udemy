import Wish from "./wish.js";
import styles from "./wish-grid.module.css";
export default function WishGrid({ wishes }) {
  return (
    <ul className={styles.wishes}>
      {wishes.map((wish) => (
        <li key={wish.id}>
          <Wish {...wish} />
        </li>
      ))}
    </ul>
  );
}
