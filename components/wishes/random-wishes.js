"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import burgerImg from "@/public/logo.png";
import kek from "@/public/kek.webp";

import style from "./random.module.css";

const images = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: kek, alt: "A delicious, spicy curry" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? style.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
