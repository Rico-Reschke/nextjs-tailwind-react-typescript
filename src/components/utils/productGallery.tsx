"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/productGallery.module.css";
import utils from "../../styles/utils.module.css";
import Lightbox from "./lightbox";
import Image from "next/image";

type ProductGalleryProps = {
  imageUrls: string[];
}

export default function ProductGallery({ imageUrls }: ProductGalleryProps) {
    const [showLightbox, setShowLightbox] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

  const goToPrevSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.productGallery}>
      <div
        className={styles.productGalleryCover}
        onClick={() => setShowLightbox(true)}
      >
        <Image
        width={440}
        height={440} 
        src={imageUrls[imgIndex]} 
        alt="gallery-cover-image" 
        />
      </div>
      <ul className={`${styles.productThumbnails} ${utils.flex}`}>
        {imageUrls.map((url: any, index: any) => (
          <li
            key={index}
            className={
              imgIndex === index
                ? `${styles.productThumbnail} ${styles.productThumbnailActive}`
                : styles.productThumbnail
            }
            onClick={() => setImgIndex(index)}
          >
            <Image
            width={72}
            height={72} 
            src={url} 
            alt={`product thumbnail ${index}`} 
            />
          </li>
        ))}
      </ul>

      <Lightbox
        showLightbox={showLightbox}
        imgIndex={imgIndex}
        imageUrls={imageUrls}
        setImgIndex={setImgIndex}
        onClose={() => setShowLightbox(false)}
      />

      <div
        className={styles.productGallerySlider}
        style={{ transform: `translateX(-${imgIndex * 100}%)` }}
      >
        {imageUrls.map((url: any, index: any) => (
          <Image
            width={72}
            height={72}
            key={url.id}
            src={url}
            alt={`Product Image ${index}`}
          />
        ))}
      </div>
      <button className={`${styles.btnSliderPrev}`} onClick={goToPrevSlide}>
        <svg viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <button className={`${styles.btnSliderNext}`} onClick={goToNextSlide}>
        <svg viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
