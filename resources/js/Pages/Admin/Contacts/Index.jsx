import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useEffect, useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout ";

const Index = ({ auth, messages }) => {
    const { data, delete: destroy, processing } = useForm({});

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const deleteDepartment = (message_id) => {
        destroy(route("admin.messages.destroy", message_id), {
            onSuccess: (page) => {
                alert("Message Deleted Successfully.");
            },
            onError: (page) => {
                alert("Failed to Delete Message.");
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Contact Messages
                </h2>
            }
        >
            <Head title="Departments" />

            <div className="py-12 max-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white  shadow-sm sm:rounded-lg w-[80%] m-auto  overflow-y-hidden ">
                        <div className="p-6 text-gray-900 ">
                            {/* Search Input */}
                            <div className="mb-3 flex justify-between">
                                <Link
                                    className="px-2 rounded-md hidden bg-blue-900 text-white/60 w-[20%] items-center justify-center"
                                    href={route("admin.departments.create")}
                                >
                                    Add Department
                                </Link>
                            </div>

                            {/* Table to display publications */}
                            {messages.length > 0 ? (
                                <div className="mt-4  p-2 max-h-[350px] overflow-y-auto m-auto pb-10">
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="bg-blue-900 sticky top-[-10px] w-full ">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Sender Name
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Email
                                                </th>

                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Message
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
                                            {messages &&
                                                messages.map(
                                                    (message, index) => (
                                                        <tr
                                                            key={message.id}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "bg-gray-50"
                                                                    : "bg-white"
                                                            }
                                                        >
                                                            <td className="px-4 py-1 whitespace-nowrap">
                                                                <Link
                                                                    href={route(
                                                                        "admin.messages.show",
                                                                        message.id
                                                                    )}
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    {
                                                                        message.name
                                                                    }
                                                                </Link>
                                                            </td>

                                                            <td className="px-4 py-1 whitespace-nowrap">
                                                                <Link
                                                                    href={route(
                                                                        "admin.messages.show",
                                                                        message.id
                                                                    )}
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    {
                                                                        message.email
                                                                    }
                                                                </Link>
                                                            </td>

                                                            <td className="px-4 py-1 whitespace-nowrap">
                                                                {message.message.substring(
                                                                    0,
                                                                    50
                                                                )}
                                                            </td>

                                                            <td className="flex justify-center gap-2 px-4 py-1 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    href={route(
                                                                        "admin.messages.show",
                                                                        message.id
                                                                    )}
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    <GrView className="!text-green-400 text-[20px]" />
                                                                </Link>
                                                                {/* <Link
                                                                    href={route(
                                                                        "admin.messages.edit",
                                                                        message.id
                                                                    )}
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    <FaRegEdit className="text-[20px] !text-indigo-500" />
                                                                </Link> */}
                                                                <button
                                                                    onClick={() =>
                                                                        deleteDepartment(
                                                                            message.id
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    <MdDeleteForever className="text-[25px] !text-red-500" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>
                                    Awww! You do not have any publication yet!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
