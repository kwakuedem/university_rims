import { Link } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import {
    FaDownload,
    FaEye,
    FaFileDownload,
    FaUser,
    FaUsers,
} from "react-icons/fa";

const RightSection = ({ researchOut, about, author_qualifications }) => {
    const [activeTab, setActiveTab] = useState("about");

    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const handleMenuClick = (tab) => {
        setActiveTab(tab);
    };

    console.log(author_qualifications);

    return (
        <div className=" w-full bg-gray-100 h-screen overflow-auto flex-1 lg:overflow-y-auto">
            <div className="w-full   bg-red-500 lg:rounded-tr-md">
                <ul className="flex p-4 w-full ">
                    <li className="mr-4 mb-4 md:mb-0 ">
                        <button
                            onClick={() => handleMenuClick("about")}
                            className={`text-sm py-3 px-3  ${
                                activeTab === "about"
                                    ? "text-white font-bold"
                                    : "text-slate-200"
                            }`}
                        >
                            About
                        </button>
                    </li>
                    <li className="mr-4 mb-4 md:mb-0 ">
                        <button
                            onClick={() => handleMenuClick("researchout")}
                            className={`text-sm py-3 px-3  ${
                                activeTab === "researchout"
                                    ? "text-white font-bold"
                                    : "text-slate-200"
                            }`}
                        >
                            Research Out
                        </button>
                    </li>
                    <li className="mr-4 mb-4 md:mb-0 ">
                        <button
                            onClick={() => handleMenuClick("research")}
                            className={`text-sm py-3 px-3  ${
                                activeTab === "research"
                                    ? "text-white font-bold"
                                    : "text-slate-200"
                            }`}
                        >
                            Research
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-6 p-3 bg-gray-100 w-full lg:w-[90%] m-auto rounded-md">
                <div className="w-full overflow-auto">
                    {activeTab === "about" && (
                        <div className="bg-gray-100 w-full flex flex-col lg:flex-row gap-3">
                            <div className="w-full lg:w-[70%]">
                                <h2 className="text-md py-1 font-bold  text-blue-900">
                                    {"Bio"}
                                </h2>
                                <div className=" bg-white mb-2  p-3 rounded-md">
                                    <p className="text-md text-gray-600/90 text-justify">
                                        {about.bio}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-md p-3 w-full lg:w-[30%]">
                                <h2 className="text-blue-900 font-bold text-md">
                                    Degree
                                </h2>
                                <div className=" bg-white  flex flex-col gap-2 mb-2 w-full  p-3 rounded-md">
                                    {author_qualifications &&
                                    author_qualifications.length > 0 ? (
                                        author_qualifications.map(
                                            (qualification) => (
                                                <div className="text-md text-gray-600/90 flex flex-col px-2 py-2 border-gray-200 rounded-md">
                                                    <div className="pb-2">
                                                        <span className="text-blue-900">
                                                            {
                                                                qualification.degree
                                                            }
                                                        </span>
                                                        <p className="w-full">
                                                            {
                                                                qualification.institution
                                                            }
                                                        </p>
                                                        <span>
                                                            {qualification.year}
                                                        </span>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>
                                            <p>
                                                Ooops! No Qualication for this
                                                Author
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "researchout" && (
                        <div className="w-full">
                            <h2 className="text-blue-900 font-bold text-md">
                                {"Research"}
                            </h2>
                            <div className="grid grid-1 lg:grid-cols-2">
                                {researchOut.data &&
                                researchOut.data.length === 0 ? (
                                    <div className="bg-white p-3 mt-4 text-gray-500 rounded-md">
                                        Ooooops! No publications available
                                    </div>
                                ) : (
                                    researchOut.data &&
                                    researchOut.data.map((publication) => (
                                        <div
                                            key={publication.id}
                                            className="flex flex-col gap-3 px-1 lg:px-4 pt-4 border m-2"
                                        >
                                            <Link
                                                href={`/publications/${publication.id}/read`}
                                                className="text-lg text-blue-900/90 font-bold"
                                            >
                                                {publication.title + "  "}
                                                <span className="text-gray-500 text-md">
                                                    {formatDate(
                                                        publication.created_at
                                                    )}
                                                </span>
                                            </Link>
                                            <span className="text-blue-900/90 text-sm lg:text-base">
                                                {publication.abstract.substring(
                                                    0,
                                                    300
                                                ) + "     "}
                                                <Link
                                                    href={`/publication/${publication.title}`}
                                                    className="text-sm bg-slate-50 px-4 py-1 text-blue-400 font-bold"
                                                >
                                                    Read More .....
                                                </Link>
                                            </span>
                                            <span className="text-blue-900/90 flex gap-2 items-center">
                                                {publication.collaborations >
                                                0 ? (
                                                    <FaUsers className="text-gray-500 text-sm rounded-md" />
                                                ) : (
                                                    <FaUser className="text-gray-500 text-sm rounded-md" />
                                                )}
                                                <Link
                                                    href={route(
                                                        "author.profile",
                                                        publication.author_id
                                                    )}
                                                    className="text-blue-900/90 "
                                                >
                                                    {publication.author.name}
                                                </Link>
                                            </span>
                                            <span className="flex justify-between gap-3 py-2">
                                                <div className="flex gap-3">
                                                    <span className="bg-blue-300 flex items-center gap-2 text-sm lg:text-lg text-white rounded-md px-2">
                                                        {publication.downloads}{" "}
                                                        <FaDownload className="text-white/80 text-sm rounded-md" />
                                                    </span>
                                                    <span className="bg-gray-600 text-white flex items-center gap-2 text-sm rounded-md px-2">
                                                        {publication.views +
                                                            " "}{" "}
                                                        <FaEye className="text-white/80 text-sm rounded-md" />
                                                    </span>
                                                </div>
                                                <a
                                                    className="bg-blue-400 text-white text-sm font-semibold px-2 rounded-md flex gap-1 items-center justify-center"
                                                    href={
                                                        publication.file_path
                                                            ? route(
                                                                  "publication.download",
                                                                  publication.id
                                                              )
                                                            : "#"
                                                    }
                                                    download={
                                                        publication.file_path
                                                            ? "publication"
                                                            : null
                                                    }
                                                >
                                                    <FaDownload className="text-white/80 text-sm rounded-md" />
                                                    Download
                                                </a>
                                            </span>
                                        </div>
                                    ))
                                )}
                                {researchOut && researchOut.length > 0 && (
                                    <div className="lg:col-span-2 mt-4 flex justify-center space-x-2 py-3">
                                        {/* Page Numbers */}
                                        {researchOut.links.map(
                                            (link, index) => (
                                                <NavLink
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 mx-1  rounded-md ${
                                                        link.active
                                                            ? "bg-blue-700 text-white"
                                                            : "bg-gray-300 text-gray-800"
                                                    }`}
                                                    disabled={
                                                        (link.label ===
                                                            "Previous" &&
                                                            researchOut.current_page ===
                                                                1) ||
                                                        (link.label ===
                                                            "Next" &&
                                                            researchOut.current_page ===
                                                                researchOut.last_page)
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // You can also add additional logic here, like updating the current page state
                                                    }}
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                link.label
                                                            ),
                                                        }}
                                                    />
                                                </NavLink>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === "research" && (
                        <div className="bg-gray-100 ">
                            <h2 className="text-lg font-bold text-black">
                                {"Research Areas"}
                            </h2>
                            <div className="text-md bg-white text-gray-500 p-2 rounded-md lg:w-[30rem]">
                                {about.research_area}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightSection;
