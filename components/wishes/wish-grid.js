import Wish from "./wish.js";
import styles from "./wish-grid.module.css";
export default function WishGrid({ wishes, user_id }) {
  return (
    <ul className={styles.wishes}>
      {wishes.map((wish) => (
        <li key={wish.id}>
          <Wish {...wish} user_id={user_id} />
        </li>
      ))}
    </ul>
  );
}
