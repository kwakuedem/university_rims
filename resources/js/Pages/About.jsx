import { Link, Head } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import NavLink from "@/Components/NavLink";
import NavMenu from "@/Components/NavMenu";
import Header from "@/Components/Header";

export default function About({ auth, publications }) {
    console.log(publications);

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        <Header />
                        <div className="h-2 bg-blue-900/90 border-spacing-10" />
                        <div className="h-2 bg-red-600 border-spacing-10" />

                        <main className="w-full bg-white mb-16">
                            <div className="content  bg-white">
                                <div className="bg-white">
                                    <div className="w-full lg:w-[90%] 2xl:w-[70%]  bg-whitejustify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                        <div className="bg-blue-900 text-white py-10 px-10">
                                            <div className=" mx-auto">
                                                <h1 className="text-3xl font-bold mb-4">
                                                    About Us
                                                </h1>
                                                <p className="mb-4">
                                                    Welcome to the Research
                                                    Repository System, developed
                                                    by:
                                                </p>
                                                <ul className="list-disc mb-4">
                                                    <li>Edem Kwaku Avorley</li>
                                                    <li>Baffoe Eric</li>
                                                    <li>Edward Holm</li>
                                                </ul>
                                                <p className="mb-4">
                                                    Our system is designed to
                                                    provide a platform for
                                                    researchers to share
                                                    knowledge and collaborate on
                                                    projects.
                                                </p>
                                                <p className="mb-4">
                                                    The purpose of this system
                                                    is to facilitate the
                                                    dissemination of research
                                                    findings, promote
                                                    innovation, and support
                                                    academic excellence.
                                                </p>
                                            </div>
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
