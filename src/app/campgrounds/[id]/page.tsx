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

export default function CampgroundViewPage({
  params,
}: CampgroundViewPageProps) {
  const router = useRouter();
  const [campground, setCampground] = useState();

  useEffect(() => {
    const fetchCampground = async () => {
      const res = await fetch(`/api/campgrounds/${params.id}`);
      const campground = await res.json();
      if (!campground) router.push("/campgrounds");
      setCampground(campground);
    };
    fetchCampground();
  }, []);

  console.log(campground);

  return (
    <main className={`${styles.main} ${utils.flex}`}>
      <ProductGallery images={product.images} />
      <div className={styles.productDetail}></div>
    </main>
  );
}
