"use client";

import React from "react";

export default function HomePage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  return (
    <div className="container mx-auto flex h-screen flex-col justify-between">
      <header className="flex justify-between py-2">
        <h3 className="font-bold text-2xl">YelpCamp</h3>
        <nav>
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
          <a className="nav-link" href="/campgrounds">
            Campgrounds
          </a>
          {!currentUser ? (
            <>
              <a className="nav-link" href="/login">
                Login
              </a>
              <a className="nav-link" href="/register">
                Register
              </a>
            </>
          ) : (
            <a className="nav-link" href="/logout">
              Logout
            </a>
          )}
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl py-5">YelpCamp</h1>
        <p className="font-bold">Welcome to YelpCamp</p>
        <p className="w-[600px] py-1">
          Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Iure maiores ipsa quia sint suscipit magnam aliquid
          fuga, doloremque obcaecati nostrum omnis fugit, quas deleniti. Quod
          laborum libero inventore delectus aperiam?
        </p>
        <a href="/campgrounds" className="mt-2 block rounded border border-white bg-white text-lg text-gray-600 px-4 py-2 font-bold">
          View Campgrounds
        </a>
      </main>

      <footer className="text-white opacity-50">
        <p>&copy; 2023 Crackstein</p>
      </footer>
    </div>
  );
}