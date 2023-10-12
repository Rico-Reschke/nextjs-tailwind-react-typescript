"use client"

import React, { useState } from "react";

const NewCampgroundForm = () => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/api/campgrounds", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, location, price, description  }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateInput = (event: any) => {
    const input = event.target;
    const feedbackElement = input.nextElementSibling;
    if (feedbackElement) {
      if (input.value.length > 0) {
        feedbackElement.textContent = "Looks good!";
        feedbackElement.classList.remove("text-red-500");
        feedbackElement.classList.add("text-green-500");
      } else {
        feedbackElement.textContent = "This field is required.";
        feedbackElement.classList.remove("text-green-500");
        feedbackElement.classList.add("text-red-500");
      }
    } else {
      console.warn("Feedback element not found");
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto mt-4 flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an New Campground
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onBlur={validateInput}
                  onChange={(e) => setTitle(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="Enter the title"
                />
                <div className="mt-1 text-green-500 text-sm"></div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onBlur={validateInput}
                  onChange={(e) => setLocation(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="Location, City, or Address"
                />
                <div className="mt-1 text-green-500 text-sm"></div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Campground Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onBlur={validateInput}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  placeholder="0.00"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                />
                <div className="mt-1 text-green-500 text-sm"></div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onBlur={validateInput}
                  onChange={(e) => setDescription(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="Enter a description"
                ></textarea>
                <div className="mt-1 text-green-500 text-sm"></div>
              </div>
              <div>
                {/* <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  value={image ? image.name : ""}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                /> */}
              </div>
              <button
                type="submit"
                className="focus:ring-primary-300 w-full cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4"
              >
                Add Campground
              </button>
              <div>
                <div className="relative mt-10">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCampgroundForm;
