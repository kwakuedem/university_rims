import { Link, Head, useForm } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import NavMenu from "@/Components/NavMenu";
import DOMPurify from "dompurify";

export default function Welcome({ authors, publications }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const { data, setData, post, error, processing } = useForm({
        search: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post("/", {
            forceFormData: true,
        });
    };

    console.log(authors);

    const NavLink = ({ href, className, children, disabled }) => (
        <Link
            href={href || "#"}
            className={className}
            disabled={!href || disabled}
        >
            {children}
        </Link>
    );

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
                                        h
                                        <div className="htu hidden lg:flex items-center">
                                            <h2 className="text-blue-900 font-bold">
                                                RESEARCH REPOSITORY HTU
                                            </h2>
                                        </div>
                                    </Link>
                                </div>

                                <NavMenu />

                                <nav className="-mx-3 flex justify-end w-full">
                                    <div className="flex items-center">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 font-bold text-blue-900 ring-1 ring-transparent transition hover:text-blue-900/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-blue-900 hover:border-b-2 border-b-blue-900 dark:hover:text-blue-900/80 dark:focus-visible:ring-white"
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
                                    <div className="w-full lg:w-[90%] 2xl:w-[70%]  htu-blue-background justify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
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

                                <div>
                                    <form
                                        autoComplete="off"
                                        action=""
                                        className="search-div flex items-center justify-center pt-6 gap-3 bg-white w-[80%] m-auto"
                                        onSubmit={onSubmit}
                                    >
                                        <div className=" flex bg-green-400 justify-center rounded-md w-[50%] m-auto">
                                            <input
                                                value={data.search}
                                                type="text"
                                                className="flex-1 text-gray-600 ring-blue-900 focus:ring-0"
                                                name="search"
                                                placeholder="search author ...."
                                                onChange={(e) =>
                                                    setData(
                                                        "search",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button className="bg-blue-500 text-lg text-white rounded-r-md px-2 flex justify-center items-center">
                                                <FaSearch className="text-lg text-white" />{" "}
                                                search
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {!authors === undefined &&
                                    authors.map((author) => (
                                        <div className="w-[30%] m-auto bg-gray-300 mt-2">
                                            <Link
                                                // href={`/author/${author.name}`}
                                                href={route(
                                                    "author.profile",
                                                    author.id
                                                )}
                                                key={author.id}
                                                className="text-blue-900 font-bold text-lg w-[50%] m-auto py-4 px-4 mt-2"
                                            >
                                                {author.name}
                                            </Link>
                                        </div>
                                    ))}

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
                                                                href={`/publications/${publication.id}/read`}
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
                                                            <span className="text-blue-900/90 flex justify-between">
                                                                By:{" "}
                                                                {
                                                                    publication
                                                                        .author
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="flex justify-end gap-3 px-3 py-2">
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
                                                                <a
                                                                    className="bg-blue-700 text-white font-semibold px-2 rounded-md"
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
                                                                    Download
                                                                    document
                                                                </a>
                                                            </span>
                                                        </div>
                                                    )
                                                )
                                            )}
                                            {publications &&
                                                publications.length > 0 && (
                                                    <div className="lg:col-span-2 mt-4 flex justify-center space-x-2 py-3">
                                                        {/* Page Numbers */}
                                                        {publications.links.map(
                                                            (link, index) => (
                                                                <NavLink
                                                                    key={index}
                                                                    href={
                                                                        link.url
                                                                    }
                                                                    className={`px-3 py-1 mx-1  rounded-md ${
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
                                                                    onClick={(
                                                                        e
                                                                    ) => {
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
                                </div>
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
