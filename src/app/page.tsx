"use client";

import { Navbar } from "@/components/Navbar";
import React from "react";

export default function HomePage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  return (
    <div>
      <Navbar />
      <div className="cover-container d-flex w-100 h-100 flex-column mx-auto p-3">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-left mb-0">YelpCamp</h3>
            <nav className="nav nav-masthead justify-content-center float-md-right">
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
          </div>
        </header>
        <main className="px-3">
          <h1>YelpCamp</h1>
          <p className="lead">
            Welcome to YelpCamp <br /> Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Iure maiores ipsa quia sint suscipit magnam
            aliquid fuga, doloremque obcaecati nostrum omnis fugit, quas
            deleniti. Quod laborum libero inventore delectus aperiam?
          </p>
          <a
            href="/campgrounds"
            className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
          >
            View Campgrounds
          </a>
        </main>

        <footer className="mt-autho text-white-50">
          <p>&copy; 2020 YelpCamp</p>
        </footer>
      </div>
    </div>
  );
}

{
  /* <main classNameName="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>YelpCamp</h1>
      <p>
        YelpCamp Welcome to YelpCamp Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Iure maiores ipsa quia sint suscipit magnam aliquid
        fuga, doloremque obcaecati nostrum omnis fugit, quas deleniti. Quod
        laborum libero inventore delectus aperiam?
      </p>
      <a href="/campgrounds" className="px-4 py-2 rounded bg-white text-gray-700 border border-white font-bold text-lg hover:bg-gray-200">View Campgrounds</a>
    </main> */
}
