"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import style from "./user.module.css";
import WishGrid from "@/components/wishes/wish-grid";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      }
    }

    fetchUser();
  }, [id]);

  useEffect(() => {
    async function fetchWishes() {
      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/carts/${id}`);
        const data = await res.json();

        if (!data.products || data.products.length === 0) {
          setHasMore(false);
        } else {
          setWishes((prev) => [...prev, ...data.products]);
        }
      } catch (error) {
        console.error("Ошибка загрузки желаний:", error);
      }
      setLoading(false);
    }

    fetchWishes();
  }, [page, id]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "300px",
      threshold: 0.1,
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  if (!user) return <div className={style.loading}>Загрузка...</div>;

  return (
    <div className={style.page}>
      <div className={style.layout}>
        <aside className={style.sidebar}>
          <div className={style.userCard}>
            <h1 className={style.username}>
              {user.firstName} {user.lastName}
            </h1>
            <div className={style.avatar}>
              <img src={user.image} alt={user.firstName} />
            </div>
            <p className={style.info}>Username: {user.username}</p>
            <p className={style.info}>Age: {user.age}</p>
            <p className={style.info}>Gender: {user.gender}</p>
          </div>
        </aside>

        <main className={style.content}>
          <h2 className={style.wishesTitle}>Wishes</h2>
          <WishGrid user_id={id} wishes={wishes} />
          <div ref={observerRef}></div>
          {loading && <p className={style.loading}>Загрузка...</p>}
          {!hasMore && <p className={style.end}>Больше желаний нет</p>}
        </main>
      </div>
    </div>
  );
}
