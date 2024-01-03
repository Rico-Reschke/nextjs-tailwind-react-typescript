"use client";
import ProductGallery from "@/components/utils/productGallery";
import utils from "../../../styles/utils.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../styles/page.module.css";
import { title } from "process";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

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

const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

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
            <div className="bg-white ml-4 xs:mt-20 lg:mt-0">
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
