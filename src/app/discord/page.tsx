"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { BsDiscord } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { PiReadCvLogoFill } from "react-icons/pi";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Image
        className="mx-auto my-10 rounded-full"
        width={110}
        height={110}
        src="https://coding.global/images/logo_512.gif"
        alt=""
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold">Official Coding Discord</h1>
        <p className="text-lg">
          Official{" "}
          <Link
            className="group inline-flex items-center gap-[0.25em] border-b border-dotted font-semibold underline  hover:border-black focus:outline-none focus-visible:rounded focus-visible:ring  focus-visible:ring-red-500 focus-visible:ring-offset-2"
            href="https://discord.gg/coding"
          >
            <span> discord.gg/coding </span>
          </Link>{" "}
          Website for the Coding Discord Server
        </p>
        <Link
          className="group inline-flex items-center gap-[0.25em] border-b border-dotted font-semibold 
        hover:border-black focus:outline-none focus:ring focus:ring-offset-2 
        focus-visible:rounded focus-visible:ring-red-500"
          href="https://github.com/CR4CKSTEIN/nextjs-tailwind-react-typescript"
        >
          <span>See the repository</span>
        </Link>
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "https://discord.gg/coding";
            }}
            className="mt-2 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-black hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <BsDiscord className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Discord
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              location.href = "/team";
            }}
            className="mx-2 mt-2 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-black hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <RiTeamLine className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Team
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              location.href = "/rules";
            }}
            className="mx-2 mt-2 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-black hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PiReadCvLogoFill className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Rules
          </button>
        </div>
        <div>
          <iframe
            src="https://discord.com/widget?id=693908458986143824&theme=dark"
            width="350"
            height="500"
            title="Discord Widget"
            frame-border="0"
            className="inline-flex mt-3 shadow-2xl shadow-black"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
