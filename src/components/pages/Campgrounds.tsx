"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { Modal } from '../utils/Modal'

export function Campgrounds() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState('');

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
      className="mx-5 mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {campgrounds.map((t: any) => (
        <li
          key={t._id}
          className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow"
        >
          <div className="relative h-72 w-full">
            {t.imageUrl && (
              <Image
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
              <span className={`mt-2 break-words text-gray-500 line-clamp-2 flex-grow`}>
                {t.description}
              </span>
              <button
              onClick={() => {
                setModalDescription(t.description);
                setIsModalOpen(true);
              }}
              className={`text-blue-500 hover:text-blue-700 mt-2 ${t.description.length < 100 ? 'hidden' : ''}`}
              >
                Show Description
              </button>
            </div>
          </div>
          <div>
            <div className="flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  View
                </Link>
              </div>
              <div className="flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Edit
                </Link>
              </div>
              <div className="flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Delete
                </Link>
              </div>
            </div>
          </div>
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
