import React, { useState } from "react";
import Logo from "../Images/Logo.png";
import { Link } from "@inertiajs/react";
import NavMenu from "./NavMenu";
import NavLink from "./NavLink";
import { FaHamburger } from "react-icons/fa";
import SideNav from "./SideNav";

function Header() {
    const [toogleMenu, setToogleMenu] = useState(false);

    function onToogle() {
        setToogleMenu(!toogleMenu);
    }
    return (
        <>
            <header className="flex w-full justify-between bg-white shadow-sm shadow-red-500 sticky top-0   p-5 lg:px-5 lg:py-2">
                <div className="flex w-full lg:w-[80%] m-auto justify-between gap-6 bg-white ">
                    <div className="flex w-full items-center">
                        <Link
                            href={route("home")}
                            className="flex lg:justify-center lg:col-start-2 gap-4"
                        >
                            <img src={Logo} alt="Logo" className="w-16" />
                            <div className="htu hidden lg:flex items-center">
                                <h2 className="text-blue-900 font-bold">
                                    RESEARCH REPOSITORY HTU
                                </h2>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex w-full">
                        <NavLink
                            href={route("home")}
                            active={route().current("home")}
                            className="text-md font-bold !text-blue-900/80 active"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            href={route("about")}
                            active={route().current("about")}
                            className="text-md font-bold !text-blue-900/80"
                        >
                            About Us
                        </NavLink>

                        <NavLink
                            href={route("contact")}
                            active={route().current("contact")}
                            className="text-md font-bold !text-blue-900/80"
                        >
                            Contact Us
                        </NavLink>
                    </div>

                    <nav className=" -mx-3 flex justify-end w-full">
                        <div className="flex items-center">
                            <Link
                                href={route("login")}
                                className="hidden lg:flex lg:mr-0 rounded-md px-3 py-2 font-bold text-blue-900 ring-1 ring-transparent transition hover:text-blue-900/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-blue-900 hover:border-b-2 border-b-blue-900 dark:hover:text-blue-900/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>

                            <FaHamburger
                                onClick={onToogle}
                                className="text-blue-900 font-bold text-3xl mr-3 lg:hidden"
                            />
                        </div>
                    </nav>
                </div>
            </header>

            {toogleMenu && <SideNav setIsModalOpen={setToogleMenu} />}
        </>
    );
}

export default Header;
