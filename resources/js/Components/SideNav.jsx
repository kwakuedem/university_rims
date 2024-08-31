import React from "react";
import Logo from "../Images/Logo.png";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { FaLockOpen, FaHome } from "react-icons/fa";

function SideNav({ setIsModalOpen }) {
    return (
        <>
            <div
                onClick={setIsModalOpen}
                className="fixed inset-0 bg-gray-800 bg-opacity-90"
            >
                <div className=" pt-8 bg-gradient-to-br from-blue-900/90 z-20  to-red-700/80 h-full w-[60%] md:w-[40%]">
                    <Link className="flex justify-center pb-6">
                        <img src={Logo} alt="Logo" className="w-20" />
                    </Link>
                    <NavLink
                        href={route("home")}
                        active={route().current("home")}
                        className="py-4 !text-2xl font-bold !text-white active flex gap-3"
                    >
                        <FaHome className="text-white text-2xl" />
                        Home
                    </NavLink>
                    <NavLink
                        href={route("about")}
                        active={route().current("about")}
                        className="py-4 !text-2xl font-bold !text-white flex gap-3"
                    >
                        <FaLockOpen className="text-white text-2xl" />
                        About Us
                    </NavLink>

                    <NavLink
                        href={route("contact")}
                        active={route().current("contact")}
                        className="py-4 !text-2xl font-bold !text-white flex gap-3"
                    >
                        <FaHome className="text-white text-2xl" />
                        Contact Us
                    </NavLink>

                    <NavLink
                        href={route("login")}
                        active={route().current("contact")}
                        className="py-4 !text-2xl font-bold !text-white flex gap-3"
                    >
                        <FaLockOpen className="text-white text-2xl" />
                        Log in
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default SideNav;
