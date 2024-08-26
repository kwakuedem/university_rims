import { Link, Head, useForm } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import NavMenu from "@/Components/NavMenu";
import DOMPurify from "dompurify";
import { FaFileDownload, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Welcome({ authors, publications }) {
    const { data, setData, get, processing } = useForm({
        search: "",
    });

    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };

    const [filteredAuthors, setFilteredAuthors] = useState("");

    // Filter authors based on search input
    useEffect(() => {
        if (data.search.trim() !== "") {
            setFilteredAuthors(
                authors.filter((author) =>
                    author.name
                        .toLowerCase()
                        .includes(data.search.toLowerCase())
                )
            );
        } else {
            setFilteredAuthors("");
        }
    }, [data.search, authors]);

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <header className="flex w-full justify-between bg-white shadow-sm shadow-red-500 sticky top-0  p-5 ">
                            <div className="flex w-full lg:w-[80%] m-auto justify-between gap-6 bg-white ">
                                <div className="flex w-full items-center">
                                    <Link className="flex lg:justify-center lg:col-start-2 gap-4">
                                        <img
                                            src={Logo}
                                            alt="Logo"
                                            className="w-16"
                                        />
                                        <div className="htu hidden lg:flex items-center">
                                            <h2 className="text-blue-900 font-bold">
                                                RESEARCH REPOSITORY HTU
                                            </h2>
                                        </div>
                                    </Link>
                                </div>

                                <NavMenu />

                                <nav className=" -mx-3 flex justify-end w-full">
                                    <div className="flex items-center">
                                        <Link
                                            href={route("login")}
                                            className="lg:mr-0 rounded-md px-3 py-2 font-bold text-blue-900 ring-1 ring-transparent transition hover:text-blue-900/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-blue-900 hover:border-b-2 border-b-blue-900 dark:hover:text-blue-900/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                </nav>
                            </div>
                        </header>
                        <div className="h-2 bg-red-600 border-spacing-10" />
                        <main className="w-full bg-white mb-16">
                            <div className="content  bg-white">
                                <div className="htu-blue-background ">
                                    <div className="w-full lg:w-[90%] 2xl:w-[90%]  htu-blue-background justify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                        <div className="text flex flex-col flex-3">
                                            <h2 className="font-bold text-center text-white/70 text-lg lg:text-left lg:text-2xl">
                                                {" "}
                                                Welcome to Research Repository
                                                HTU
                                            </h2>
                                            <p className="text-lg text-white/70">
                                                Research Repository HTU is a
                                                digital collection of open
                                                access scholarly research
                                                publications from{" "}
                                                <br className=" hidden lg:visible" />
                                                <a
                                                    className="htu-red"
                                                    href="htu.edu.gh"
                                                >
                                                    Ho Technical University
                                                </a>
                                                . Research Repository HTU
                                                collects, preserves and makes
                                                freely available publications
                                                including peer-reviewed
                                                articles, working papers and
                                                conference papers created by HTU
                                                researchers. Where material has
                                                already been published it is
                                                made available subject to the
                                                open-access policies of the
                                                original publishers. This
                                                service is maintained by{" "}
                                                <a
                                                    className="htu-red"
                                                    href="htu.edu.gh/elibrary"
                                                >
                                                    HTU Library
                                                </a>
                                                .
                                            </p>
                                        </div>
                                        <div className="logo  hidden lg:flex">
                                            <img
                                                src={Logo}
                                                alt="logo"
                                                srcSet=""
                                                className="lg:w-[800px]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 items-center justify-center border  border-slate-800 focus-within:border-slate-900 rounded-md w-[30%] m-auto">
                                    <input
                                        value={data.search}
                                        type="text"
                                        className="flex-1 w-full text-gray-600  rounded-md"
                                        name="search"
                                        placeholder="Search author ...."
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                    />
                                </div>

                                {filteredAuthors && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-gray-200 w-[80%] m-auto p-3 z-10 mt-3">
                                        {filteredAuthors &&
                                            filteredAuthors.map((author) => (
                                                <Link
                                                    href={route(
                                                        "author.profile",
                                                        author.name
                                                    )}
                                                    className=" flex flex-row bg-white mt-2 rounded-md p-3 "
                                                    key={author.id}
                                                >
                                                    <img
                                                        src={getAssetUrl(
                                                            author.profile_photo
                                                        )}
                                                        alt="author"
                                                        className="w-24 h-24 rounded-full"
                                                    />
                                                    <div className="text-blue-900 font-bold text-lg  py-4 px-4 mt-2">
                                                        <span>
                                                            {" "}
                                                            {author.name}
                                                        </span>
                                                        <span>
                                                            {author.bio}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                )}
                                <div className="submission-section grid lg:w-[80%] lg:m-auto pt-8">
                                    <div className="border-2">
                                        <div className=" bg-gray-200 p-3 rounded-t-md recent-submissions">
                                            <h2 className="text-lg text-blue-900/80 font-bold">
                                                Recent Publications
                                            </h2>
                                        </div>
                                        <div className="grid grid-1 lg:grid-cols-2">
                                            {publications.data &&
                                            publications.data.length === 0 ? (
                                                <p className="text-blue-800 font-bold mt-6 p-4">
                                                    No publications available
                                                </p>
                                            ) : (
                                                publications.data &&
                                                publications.data.map(
                                                    (publication) => (
                                                        <div
                                                            key={publication.id}
                                                            className="flex flex-col gap-3 px-4 pt-4 border m-2"
                                                        >
                                                            <span className="htu-blue-background w-24 flex justify-center rounded-lg font-bold text-white">
                                                                publication
                                                            </span>
                                                            <Link
                                                                href={`/publication/${publication.title}`}
                                                                className="text-lg text-blue-900/90 font-bold"
                                                            >
                                                                {publication.title +
                                                                    "  "}
                                                                <span className="text-gray-500 text-md">
                                                                    {formatDate(
                                                                        publication.created_at
                                                                    )}
                                                                </span>
                                                            </Link>
                                                            <span className="text-blue-900/90">
                                                                {publication.abstract.substring(
                                                                    0,
                                                                    300
                                                                )}
                                                            </span>
                                                            <span className="text-blue-900/90 flex gap-2">
                                                                By:{" "}
                                                                <Link
                                                                    href={route(
                                                                        "author.profile",
                                                                        publication.author_id
                                                                    )}
                                                                    className="text-blue-900/90 "
                                                                >
                                                                    {publication
                                                                        .author
                                                                        .name +
                                                                        ", "}
                                                                    {publication.collaborations &&
                                                                        publication
                                                                            .collaborations
                                                                            .length >
                                                                            0 && (
                                                                            <>
                                                                                {publication.collaborations
                                                                                    .map(
                                                                                        (
                                                                                            collaboration
                                                                                        ) =>
                                                                                            "" +
                                                                                                collaboration?.name ??
                                                                                            ""
                                                                                    )
                                                                                    .join(
                                                                                        ", "
                                                                                    )}
                                                                            </>
                                                                        )}
                                                                </Link>
                                                            </span>
                                                            <span className="flex justify-between gap-3 py-2">
                                                                <div className="flex gap-3">
                                                                    <span className="bg-blue-300 text-white rounded-md px-2">
                                                                        {publication.downloads +
                                                                            " "}{" "}
                                                                        downloads
                                                                    </span>
                                                                    <span className="bg-gray-600 text-white rounded-md px-2">
                                                                        {publication.views +
                                                                            " "}{" "}
                                                                        views
                                                                    </span>
                                                                </div>
                                                                <Link
                                                                    className="flex gap-1 items-center bg-blue-700 text-white/70 rounded-md px-2"
                                                                    href={`/publications/${publication.title}/download`}
                                                                >
                                                                    <FaFileDownload className=" text-white text-lg rounded-md" />
                                                                    Download
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="pagination p-4 bg-white rounded-b-md">
                                        <p className="text-gray-500">
                                            {publications.data &&
                                                publications.from}{" "}
                                            -{" "}
                                            {publications.data &&
                                                publications.to}{" "}
                                            of{" "}
                                            {publications.data &&
                                                publications.total}
                                        </p>
                                        <div className="pagination-links">
                                            {publications.links &&
                                                publications.links.map(
                                                    (link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`pagination-link ${
                                                                link.active
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
