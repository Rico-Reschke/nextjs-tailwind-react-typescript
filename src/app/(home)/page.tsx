import React from "react";
import Link from "next/link";
import Navbar from "@/components/elements/Navbar";

export default function Home() {
  return (
    <>
      <div className="homepage-background">
        <div className="container mx-auto flex h-screen flex-col justify-between">
          <main className="flex h-screen flex-col items-center justify-center">
            <h1 className="py-5 text-2xl font-bold">YelpCamp</h1>
            <p className="font-bold">Welcome to YelpCamp</p>
            <p className="w-[450px] py-1 sm:w-[600px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
              maiores ipsa quia sint suscipit magnam aliquid fuga, doloremque
              obcaecati nostrum omnis fugit, quas deleniti. Quod laborum libero
              inventore delectus aperiam?
            </p>
            <Link
              href="/campgrounds"
              className="mt-2 block rounded border border-white bg-white px-4 py-2 text-lg font-bold text-gray-600"
            >
              View Campgrounds
            </Link>
          </main>

          <footer className="text-white opacity-50">
            <p className="px-4">&copy; 2023 Crackstein</p>
          </footer>
        </div>
      </div>
    </>
  );
}
