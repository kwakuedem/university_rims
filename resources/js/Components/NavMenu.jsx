import React from "react";
import NavLink from "@/Components/NavLink";

function NavMenu() {
    return (
        <div className="flex w-full">
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
    );
}

export default NavMenu;
