import { Link, Head, useForm, usePage } from "@inertiajs/react";
import Logo from "../Images/Logo.png";
import { FaSearch } from "react-icons/fa";
import Footer from "@/Components/Footer";
import NavLink from "@/Components/NavLink";
import NavMenu from "@/Components/NavMenu";
import { useEffect, useState } from "react";
import Header from "@/Components/Header";

export default function Contact({ successfull }) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            message: "",
        });
    const { props } = usePage();
    const message = props.success;

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message && message) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }, [message]);

    // console.log(message);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact"));
    };

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative bg-white min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className=" w-full bg-white  ">
                        {showMessage && (
                            <span className="bg-green-500 z-20 absolute top-6  rounded-md text-white right-10 p-3">
                                {message}
                            </span>
                        )}

                        <Header />
                        <div className="h-2 bg-blue-900/90 border-spacing-10" />
                        <div className="h-2 bg-red-600 border-spacing-10" />

                        <main className="w-full bg-white mb-16">
                            <div className="content  bg-white">
                                <div className="bg-white">
                                    <div className="w-full lg:w-[90%] 2xl:w-[70%]  bg-whitejustify-center items-center lg:flex  lg:gap-4 lg:m-auto lg:justify-center px-2 py-8 lg:items-center lg:px-32 lg:py-8">
                                        <div className="bg-blue-900 text-white py-10 w-full rounded-md">
                                            <div className="container mx-auto p-4">
                                                <h1 className="text-3xl font-bold mb-4">
                                                    Contact Us
                                                </h1>
                                                <p className="mb-4">
                                                    Get in touch with us for any
                                                    inquiries or feedback.
                                                </p>
                                                {/* {successfull && alert(message)} */}
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-4">
                                                        <label
                                                            className="block text-sm font-bold mb-2"
                                                            for="name"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            className="w-full p-2 text-gray-700 rounded-md"
                                                            type="text"
                                                            id="name"
                                                            value={data.name}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "name",
                                                                    e.target
                                                                        .value
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
                                                            className="block text-sm font-bold mb-2"
                                                            for="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            className="w-full p-2 text-gray-700 rounded-md"
                                                            type="email"
                                                            id="email"
                                                            value={data.email}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target
                                                                        .value
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
                                                            className="block text-sm font-bold mb-2"
                                                            for="message"
                                                        >
                                                            Message
                                                        </label>
                                                        <textarea
                                                            className="w-full p-2 text-gray-700 rounded-md"
                                                            id="message"
                                                            rows={8}
                                                            value={data.message}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "message",
                                                                    e.target
                                                                        .value
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
                                                            className="bg-white hover:bg-white/80 text-blue-900 font-bold py-2 px-4 rounded w-[20%]"
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </form>
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
