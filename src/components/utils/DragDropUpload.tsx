"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Upload() {
  const { register, handleSubmit } = useForm();

  const [imageUrl, setImageUrl] = useState();

  async function onSubmit(data: any) {
    const image = data.profile[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ricoshub");
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dcfnc8ajj/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    setImageUrl(imageUrl);
  }

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <form className="mx-16 mb-16 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("profile")}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </form>
        <hr />
        {imageUrl && (
          <Image width={500} height={350} alt="Flyer" src={imageUrl} />
        )}
      </div>
    </div>
  );
}
