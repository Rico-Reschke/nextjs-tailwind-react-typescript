"use client";
import ProductGallery from "@/components/utils/productGallery";
import utils from "@/styles/utils.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { product } from "../../../../public/data";
import styles from "../../../styles/page.module.css";

type CampgroundViewPageProps = {
  params: {
    id: string;
  };
};

type Campground = {
  imageUrls: string[];
};

export default function CampgroundViewPage({
  params,
}: CampgroundViewPageProps) {
  const router = useRouter();
  const [campground, setCampground] = useState<Campground | null>(null);

  useEffect(() => {
    const fetchCampground = async () => {
      const res = await fetch(`/api/campgrounds/${params.id}`);
      const campground = await res.json();
      if (!campground) {
        router.push("/campgrounds");
      } else {
      setCampground(campground);
      }
    };
    fetchCampground();
  }, [params.id]);

  if (campground) {
    console.log(campground.imageUrls[0]);
  }

  return (
    <main className={`${styles.main} ${utils.flex}`}>
      {campground && <ProductGallery imageUrls={campground.imageUrls} />}
      <div className={styles.productDetail}></div>
    </main>
  );
}
