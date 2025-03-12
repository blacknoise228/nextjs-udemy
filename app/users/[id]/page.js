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
      console.log(`🔄 Запрос данных для страницы ${page}`);

      try {
        const res = await fetch(`https://dummyjson.com/carts/${id}`);
        const data = await res.json();

        if (!data.products || data.products.length === 0) {
          console.log("⚠️ Нет новых данных, останавливаем подгрузку");
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
        console.log("🟢 Триггер подгрузки новой страницы");
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "300px", // Увеличил отступ
      threshold: 0.1,
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-first" style={{ padding: "3rem" }}>
        <div className={style.user}>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <div
            className={style.user}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              style={{ width: "300px", padding: "1rem" }}
              src={user.image}
              alt={user.firstName}
            />
          </div>
          <p>Username: {user.username}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>

          <h2>Wishes</h2>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            <WishGrid wishes={wishes} />
          </div>
          <div ref={observerRef}></div>
          {loading && <p>Загрузка...</p>}
          {!hasMore && <p>Больше желаний нет</p>}
        </div>
      </div>
    </div>
  );
}
