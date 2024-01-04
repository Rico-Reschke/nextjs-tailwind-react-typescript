"use client";
import ProductGallery from "@/components/utils/productGallery";
import utils from "../../../styles/utils.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../styles/page.module.css";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type CampgroundViewPageProps = {
  params: {
    id: string;
  };
};

type Campground = {
  _id: string;
  title: string;
  location: string;
  price: string;
  description: string;
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
      {campground && (
        <>
          <ProductGallery
            _id={campground._id}
            title={campground.title}
            location={campground.location}
            price={campground.price.toString()}
            description={campground.description}
            imageUrls={campground.imageUrls}
          />
          <div className="flex flex-col">
            <div className="ml-4 bg-white xs:mt-20 lg:mt-0">
              <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                  {campground.title}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                  <h1 className="font-bold">Description</h1>
                  {campground.description}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                  <h1 className="font-bold">Price 24H</h1>
                  {campground.price}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                  <h1 className="font-bold">Location</h1>
                  {campground.location}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.productDetail}></div>
    </main>
  );
}
