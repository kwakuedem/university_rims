import { Link, Head, useForm } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { FaFileDownload, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import { Bounce, Fade, Slide } from "react-awesome-reveal";

export default function Welcome({ authors, publications }) {
    const { data, setData, processing } = useForm({
        search: "",
    });

    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };

    const [filteredAuthors, setFilteredAuthors] = useState("");
    const [filteredPublications, setFilteredPublications] = useState(
        publications.data
    );

    // Filter authors based on search input and department name
    useEffect(() => {
        const searchQuery = data.search.trim().toLowerCase();

        if (searchQuery === "") {
            setFilteredAuthors(""); // If search input is empty, clear the filtered authors
        } else {
            const filteredAuthors = authors.filter((author) => {
                const matchesName = author.name
                    .toLowerCase()
                    .includes(searchQuery);
                const matchesDepartment = author.department?.name
                    .toLowerCase()
                    .includes(searchQuery);
                return matchesName || matchesDepartment;
            });

            setFilteredAuthors(filteredAuthors);
        }
    }, [data.search, authors]);

    // Filter publications based on search input
    useEffect(() => {
        const searchQuery = data.search.trim().toLowerCase();

        const filteredPublications = publications.data.filter((publication) => {
            const matchesTitle = publication.title
                .toLowerCase()
                .includes(searchQuery);
            const matchesAbstract = publication.abstract
                ?.toLowerCase()
                .includes(searchQuery);
            const matchesAuthor = publication.author.name
                .toLowerCase()
                .includes(searchQuery);
            const matchesDepartment = publication.author.department?.name
                .toLowerCase()
                .includes(searchQuery);
            return (
                matchesTitle ||
                matchesAbstract ||
                matchesAuthor ||
                matchesDepartment
            );
        });

        setFilteredPublications(filteredPublications);
    }, [data.search, publications.data]);

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <Header />
                        <div className="h-2 bg-red-600 border-spacing-10" />
                        <main className="w-full bg-white mb-16">
                            <div className="content bg-white">
                                <div className="htu-blue-background">
                                    <div className="w-full lg:w-[90%] 2xl:w-[90%] htu-blue-background justify-center items-center lg:flex lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                        <div className="text flex flex-col flex-3">
                                            <Fade
                                                duration={1500}
                                                direction="left"
                                            >
                                                <h2 className="font-bold text-center text-white/70 text-lg lg:text-left lg:text-2xl">
                                                    Welcome to Research
                                                    Repository HTU
                                                </h2>
                                            </Fade>
                                            <Fade
                                                duration={2000}
                                                direction="left"
                                            >
                                                {" "}
                                                <p className="text-sm lg:text-lg text-white/70">
                                                    Research Repository HTU is a
                                                    digital collection of open
                                                    access scholarly research
                                                    publications from{" "}
                                                    <br className=" hidden lg:visible" />
                                                    <Link
                                                        className="htu-red"
                                                        href="https://www.htu.edu.gh"
                                                        target="_blank"
                                                    >
                                                        Ho Technical University
                                                    </Link>
                                                    . Research Repository HTU
                                                    collects, preserves and
                                                    makes freely available
                                                    publications including
                                                    peer-reviewed articles,
                                                    working papers and
                                                    conference papers created by
                                                    HTU researchers. Where
                                                    material has already been
                                                    published it is made
                                                    available subject to the
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
                                            </Fade>
                                        </div>
                                        <div className="logo hidden lg:flex">
                                            <Fade
                                                direction="right"
                                                duration={2000}
                                                delay={100}
                                            >
                                                {" "}
                                                <img
                                                    src={Logo}
                                                    alt="logo"
                                                    srcSet=""
                                                    className="lg:w-[800px]"
                                                />
                                            </Fade>
                                        </div>
                                    </div>
                                </div>

                                <Bounce duration={2000}>
                                    <div className="mt-6 w-[60%] items-center justify-center border border-slate-800 focus-within:border-slate-900 rounded-md lg:w-[30%] m-auto">
                                        <input
                                            autoComplete="off"
                                            value={data.search}
                                            type="text"
                                            className="flex-1 w-full text-gray-600 rounded-md"
                                            name="search"
                                            placeholder="Search by author or department..."
                                            onChange={(e) =>
                                                setData(
                                                    "search",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>{" "}
                                </Bounce>

                                {filteredAuthors && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-gray-200 w-[80%] m-auto p-3 z-10 mt-3">
                                        {filteredAuthors.map((author) => (
                                            <Link
                                                href={route(
                                                    "author.profile",
                                                    author.name
                                                )}
                                                className="flex flex-col items-center lg:flex-row bg-white mt-2 rounded-md p-3"
                                                key={author.id}
                                            >
                                                <img
                                                    src={getAssetUrl(
                                                        author.profile_photo
                                                    )}
                                                    alt="author"
                                                    className="w-16 h-16 lg:w-24 lg:h-24 rounded-full"
                                                />
                                                <div className="flex flex-col text-blue-900 font-bold text-lg py-4 px-4 mt-2">
                                                    <span className="text-sm lg:text-md">
                                                        {author.name}
                                                    </span>
                                                    <span className="text-sm lg:text-md">
                                                        {author.bio &&
                                                            author.bio.substring(
                                                                0,
                                                                200
                                                            )}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                <div className="submission-section grid lg:w-[80%] lg:m-auto pt-8">
                                    <div className="border-2">
                                        <div className="bg-gray-200 p-3 rounded-t-md recent-submissions">
                                            <h2 className="text-lg text-blue-900/80 font-bold">
                                                Recent Publications
                                            </h2>
                                        </div>
                                        <div className="grid grid-1 lg:grid-cols-2">
                                            {filteredPublications &&
                                            filteredPublications.length ===
                                                0 ? (
                                                <p className="text-blue-800 font-bold mt-6 p-4">
                                                    No publications available
                                                </p>
                                            ) : (
                                                filteredPublications.map(
                                                    (publication) => (
                                                        <Fade
                                                            direction="left"
                                                            duration={2000}
                                                            triggerOnce={false}
                                                        >
                                                            {" "}
                                                            <div
                                                                key={
                                                                    publication.id
                                                                }
                                                                className="flex flex-col gap-3 px-4 pt-4 border m-2"
                                                            >
                                                                <span className="bg-blue-900/50 w-24 flex justify-center rounded-lg font-bold text-white">
                                                                    publication
                                                                </span>
                                                                <Link
                                                                    href={`/publication/${publication.title}`}
                                                                    className="text-lg text-blue-900/90 font-bold"
                                                                >
                                                                    {
                                                                        publication.title
                                                                    }{" "}
                                                                    <span className="text-gray-500 text-md">
                                                                        {formatDate(
                                                                            publication.created_at
                                                                        )}
                                                                    </span>
                                                                </Link>
                                                                <span className="text-blue-900/90">
                                                                    {publication.abstract &&
                                                                        publication.abstract.substring(
                                                                            0,
                                                                            300
                                                                        )}
                                                                </span>
                                                                <span className="text-blue-900/90 flex gap-2">
                                                                    By:{" "}
                                                                    {
                                                                        publication
                                                                            .author
                                                                            .name
                                                                    }
                                                                    ,{" "}
                                                                    {publication.collaborations
                                                                        ?.map(
                                                                            (
                                                                                collaboration
                                                                            ) =>
                                                                                collaboration?.name
                                                                        )
                                                                        .join(
                                                                            ", "
                                                                        )}
                                                                    {publication.external_collaborations
                                                                        ?.map(
                                                                            (
                                                                                external_collaboration
                                                                            ) =>
                                                                                external_collaboration.name
                                                                        )
                                                                        .join(
                                                                            ", "
                                                                        )}
                                                                </span>
                                                                <span className="flex justify-between gap-3 py-2">
                                                                    <div className="flex gap-3">
                                                                        <span className="bg-blue-300 text-white rounded-md px-2">
                                                                            {
                                                                                publication.downloads
                                                                            }{" "}
                                                                            downloads
                                                                        </span>
                                                                        <span className="bg-gray-600 text-white rounded-md px-2">
                                                                            {
                                                                                publication.views
                                                                            }{" "}
                                                                            views
                                                                        </span>
                                                                    </div>
                                                                    <Link
                                                                        className="flex gap-1 items-center bg-blue-700 text-white/70 rounded-md px-2"
                                                                        href={route(
                                                                            "publication.download",
                                                                            publication.id
                                                                        )}
                                                                    >
                                                                        <FaFileDownload className="text-white text-lg rounded-md" />
                                                                        Download
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </Fade>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="pagination p-4 bg-white rounded-b-md">
                                        <div className="pagination-links">
                                            {publications.links &&
                                                publications.links.length >
                                                    0 && (
                                                    <div className="lg:col-span-2 mt-4 flex justify-center space-x-2 py-3">
                                                        <div className="text-gray-500 px-2 pt-2">
                                                            {publications?.from ??
                                                                0}{" "}
                                                            -{" "}
                                                            {publications?.to ??
                                                                0}{" "}
                                                            of{" "}
                                                            {publications?.total ??
                                                                0}
                                                        </div>
                                                        {publications.links.map(
                                                            (link, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={
                                                                        link.url
                                                                    }
                                                                    className={`px-3 py-1 mx-1 rounded-md ${
                                                                        link.active
                                                                            ? "bg-blue-700 text-white"
                                                                            : "bg-gray-300 text-gray-800"
                                                                    }`}
                                                                    disabled={
                                                                        (link.label ===
                                                                            "Previous" &&
                                                                            publications.current_page ===
                                                                                1) ||
                                                                        (link.label ===
                                                                            "Next" &&
                                                                            publications.current_page ===
                                                                                publications.last_page)
                                                                    }
                                                                    rel="nofollow"
                                                                >
                                                                    <span
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: DOMPurify.sanitize(
                                                                                link.label
                                                                            ),
                                                                        }}
                                                                    />
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
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
