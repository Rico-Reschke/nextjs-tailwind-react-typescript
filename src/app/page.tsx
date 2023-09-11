"use client";
import { Datepicker, Input, initTE } from "tw-elements";
initTE({ Datepicker, Input }, { allowReinits: true });
import React from "react";
import Link from "next/link"

export default function HomePage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  return (
    <div className="homepage-background">
      <div className="container mx-auto flex h-screen flex-col justify-between">
        <header className="flex justify-between px-5 py-2 sm:px-0">
          <h3 className="text-xl font-bold md:text-2xl">YelpCamp</h3>
          <nav>
            <Link className="nav-link active" aria-current="page" href="#">
              Home
            </Link>
            <Link className="nav-link" href="/campgrounds">
              Campgrounds
            </Link>
            {!currentUser ? (
              <>
                <Link className="nav-link" href="/login">
                  Login
                </Link>
                <Link className="nav-link" href="/register">
                  Register
                </Link>
              </>
            ) : (
              <Link className="nav-link" href="/logout">
                Logout
              </Link>
            )}
          </nav>
        </header>
        <main className="flex flex-col items-center justify-center ">
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
  );
}
