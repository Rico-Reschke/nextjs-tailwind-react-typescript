"use client";
import ProductGallery from "@/components/utils/productGallery";
import utils from "../../../styles/utils.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../styles/page.module.css";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ReviewModal } from "../../../components/utils/ReviewModal";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const calculateReviewStats = (reviews: Review[]) => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
    if (counts.hasOwnProperty(review.rating)) {
      counts[review.rating as keyof typeof counts] += 1;
    }
  });

  const average = totalRating / reviews.length;
  const totalCount = reviews.length;

  return { average, totalCount, counts };
};

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

interface Review {
  user: string;
  author: string;
  content: string;
  rating: number;
  campground: string;
}

export default function CampgroundViewPage({
  params,
}: CampgroundViewPageProps) {
  const router = useRouter();
  const [campground, setCampground] = useState<Campground | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState("");
  const [review, setReview] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState({
    average: 0,
    totalCount: 0,
    counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  useEffect(() => {
    const fetchCampground = async () => {
      const res = await fetch(`/api/campgrounds/${params.id}`);
      const campground = await res.json();
      console.log(campground);
      if (!campground) {
        router.push("/campgrounds");
      } else {
        setCampground(campground);
      }
    };
    fetchCampground();

    const fetchReviews = async () => {
      const res = await fetch(`/api/campgrounds/${params.id}/reviews`);
      const data = await res.json();
      if (data && data.reviews) {
        const stats = calculateReviewStats(data.reviews);
        setReview(data.reviews);
        setReviewStats(stats);
      }
      console.log(data.reviews);
    };
    fetchReviews();
  }, [params.id]);

  if (campground) {
    // console.log(campground.imageUrls[0]);
  }

  return (
    <main className={`${styles.main} ${utils.flex}`}>
      <div className="flex flex-col">
        {campground && (
          <div className="flex flex-row">
            <div>
              <ProductGallery
                _id={campground._id}
                title={campground.title}
                location={campground.location}
                price={campground.price.toString()}
                description={campground.description}
                imageUrls={campground.imageUrls}
              />
            </div>
            <div className="flex flex-col">
              <div className="ml-4 bg-white xs:mt-20 lg:mt-0">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                  <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                    {campground.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                    <h1 className="font-bold">Price 24H</h1>
                    {campground.price}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                    <h1 className="font-bold">Location</h1>
                    {campground.location}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                    <h1 className="font-bold">Description</h1>
                    {campground.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {reviewStats.totalCount === 0 ? (
          <p className="mt-3 text-sm text-gray-600"></p>
        ) : (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Customer Reviews
                </h2>
                <div className="mt-3 flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviewStats.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {reviewStats.average.toFixed(1)} out of 5 stars
                    </p>
                  </div>
                  <p className="ml-2 text-sm text-gray-900">
                    Based on {reviewStats.totalCount} reviews
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="sr-only">Review data</h3>

                  <dl className="space-y-3">
                    {Object.entries(reviewStats.counts).map(
                      ([rating, count]) => (
                        <div key={rating} className="flex items-center text-sm">
                          <dt className="flex flex-1 items-center">
                            <p className="w-3 font-medium text-gray-900">
                              {rating}
                              <span className="sr-only">star reviews</span>
                            </p>
                            <div
                              aria-hidden="true"
                              className="ml-1 flex flex-1 items-center"
                            >
                              <StarIcon
                                className={classNames(
                                  count > 0
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0",
                                )}
                                aria-hidden="true"
                              />

                              <div className="relative ml-3 flex-1">
                                <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                {count > 0 ? (
                                  <div
                                    className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                    style={{
                                      width: `calc(${count} / ${reviewStats.totalCount} * 100%)`,
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </dt>
                          <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            {Math.round((count / reviewStats.totalCount) * 100)}
                            %
                          </dd>
                        </div>
                      ),
                    )}
                  </dl>
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Share your thoughts
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    If you’ve used this product, share your thoughts with other
                    customers
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                    type="button"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                  >
                    Write a review
                  </button>
                </div>
              </div>
              <ReviewModal open={isModalOpen} setOpen={setIsModalOpen} />
              <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <h3 className="sr-only">Recent reviews</h3>

                <div className="flow-root">
                  <div className="-my-12 divide-y divide-gray-200">
                    {review.map((review) => (
                      <div key={review.user} className="py-12">
                        <div className="flex items-center">
                          <Image
                            width={48}
                            height={48}
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt={`${review.author}.`}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="ml-4">
                            <h4 className="text-sm font-bold text-gray-900">
                              {review.author}
                            </h4>
                            <div className="mt-1 flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? "text-yellow-400"
                                      : "text-gray-300",
                                    "h-5 w-5 flex-shrink-0",
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>
                          </div>
                        </div>

                        <div
                          className="mt-4 space-y-6 text-base italic text-gray-600"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.productDetail}></div>
    </main>
  );
}
