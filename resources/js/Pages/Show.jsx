import { Link, Head } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import NavMenu from "@/Components/NavMenu";

export default function Show({ research }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    console.log(research);

    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };
    return (
        <>
            <Head title="Details" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <header className="flex w-full justify-between bg-white shadow-sm shadow-red-500 sticky top-0  p-5 ">
                            <div className="flex w-full lg:w-[80%] m-auto justify-between gap-6 bg-white ">
                                <div className="flex w-full items-center">
                                    <Link
                                        href={route("home")}
                                        className="flex lg:justify-center lg:col-start-2 gap-4"
                                    >
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
                                <div className="w-full lg:w-[90%] 2xl:w-[70%]  bg-white justify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                    {research.map((research) => (
                                        <div className="submission-section grid lg:m-auto pt-8">
                                            <h2 className="title text-black/80 text-3xl font-bold">
                                                {research.title}
                                            </h2>
                                            <p className="text-black/75 font-bold pt-4 text-lg pb-2">
                                                Abstract
                                            </p>
                                            <p className=" text-black/80">
                                                {research.abstract}
                                            </p>

                                            <div className="flex justify-end">
                                                {" "}
                                                <a
                                                    href={getAssetUrl(
                                                        research.file_path
                                                    )}
                                                    target="_blank"
                                                    rel="noopenernoreferrer"
                                                    className="bg-gray-700 flex justify-center py-1 text-white px-2 rounded-full w-[15%]"
                                                >
                                                    View Document
                                                </a>
                                            </div>
                                        </div>
                                    ))}
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
