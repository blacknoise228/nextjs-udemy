"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import style from "./users.module.css";
import Image from "next/image";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={style.userspage}>
      <header className={style.header}>
        <h1 className={style.title}>All Users</h1>
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.search}
        />
      </header>
      <ul className={style.ul}>
        {filteredUsers.map((user) => (
          <li key={user.id} className={`${style.user_item} ${style.li}`}>
            <Image
              src={user.image}
              alt={user.firstName}
              width={50}
              height={50}
              className={style.image}
            />
            <Link className={style.linkek} href={`/users/${user.id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
