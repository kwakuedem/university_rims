import { Link, Head } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { format } from "date-fns";
import NavMenu from "@/Components/NavMenu";
import Header from "@/Components/Header";

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
                        <Header />
                        <div className="h-2 bg-red-600 border-spacing-10" />
                        <div className="h-1 bg-blue-600 border-spacing-10" />
                        <main className="w-full h-[75vh] bg-white mb-16 2xl:h-[70vh]">
                            <div className="content  bg-white">
                                <div className="w-full lg:w-[90%] 2xl:w-[70%]  bg-white justify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                    {research.map((research) => (
                                        <div className="submission-section grid lg:m-auto pt-8 px-2">
                                            <h2 className="title text-black/80 text-3xl font-bold text-justify">
                                                {research.title}
                                            </h2>
                                            <p className="text-black/75 font-bold pt-4 text-lg pb-2">
                                                Abstract
                                            </p>
                                            <p className=" text-black/80 text-justify">
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
                                                    className="bg-gray-700 flex justify-center py-1 text-white px-2 rounded-full lg:w-[15%]"
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
