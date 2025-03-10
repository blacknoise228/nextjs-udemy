import Link from "next/link";
import Image from "next/image";

import logoImage from "@/public/logo.png";
import styles from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logoImage} alt="Wish Main Page" width={50} priority />
        <span>Emerald Wish App</span>
      </Link>

      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/sign">Sign</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
