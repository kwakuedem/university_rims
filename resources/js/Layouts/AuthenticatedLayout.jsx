import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="p-3 overflow-hidden h-screen bg-gradient-to-br from-blue-900/90 via-purple-500 to-red-700/80">
            <div className="h-full flex overflow-hidden ring-2 ring-white shadow-lg shadow-red-400  rounded-md 2xl:w-[90%] m-auto">
                {header && (
                    <header className="bg-transparent shadow min-h-screen rounded-l-md">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col ">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto lg:w-36 lg:h-28 fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="flex flex-col w-full !mt-10 items-center">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                        className="!text-sm !font-bold !text-white"
                                    >
                                        Dashboard
                                    </NavLink>

                                    <NavLink
                                        href={route("publications.index")}
                                        active={route().current(
                                            "publications.index"
                                        )}
                                        className="!font-bold !text-white mt-5 !text-sm"
                                    >
                                        Publications
                                    </NavLink>

                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("publication")}
                                        className="!text-sm !font-bold !text-white mt-5"
                                    >
                                        Submissions
                                    </NavLink>

                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("publication")}
                                        className="!text-sm !font-bold !text-white mt-5"
                                    >
                                        Teaching
                                    </NavLink>

                                    <NavLink
                                        href={route("collaborations.index")}
                                        active={route().current(
                                            "collaborations.index"
                                        )}
                                        className="!text-sm !font-bold !text-white mt-5"
                                    >
                                        Collaboration
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </header>
                )}

                <div className="main w-svw bg-gray-50 overflow-auto">
                    <nav className="bg-white sticky top-0 border-b rounded-r-md flex-1 border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <p className="!text-sm !text-gray-500">
                                    {header}
                                </p>
                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <span className="px-2">
                                                            {user.name}
                                                        </span>

                                                        <FaRegUserCircle />

                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) =>
                                                    !previousState
                                            )
                                        }
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? "inline-flex"
                                                        : "hidden"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? "inline-flex"
                                                        : "hidden"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                (showingNavigationDropdown
                                    ? "block"
                                    : "hidden") + " sm:hidden"
                            }
                        >
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1  border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route("profile.edit")}
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="">{children}</main>
                </div>
            </div>
        </div>
    );
}
