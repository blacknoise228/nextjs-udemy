"use client";
import style from "./wish-detail.module.css";
import { useEffect, useState } from "react";

export default function WishDetail({ wishes }) {
  const [wish, setWish] = useState(null);

  useEffect(() => {
    async function fetchWish() {
      try {
        const res = await fetch(`https://dummyjson.com/carts/${wishes.id}`);
        const data = await res.json();
        const wishId = parseInt(wishes["wish-id"], 10);
        const product = data.products.find((product) => product.id === wishId);
        setWish(product);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWish();
  }, [wishes]);

  if (!wish) {
    return <p className={style.loading}>Загрузка...</p>;
  }

  return (
    <div className={style.summary}>
      <h1 className={style.headerText}>🎁 Wish List</h1>
      <h2 className={style.subheader}>Описание</h2>
      <p className={style.content}>{wish.title}</p>

      <h3 className={style.subheader}>Цена</h3>
      <p className={style.content}>{wish.price}</p>

      <div className={style.imageContainer}>
        <img className={style.image} src={wish.thumbnail} alt="photo wish" />
      </div>

      <p className={style.linkWrapper}>
        <a
          href="https://yandex.kz/images"
          target="_blank"
          className={style.link}
        >
          🔗 Перейти по ссылке
        </a>
      </p>
    </div>
  );
}
