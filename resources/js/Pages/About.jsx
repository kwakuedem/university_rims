import { Link, Head, useForm, usePage } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import NavLink from "@/Components/NavLink";
import NavMenu from "@/Components/NavMenu";
import Header from "@/Components/Header";
import { useEffect, useState } from "react";

export default function About() {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            message: "",
        });
    const { props } = usePage();

    // console.log(message);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact"), {
            onSuccess: () => {
                alert("Message Sent Successfully!. Thanks for Contacting Us");
            },
            onError: (page) => {
                alert("Ooops! Something went Wrong");
            },
        });
    };

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white">
                        <Header />
                        <div className="h-2 bg-blue-900/90 border-spacing-10" />
                        <div className="h-2 bg-red-600 border-spacing-10" />

                        <div className="bg-blue-900">
                            <div className="w-[80%] m-auto flex">
                                <div className=" pt-3 px-3 pb-6 w-[60%]">
                                    <h1 className=" py-3 underline font-extrabold px-4 text-lg">
                                        ABOUT US
                                    </h1>
                                    <p className="text-justify px-4 text-lg">
                                        This platform has been specially
                                        designed to provide a centralized
                                        environment where lecturers of Ho
                                        Technical University can seamlessly
                                        submit their research outputs after
                                        publication in reputable journals and
                                        conferences. Our research submission
                                        platform is crafted to ensure ease and
                                        satisfaction, no matter where you are in
                                        the world. We encourage timely
                                        submissions and active engagement with
                                        the platform to maintain accurate
                                        records of research contributions, as we
                                        continue to support the advancement of
                                        academic excellence and visibility
                                        within the university.
                                    </p>
                                </div>
                                <div className="flex flex-col pb-6 px-3 pt-3 w-[40%]">
                                    <p className=" font-semibold underline py-2 px-3">
                                        CONTACT US
                                    </p>
                                    <p className="px-3 text-lg">
                                        P. O . Box HP 217, Ho V/R - Ghana
                                    </p>
                                    <p className="px-3 text-lg">
                                        <span>Call :</span> 0362194953
                                    </p>
                                    <p className="px-3 text-lg">
                                        <span>Email :</span>{" "}
                                        servicedesk.htu.edu.gh
                                    </p>

                                    <div className="px-3 mt-6">
                                        {" "}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-lg font-semibold"
                                                    for="name"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    className="w-full px-2 text-gray-700 rounded-md"
                                                    type="text"
                                                    id="name"
                                                    value={data.name}
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.name && (
                                                    <div className="text-red-500">
                                                        {errors.name}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-lg font-semibold"
                                                    for="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="w-full px-2 text-gray-700 rounded-md"
                                                    type="email"
                                                    id="email"
                                                    autoComplete="off"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.email && (
                                                    <div className="text-red-500">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-lg font-semibold"
                                                    for="message"
                                                >
                                                    Message
                                                </label>
                                                <textarea
                                                    className="w-full px-2 text-gray-700 rounded-md"
                                                    id="message"
                                                    rows={3}
                                                    value={data.message}
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setData(
                                                            "message",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.message && (
                                                    <div className="text-red-500">
                                                        {errors.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-white hover:bg-white/80 text-blue-900 font-bold py-2 px-4 rounded w-[30%]"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

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
