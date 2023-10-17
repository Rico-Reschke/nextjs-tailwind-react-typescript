"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "../utils/Modal";
import Link from "next/link";

export function Campgrounds() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  useEffect(() => {
    const fetchCampgrounds = async () => {
      const res = await fetch("/api/campgrounds");
      const camps = await res.json();
      setCampgrounds(camps.campgrounds);
    };
    fetchCampgrounds();
  }, []);

  return (
    <ul
      role="list"
      className="mx-6 mb-10 mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      {campgrounds.map((t: any) => (
        <li
          key={t._id}
          className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow transition-shadow duration-200 hover:shadow-2xl hover:scale-105"
        >
          <Link href={`/campgrounds/${t._id}`} key={t._id}>
            <div className="relative h-56 sm:h-56 lg:h-64 xl:h-72 2xl:h-72">
              {t.imageUrl && (
                <Image
                  className="rounded-t-lg"
                  sizes="2x"
                  fill
                  alt="Campground Image"
                  src={t.imageUrl}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col divide-y divide-gray-100 p-3">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-bold text-gray-900">Title</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="break-all text-gray-500">{t.title}</div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-bold text-gray-900">Location</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="break-all text-gray-500">{t.location}</div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-bold text-gray-900">Price a Day</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="break-words text-gray-500">{t.price}</div>
                </dd>
              </div>
              <div className="gap-x-4 py-2">
                <dt className="font-bold text-gray-900">Description</dt>
                <span
                  className={`mt-2 line-clamp-2 flex-grow break-words text-gray-500`}
                >
                  {t.description}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalDescription(t.description);
                    setIsModalOpen(true);
                  }}
                  className={`mt-2 text-blue-500 hover:text-blue-700 hover:text-lg ${
                    t.description.length < 100 ? "hidden" : ""
                  }`}
                >
                  Show Description
                </button>
              </div>
            </div>
          </Link>
        </li>
      ))}
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        description={modalDescription}
      />
    </ul>
  );
}
