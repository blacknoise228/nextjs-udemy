import WishDetail from "@/components/wishes/wish-detail";

import styles from "./page.module.css";

export default async function WishDetails({ params }) {
  const wishes = await params;

  if (!wishes) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className={styles.userspage}>
      <WishDetail wishes={wishes} />
    </div>
  );
}
