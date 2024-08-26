import { Link, Head, useForm } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import NavMenu from "@/Components/NavMenu";
import { MdOutlineMail } from "react-icons/md";
import RightSection from "@/Pages/Patials/RightSection";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Welcome({ collaborations, author, publications }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };

    return (
        <>
            <Head title="author profile" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 ">
                <div className="relative bg-white flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-screen   ">
                        <div className=" flex sticky top-0">
                            <header className="flex w-full justify-between bg-white shadow-sm shadow-red-500 sticky top-0  p-2 ">
                                <div className="flex w-full lg:w-[80%] m-auto justify-between gap-6 bg-white ">
                                    <div className="flex w-full items-center">
                                        <Link
                                            href={route("home")}
                                            className="flex lg:justify-center lg:col-start-2 gap-4 "
                                        >
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
                        </div>
                        <div className="h-2 bg-red-600 border-spacing-10" />
                        <main className="w-full  flex justify-center pb-8 bg-gradient-to-br from-blue-900/90 via-purple-500 to-red-700/80 px-6">
                            <div className="flex lg:container ring-2 mt-1 ring-white rounded-md h-min-full">
                                {/* <div className="flex ring-4 ring-red-400"> */}
                                {/* <div className="col-md-2 px-2 bg-transparent rounded-l-md ring-2 ring-black"> */}
                                <div className="author-profile bg-transparent w-64 flex flex-col  items-center pt-8 border-white overflow-hidden">
                                    <img
                                        src={getAssetUrl(author.profile_photo)}
                                        alt={author.name}
                                        className="rounded-full w-32 h-32 lg:h-40 lg:w-40 bg-white"
                                    />
                                    <div className="w-full p-2">
                                        <p className="text-lg text-center pt-4 lg:text-md text-white font-semibold p-2">
                                            {author.title}
                                        </p>
                                        <h2 className="text-lg lg:text-md text-white text-center font-semibold py-2 flex flex-col lg:flex-row text-wrap gap-2">
                                            {author.name}
                                        </h2>
                                        <div className="text-md text-white items-center w-full font-semibold">
                                            <MdOutlineMail className="text-white text-lg" />
                                            <span className="text-xs">
                                                {author.email}
                                            </span>
                                        </div>
                                        <div className="text-sm lg:text-md text-white font-semibold w-full py-2">
                                            <a
                                                href={`https://wa.me/${author.whatsapp}`}
                                                target="_blank"
                                                className="flex flex-col text-xs w-full gap-1 "
                                            >
                                                <FaWhatsapp className="text-white text-lg" />
                                                <p>{author.whatsapp}</p>
                                            </a>
                                        </div>
                                        <p className="text-sm lg:text-md text-white font-semibold w-full py-2">
                                            <a
                                                href={author.facebook}
                                                target="_blank"
                                                className="flex flex-col text-xs  text-wrap gap-1 "
                                            >
                                                <FaFacebook className="text-white text-lg" />
                                                <span className=" text-wrap ">
                                                    {author.facebook}
                                                </span>
                                            </a>
                                        </p>
                                        <p className="text-sm lg:text-md text-white font-semibold w-full py-2">
                                            <a
                                                href={author.linkedin}
                                                target="_blank"
                                                className="flex flex-col text-xs  text-wrap gap-1"
                                            >
                                                <FaLinkedin className="text-white text-lg" />
                                                <p>{author.linkedin}</p>
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {/* </div> */}
                                <div className="w-full">
                                    <RightSection
                                        researchOut={publications}
                                        about={author}
                                        research={author}
                                    />
                                </div>
                                {/* </div> */}
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
