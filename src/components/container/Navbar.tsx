"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { AiFillCloseSquare, AiOutlineMenu } from 'react-icons/ai';
import { BiDesktop, BiPlus } from 'react-icons/bi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';
import { RiLoginBoxLine } from 'react-icons/ri';
import { Disclosure, Menu, Transition } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [currentIcon, setCurrentIcon] = useState(
    <BiDesktop className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  );
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [showSun, setShowSun] = useState(true);
  const [showMoon, setShowMoon] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);

  const handleSunClick = () => {
    setShowSun(false);
    setShowMoon(true);
    setShowDesktop(true);
    setCurrentIcon(
      <BsSun className="h-5 w-5 text-gray-400" aria-hidden="true" />,
    );
  };

  const handleMoonClick = () => {
    setShowSun(true);
    setShowMoon(false);
    setShowDesktop(true);
    setCurrentIcon(
      <BsMoon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
    );
  };

  const handleDesktopClick = () => {
    setShowSun(true);
    setShowMoon(true);
    setShowDesktop(false);
    setCurrentIcon(
      <BiDesktop className="h-5 w-5 text-gray-400" aria-hidden="true" />,
    );
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = (
      event.currentTarget.elements.namedItem("query") as HTMLInputElement
    ).value;

    // Programmatisch zum Suchergebnis weiterleiten
    router.push(`/suche?query=${query}`);
  };

  return (
    <Disclosure as="nav" className="duration-100 dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center lgcustom:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <AiFillCloseSquare
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineMenu
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="hidden h-8 w-auto"
                    src="https://cdn4.iconfinder.com/data/icons/education-training/33/camping-512.png"
                    width={40}
                    height={40}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden lgcustom:ml-6 lgcustom:flex lgcustom:space-x-8">
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link
                      href="/"
                      className={`nav-link ${pathName === "/" ? "active" : ""}`}
                    >
                      <p className="dark:text-white">Homepage</p>
                    </Link>
                    <Link
                      href="/campgrounds"
                      className={`nav-link ${
                        pathName === "/campgrounds" ? "active" : ""
                      }`}
                    >
                      <p className="dark:text-white">Campgrounds</p>
                    </Link>
                    <Link
                      href="/projects"
                      className={`nav-link ${
                        pathName === "/projects" ? "active" : ""
                      }`}
                    >
                      <p className="dark:text-white">Projects</p>
                    </Link>
                    <a
                      href="/discord"
                      className={`nav-link ${
                        pathName === "/discord" ? "active" : ""
                      }`}
                    >
                      <p className="dark:text-white">Discord</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative mr-6 inline-block text-left">
                    {session && (
                      <Menu as="div">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold">
                            {FaSearch}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-3 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                            <div className="mx-5 py-1">
                              <form
                                action="/suche"
                                method="get"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.stopPropagation();
                                  }
                                }}
                                onSubmit={handleSearchSubmit}
                              >
                                <input
                                  type="text"
                                  name="query"
                                  placeholder="Search Campgrounds"
                                />
                              </form>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                  <Menu
                    as="div"
                    className="relative mr-3 inline-block text-left"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:ring-gray-800 dark:hover:bg-gray-700">
                        {currentIcon}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                        <div className="mx-2 py-1">
                          {showSun && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  onClick={handleSunClick}
                                  className={classNames(
                                    active
                                      ? "rounded-full bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "group flex items-center px-1 py-1",
                                  )}
                                >
                                  <BsSun
                                    className="flex h-5 w-5 self-center text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          {showMoon && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  onClick={handleMoonClick}
                                  className={classNames(
                                    active
                                      ? "rounded-full bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "group flex items-center px-1 py-1",
                                  )}
                                >
                                  <BsMoon
                                    className="flex h-5 w-5 self-center text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          {showDesktop && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  onClick={handleDesktopClick}
                                  className={classNames(
                                    active
                                      ? "rounded-full bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "group flex items-center px-1 py-1",
                                  )}
                                >
                                  <BiDesktop
                                    className="flex h-5 w-5 self-center text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {session && (
                    <Link
                      href="/campgrounds/new"
                      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      role="button"
                    >
                      <BiPlus className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      New Campground
                    </Link>
                  )}
                  {!session && (
                    <Link
                      href="/login"
                      type="button"
                      className="mx-3 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <RiLoginBoxLine
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Login
                    </Link>
                  )}
                  {!session && (
                    <Link
                      href="/register"
                      type="button"
                      className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <MdAppRegistration
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Register
                    </Link>
                  )}
                </div>
                <div className="mdlgcustom:ml-4 hidden md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  {session && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            width={40}
                            height={40}
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="http://127.0.0.1:3000/campgrounds/settings/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={() => signOut()}
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lgcustom:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Discord
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={() => signOut()}
                  as="a"
                  href="/"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
function setIsSearchOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
