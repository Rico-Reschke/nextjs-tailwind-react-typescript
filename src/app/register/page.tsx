"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link"

const page = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className="container mx-auto flex h-screen flex-col justify-between">
      <header className="flex justify-between px-5 py-2 sm:px-0">
        <h3 className="text-xl font-bold md:text-2xl">YelpCamp</h3>
        <nav>
          <Link className="nav-link" aria-current="page" href="/campgrounds/new">
            Add Campground
          </Link>
          <Link className="nav-link" aria-current="page" href="/">
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
              <Link className="nav-link active" href="/register">
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
    </div>
  );
};

export default page;
