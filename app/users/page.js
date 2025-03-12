"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import style from "./users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);

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

  if (!users.length) return <div className="page-first">Loading...</div>;

  return (
    <div className={style.userspage}>
      <header className="he">
        <h1 className="title">All Users</h1>
      </header>
      <ul className={style.ul}>
        {users.map((user) => (
          <li key={user.id} className={`${style.user_item} ${style.li}`}>
            <Link className="linkek" href={`/users/${user.id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
