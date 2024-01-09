import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import "../../styles/stars.css";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

const submitReview = async (campgroundId: string, reviewData: any) => {
  try {
    const response = await fetch(`/api/campgrounds/${campgroundId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      // Optionally, you can extract more information from the response
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Review submitted successfully:", responseData);
  } catch (error) {
    console.error("There was a problem with the fetch oeration:", error);
  }
};

export const ReviewModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: any) => {
    event?.preventDefault();
    const reviewData = {
      body: reviewText, // Text from textarea
      rating: rating, // Rating value
    };

    const campgroundId = "65536839a119b969563fb690"; // Replace with the actual campground ID
    submitReview(campgroundId, reviewData);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <AiFillCloseSquare className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Description
                        as="h3"
                        className="flex items-center justify-center text-base font-semibold leading-6 text-gray-900"
                      >
                        Write a Review
                      </Dialog.Description>
                      <div className="mt-4">
                        <textarea
                          placeholder="Write your review here..."
                          className="h-32 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <fieldset className="starability-basic">
                      <input
                        type="radio"
                        id="no-rate"
                        className="input-no-rate"
                        name="review[rating]"
                        value="1"
                        aria-label="No rating."
                      />
                      <input
                        type="radio"
                        id="first-rate1"
                        name="review[rating]"
                        value="1"
                      />
                      <label htmlFor="first-rate1" title="Terrible">
                        1 star
                      </label>
                      <input
                        type="radio"
                        id="first-rate2"
                        name="review[rating]"
                        value="2"
                      />
                      <label htmlFor="first-rate2" title="Not good">
                        2 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate3"
                        name="review[rating]"
                        value="3"
                      />
                      <label htmlFor="first-rate3" title="Average">
                        3 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate4"
                        name="review[rating]"
                        value="4"
                      />
                      <label htmlFor="first-rate4" title="Very good">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate5"
                        name="review[rating]"
                        value="5"
                      />
                      <label htmlFor="first-rate5" title="Amazing">
                        5 stars
                      </label>
                    </fieldset>
                  </div>
                  <div className="mt-5 sm:mt-7 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="mr-2 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReviewModal;
