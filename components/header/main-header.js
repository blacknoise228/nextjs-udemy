import Link from "next/link";
import Image from "next/image";

import logoImage from "@/public/logo.png";
import styles from "./main-header.module.css";
import NavLink from "./nav-link";

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
            <NavLink href="/users">Users</NavLink>
          </li>
          <li>
            <NavLink href="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink href="/sign">Sign</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
