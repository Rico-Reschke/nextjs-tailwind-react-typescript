"use client"
import React, { useState } from "react";
import axios from 'axios';

const NewCampgroundForm = () => {
  const [formData, setFormData] = useState<{
    title: string;
    location: string;
    price: number;
    description: string;
    image: null | File;
    [key: string]: string | number | null | File;
  }>({
    title: '',
    location: '',
    price: 0,
    description: '',
    image: null
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, files } = target;
    if (type === 'file') {
      setFormData(prevData => ({ ...prevData, [name]: files ? files[0] : null }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataForAPI = new FormData();
    for (let key in formData) {
      formDataForAPI.append(key, formData[key] as string | Blob);
    }

    try {
      const response = await axios.post('/api/campgrounds', formDataForAPI);
      console.log(response.data);
      alert('Campground erfolgreich hinzugefügt!');
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
      alert('Es gab einen Fehler beim Hinzufügen des Campgrounds.');
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
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input type="text" name="title" id="title" onChange={handleChange} className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm" placeholder="Enter the title" />
              </div>
              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-900">
                  Location
                </label>
                <input type="text" name="location" id="location" onChange={handleChange} className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm" placeholder="Location, City, or Address" />
              </div>
              <div>
                <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900">
                  Campground Price
                </label>
                <input type="number" name="price" id="price" onChange={handleChange} placeholder="0.00" className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea name="description" id="description" onChange={handleChange} className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm" placeholder="Enter a description"></textarea>
              </div>
              <div>
                <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900">
                  Image
                </label>
                <input type="file" name="image" id="image" onChange={handleChange} className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm" />
              </div>
              <button type="submit" className="focus:ring-primary-300 w-full cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4">
                Add Campground
              </button>
              <div>
                <div className="relative mt-10">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
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